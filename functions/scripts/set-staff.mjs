// Grants (or revokes) the `staff` custom claim that gates the Company admin
// area and staff-only Firestore rules. See docs/PRODUCT.md items 10–11.
//
// The team member must have signed in once via Company Login first, so their
// Firebase Auth user exists. Auth uses Application Default Credentials:
//   gcloud auth application-default login
//
// Usage (from functions/):
//   npm run set-staff -- you@example.com
//   npm run set-staff -- you@example.com --revoke
//
// The user has to sign out and back in (or wait up to an hour for token
// refresh) before the change takes effect.

import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const PROJECT_ID = "starter-culture-d6b5f";

const [email, flag] = process.argv.slice(2);
if (!email) {
  console.error("Usage: npm run set-staff -- <email> [--revoke]");
  process.exit(1);
}
const revoke = flag === "--revoke";

initializeApp({ credential: applicationDefault(), projectId: PROJECT_ID });
const auth = getAuth();

const user = await auth.getUserByEmail(email);
const claims = { ...(user.customClaims ?? {}) };
if (revoke) {
  delete claims.staff;
} else {
  claims.staff = true;
}
await auth.setCustomUserClaims(user.uid, claims);

console.log(`${revoke ? "Revoked" : "Granted"} staff for ${email} (uid ${user.uid}).`);
