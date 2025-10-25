// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import { protect } from './middleware/auth.js';
import User from './models/User.js';

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080', 
  'http://192.168.0.105:8080',
  'https://crypto-premium.vercel.app', // Your actual Vercel frontend URL
  process.env.ALLOWED_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Get user status (plan)
app.get('/api/user-status', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      plan: req.user.plan,
    });
  } catch (error) {
    console.error('User status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Upgrade user to premium
app.post('/api/upgrade', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.plan = 'premium';
    user.upgradedAt = new Date();
    await user.save();

    res.json({
      success: true,
      plan: 'premium',
      message: 'Successfully upgraded to premium',
    });
  } catch (error) {
    console.error('Upgrade error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during upgrade',
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
