// server/firebaseAdmin.js
const admin = require('firebase-admin');

// Prefer application default credentials. For local dev, set GOOGLE_APPLICATION_CREDENTIALS
// or provide FIREBASE_SERVICE_ACCOUNT_JSON containing the JSON content.
if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      admin.initializeApp({ credential: admin.credential.cert(svc) });
    } else {
      admin.initializeApp({ credential: admin.credential.applicationDefault() });
    }
  } catch (e) {
    console.error('Failed to initialize firebase-admin credentials. Ensure GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_JSON is set.');
    throw e;
  }
}

const db = admin.firestore();

module.exports = { admin, db };
