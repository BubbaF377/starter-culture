// Publishes the tester agreement (docs/PRODUCT.md item 13) from
// scripts/tester-agreement.txt to Firestore at config/tester_agreement.
//
// The version is a hash of the text, so changing the text changes the version
// and every tester is asked to accept the new one on their next visit.
// Re-running with unchanged text is a no-op for testers.
//
// Auth uses Application Default Credentials:
//   gcloud auth application-default login
//
// Usage (from functions/):
//   npm run set-agreement

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const PROJECT_ID = "starter-culture-d6b5f";
const TITLE = "Tester Agreement";

const body = readFileSync(new URL("./tester-agreement.txt", import.meta.url), "utf8").trim();
if (!body) {
  console.error("scripts/tester-agreement.txt is empty.");
  process.exit(1);
}
const version = createHash("sha256").update(body).digest("hex").slice(0, 12);

initializeApp({ credential: applicationDefault(), projectId: PROJECT_ID });
const ref = getFirestore().doc("config/tester_agreement");

const current = await ref.get();
if (current.exists && current.get("version") === version) {
  console.log(`Agreement unchanged (version ${version}); nothing to do.`);
  process.exit(0);
}

await ref.set({ title: TITLE, body, version, updated_at: FieldValue.serverTimestamp() });
console.log(`Published agreement version ${version}${current.exists ? ` (was ${current.get("version")})` : ""}. Testers will be asked to accept it.`);
