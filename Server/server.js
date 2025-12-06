const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

// Fix: Load dotenv explicitly and validate critical env vars
dotenv.config()

if (!process.env.MONGO_URI) {
  console.error('❌ FATAL: MONGO_URI environment variable is not set in .env file')
  process.exit(1)
}

if (!process.env.JWT_SECRET) {
  console.error('⚠️  WARNING: JWT_SECRET not set, using default (insecure for production)')
}

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

// Fix: Create directories with error handling and logging
const uploadsDir = path.join(__dirname, 'uploads')
const outputsDir = path.join(__dirname, 'outputs')

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
    console.log('✅ Created uploads directory')
  }
  if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir, { recursive: true })
    console.log('✅ Created outputs directory')
  }
} catch (err) {
  console.error('❌ FATAL: Could not create required directories:', err.message)
  process.exit(1)
}

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/image', require('./routes/image'))
app.use('/api/history', require('./routes/history'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Fix: Add global error handler for unhandled errors
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.stack)
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

// MongoDB Connection with better error handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message)
    console.error('   Check your MONGO_URI in .env and ensure MongoDB is running')
    process.exit(1)
  })

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📁 Uploads directory: ${uploadsDir}`)
  console.log(`📁 Outputs directory: ${outputsDir}`)
})
