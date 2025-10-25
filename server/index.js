// server/index.js
// Express backend with Firebase Admin for plan management
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeApp, cert, applicationDefault, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import premiumRouter from './routes/premium.js';

dotenv.config();

const PORT = process.env.PORT || 5050;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

function initFirebaseAdmin() {
  if (getApps().length) return;
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (saJson) {
    const serviceAccount = JSON.parse(saJson);
    initializeApp({ credential: cert(serviceAccount), projectId: serviceAccount.project_id });
  } else {
    initializeApp({ credential: applicationDefault() });
  }
}

initFirebaseAdmin();
const db = getFirestore();
const adminAuth = getAuth();

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN, credentials: true }));
app.use(express.json());

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing bearer token' });
    const decoded = await adminAuth.verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email || '' };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/user-status', verifyToken, async (req, res) => {
  const { uid, email } = req.user;
  const ref = db.collection('users').doc(uid);
  const snap = await ref.get();
  if (!snap.exists) {
    const doc = {
      uid,
      email,
      plan: 'free',
      createdAt: FieldValue.serverTimestamp(),
      upgradedAt: null,
    };
    await ref.set(doc, { merge: true });
    return res.json({ plan: 'free' });
  }
  const data = snap.data() || {};
  const plan = data.plan === 'premium' ? 'premium' : 'free';
  return res.json({ plan });
});

app.post('/api/upgrade', verifyToken, async (req, res) => {
  const { uid, email } = req.user;
  const ref = db.collection('users').doc(uid);
  await ref.set(
    { uid, email, plan: 'premium', upgradedAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp() },
    { merge: true }
  );
  return res.json({ plan: 'premium' });
});

// Mount premium trial and processing APIs
app.use('/api', premiumRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
