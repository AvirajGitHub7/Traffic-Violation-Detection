# This handles saving the "proof" with bounding boxes drawn on it.
import cv2
import os

def save_annotated_image(results, output_path):
    """
    Draws the YOLO boxes on the image and saves it to the uploads folder.
    """
    for r in results:
        # .plot() creates an image with bounding boxes and labels
        img_array = r.plot() 
        cv2.imwrite(output_path, img_array)
    return output_path