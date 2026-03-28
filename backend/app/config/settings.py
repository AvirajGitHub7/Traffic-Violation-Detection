import os

# Get the absolute path of the backend directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Path to your YOLO model
MODEL_PATH = os.path.join(BASE_DIR, "models", "traffic_model_y8n.pt")

# Folder to store processed images/videos
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

# Ensure the upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)