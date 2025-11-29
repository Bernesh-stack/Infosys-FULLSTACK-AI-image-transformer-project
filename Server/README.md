# AI Image Transformer - Backend Server

Express.js backend server with MongoDB for the AI Image Transformer application.

## Features

- 🔐 JWT Authentication (signup, login)
- 📤 Image upload with Multer
- 🎨 6 transformation styles using Sharp
- 📊 Transformation history tracking
- 🗄️ MongoDB database

## Installation

### Node.js Dependencies
```bash
cd server
npm install
```

### Python Dependencies
```bash
pip install -r transforms/requirements.txt
```

**Required Python packages:**
- opencv-python (image processing)
- numpy (numerical operations)
- Pillow (image handling)

## Environment Setup

Create a `.env` file with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-image-transformer
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

## Run Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

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

## Transformation Styles

1. Pencil Sketch
2. Oil Painting
3. 2D Cartoon
4. 3D Cartoon
5. Comic Style
6. Anime Style

## Tech Stack

- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload)
- Sharp (image processing)
- bcryptjs (password hashing)
