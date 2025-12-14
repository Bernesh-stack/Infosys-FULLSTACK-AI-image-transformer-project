## Final Outcome
<img width="952" height="533" alt="Landing Page" src="https://github.com/user-attachments/assets/842dcd54-60ef-48c5-8411-5a89fa6e6968" />
<img width="959" height="498" alt="Screenshot 2025-12-06 173134" src="https://github.com/user-attachments/assets/4dcc79ce-ff32-4f62-9b23-84fc4ff4f742" />
<img width="958" height="533" alt="Login Page" src="https://github.com/user-attachments/assets/ad82174b-e99c-4f70-853e-a7d98568c6a1" />
<img width="951" height="532" alt="Home Page" src="https://github.com/user-attachments/assets/941e6a5e-b1b0-44f2-9ca4-62981b483a8c" />
<img width="553" height="536" alt="3d cartoon" src="https://github.com/user-attachments/assets/2653f0a4-b25b-4ee3-a0c9-60c2ca8ecf5c" />
<img width="948" height="533" alt="History page" src="https://github.com/user-attachments/assets/ad2e652e-48e9-49ce-be5f-4625522671a0" />
<img width="566" height="515" alt="Comic" src="https://github.com/user-attachments/assets/2bad53df-be5e-4aa6-9cec-9e954bae1217" />
<img width="575" height="511" alt="Anime style" src="https://github.com/user-attachments/assets/40d6e143-6abc-42ca-b840-a402ae180f10" />
<img width="580" height="514" alt="Oil painting" src="https://github.com/user-attachments/assets/0c102ecf-0a21-4538-93ba-d87d1628e37e" />
<img width="575" height="534" alt="Oil painting " src="https://github.com/user-attachments/assets/ad5f3789-33e4-4c2f-bc75-e2f5f6ce383e" />


STACK USED👇

# AI Image Transformer - Full Stack Application

A complete full-stack AI-powered image transformation web application with 6 artistic styles.

## 🎨 Features

- **Authentication**: Secure signup/login with JWT
- **Image Upload**: Drag-and-drop or click to upload
- **6 Transformation Styles**:
  - Pencil Sketch
  - Oil Painting
  - 2D Cartoon
  - 3D Cartoon
  - Comic Style
  - Anime Style
- **History Tracking**: View all your transformations
- **Real-time Processing**: Python-powered image transformations
- **Responsive Design**: Works on all devices

## 📁 Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # API & Auth utilities
│   │   └── hooks/         # Custom React hooks
│   └── package.json
│
└── server/                # Node.js Backend
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    ├── middleware/        # Auth middleware
    ├── transforms/        # Python transformation scripts
    ├── uploads/           # Uploaded images
    ├── outputs/           # Transformed images
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18+)
- Python 3.8+
- MongoDB

### Backend Setup

```bash
cd server
npm install
pip install -r transforms/requirements.txt
```

Create `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/ai-image-transformer
JWT_SECRET=your_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:3000
```

Start server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Start client:
```bash
npm run dev
```

## 🔧 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload)
- Python + OpenCV (image processing)

### Python Libraries
- opencv-python
- numpy
- Pillow

## 📡 API Endpoints

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

## 🎯 Usage

1. **Sign Up**: Create a new account
2. **Login**: Access your dashboard
3. **Upload Image**: Click or drag-and-drop an image
4. **Select Style**: Choose from 6 transformation styles
5. **Transform**: Click "Transform Image" button
6. **View Result**: See before/after comparison
7. **Download**: Save your transformed image
8. **History**: View all past transformations

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation

## 📝 License

MIT License

## 👨‍💻 Author

AI Image Transformer Team

