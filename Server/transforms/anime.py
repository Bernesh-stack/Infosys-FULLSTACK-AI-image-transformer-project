import cv2
import numpy as np
from transforms.utils import load_image, save_image, resize_image, apply_bilateral_filter

def anime_style_transform(input_path, output_path):
    """
    Transform image to anime style
    Uses smooth gradients, vibrant colors, and clean edges
    """
    try:
        # Load and resize image
        img = load_image(input_path)
        img = resize_image(img)
        
        # Apply strong bilateral filtering for anime smoothness
        smooth = img.copy()
        for _ in range(4):
            smooth = apply_bilateral_filter(smooth, d=9, sigma_color=90, sigma_space=90)
        
        # Detect edges with lower threshold for cleaner look
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 80, 120)
        edges = cv2.dilate(edges, None, iterations=1)
        edges_inv = 255 - edges
        edges_bgr = cv2.cvtColor(edges_inv, cv2.COLOR_GRAY2BGR)
        
        # Combine smooth image with edges
        result = cv2.bitwise_and(smooth, edges_bgr)
        
        # Enhance colors for anime vibrancy
        hsv = cv2.cvtColor(result, cv2.COLOR_BGR2HSV)
        hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.6, 0, 255)  # Very high saturation
        hsv[:, :, 2] = np.clip(hsv[:, :, 2] * 1.2, 0, 255)  # Increased brightness
        result = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
        
        # Add anime-style highlights
        gray_result = cv2.cvtColor(result, cv2.COLOR_BGR2GRAY)
        _, highlights = cv2.threshold(gray_result, 220, 255, cv2.THRESH_BINARY)
        highlights = cv2.GaussianBlur(highlights, (5, 5), 0)
        highlights_bgr = cv2.cvtColor(highlights, cv2.COLOR_GRAY2BGR)
        result = cv2.addWeighted(result, 0.9, highlights_bgr, 0.1, 0)
        
        # Reduce color palette slightly for anime effect
        lab = cv2.cvtColor(result, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        
        # Posterize colors
        a = (a // 16) * 16
        b = (b // 16) * 16
        
        lab = cv2.merge([l, a, b])
        result = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
        
        # Final sharpening for crisp anime look
        kernel = np.array([[0, -1, 0],
                          [-1, 5, -1],
                          [0, -1, 0]])
        result = cv2.filter2D(result, -1, kernel)
        
        # Save result
        save_image(result, output_path)
        return True
        
    except Exception as e:
        print(f"Error in anime style transform: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3:
        anime_style_transform(sys.argv[1], sys.argv[2])
