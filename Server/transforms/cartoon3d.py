import cv2
import numpy as np
from transforms.utils import load_image, save_image, resize_image, apply_bilateral_filter

def cartoon_3d_transform(input_path, output_path):
    """
    Transform image to 3D cartoon style
    Uses depth-like effects and enhanced colors
    """
    try:
        # Load and resize image
        img = load_image(input_path)
        img = resize_image(img)
        
        # Apply bilateral filter for smoothing
        smooth = apply_bilateral_filter(img, d=9, sigma_color=80, sigma_space=80)
        
        # Detect edges
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)
        edges = cv2.dilate(edges, None, iterations=1)
        edges_inv = 255 - edges
        edges_bgr = cv2.cvtColor(edges_inv, cv2.COLOR_GRAY2BGR)
        
        # Combine smooth image with edges
        result = cv2.bitwise_and(smooth, edges_bgr)
        
        # Enhance brightness and saturation for 3D pop effect
        hsv = cv2.cvtColor(result, cv2.COLOR_BGR2HSV)
        hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.3, 0, 255)  # Saturation
        hsv[:, :, 2] = np.clip(hsv[:, :, 2] * 1.15, 0, 255)  # Brightness
        result = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
        
        # Add subtle sharpening for 3D effect
        kernel = np.array([[-1,-1,-1],
                          [-1, 9,-1],
                          [-1,-1,-1]])
        sharpened = cv2.filter2D(result, -1, kernel)
        result = cv2.addWeighted(result, 0.7, sharpened, 0.3, 0)
        
        # Add slight vignette for depth
        rows, cols = result.shape[:2]
        kernel_x = cv2.getGaussianKernel(cols, cols/2)
        kernel_y = cv2.getGaussianKernel(rows, rows/2)
        kernel = kernel_y * kernel_x.T
        mask = kernel / kernel.max()
        mask = np.stack([mask]*3, axis=2)
        result = (result * mask + result * 0.3).astype(np.uint8)
        
        # Save result
        save_image(result, output_path)
        return True
        
    except Exception as e:
        print(f"Error in 3D cartoon transform: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) == 3:
        cartoon_3d_transform(sys.argv[1], sys.argv[2])
