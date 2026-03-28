# Api Endpoint for traffic violation detection
from fastapi import APIRouter, UploadFile, File
import os
import uuid
from app.services.yolo_service import YOLOService
from app.services.violation_logic import process_violations
from app.utils.image_utils import save_annotated_image
from app.config.settings import UPLOAD_DIR

router = APIRouter()
yolo_client = YOLOService()

@router.post("/detect")
async def detect_violations(file: UploadFile = File(...)):
    
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
     return {"error": "Invalid file type"}

    # 1. Save original file with unique ID
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    input_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(input_path, "wb") as f:
        f.write(await file.read())

    # 2. Run Inference
    results = yolo_client.predict(input_path)
    
    class_counts = {}

    for r in results:
      classes = r.boxes.cls.cpu().numpy().tolist()
    
    for cls in classes:
        cls = int(cls)
        class_name = yolo_client.model.names[cls]
        class_counts[class_name] = class_counts.get(class_name, 0) + 1

    # 3. Analyze for Violations
    violations = process_violations(results)

    # 4. Save Annotated Image (the "Proof")
    processed_filename = f"out_{filename}"
    processed_path = os.path.join(UPLOAD_DIR, processed_filename)
    save_annotated_image(results, processed_path)
    
    if not results or len(results[0].boxes) == 0:
     return {
        "message": "No objects detected",
        "violations_found": [],
        "object_count": 0
    }

    return {
        "message": "Analysis Complete",
        "violations_found": violations,
        "original_image": f"/uploads/{filename}",
        "annotated_image": f"/uploads/{processed_filename}",
        "object_count": len(results[0].boxes),
        "class_counts": class_counts   # ✅ NEW
    }