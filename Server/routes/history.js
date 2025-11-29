const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const History = require('../models/History')

// @route   GET /api/history
// @desc    Get user's transformation history
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)

    const formattedHistory = history.map(item => ({
      id: item._id,
      originalImage: `/uploads/${item.originalImage}`,
      transformedImage: `/outputs/${item.transformedImage}`,
      style: item.style,
      createdAt: item.createdAt
    }))

    res.json({ history: formattedHistory })
  } catch (error) {
    console.error('Get history error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/history/:id
// @desc    Get single history item
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const history = await History.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!history) {
      return res.status(404).json({ message: 'History item not found' })
    }

    res.json({
      id: history._id,
      originalImage: `/uploads/${history.originalImage}`,
      transformedImage: `/outputs/${history.transformedImage}`,
      style: history.style,
      createdAt: history.createdAt
    })
  } catch (error) {
    console.error('Get history item error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   DELETE /api/history/:id
// @desc    Delete history item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const history = await History.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!history) {
      return res.status(404).json({ message: 'History item not found' })
    }

    res.json({ message: 'History item deleted successfully' })
  } catch (error) {
    console.error('Delete history error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
