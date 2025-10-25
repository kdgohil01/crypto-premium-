# CryptoLab MongoDB Backend Setup Guide

## Overview
This guide will help you set up the MongoDB backend for user authentication and session management.

---

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB Atlas Account** (Free tier is sufficient)
3. **Firebase Account** (for Google OAuth - optional)

---

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up for a free account
3. Verify your email address

### 1.2 Create a New Cluster
1. After logging in, click **"Build a Database"**
2. Choose **"FREE"** tier (M0 Sandbox)
3. Select your preferred **Cloud Provider** and **Region**
4. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Create Database User
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: `cryptolab_admin` (or your choice)
   - **Password**: Generate a strong password (save it!)
5. Set **Database User Privileges** to: `Read and write to any database`
6. Click **"Add User"**

### 1.4 Configure Network Access
1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, restrict to specific IPs
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **Driver**: Node.js, **Version**: 5.5 or later
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual database user password
7. Add database name after `.net/`: `cryptolab`
   
   Final format:
   ```
   mongodb+srv://cryptolab_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cryptolab?retryWrites=true&w=majority
   ```

---

## 🔐 Step 2: Configure Environment Variables

### 2.1 Server Environment Variables

Navigate to the server directory and update `.env` file:

**File Location**: `d:\Hem\crypto-premium--main\server\.env`

```env
# Server Configuration
PORT=5050
NODE_ENV=development
ALLOWED_ORIGIN=http://localhost:5173

# MongoDB Configuration
# Paste your MongoDB connection string here
MONGODB_URI=mongodb+srv://cryptolab_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cryptolab?retryWrites=true&w=majority

# JWT Configuration
# Generate a secure random string for production (use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=cryptolab_super_secret_jwt_key_change_in_production_2024
JWT_EXPIRE=30d
```

### 2.2 Frontend Environment Variables

**File Location**: `d:\Hem\crypto-premium--main\.env`

```env
# Firebase Configuration (for Google OAuth)
VITE_FIREBASE_API_KEY=AIzaSyCk531xDxG9kzFBOayFJ8VqQbrgpO_eQyM
VITE_FIREBASE_AUTH_DOMAIN=cryptolab-b8d5e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cryptolab-b8d5e
VITE_FIREBASE_STORAGE_BUCKET=cryptolab-b8d5e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=515869803623
VITE_FIREBASE_APP_ID=1:515869803623:web:49df2d09ef08dbf36880c2
VITE_FIREBASE_MEASUREMENT_ID=G-1BPQS07WR0

# Backend API URL
VITE_API_BASE=http://localhost:5050
```

---

## 📦 Step 3: Install Dependencies

### 3.1 Install Server Dependencies

Open terminal in the server directory:

```bash
cd d:\Hem\crypto-premium--main\server
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

### 3.2 Install Frontend Dependencies (if needed)

```bash
cd d:\Hem\crypto-premium--main
npm install
```

---

## 🚀 Step 4: Run the Application

### 4.1 Start the Backend Server

Open a terminal:

```bash
cd d:\Hem\crypto-premium--main\server
npm run dev
```

You should see:
```
Server running on port 5050
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
```

### 4.2 Start the Frontend

Open another terminal:

```bash
cd d:\Hem\crypto-premium--main
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🧪 Step 5: Test the Application

1. Open browser: **http://localhost:5173**
2. You should see the new login page with:
   - **Sign In** tab (email/password)
   - **Sign Up** tab (create account)
   - **Google Sign In** button

### Test Registration:
1. Click **"Sign Up"** tab
2. Enter:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123456`
3. Click **"Create Account"**
4. You should be logged in automatically

### Test Login:
1. Sign out from profile dropdown
2. Click **"Sign In"** tab
3. Enter your credentials
4. Click **"Sign In"**

---

## 🔧 API Endpoints Reference

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| POST | `/api/auth/google` | Login/register with Google | No |
| POST | `/api/auth/logout` | Logout (invalidate session) | Yes |
| GET | `/api/auth/me` | Get current user info | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user-status` | Get user plan status | Yes |
| POST | `/api/upgrade` | Upgrade to premium | Yes |

### Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Server health check | No |

---

## 🔑 Where to Paste API Keys/Secrets

### Summary Table

| Secret/Key | Where to Get It | Where to Paste It |
|------------|-----------------|-------------------|
| **MongoDB URI** | MongoDB Atlas Dashboard → Connect → Connection String | `server/.env` → `MONGODB_URI` |
| **JWT Secret** | Generate random string (see below) | `server/.env` → `JWT_SECRET` |
| **Firebase Keys** | Already configured (optional for Google OAuth) | `.env` → `VITE_FIREBASE_*` |

### Generate JWT Secret (Optional - for production)

Run this command in terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it in `server/.env` as `JWT_SECRET`

---

## 📁 File Structure

```
crypto-premium--main/
├── server/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Session.js           # Session schema
│   ├── routes/
│   │   └── auth.js              # Authentication routes
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── utils/
│   │   └── generateToken.js     # Token generation utility
│   ├── server.js                # Main server file (MongoDB)
│   ├── index.js                 # Old server file (Firebase)
│   ├── package.json
│   └── .env                     # Server environment variables
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx      # Updated auth context
│   ├── components/
│   │   ├── profile/
│   │   │   └── ProfileDropdown.tsx  # Profile dropdown component
│   │   └── layout/
│   │       └── AppLayout.tsx    # Updated layout with profile
│   ├── pages/
│   │   └── AuthLanding.tsx      # Updated login page
│   └── lib/
│       └── mongoApi.ts          # MongoDB API helper
├── .env                         # Frontend environment variables
└── SETUP_GUIDE.md              # This file
```

---

## 🐛 Troubleshooting

### Issue: "MongoServerError: bad auth"
**Solution**: Check your MongoDB username and password in the connection string

### Issue: "CORS Error"
**Solution**: Ensure `ALLOWED_ORIGIN` in `server/.env` matches your frontend URL

### Issue: "Cannot connect to MongoDB"
**Solution**: 
1. Check if IP address is whitelisted in MongoDB Atlas
2. Verify connection string is correct
3. Ensure cluster is active

### Issue: "JWT token invalid"
**Solution**: Clear browser localStorage and login again

### Issue: "Port 5050 already in use"
**Solution**: Change `PORT` in `server/.env` to another port (e.g., 5051)

---

## 🎯 Next Steps (Razorpay Integration)

For payment integration with Razorpay:

1. **Create Razorpay Account**: https://dashboard.razorpay.com/signup
2. **Get API Keys**: Dashboard → Settings → API Keys
3. **Add to `.env`**:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```
4. **Install Razorpay SDK**:
   ```bash
   cd server
   npm install razorpay
   ```

---

## ✅ Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string copied
- [ ] `server/.env` file updated with MongoDB URI
- [ ] `server/.env` file updated with JWT secret
- [ ] Server dependencies installed (`npm install`)
- [ ] Backend server running (`npm run dev`)
- [ ] Frontend running (`npm run dev`)
- [ ] Registration tested successfully
- [ ] Login tested successfully
- [ ] Profile dropdown working
- [ ] Google OAuth tested (optional)

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Check server logs for error messages
4. Ensure MongoDB Atlas cluster is active

---

**🎉 Congratulations! Your MongoDB backend is now set up and running!**
