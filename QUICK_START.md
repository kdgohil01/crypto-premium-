# 🚀 Quick Start Guide

## Minimum Setup to Get Running

### 1. Get MongoDB Connection String (5 minutes)

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Create free account
3. Create a cluster (FREE tier)
4. Create database user (save username & password!)
5. Allow access from anywhere (Network Access → Add IP → 0.0.0.0/0)
6. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the string
   - Replace `<password>` with your actual password
   - Add `/cryptolab` after `.net`

Example:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/cryptolab?retryWrites=true&w=majority
```

### 2. Update Server .env File

**File**: `d:\Hem\crypto-premium--main\server\.env`

Replace this line:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cryptolab?retryWrites=true&w=majority
```

With your actual connection string from step 1.

### 3. Install & Run

```bash
# Install server dependencies
cd d:\Hem\crypto-premium--main\server
npm install

# Start server (keep this terminal open)
npm run dev
```

Open a NEW terminal:

```bash
# Start frontend
cd d:\Hem\crypto-premium--main
npm run dev
```

### 4. Test It!

1. Open: **http://localhost:5173**
2. Click "Sign Up" tab
3. Create an account
4. You're in! 🎉

---

## That's It!

**Only 1 secret needed**: MongoDB connection string

**Where to paste it**: `server/.env` → `MONGODB_URI` line

---

## Optional: Change JWT Secret (Recommended for Production)

Generate a secure random string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste the output in `server/.env` → `JWT_SECRET` line

---

## Need Help?

See the full **SETUP_GUIDE.md** for detailed instructions and troubleshooting.
