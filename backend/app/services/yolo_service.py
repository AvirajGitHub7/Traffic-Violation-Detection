# this file is responsible for loading the YOLO model and making predictions on images or video frames.
from ultralytics import YOLO
from app.config.settings import MODEL_PATH

class YOLOService:
    def __init__(self):
        # Load your trained model (traffic_model_y8n.pt)
        self.model = YOLO(MODEL_PATH)

    def predict(self, image_path: str):
        # conf=0.25 is a good balance for traffic
        results = self.model.predict(source=image_path, conf=0.15)
        return results
    
    
    
    