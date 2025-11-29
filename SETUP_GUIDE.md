# 🚀 AI Image Transformer - Complete Setup Guide

## ✅ Prerequisites

Before starting, ensure you have:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **Python** 3.8 or higher ([Download](https://www.python.org/downloads/))
- **MongoDB** installed and running ([Download](https://www.mongodb.com/try/download/community))
  - OR use MongoDB Atlas (cloud database)

## 📦 Installation Steps

### Step 1: Clone/Download the Project

```bash
cd "AI tranformer"
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r transforms/requirements.txt
```

**Configure Environment Variables:**

Edit `server/.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/ai-image-transformer
JWT_SECRET=your_super_secret_jwt_key_here_change_this
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**If using MongoDB Atlas:**
Replace `MONGODB_URI` with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-transformer
```

### Step 3: Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install
```

**Configure Environment Variables:**

Edit `client/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Running the Application

### Start Backend Server

```bash
# From server directory
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

### Start Frontend

Open a **new terminal** window:

```bash
# From client directory
cd client
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:3000/
```

## 🌐 Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🧪 Testing the Application

### 1. Sign Up
- Click "Sign Up" button
- Fill in: Name, Email, Password
- Click "Create Account"
- You'll be redirected to Dashboard

### 2. Transform an Image
- Click or drag-and-drop an image
- Select a transformation style (Pencil Sketch, Oil Painting, etc.)
- Click "Transform Image ✨"
- Wait for processing (10-30 seconds)
- View before/after comparison
- Download the result

### 3. View History
- Click "History" in navigation
- See all your past transformations
- Click on any image to view details

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```
2. Or use MongoDB Atlas (cloud) instead

### Python Script Error

**Error:** `Python script failed` or `python: command not found`

**Solution:**
1. Verify Python is installed:
   ```bash
   python --version
   # or
   python3 --version
   ```

2. If using `python3`, update `server/routes/image.js`:
   ```javascript
   const python = spawn('python3', [  // Change 'python' to 'python3'
   ```

3. Reinstall Python dependencies:
   ```bash
   cd server
   pip install -r transforms/requirements.txt
   ```

### OpenCV Installation Issues

**Error:** `ImportError: No module named 'cv2'`

**Solution:**
```bash
pip uninstall opencv-python
pip install opencv-python==4.8.1.78
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
1. Kill the process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

2. Or change the port in `server/.env`:
   ```env
   PORT=5001
   ```
   And update `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

### CORS Errors

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
1. Verify `CLIENT_URL` in `server/.env` matches your frontend URL
2. Restart both servers

### Image Upload Fails

**Error:** `No image file uploaded` or `Multer error`

**Solution:**
1. Check `server/uploads/` and `server/outputs/` directories exist
2. Verify file size is under 10MB
3. Ensure file format is JPG, PNG, or WEBP

## 📁 Project Structure

```
AI tranformer/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── HistoryPage.jsx
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── NeonButton.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   ├── FloatingShape.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── lib/              # Utilities
│   │   │   ├── api.js        # API calls
│   │   │   └── auth.js       # Auth helpers
│   │   ├── hooks/            # Custom hooks
│   │   │   └── useAuth.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
└── server/                    # Node.js Backend
    ├── models/               # MongoDB models
    │   ├── User.js
    │   └── History.js
    ├── routes/               # API routes
    │   ├── auth.js
    │   ├── image.js
    │   └── history.js
    ├── middleware/           # Middleware
    │   └── auth.js
    ├── transforms/           # Python scripts
    │   ├── pencil.py
    │   ├── oil.py
    │   ├── cartoon2d.py
    │   ├── cartoon3d.py
    │   ├── comic.py
    │   ├── anime.py
    │   ├── utils.py
    │   └── requirements.txt
    ├── uploads/              # Uploaded images
    ├── outputs/              # Transformed images
    ├── server.js
    ├── .env
    └── package.json
```

## 🎨 Features

✅ **Authentication**
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes

✅ **Image Transformation**
- 6 artistic styles powered by Python + OpenCV
- Real-time processing
- Before/after comparison

✅ **History Tracking**
- MongoDB storage
- User-specific history
- Timestamp tracking

✅ **Modern UI**
- 3D glassmorphism design
- Smooth animations with Framer Motion
- Fully responsive
- Dark theme with neon accents

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Image Transformation
- `POST /api/image/transform` - Upload and transform image (protected)

### History
- `GET /api/history` - Get user's transformation history (protected)
- `GET /api/history/:id` - Get single history item (protected)
- `DELETE /api/history/:id` - Delete history item (protected)

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt (10 rounds)
- Protected API routes
- CORS configuration
- Input validation
- File type validation
- File size limits (10MB)

## 🎯 Next Steps

1. **Customize Styles**: Modify Python scripts in `server/transforms/`
2. **Add More Features**: Implement batch processing, filters, etc.
3. **Deploy**: Use Vercel (frontend) + Render/Railway (backend)
4. **Optimize**: Add image compression, caching, CDN

## 💡 Tips

- Keep MongoDB running while using the app
- Clear browser cache if you see old data
- Check console logs for debugging
- Use Chrome DevTools Network tab to inspect API calls

## 🆘 Need Help?

If you encounter issues:
1. Check the console logs (both frontend and backend)
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Make sure MongoDB is running
5. Check Python and OpenCV are properly installed

## 🎉 Success!

If everything is working:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ MongoDB connected
- ✅ Python transformations working
- ✅ You can sign up, login, and transform images!

Enjoy transforming your images! 🚀
