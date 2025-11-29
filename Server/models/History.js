const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalImage: {
    type: String,
    required: true
  },
  transformedImage: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true,
    enum: ['Pencil Sketch', 'Oil Painting', '2D Cartoon', '3D Cartoon', 'Comic Style', 'Anime Style']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('History', historySchema)
