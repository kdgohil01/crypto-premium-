# 🚀 Deploy Backend to Fix "Cannot connect to server" Error

## 🚨 Current Issue
- ✅ Frontend: Working on `https://crypto-premium.vercel.app`
- ✅ Firebase Auth: Working
- ❌ Backend: Not deployed (trying to connect to non-existent backend)

## 🎯 Solution: Deploy Backend to Vercel

### Step 1: Deploy Backend
1. **Create new Vercel project for backend:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from Git or upload the `server` folder

2. **Use these files (I've prepared them):**
   - ✅ `server/index.js` - Complete backend
   - ✅ `server/package.json` - Dependencies
   - ✅ `server/vercel.json` - Vercel config

### Step 2: Set Environment Variables in Backend Vercel Project
```env
MONGODB_URI=mongodb+srv://cryptolab_user:CryptoLab2024@crypto-stego-lab.wqgzy8x.mongodb.net/cryptolab?retryWrites=true&w=majority&appName=crypto-stego-lab
JWT_SECRET=cryptolab_super_secret_jwt_key_change_in_production_2024
JWT_EXPIRE=30d
ADMIN_KEY=admin_secret_key_2024
ALLOWED_ORIGIN=https://crypto-premium.vercel.app
NODE_ENV=production
```

### Step 3: Get Backend URL
After deployment, you'll get a URL like:
`https://crypto-premium-backend-xyz.vercel.app`

### Step 4: Update Frontend Environment Variable
In your **frontend** Vercel project settings, update:
```env
VITE_API_BASE=https://your-actual-backend-url.vercel.app
```

### Step 5: Redeploy Frontend
After updating the environment variable, redeploy the frontend.

## 🧪 Test the Connection

1. **Test backend health:**
   ```
   GET https://your-backend-url.vercel.app/api/health
   ```
   Should return: `{"success": true, "message": "Server is running"}`

2. **Test on frontend:**
   - Go to `https://crypto-premium.vercel.app`
   - Try Google Sign-in
   - Should work without "Cannot connect to server" error

## 🔧 Alternative: Quick Backend URL Update

If you want to use a different backend service:

1. **Railway.app** (Recommended for always-on):
   - Deploy the `server` folder to Railway
   - Get the Railway URL
   - Update `VITE_API_BASE` in frontend

2. **Render.com** (Free tier):
   - Deploy as Web Service
   - Use the same environment variables

## 📋 Deployment Checklist

- [ ] Deploy backend to Vercel (or Railway/Render)
- [ ] Set all environment variables in backend
- [ ] Get backend URL
- [ ] Update `VITE_API_BASE` in frontend Vercel project
- [ ] Redeploy frontend
- [ ] Test health endpoint
- [ ] Test Google Sign-in on production

## 🆘 If Still Having Issues

1. **Check backend logs** in Vercel dashboard
2. **Verify MongoDB connection** - ensure IP whitelist includes 0.0.0.0/0
3. **Test API endpoints** individually
4. **Check CORS settings** - ensure frontend domain is allowed

## 🎉 Expected Result

After deployment:
- ✅ Frontend: `https://crypto-premium.vercel.app`
- ✅ Backend: `https://your-backend-url.vercel.app`
- ✅ Google Auth: Working
- ✅ User registration/login: Working
- ✅ MongoDB: Connected and storing users

The "Cannot connect to server" error will be resolved!