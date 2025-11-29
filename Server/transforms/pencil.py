import cv2
import numpy as np
from transforms.utils import load_image, save_image, resize_image

def pencil_sketch_transform(input_path, output_path):
    """
    Transform image to pencil sketch style
    Uses edge detection and grayscale conversion
    """
    try:
        # Load and resize image
        img = load_image(input_path)
        img = resize_image(img)
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Invert the grayscale image
        inverted = 255 - gray
        
        # Apply Gaussian blur
        blurred = cv2.GaussianBlur(inverted, (21, 21), 0)
        
        # Invert the blurred image
        inverted_blur = 255 - blurred
        
        # Create pencil sketch by dividing
        sketch = cv2.divide(gray, inverted_blur, scale=256.0)
        
        # Enhance contrast
        sketch = cv2.equalizeHist(sketch)
        
        # Convert back to BGR for consistency
        sketch_bgr = cv2.cvtColor(sketch, cv2.COLOR_GRAY2BGR)
        
        # Save result
        save_image(sketch_bgr, output_path)
        return True
        
    except Exception as e:
        print(f"Error in pencil sketch transform: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3:
        pencil_sketch_transform(sys.argv[1], sys.argv[2])
