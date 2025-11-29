# 🚀 Quick Reference Card

## ⚡ Quick Start (3 Steps)

```bash
# 1. Install everything
install-all.bat

# 2. Configure .env files
# Edit server/.env and client/.env

# 3. Start servers
start-dev.bat
```

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API:** http://localhost:5000/api

## 📁 Key Files

### Frontend
```
client/src/lib/api.js       → All API calls
client/src/lib/auth.js      → Token management
client/src/pages/Dashboard.jsx → Main app logic
client/.env                 → API URL config
```

### Backend
```
server/server.js            → Main server
server/routes/image.js      → Transform logic
server/models/User.js       → User schema
server/.env                 → Database config
```

## 🔑 Environment Variables

### server/.env
```env
MONGODB_URI=mongodb://localhost:27017/ai-image-transformer
JWT_SECRET=your_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:3000
```

### client/.env
```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

```
POST   /api/auth/signup          Sign up
POST   /api/auth/login           Login
GET    /api/auth/me              Get user (protected)
POST   /api/image/transform      Transform (protected)
GET    /api/history              Get history (protected)
```

## 🎨 Transformation Styles

1. **Pencil Sketch** → `transforms/pencil.py`
2. **Oil Painting** → `transforms/oil.py`
3. **2D Cartoon** → `transforms/cartoon2d.py`
4. **3D Cartoon** → `transforms/cartoon3d.py`
5. **Comic Style** → `transforms/comic.py`
6. **Anime Style** → `transforms/anime.py`

## 🐛 Common Issues

### MongoDB not connecting
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Python not found
```javascript
// In server/routes/image.js, change:
spawn('python', [...])
// to:
spawn('python3', [...])
```

### Port already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS errors
- Check `CLIENT_URL` in `server/.env`
- Restart both servers

## 🔧 Useful Commands

### Development
```bash
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

### Build
```bash
# Frontend
cd client && npm run build
```

### Database
```bash
# Connect to MongoDB
mongosh

# View databases
show dbs

# Use database
use ai-image-transformer

# View collections
show collections

# View users
db.users.find()

# View history
db.histories.find()
```

### Python
```bash
# Test transformation
cd server
python -m transforms.pencil input.jpg output.jpg

# Check installed packages
pip list | grep opencv
```

## 📊 Project Structure (Simplified)

```
AI tranformer/
├── client/              Frontend (React)
│   ├── src/pages/      Pages
│   ├── src/components/ Components
│   └── src/lib/        API & Auth
│
└── server/             Backend (Node.js)
    ├── models/         MongoDB models
    ├── routes/         API routes
    ├── transforms/     Python scripts
    ├── uploads/        Input images
    └── outputs/        Output images
```

## 🎯 Testing Flow

1. **Sign Up** → http://localhost:3000/signup
2. **Login** → http://localhost:3000/login
3. **Upload** → Dashboard → Click/drag image
4. **Select** → Click transformation style
5. **Transform** → Click "Transform Image"
6. **View** → See before/after
7. **History** → Click "History" in navbar

## 🔒 Security Notes

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens expire in 7 days
- Protected routes require authentication
- File size limit: 10MB
- Allowed formats: JPG, PNG, WEBP

## 📦 Dependencies (Key)

### Frontend
- react, react-dom, react-router-dom
- framer-motion (animations)
- axios (API calls)
- tailwindcss (styling)

### Backend
- express (server)
- mongoose (MongoDB)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- multer (file upload)

### Python
- opencv-python (image processing)
- numpy (arrays)
- Pillow (image handling)

## 🚨 Emergency Fixes

### Clear everything and restart
```bash
# Stop all servers (Ctrl+C)

# Clear node_modules
cd client && rmdir /s /q node_modules
cd server && rmdir /s /q node_modules

# Reinstall
cd client && npm install
cd server && npm install

# Restart
start-dev.bat
```

### Reset database
```bash
mongosh
use ai-image-transformer
db.dropDatabase()
```

### Clear browser data
- Open DevTools (F12)
- Application → Local Storage → Clear
- Hard refresh (Ctrl+Shift+R)

## 📞 Help Resources

- **Setup Guide:** SETUP_GUIDE.md
- **Deployment:** DEPLOYMENT.md
- **Verification:** VERIFICATION_CHECKLIST.md
- **Full Summary:** PROJECT_SUMMARY.md

## ✅ Success Indicators

- ✅ No errors in console
- ✅ "MongoDB Connected" in server
- ✅ Can sign up and login
- ✅ Can upload and transform images
- ✅ Can view history
- ✅ Images display correctly

## 🎉 You're Ready!

If all success indicators are ✅, your application is fully functional!

---

**Quick Tip:** Keep this file open while developing for quick reference!
