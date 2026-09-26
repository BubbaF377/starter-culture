// Safe to expose client-side: the Firebase web config (including apiKey) is a
// public project identifier, not a secret. Access control comes from Firebase
// Auth + firestore.rules -- see docs/PRODUCT.md item 10.
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCS9AiNqgc1ZHTMWFlyR5BNNSpFtDwGGtc',
  authDomain: 'starter-culture-d6b5f.firebaseapp.com',
  projectId: 'starter-culture-d6b5f',
  appId: '1:399202895444:web:00ab09944d8ff3e6910fc1',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Must match the region in functions/src/index.ts.
export const functions = getFunctions(app, 'us-central1');
