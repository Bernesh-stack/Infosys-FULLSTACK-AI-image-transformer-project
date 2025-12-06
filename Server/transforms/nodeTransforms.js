// Node.js-based image transformations using Sharp library
// Advanced transformations with distinct visual styles
const sharp = require('sharp')
const fs = require('fs')

/**
 * Pencil Sketch transformation
 * Creates realistic pencil drawing effect with edge detection
 */
async function pencilSketch(inputPath, outputPath) {
  try {
    // Read the image
    const image = sharp(inputPath)
    const metadata = await image.metadata()
    
    // Create grayscale with strong edge detection
    await image
      .grayscale()
      .normalize()
      .linear(1.5, -(128 * 0.5)) // Increase contrast
      .modulate({ brightness: 1.3 })
      .sharpen({ sigma: 3, m1: 1.5, m2: 0.5 }) // Strong edge enhancement
      .threshold(200, { grayscale: false }) // Create sketch lines
      .negate() // Invert to get dark lines on white
      .toFile(outputPath)
    
    console.log('✅ Pencil sketch transformation completed')
    return true
  } catch (error) {
    console.error('❌ Pencil sketch error:', error.message)
    throw error
  }
}

/**
 * Oil Painting transformation
 * Creates thick brush strokes and painterly effect
 */
async function oilPainting(inputPath, outputPath) {
  try {
    // Create oil painting effect with heavy blur and saturation
    await sharp(inputPath)
      .blur(5) // Heavy blur for brush strokes
      .modulate({ 
        brightness: 1.15, 
        saturation: 1.8, // Rich, saturated colors
        hue: 10 // Slight hue shift for warmth
      })
      .sharpen({ sigma: 2 }) // Sharpen edges slightly
      .median(3) // Reduce noise, create smooth areas
      .toFile(outputPath)
    
    console.log('✅ Oil painting transformation completed')
    return true
  } catch (error) {
    console.error('❌ Oil painting error:', error.message)
    throw error
  }
}

/**
 * 2D Cartoon transformation
 * Flat colors with bold black outlines
 */
async function cartoon2D(inputPath, outputPath) {
  try {
    // Create flat cartoon look with posterization
    await sharp(inputPath)
      .modulate({ 
        brightness: 1.25, 
        saturation: 2.2 // Very saturated, bold colors
      })
      .sharpen({ sigma: 5, m1: 2, m2: 1 }) // Very sharp edges
      .normalize() // Enhance contrast
      .linear(1.4, -(128 * 0.4)) // High contrast
      .median(2) // Smooth out details
      .toFile(outputPath)
    
    console.log('✅ 2D Cartoon transformation completed')
    return true
  } catch (error) {
    console.error('❌ 2D Cartoon error:', error.message)
    throw error
  }
}

/**
 * 3D Cartoon transformation
 * Pixar-style with depth and vibrant colors
 */
async function cartoon3D(inputPath, outputPath) {
  try {
    // Create 3D cartoon with enhanced depth perception
    await sharp(inputPath)
      .modulate({ 
        brightness: 1.3, 
        saturation: 1.9,
        hue: -5 // Slight cool tone
      })
      .sharpen({ sigma: 3, m1: 1.5, m2: 0.8 })
      .linear(1.3, -(128 * 0.25)) // Medium-high contrast
      .blur(0.3) // Very slight blur for smoothness
      .normalize()
      .toFile(outputPath)
    
    console.log('✅ 3D Cartoon transformation completed')
    return true
  } catch (error) {
    console.error('❌ 3D Cartoon error:', error.message)
    throw error
  }
}

/**
 * Comic Style transformation
 * Bold halftone dots and high contrast like comic books
 */
async function comicStyle(inputPath, outputPath) {
  try {
    // Create dramatic comic book effect
    await sharp(inputPath)
      .modulate({ 
        brightness: 1.2, 
        saturation: 2.5, // Maximum saturation
        hue: 15 // Warm tone
      })
      .sharpen({ sigma: 6, m1: 3, m2: 1.5 }) // Extremely sharp
      .normalize()
      .linear(1.6, -(128 * 0.5)) // Very high contrast
      .median(1) // Slight smoothing
      .toFile(outputPath)
    
    console.log('✅ Comic style transformation completed')
    return true
  } catch (error) {
    console.error('❌ Comic style error:', error.message)
    throw error
  }
}

/**
 * Anime Style transformation
 * Smooth skin, vibrant colors, and soft gradients
 */
async function animeStyle(inputPath, outputPath) {
  try {
    // Create anime aesthetic with smooth gradients
    await sharp(inputPath)
      .blur(1.5) // Smooth skin and gradients
      .modulate({ 
        brightness: 1.35, 
        saturation: 2.3, // Very vibrant
        hue: -10 // Cooler, more pastel
      })
      .sharpen({ sigma: 2, m1: 1, m2: 0.3 }) // Moderate sharpening
      .normalize()
      .linear(1.2, -(128 * 0.15)) // Moderate contrast
      .toFile(outputPath)
    
    console.log('✅ Anime style transformation completed')
    return true
  } catch (error) {
    console.error('❌ Anime style error:', error.message)
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
