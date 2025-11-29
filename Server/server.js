const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static folders for images (with CORS headers)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*')
  }
}))
app.use('/outputs', express.static(path.join(__dirname, 'outputs'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*')
  }
}))

// Create directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads')
const outputsDir = path.join(__dirname, 'outputs')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir, { recursive: true })
}

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/image', require('./routes/image'))
app.use('/api/history', require('./routes/history'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err))


// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
