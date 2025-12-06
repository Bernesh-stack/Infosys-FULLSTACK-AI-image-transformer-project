// Advanced image transformations with distinct visual styles
// Uses Sharp library with advanced algorithms for dramatic effects
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

/**
 * Pencil Sketch - Realistic hand-drawn pencil effect
 * Creates grayscale sketch with visible pencil strokes
 */
async function pencilSketch(inputPath, outputPath) {
  try {
    console.log('🎨 Creating pencil sketch effect...')
    
    // Create dramatic pencil sketch effect
    await sharp(inputPath)
      .grayscale() // Convert to black and white
      .normalize() // Enhance contrast
      .sharpen({ sigma: 5 }) // Strong edge detection
      .linear(2.0, -(128 * 1.0)) // Very high contrast for sketch lines
      .negate() // Invert to get dark lines on white
      .blur(0.3) // Slight blur for pencil texture
      .negate() // Invert back
      .threshold(180) // Create strong sketch lines
      .toFile(outputPath)
    
    console.log('✅ Pencil sketch completed')
    return true
  } catch (error) {
    console.error('❌ Pencil sketch error:', error.message)
    console.error('Stack:', error.stack)
    throw error
  }
}

/**
 * Oil Painting - Thick brush strokes and rich colors
 * Simulates traditional oil painting on canvas
 */
async function oilPainting(inputPath, outputPath) {
  try {
    console.log('🎨 Creating oil painting effect...')
    
    // Create oil painting with heavy blur and rich colors
    await sharp(inputPath)
      .modulate({
        brightness: 1.2,
        saturation: 2.5, // Very high saturation for rich colors
        hue: 10 // Warm tone shift
      })
      .blur(6) // Heavy blur for brush strokes
      .sharpen({ sigma: 1.5 }) // Sharpen edges slightly
      .median(5) // Reduce to painterly effect
      .toFile(outputPath)
    
    console.log('✅ Oil painting completed')
    return true
  } catch (error) {
    console.error('❌ Oil painting error:', error.message)
    console.error('Stack:', error.stack)
    throw error
  }
}

/**
 * 2D Cartoon - Flat colors with bold outlines
 * Classic animation cel-shading style
 */
async function cartoon2D(inputPath, outputPath) {
  try {
    console.log('🎨 Creating 2D cartoon effect...')
    
    // Create flat cartoon with posterization effect
    await sharp(inputPath)
      .modulate({
        brightness: 1.4,
        saturation: 3.0, // Maximum saturation for bold colors
        hue: 0
      })
      .sharpen({ sigma: 8 }) // Very sharp edges
      .normalize() // Enhance contrast
      .linear(1.8, -(128 * 0.8)) // Very high contrast for flat look
      .median(3) // Reduce colors for flat areas
      .toFile(outputPath)
    
    console.log('✅ 2D Cartoon completed')
    return true
  } catch (error) {
    console.error('❌ 2D Cartoon error:', error.message)
    console.error('Stack:', error.stack)
    throw error
  }
}

/**
 * 3D Cartoon - Pixar/Disney style with depth
 * Smooth gradients and vibrant colors
 */
async function cartoon3D(inputPath, outputPath) {
  try {
    console.log('🎨 Creating 3D cartoon effect...')
    
    // Create smooth 3D cartoon with gradients
    await sharp(inputPath)
      .modulate({
        brightness: 1.35,
        saturation: 2.2, // High saturation for vibrant look
        hue: -5 // Slight cool tone
      })
      .blur(1.5) // Smooth for 3D effect
      .sharpen({ sigma: 2.5 }) // Moderate sharpening
      .normalize()
      .linear(1.4, -(128 * 0.35)) // Medium-high contrast
      .toFile(outputPath)
    
    console.log('✅ 3D Cartoon completed')
    return true
  } catch (error) {
    console.error('❌ 3D Cartoon error:', error.message)
    console.error('Stack:', error.stack)
    throw error
  }
}

/**
 * Comic Style - Bold halftone and high contrast
 * Classic comic book print style
 */
async function comicStyle(inputPath, outputPath) {
  try {
    console.log('🎨 Creating comic book effect...')
    
    // Create dramatic comic book effect
    await sharp(inputPath)
      .modulate({
        brightness: 1.3,
        saturation: 3.5, // Extreme saturation
        hue: 15 // Warm tone
      })
      .sharpen({ sigma: 10 }) // Extremely sharp
      .normalize()
      .linear(2.0, -(128 * 1.0)) // Maximum contrast
      .median(2) // Reduce colors dramatically
      .toFile(outputPath)
    
    console.log('✅ Comic style completed')
    return true
  } catch (error) {
    console.error('❌ Comic style error:', error.message)
    console.error('Stack:', error.stack)
    throw error
  }
}

/**
 * Anime Style - Smooth skin and pastel colors
 * Japanese animation aesthetic
 */
async function animeStyle(inputPath, outputPath) {
  try {
    console.log('🎨 Creating anime effect...')
    
    // Create soft anime aesthetic
    await sharp(inputPath)
      .modulate({
        brightness: 1.45, // Very bright
        saturation: 2.8, // High saturation with brightness creates pastel
        hue: -10 // Cool tone
      })
      .blur(2.5) // Smooth skin and gradients
      .sharpen({ sigma: 1.5 }) // Light sharpening
      .normalize()
      .linear(1.2, -(128 * 0.15)) // Moderate contrast
      .toFile(outputPath)
    
    console.log('✅ Anime style completed')
    return true
  } catch (error) {
    console.error('❌ Anime style error:', error.message)
    console.error('Stack:', error.stack)
    throw error
  }
}

/**
 * Main transform function - routes to appropriate transformation
 */
async function transform(style, inputPath, outputPath) {
  console.log(`🎨 Starting ${style} transformation`)
  console.log(`   Input: ${inputPath}`)
  console.log(`   Output: ${outputPath}`)
  
  // Verify input file exists
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`)
  }
  
  // Route to appropriate transformation
  switch (style) {
    case 'Pencil Sketch':
      await pencilSketch(inputPath, outputPath)
      break
    case 'Oil Painting':
      await oilPainting(inputPath, outputPath)
      break
    case '2D Cartoon':
      await cartoon2D(inputPath, outputPath)
      break
    case '3D Cartoon':
      await cartoon3D(inputPath, outputPath)
      break
    case 'Comic Style':
      await comicStyle(inputPath, outputPath)
      break
    case 'Anime Style':
      await animeStyle(inputPath, outputPath)
      break
    default:
      throw new Error(`Unknown transformation style: ${style}`)
  }
  
  // Verify output file was created
  if (!fs.existsSync(outputPath)) {
    throw new Error(`Output file was not created: ${outputPath}`)
  }
  
  console.log(`✅ Transformation complete: ${outputPath}`)
  return true
}

module.exports = { transform }
