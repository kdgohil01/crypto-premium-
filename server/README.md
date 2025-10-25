# CryptoLab Backend Server

MongoDB-based authentication and user management backend for CryptoLab.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create/update `.env` file:

```env
# Server Configuration
PORT=5050
NODE_ENV=development
ALLOWED_ORIGIN=http://localhost:5173

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
```

### 3. Run Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

**Firebase Server (old):**
```bash
npm run start:firebase
```

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Google OAuth
```http
POST /api/auth/google
Content-Type: application/json

{
  "email": "john@example.com",
  "name": "John Doe",
  "picture": "https://...",
  "googleId": "google_user_id"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### User Management

#### Get User Status
```http
GET /api/user-status
Authorization: Bearer <token>
```

#### Upgrade to Premium
```http
POST /api/upgrade
Authorization: Bearer <token>
```

### Health Check

```http
GET /api/health
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  picture: String,
  plan: String (free/premium),
  googleId: String,
  authProvider: String (local/google),
  createdAt: Date,
  upgradedAt: Date
}
```

### Session Model
```javascript
{
  userId: ObjectId,
  token: String (unique),
  expiresAt: Date,
  createdAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Session Management**: Tokens stored in MongoDB
- **CORS Protection**: Configured origins
- **Input Validation**: Email and password validation
- **Automatic Session Cleanup**: Expired sessions auto-deleted

## 📁 Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── User.js              # User schema
│   └── Session.js           # Session schema
├── routes/
│   ├── auth.js              # Authentication routes
│   └── premium.js           # Premium features (old)
├── middleware/
│   └── auth.js              # JWT authentication
├── utils/
│   └── generateToken.js     # Token generation
├── server.js                # Main server (MongoDB)
├── index.js                 # Old server (Firebase)
├── package.json
├── .env                     # Environment variables
└── .env.example             # Environment template
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5050) |
| `NODE_ENV` | Environment | No (default: development) |
| `ALLOWED_ORIGIN` | CORS origin | No (default: http://localhost:5173) |
| `MONGODB_URI` | MongoDB connection string | **Yes** |
| `JWT_SECRET` | JWT signing secret | **Yes** |
| `JWT_EXPIRE` | Token expiration | No (default: 30d) |

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check if MongoDB URI is correct
- Verify IP whitelist in MongoDB Atlas
- Ensure cluster is active

### JWT Token Invalid
- Check if JWT_SECRET is set
- Verify token format in Authorization header
- Clear browser localStorage and login again

### CORS Errors
- Verify ALLOWED_ORIGIN matches frontend URL
- Check if credentials are included in requests

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **firebase-admin**: Firebase integration (optional)

## 🔄 Migration from Firebase

The old Firebase-based server is still available:
```bash
npm run start:firebase
```

New MongoDB server is the default:
```bash
npm run dev
```

## 📝 Notes

- Sessions expire after 30 days by default
- Expired sessions are automatically cleaned up by MongoDB TTL index
- Passwords are hashed with bcrypt (10 salt rounds)
- JWT tokens are stored in MongoDB for session management

## 🎯 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Rate limiting
- [ ] Refresh tokens
- [ ] Admin panel
- [ ] Razorpay payment integration

---

**For detailed setup instructions, see the main SETUP_GUIDE.md in the project root.**
