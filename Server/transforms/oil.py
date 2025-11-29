import cv2
import numpy as np
from transforms.utils import load_image, save_image, resize_image, apply_bilateral_filter

def oil_painting_transform(input_path, output_path):
    """
    Transform image to oil painting style
    Uses bilateral filtering and color enhancement
    """
    try:
        # Load and resize image
        img = load_image(input_path)
        img = resize_image(img)
        
        # Apply multiple bilateral filters for oil painting effect
        result = img.copy()
        for _ in range(3):
            result = apply_bilateral_filter(result, d=9, sigma_color=90, sigma_space=90)
        
        # Enhance saturation
        hsv = cv2.cvtColor(result, cv2.COLOR_BGR2HSV)
        hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.3, 0, 255)
        result = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
        
        # Add slight blur for painterly effect
        result = cv2.medianBlur(result, 5)
        
        # Enhance edges slightly
        edges = cv2.Canny(cv2.cvtColor(result, cv2.COLOR_BGR2GRAY), 50, 150)
        edges = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
        result = cv2.addWeighted(result, 0.95, edges, 0.05, 0)
        
        # Save result
        save_image(result, output_path)
        return True
        
    except Exception as e:
        print(f"Error in oil painting transform: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3:
        oil_painting_transform(sys.argv[1], sys.argv[2])
