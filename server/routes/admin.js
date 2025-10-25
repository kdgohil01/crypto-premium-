// server/routes/admin.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Simple admin middleware
const adminAuth = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }
  next();
};

// Update user plan by email
router.put('/users/:email/plan', adminAuth, async (req, res) => {
  try {
    const { email } = req.params;
    const { plan } = req.body;

    const validPlans = ['free', 'pro', 'researcher', 'enterprise'];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        success: false,
        message: `Invalid plan. Must be one of: ${validPlans.join(', ')}`,
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.plan = plan;
    user.upgradedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: `User ${email} plan updated to ${plan}`,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        upgradedAt: user.upgradedAt,
      },
    });
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;