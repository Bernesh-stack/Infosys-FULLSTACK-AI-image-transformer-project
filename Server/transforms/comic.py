import cv2
import numpy as np
from transforms.utils import load_image, save_image, resize_image, color_quantization

def comic_style_transform(input_path, output_path):
    """
    Transform image to comic book style
    Uses strong edges, halftone effects, and vibrant colors
    """
    try:
        # Load and resize image
        img = load_image(input_path)
        img = resize_image(img)
        
        # Apply bilateral filter
        smooth = cv2.bilateralFilter(img, d=9, sigmaColor=100, sigmaSpace=100)
        
        # Color quantization for comic effect
        quantized = color_quantization(smooth, k=12)
        
        # Strong edge detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 100, 200)
        edges = cv2.dilate(edges, None, iterations=1)
        
        # Create thick black outlines
        edges_inv = 255 - edges
        edges_bgr = cv2.cvtColor(edges_inv, cv2.COLOR_GRAY2BGR)
        
        # Combine
        result = cv2.bitwise_and(quantized, edges_bgr)
        
        # Enhance colors dramatically for comic effect
        hsv = cv2.cvtColor(result, cv2.COLOR_BGR2HSV)
        hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.5, 0, 255)  # High saturation
        hsv[:, :, 2] = np.clip(hsv[:, :, 2] * 1.1, 0, 255)  # Slight brightness boost
        result = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
        
        # Add halftone-like effect in highlights
        gray_result = cv2.cvtColor(result, cv2.COLOR_BGR2GRAY)
        _, highlights = cv2.threshold(gray_result, 200, 255, cv2.THRESH_BINARY)
        
        # Create dot pattern for highlights
        dot_size = 5
        for i in range(0, result.shape[0], dot_size * 2):
            for j in range(0, result.shape[1], dot_size * 2):
                if highlights[i, j] > 128:
                    cv2.circle(result, (j, i), 2, (255, 255, 255), -1)
        
        # Sharpen for crisp comic look
        kernel = np.array([[0, -1, 0],
                          [-1, 5, -1],
                          [0, -1, 0]])
        result = cv2.filter2D(result, -1, kernel)
        
        # Save result
        save_image(result, output_path)
        return True
        
    except Exception as e:
        print(f"Error in comic style transform: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3:
        comic_style_transform(sys.argv[1], sys.argv[2])
