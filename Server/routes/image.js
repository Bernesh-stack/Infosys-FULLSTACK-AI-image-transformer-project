const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const auth = require('../middleware/auth')
const History = require('../models/History')

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

// Python transformation scripts mapping
const transformScripts = {
  'Pencil Sketch': 'pencil',
  'Oil Painting': 'oil',
  '2D Cartoon': 'cartoon2d',
  '3D Cartoon': 'cartoon3d',
  'Comic Style': 'comic',
  'Anime Style': 'anime'
}

// Execute Python transformation
const executePythonTransform = (scriptName, inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const absoluteInputPath = path.resolve(inputPath)
    const absoluteOutputPath = path.resolve(outputPath)
    
    const python = spawn('python', [
      '-m', `transforms.${scriptName}`,
      absoluteInputPath,
      absoluteOutputPath
    ], {
      cwd: __dirname + '/..',
      timeout: 60000 // 60 second timeout
    })

    let errorOutput = ''
    let stdOutput = ''

    python.stdout.on('data', (data) => {
      stdOutput += data.toString()
    })

    python.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    python.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Python script failed (code ${code}): ${errorOutput || stdOutput}`))
      }
    })

    python.on('error', (err) => {
      reject(new Error(`Failed to start Python process: ${err.message}`))
    })
  })
}

// @route   POST /api/image/transform
// @desc    Transform uploaded image using Python scripts
// @access  Private
router.post('/transform', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' })
    }

    const { style } = req.body

    if (!style || !transformScripts[style]) {
      return res.status(400).json({ message: 'Invalid transformation style' })
    }

    const inputPath = req.file.path
    const outputFilename = `transformed-${Date.now()}-${req.file.filename}`
    const outputPath = path.join('outputs', outputFilename)

    // Execute Python transformation
    const scriptName = transformScripts[style]
    await executePythonTransform(scriptName, inputPath, outputPath)

    // Save to history
    const history = new History({
      userId: req.user._id,
      originalImage: req.file.filename,
      transformedImage: outputFilename,
      style
    })
    await history.save()

    res.json({
      message: 'Image transformed successfully',
      originalImage: `/uploads/${req.file.filename}`,
      transformedImage: `/outputs/${outputFilename}`,
      style,
      historyId: history._id
    })
  } catch (error) {
    console.error('Transform error:', error)
    res.status(500).json({ message: 'Error transforming image', error: error.message })
  }
})

module.exports = router
