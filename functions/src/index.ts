import { createHash, randomInt } from "node:crypto";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";
import { setGlobalOptions } from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";

initializeApp();
setGlobalOptions({ region: "us-central1", maxInstances: 10 });

const db = getFirestore();
const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

const OTP_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const ID_PATTERN = /^[A-Z0-9]{6}$/;
const SITE_URL = "https://starterculturestudio.com";

function hashValue(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeId(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const id = raw.trim().toUpperCase();
  return ID_PATTERN.test(id) ? id : null;
}

async function sendEmail(to: string, subject: string, text: string, context: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      // trim(): a key piped in from the clipboard can carry a trailing newline.
      Authorization: `Bearer ${RESEND_API_KEY.value().trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "StarterCulture <otp@mail.starterculturestudio.com>",
      to,
      subject,
      text,
    }),
  });
  if (!res.ok) {
    logger.error("Resend send failed", { ...context, status: res.status, body: await res.text() });
  }
}

// Clients and testers sign in the same way (see docs/PRODUCT.md items 10 and
// 13): an issued 6-character ID, a passcode emailed to the address on file,
// then a Firebase custom token carrying the ID as a claim that the Firestore
// and Storage rules check.
interface Audience {
  label: string; // for the email subject
  idField: string; // request field carrying the ID
  collection: string; // where the records live, keyed by ID
  otpCollection: string; // functions-only, no rule access
  claim: string; // custom claim name on the signed-in user
  uidPrefix: string;
}

const CLIENTS: Audience = {
  label: "client",
  idField: "clientId",
  collection: "clients",
  otpCollection: "client_otp_codes",
  claim: "client_id",
  uidPrefix: "client_",
};

const TESTERS: Audience = {
  label: "tester",
  idField: "testerId",
  collection: "testers",
  otpCollection: "tester_otp_codes",
  claim: "tester_id",
  uidPrefix: "tester_",
};

// Emails a one-time passcode to the address on file for an ID. Always returns
// the same { ok: true }, whether or not the ID existed, so it can't be used to
// enumerate valid IDs.
function otpRequest(audience: Audience) {
  return onCall({ secrets: [RESEND_API_KEY] }, async (request) => {
    const id = normalizeId(request.data?.[audience.idField]);
    if (!id) return { ok: true };

    const record = await db.collection(audience.collection).doc(id).get();
    // Removed (deactivated) testers can't sign in; same generic response.
    if (!record.exists || record.get("active") === false) return { ok: true };

    const code = randomInt(100000, 1000000).toString();
    // set() replaces any prior code for this ID.
    await db.collection(audience.otpCollection).doc(id).set({
      code_hash: hashValue(code),
      expires_at: Timestamp.fromMillis(Date.now() + OTP_TTL_MINUTES * 60_000),
      attempts: 0,
      created_at: FieldValue.serverTimestamp(),
    });

    await sendEmail(
      record.get("email"),
      `Your StarterCulture ${audience.label} login code`,
      `Your one-time passcode is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.`,
      { audience: audience.label, id },
    );

    return { ok: true };
  });
}

type VerifyResult =
  | { ok: true; token: string }
  | { ok: false; error: "invalid_request" | "not_found" | "expired" | "too_many_attempts" | "incorrect_code" };

// Checks a passcode and, on success, returns a Firebase custom token carrying
// the audience's claim (e.g. `client_id`). The page signs in with it.
function otpVerify(audience: Audience) {
  return onCall(async (request): Promise<VerifyResult> => {
    const id = normalizeId(request.data?.[audience.idField]);
    const code = request.data?.code;
    if (!id || typeof code !== "string") return { ok: false, error: "invalid_request" };

    const otpRef = db.collection(audience.otpCollection).doc(id);
    const outcome = await db.runTransaction(async (tx): Promise<VerifyResult | null> => {
      const otp = await tx.get(otpRef);
      if (!otp.exists) return { ok: false, error: "not_found" };

      if ((otp.get("expires_at") as Timestamp).toMillis() < Date.now()) {
        tx.delete(otpRef);
        return { ok: false, error: "expired" };
      }
      if (otp.get("attempts") >= MAX_ATTEMPTS) {
        tx.delete(otpRef);
        return { ok: false, error: "too_many_attempts" };
      }
      if (otp.get("code_hash") !== hashValue(code.trim())) {
        tx.update(otpRef, { attempts: FieldValue.increment(1) });
        return { ok: false, error: "incorrect_code" };
      }

      // Success: consume the passcode.
      tx.delete(otpRef);
      return null;
    });
    if (outcome) return outcome;

    // Also covers a tester removed between requesting and entering a code.
    const record = await db.collection(audience.collection).doc(id).get();
    if (!record.exists || record.get("active") === false) return { ok: false, error: "not_found" };

    const token = await getAuth().createCustomToken(`${audience.uidPrefix}${id}`, { [audience.claim]: id });
    return { ok: true, token };
  });
}

export const clientOtpRequest = otpRequest(CLIENTS);
export const clientOtpVerify = otpVerify(CLIENTS);
export const testerOtpRequest = otpRequest(TESTERS);
export const testerOtpVerify = otpVerify(TESTERS);

// Emails dev@ whenever a tester submits feedback (docs/PRODUCT.md item 13).
export const onTesterFeedback = onDocumentCreated(
  { document: "tester_feedback/{feedbackId}", secrets: [RESEND_API_KEY] },
  async (event) => {
    const feedback = event.data?.data();
    if (!feedback) return;

    const [tester, app] = await Promise.all([
      db.collection("testers").doc(feedback.tester_id).get(),
      db.collection("apps").doc(feedback.app_id).get(),
    ]);
    const testerName = tester.get("name") ?? feedback.tester_id;
    const appName = app.get("name") ?? feedback.app_id;
    const shots = Array.isArray(feedback.screenshots) ? feedback.screenshots.length : 0;

    await sendEmail(
      "dev@starterculturestudio.com",
      `Tester feedback: ${appName} — ${testerName}`,
      [
        `${testerName} (${feedback.tester_id}) sent feedback on ${appName}.`,
        "",
        feedback.note,
        "",
        `Screenshots: ${shots}`,
        `Review it at ${SITE_URL}/company-testers`,
      ].join("\n"),
      { feedbackId: event.params.feedbackId },
    );
  },
);
