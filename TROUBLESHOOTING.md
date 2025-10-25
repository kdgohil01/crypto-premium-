# 🔧 Troubleshooting Guide

## Current Status

✅ **Backend Server**: Running on port 5050  
✅ **MongoDB**: Connection string configured  
✅ **Frontend .env**: Updated with VITE_API_BASE  
✅ **Error Handling**: Improved with specific messages  

---

## 🚀 How to Start Everything

### Step 1: Start Backend Server

Open Terminal 1:
```bash
cd d:\Hem\crypto-premium--main\server
node server.js
```

**Expected output:**
```
Server running on port 5050
MongoDB Connected: crypto-stego-lab-shard-00-00.wqgzy8x.mongodb.net
```

### Step 2: Start Frontend

Open Terminal 2:
```bash
cd d:\Hem\crypto-premium--main
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 3: Open Browser

Go to: **http://localhost:5173**

---

## 🧪 Test Backend Connection

### Option 1: Use Test HTML File

1. Open: `d:\Hem\crypto-premium--main\test-backend.html` in browser
2. Click "Test Health" - should show: `{"success": true, "message": "Server is running"}`
3. Click "Test Register" - should create a new user
4. Click "Test Login" - should login the user

### Option 2: Check Browser Console

1. Open browser at http://localhost:5173
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Try to sign up/sign in
5. Look for `[API]` logs showing requests and responses

---

## ✅ Error Messages Explained

### "User already registered. Please sign in instead."
- **Cause**: Email already exists in database
- **Solution**: Use Sign In tab instead of Sign Up

### "Account not found. Please sign up first."
- **Cause**: Email doesn't exist in database
- **Solution**: Use Sign Up tab to create account first

### "Cannot connect to server. Please check if backend is running."
- **Cause**: Backend server is not running or wrong port
- **Solution**: 
  1. Check if server is running on port 5050
  2. Run: `cd server && node server.js`

### "Invalid email or password"
- **Cause**: Wrong credentials
- **Solution**: Check email and password are correct

### Google Sign-In Errors

#### "Sign-in cancelled"
- **Cause**: User closed the Google popup
- **Solution**: Try again and complete the sign-in

#### "Popup blocked"
- **Cause**: Browser blocked the popup
- **Solution**: Allow popups for localhost:5173

---

## 🔍 Debugging Steps

### 1. Check if Backend is Running

```bash
# Check if port 5050 is listening
netstat -ano | findstr :5050
```

Should show: `LISTENING` on port 5050

### 2. Check MongoDB Connection

Look at server terminal for:
```
MongoDB Connected: crypto-stego-lab-shard-00-00.wqgzy8x.mongodb.net
```

If you see "bad auth" error:
- Username or password is wrong in `server/.env`
- Go to MongoDB Atlas → Database Access → Verify credentials

### 3. Check Frontend Environment

File: `d:\Hem\crypto-premium--main\.env`

Must have:
```env
VITE_API_BASE=http://localhost:5050
```

**Important**: After changing `.env`, you MUST restart the frontend!

### 4. Check Browser Console

Press F12 → Console tab

Look for:
- `[API]` logs showing requests
- Any red error messages
- Network tab showing requests to localhost:5050

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to fetch"

**Causes:**
1. Backend not running
2. Wrong port
3. CORS issue
4. Frontend .env not loaded

**Solutions:**
1. Start backend: `cd server && node server.js`
2. Check port 5050 is free
3. Restart frontend after changing .env
4. Check browser console for actual error

### Issue: Google Sign-In Not Working

**Causes:**
1. Firebase not configured
2. Backend not receiving request
3. MongoDB connection issue

**Solutions:**
1. Check Firebase keys in `.env`
2. Check browser console for errors
3. Verify backend is running
4. Check MongoDB connection string

### Issue: Sign Up/Sign In Not Working

**Causes:**
1. Backend not connected to MongoDB
2. Wrong API endpoint
3. CORS issue

**Solutions:**
1. Check MongoDB connection in server logs
2. Verify `VITE_API_BASE=http://localhost:5050` in `.env`
3. Restart frontend after env changes
4. Check browser console for errors

---

## 📋 Verification Checklist

Before testing, verify:

- [ ] Backend server running (`node server.js` in server folder)
- [ ] MongoDB connection successful (check server logs)
- [ ] Frontend running (`npm run dev` in main folder)
- [ ] `.env` has `VITE_API_BASE=http://localhost:5050`
- [ ] Frontend restarted after `.env` changes
- [ ] Browser at http://localhost:5173
- [ ] Browser console open (F12) to see logs

---

## 🎯 Expected Behavior

### Sign Up (New User):
1. Enter name, email, password
2. Click "Create Account"
3. Should see: "Account created successfully!"
4. Automatically logged in
5. Redirected to main app

### Sign Up (Existing User):
1. Enter email that already exists
2. Click "Create Account"
3. Should see: "User already registered. Please sign in instead."

### Sign In (Existing User):
1. Enter email and password
2. Click "Sign In"
3. Should see: "Signed in successfully!"
4. Redirected to main app

### Sign In (Non-existent User):
1. Enter email that doesn't exist
2. Click "Sign In"
3. Should see: "Account not found. Please sign up first."

### Google Sign-In:
1. Click "Continue with Google"
2. Select Google account
3. Should see: "Signed in with Google successfully!"
4. Redirected to main app

---

## 📞 Still Having Issues?

1. **Check server logs** in Terminal 1
2. **Check browser console** (F12 → Console)
3. **Use test-backend.html** to verify backend is working
4. **Verify MongoDB Atlas** - Database Access → User exists
5. **Check Network tab** in browser DevTools to see actual requests

---

## 🔑 Quick Reference

| Component | Location | Command |
|-----------|----------|---------|
| Backend | `server/` | `node server.js` |
| Frontend | Root | `npm run dev` |
| Backend .env | `server/.env` | MongoDB URI, JWT secret |
| Frontend .env | `.env` | VITE_API_BASE, Firebase keys |
| Test File | `test-backend.html` | Open in browser |

---

**Remember**: Always restart the frontend after changing `.env` files!
