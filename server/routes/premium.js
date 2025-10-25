// server/routes/premium.js (ESM)
import { Router } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const router = Router();
const db = getFirestore();

function userRef(uid) {
  return db.collection('users').doc(uid);
}

async function getOrInitUser(uid, email) {
  const ref = userRef(uid);
  const snap = await ref.get();
  if (!snap.exists) {
    const now = new Date();
    const doc = {
      uid,
      email: email || null,
      plan: 'free',
      createdAt: now,
      upgradedAt: null,
      oneTimeTrial: {
        available: false,
        grantedAt: null,
        usedAt: null,
      },
      featureConfig: {
        processingDelaySeconds: 5,
        trialExpiryDays: 30,
      },
    };
    await ref.set(doc, { merge: true });
    return doc;
  }
  return snap.data();
}

async function computeSecurityPotential(userDoc) {
  if (userDoc.plan === 'premium') return 100;
  let val = 25;
  val += 25;
  val += 20;
  val += 20;
  return Math.min(90, val);
}

function nowTs() { return new Date(); }

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing bearer token' });
    const decoded = await getAuth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email || '' };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// POST /api/video-watched
router.post('/video-watched', verifyToken, async (req, res) => {
  try {
    const { uid, email } = req.user;
    const { percentWatched = 0, watchSessionId } = req.body || {};
    const ref = userRef(uid);
    const user = await getOrInitUser(uid, email);

    // Basic throttle: prevent frequent grants within 60s
    const throttleRef = db.collection('videoWatchProofs').doc(uid);
    const throttleSnap = await throttleRef.get();
    const last = throttleSnap.exists ? throttleSnap.data().lastGrantAt : null;
    const now = Date.now();
    if (last && now - last < 60_000) {
      return res.json({ success: false, oneTimeTrialAvailable: !!user.oneTimeTrial?.available });
    }

    if (user.plan === 'premium') {
      await throttleRef.set({ lastGrantAt: now, lastSession: watchSessionId || null }, { merge: true });
      return res.json({ success: true, oneTimeTrialAvailable: false });
    }

    const trial = user.oneTimeTrial || { available: false, grantedAt: null, usedAt: null };

    if (percentWatched >= 90 && !trial.available) {
      await ref.set({
        oneTimeTrial: {
          available: true,
          grantedAt: nowTs(),
          usedAt: trial.usedAt || null,
        },
      }, { merge: true });
      await throttleRef.set({ lastGrantAt: now, lastSession: watchSessionId || null }, { merge: true });
      await db.collection('analytics').add({
        uid, type: 'video_claimed_trial', ts: nowTs(), watchSessionId: watchSessionId || null,
      });
      return res.json({ success: true, oneTimeTrialAvailable: true });
    }

    await db.collection('analytics').add({ uid, type: 'video_percent_watched', ts: nowTs(), percentWatched });
    return res.json({ success: false, oneTimeTrialAvailable: !!trial.available });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'server_error' });
  }
});

// POST /api/consume-trial
router.post('/consume-trial', verifyToken, async (req, res) => {
  const { uid, email } = req.user;
  const { feature } = req.body || {};
  if (feature !== 'multiLayer') return res.status(400).json({ error: 'invalid_feature' });

  const ref = userRef(uid);
  try {
    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const user = snap.exists ? snap.data() : await getOrInitUser(uid, email);
      if (user.plan === 'premium') {
        return { allowed: true, reason: 'premium' };
      }
      const trial = user.oneTimeTrial || {};
      if (trial.available && !trial.usedAt) {
        tx.set(ref, { oneTimeTrial: { ...trial, usedAt: nowTs() } }, { merge: true });
        return { allowed: true, trialConsumed: true };
      }
      return { allowed: false, reason: 'locked' };
    });
    if (result.allowed) {
      await db.collection('analytics').add({ uid, type: 'trial_consumed', ts: nowTs(), feature });
    }
    return res.json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'server_error' });
  }
});

// GET /api/user-premium-status
router.get('/user-premium-status', verifyToken, async (req, res) => {
  try {
    const { uid, email } = req.user;
    const user = await getOrInitUser(uid, email);
    const trial = user.oneTimeTrial || {};
    const processingDelaySeconds = user.featureConfig?.processingDelaySeconds ?? 5;
    const securityPotential = await computeSecurityPotential(user);
    return res.json({
      plan: user.plan,
      oneTimeTrialAvailable: !!trial.available,
      oneTimeTrialUsedAt: trial.usedAt || null,
      processingDelaySeconds,
      securityPotential,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'server_error' });
  }
});

// POST /api/process-multilayer
router.post('/process-multilayer', verifyToken, async (req, res) => {
  try {
    const { uid, email } = req.user;
    const { payload, forceTrial } = req.body || {};

    // Access enforcement
    const ref = userRef(uid);
    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const user = snap.exists ? snap.data() : await getOrInitUser(uid, email);
      if (user.plan === 'premium') return { allowed: true };
      const trial = user.oneTimeTrial || {};
      if (trial.available && !trial.usedAt) {
        if (forceTrial) {
          tx.set(ref, { oneTimeTrial: { ...trial, usedAt: nowTs() } }, { merge: true });
        }
        return { allowed: true, trial: true };
      }
      return { allowed: false };
    });

    if (!result.allowed) {
      return res.status(403).json({ error: 'forbidden' });
    }

    // Placeholder processing: In real backend, do actual multi-layer work or queue a job
    await db.collection('analytics').add({ uid, type: 'multilayer_attempt', ts: nowTs() });

    const response = {
      ok: true,
      // return a mock URL or data handle
      resultUrl: null,
      message: 'Processed (mock) — integrate real server-side multi-layer here',
    };

    await db.collection('analytics').add({ uid, type: 'multilayer_success', ts: nowTs() });
    return res.json(response);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'server_error' });
  }
});

export default router;
