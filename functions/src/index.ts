import { createHash, randomInt } from "node:crypto";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";
import { setGlobalOptions } from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";

initializeApp();
setGlobalOptions({ region: "us-central1", maxInstances: 10 });

const db = getFirestore();
const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

const OTP_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const CLIENT_ID_PATTERN = /^[A-Z0-9]{6}$/;

function hashValue(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeClientId(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const id = raw.trim().toUpperCase();
  return CLIENT_ID_PATTERN.test(id) ? id : null;
}

// Emails a one-time passcode to the address on file for a Client ID.
// Always returns the same { ok: true }, whether or not the ID existed, so this
// endpoint can't be used to enumerate valid Client IDs.
export const clientOtpRequest = onCall({ secrets: [RESEND_API_KEY] }, async (request) => {
  const clientId = normalizeClientId(request.data?.clientId);
  if (!clientId) return { ok: true };

  const client = await db.collection("clients").doc(clientId).get();
  if (!client.exists) return { ok: true };

  const code = randomInt(100000, 1000000).toString();
  // set() replaces any prior code for this client.
  await db.collection("client_otp_codes").doc(clientId).set({
    code_hash: hashValue(code),
    expires_at: Timestamp.fromMillis(Date.now() + OTP_TTL_MINUTES * 60_000),
    attempts: 0,
    created_at: FieldValue.serverTimestamp(),
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      // trim(): a key piped in from the clipboard can carry a trailing newline.
      Authorization: `Bearer ${RESEND_API_KEY.value().trim()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "StarterCulture <otp@mail.starterculturestudio.com>",
      to: client.get("email"),
      subject: "Your StarterCulture client login code",
      text: `Your one-time passcode is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.`,
    }),
  });
  if (!res.ok) {
    logger.error("Resend send failed", { clientId, status: res.status, body: await res.text() });
  }

  return { ok: true };
});

type VerifyResult =
  | { ok: true; token: string }
  | { ok: false; error: "invalid_request" | "not_found" | "expired" | "too_many_attempts" | "incorrect_code" };

// Checks a passcode and, on success, returns a Firebase custom token carrying a
// `client_id` claim. The client page signs in with it; Firestore rules use the
// claim to let that client read only their own `clients/{clientId}` doc.
export const clientOtpVerify = onCall(async (request): Promise<VerifyResult> => {
  const clientId = normalizeClientId(request.data?.clientId);
  const code = request.data?.code;
  if (!clientId || typeof code !== "string") return { ok: false, error: "invalid_request" };

  const otpRef = db.collection("client_otp_codes").doc(clientId);
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

  const token = await getAuth().createCustomToken(`client_${clientId}`, { client_id: clientId });
  return { ok: true, token };
});
