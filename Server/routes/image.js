const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const auth = require('../middleware/auth')
const History = require('../models/History')
const { transform } = require('../transforms/advancedTransforms')

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// Supported transformation styles
const transformStyles = [
  'Pencil Sketch',
  'Oil Painting',
  '2D Cartoon',
  '3D Cartoon',
  'Comic Style',
  'Anime Style'
]

// @route   POST /api/image/transform
// @desc    Transform uploaded image using Python scripts
// @access  Private
// Fix: Enhanced error handling with detailed logging and proper status codes
router.post('/transform', auth, upload.single('image'), async (req, res) => {
  let uploadedFilePath = null
  
  try {
    console.log('📸 Transform request received')
    console.log('   User:', req.user?._id)
    console.log('   File:', req.file ? req.file.filename : 'NONE')
    console.log('   Style:', req.body?.style)
    
    if (!req.file) {
      console.error('❌ No file uploaded')
      return res.status(400).json({ 
        message: 'No image file uploaded',
        hint: 'Ensure the form field name is "image"'
      })
    }

    uploadedFilePath = req.file.path
    const { style } = req.body

    if (!style) {
      console.error('❌ No style provided')
      return res.status(400).json({ 
        message: 'Transformation style is required',
        hint: 'Include "style" in request body'
      })
    }

    if (!transformStyles.includes(style)) {
      console.error(`❌ Invalid style: ${style}`)
      return res.status(400).json({ 
        message: 'Invalid transformation style',
        hint: `Valid styles: ${transformStyles.join(', ')}`
      })
    }

    const inputPath = req.file.path
    const outputFilename = `transformed-${Date.now()}-${req.file.filename}`
    const outputPath = path.join('outputs', outputFilename)

    // Execute Node.js transformation using Sharp library
    try {
      await transform(style, inputPath, outputPath)
    } catch (transformError) {
      console.error('❌ Transformation failed:', transformError.message)
      return res.status(503).json({ 
        message: 'Image transformation failed',
        error: transformError.message,
        hint: 'The image processing library encountered an error. Try a different image or style.'
      })
    }

    // Save to history
    const history = new History({
      userId: req.user._id,
      originalImage: req.file.filename,
      transformedImage: outputFilename,
      style
    })
    await history.save()

    console.log('✅ Transform completed and saved to history')
    res.json({
      message: 'Image transformed successfully',
      originalImage: `/uploads/${req.file.filename}`,
      transformedImage: `/outputs/${outputFilename}`,
      style,
      historyId: history._id
    })
  } catch (error) {
    console.error('❌ Transform error:', error.stack)
    
    // Clean up uploaded file on error
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      try {
        fs.unlinkSync(uploadedFilePath)
        console.log('🗑️  Cleaned up uploaded file after error')
      } catch (cleanupErr) {
        console.error('⚠️  Could not clean up file:', cleanupErr.message)
      }
    }
    
    res.status(500).json({ 
      message: 'Error transforming image', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
})

module.exports = router
