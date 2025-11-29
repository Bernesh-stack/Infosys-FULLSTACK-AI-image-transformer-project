# Image Transformation Scripts

Python-based image transformation modules using OpenCV for advanced image processing.

## Installation

```bash
pip install -r requirements.txt
```

## Transformation Styles

### 1. Pencil Sketch (`pencil.py`)
- Grayscale conversion
- Edge detection with Gaussian blur
- Contrast enhancement
- Creates realistic pencil drawing effect

### 2. Oil Painting (`oil.py`)
- Multiple bilateral filters
- Saturation enhancement
- Edge preservation
- Painterly texture effect

### 3. 2D Cartoon (`cartoon2d.py`)
- Color quantization (reduces colors)
- Adaptive edge detection
- Bold outlines
- Flat color areas

### 4. 3D Cartoon (`cartoon3d.py`)
- Depth-like effects
- Enhanced brightness/saturation
- Sharpening for pop effect
- Vignette for depth perception

### 5. Comic Style (`comic.py`)
- Strong black outlines
- Halftone dot patterns
- Vibrant color quantization
- High contrast

### 6. Anime Style (`anime.py`)
- Smooth gradients
- Very high saturation
- Clean thin edges
- Posterized colors
- Highlight effects

## Usage

### Command Line
```bash
python -m transforms.pencil input.jpg output.jpg
python -m transforms.oil input.jpg output.jpg
python -m transforms.cartoon2d input.jpg output.jpg
python -m transforms.cartoon3d input.jpg output.jpg
python -m transforms.comic input.jpg output.jpg
python -m transforms.anime input.jpg output.jpg
```

### Python Import
```python
from transforms import pencil_sketch_transform

pencil_sketch_transform('input.jpg', 'output.jpg')
```

## Integration with Node.js

Use Python child process from Node.js:

```javascript
const { spawn } = require('child_process');

const python = spawn('python', [
  '-m', 'transforms.pencil',
  'input.jpg',
  'output.jpg'
]);
```
