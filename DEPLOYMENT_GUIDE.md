# Backend Deployment Guide for Crypto Premium

## Quick Deploy to Vercel (Recommended)

### Option 1: Using the CommonJS Version (Easier)

1. **Create a new Vercel project for backend:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from Git or upload the `server` folder

2. **Use these files:**
   - Rename `server-commonjs.js` to `index.js`
   - Rename `package-commonjs.json` to `package.json`
   - Rename `vercel-commonjs.json` to `vercel.json`

3. **Set Environment Variables in Vercel:**
   ```
   MONGODB_URI=mongodb+srv://cryptolab_user:CryptoLab2024@crypto-stego-lab.wqgzy8x.mongodb.net/cryptolab?retryWrites=true&w=majority&appName=crypto-stego-lab
   JWT_SECRET=cryptolab_super_secret_jwt_key_change_in_production_2024
   JWT_EXPIRE=30d
   ADMIN_KEY=admin_secret_key_2024
   ALLOWED_ORIGIN=https://crypto-premium.vercel.app
   NODE_ENV=production
   ```

4. **Deploy and get the backend URL**

### Option 2: Using Railway (Alternative)

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Deploy from `server` folder
4. Add the same environment variables

## After Backend Deployment

1. **Get your backend URL** (e.g., `https://crypto-backend-xyz.vercel.app`)

2. **Update Frontend Environment Variables:**
   In your Vercel frontend project settings, add:
   ```
   VITE_API_BASE=https://your-backend-url.vercel.app
   ```

3. **Redeploy frontend** to apply the new backend URL

## Testing the Connection

After deployment, test these endpoints:
- `GET https://your-backend-url.vercel.app/api/health`
- Should return: `{"success": true, "message": "Server is running"}`

## Admin Panel Usage

To update user plans:
```bash
curl -X PUT https://your-backend-url.vercel.app/api/admin/users/hemp12721@gmail.com/plan \
  -H "Content-Type: application/json" \
  -H "x-admin-key: admin_secret_key_2024" \
  -d '{"plan": "pro"}'
```

## Current Frontend URL
✅ **Frontend:** https://crypto-premium.vercel.app
🔄 **Backend:** Need to deploy and update

## Files Ready for Deployment:
- ✅ `server-commonjs.js` - Complete backend in CommonJS
- ✅ `package-commonjs.json` - Dependencies
- ✅ `vercel-commonjs.json` - Vercel config
- ✅ CORS configured for `https://crypto-premium.vercel.app`
- ✅ All routes and authentication ready