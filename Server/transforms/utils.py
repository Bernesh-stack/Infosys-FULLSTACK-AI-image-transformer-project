import cv2
import numpy as np
from PIL import Image

def load_image(image_path):
    """Load image from path"""
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not load image from {image_path}")
    return img

def save_image(image, output_path):
    """Save image to path"""
    cv2.imwrite(output_path, image)

def resize_image(image, max_size=1920):
    """Resize image while maintaining aspect ratio"""
    height, width = image.shape[:2]
    if max(height, width) > max_size:
        if width > height:
            new_width = max_size
            new_height = int(height * (max_size / width))
        else:
            new_height = max_size
            new_width = int(width * (max_size / height))
        image = cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)
    return image

def apply_bilateral_filter(image, d=9, sigma_color=75, sigma_space=75):
    """Apply bilateral filter for edge-preserving smoothing"""
    return cv2.bilateralFilter(image, d, sigma_color, sigma_space)

def edge_detection(image, threshold1=100, threshold2=200):
    """Detect edges using Canny edge detection"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, threshold1, threshold2)
    return edges

def adaptive_threshold(image):
    """Apply adaptive thresholding"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 9, 9
    )
    return thresh

def color_quantization(image, k=8):
    """Reduce number of colors in image"""
    data = np.float32(image).reshape((-1, 3))
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0)
    _, labels, centers = cv2.kmeans(data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    centers = np.uint8(centers)
    result = centers[labels.flatten()]
    result = result.reshape(image.shape)
    return result
