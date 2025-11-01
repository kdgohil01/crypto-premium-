// server/index.js - Main entry point for Vercel deployment
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load env vars
dotenv.config();

const app = express();

// Configure CORS to allow your Vercel frontend
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://crypto-premium.vercel.app',
    process.env.ALLOWED_ORIGIN
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  picture: {
    type: String,
    default: null,
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'researcher', 'enterprise'],
    default: 'free',
  },
  googleId: {
    type: String,
    default: null,
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upgradedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Session Schema
const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const Session = mongoose.model('Session', sessionSchema);

// Generate Token
const generateToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await Session.create({
    userId,
    token,
    expiresAt,
  });

  return token;
};

// Auth Middleware
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const session = await Session.findOne({
        token,
        userId: decoded.id,
        expiresAt: { $gt: new Date() },
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: 'Session expired or invalid',
        });
      }

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Admin Middleware
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

// Connect to MongoDB
connectDB();

// Routes
// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Crypto Premium Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        google: 'POST /api/auth/google',
        logout: 'POST /api/auth/logout',
        me: 'GET /api/auth/me'
      },
      user: {
        status: 'GET /api/user-status',
        upgrade: 'POST /api/upgrade'
      }
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      authProvider: 'local',
    });

    const token = await generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        plan: user.plan,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    if (user.authProvider === 'google') {
      return res.status(401).json({
        success: false,
        message: 'Please sign in with Google',
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = await generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        plan: user.plan,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
});

// Google Auth
app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name, picture, googleId } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google authentication data',
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        if (picture) user.picture = picture;
        await user.save();
      }
    } else {
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        googleId,
        picture,
        authProvider: 'google',
        password: Math.random().toString(36).slice(-8) + 'Aa1!',
      });
    }

    const token = await generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        plan: user.plan,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during Google authentication',
    });
  }
});

// Get Me
app.get('/api/auth/me', protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
        plan: req.user.plan,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Logout
app.post('/api/auth/logout', protect, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await Session.deleteOne({ token });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
    });
  }
});

// Get user status
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

// Upgrade user
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

// Admin: Update user plan by email
app.put('/api/admin/users/:email/plan', adminAuth, async (req, res) => {
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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
});

const PORT = process.env.PORT || 5050;

// For Vercel, we need to export the app
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;