# Deployment Instructions

## Backend Deployment Options:

### Option 1: Vercel (Serverless)
1. `cd server`
2. `vercel --prod`
3. Copy the deployment URL
4. Update frontend `VITE_API_BASE` to the new URL

### Option 2: Railway (Always-on)
1. Go to railway.app
2. Connect GitHub repo
3. Deploy from `server` folder
4. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET  
   - ADMIN_KEY
   - PORT=5050

### Option 3: Render (Free tier)
1. Go to render.com
2. Connect GitHub repo
3. Create Web Service from `server` folder
4. Build Command: `npm install`
5. Start Command: `npm start`

## Frontend Environment Variables (Vercel):
```
VITE_API_BASE=https://your-backend-url
VITE_FIREBASE_API_KEY=AIzaSyCk531xDxG9kzFBOayFJ8VqQbrgpO_eQyM
VITE_FIREBASE_AUTH_DOMAIN=cryptolab-b8d5e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cryptolab-b8d5e
VITE_FIREBASE_STORAGE_BUCKET=cryptolab-b8d5e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=515869803623
VITE_FIREBASE_APP_ID=1:515869803623:web:49df2d09ef08dbf36880c2
VITE_FIREBASE_MEASUREMENT_ID=G-1BPQS07WR0
```

## Steps:
1. Deploy backend first
2. Get backend URL
3. Update frontend environment variables
4. Redeploy frontend