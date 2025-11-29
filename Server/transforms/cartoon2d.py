import cv2
import numpy as np
from transforms.utils import load_image, save_image, resize_image, color_quantization, edge_detection

def cartoon_2d_transform(input_path, output_path):
    """
    Transform image to 2D cartoon style
    Uses color quantization and edge detection
    """
    try:
        # Load and resize image
        img = load_image(input_path)
        img = resize_image(img)
        
        # Apply bilateral filter to reduce noise while keeping edges sharp
        img_smooth = cv2.bilateralFilter(img, d=9, sigmaColor=75, sigmaSpace=75)
        
        # Color quantization to reduce colors
        img_quantized = color_quantization(img_smooth, k=9)
        
        # Detect edges
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray_blur = cv2.medianBlur(gray, 7)
        edges = cv2.adaptiveThreshold(
            gray_blur, 255,
            cv2.ADAPTIVE_THRESH_MEAN_C,
            cv2.THRESH_BINARY,
            blockSize=9,
            C=2
        )
        
        # Convert edges to BGR
        edges_bgr = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
        
        # Combine quantized colors with edges
        result = cv2.bitwise_and(img_quantized, edges_bgr)
        
        # Enhance saturation
        hsv = cv2.cvtColor(result, cv2.COLOR_BGR2HSV)
        hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.4, 0, 255)
        result = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
        
        # Save result
        save_image(result, output_path)
        return True
        
    except Exception as e:
        print(f"Error in 2D cartoon transform: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3:
        cartoon_2d_transform(sys.argv[1], sys.argv[2])
