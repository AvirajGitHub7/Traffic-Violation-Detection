# This maps your 23 class IDs to actual traffic rules.
def process_violations(results):
    """
    Logic mapping based on your dataset:
    0-4: Vehicles | 5-6: Lights | 7-22: Signs/Speed
    """
    violations = []
    
    for r in results:
        # Get class IDs and names
        # .cls gives us the list of detected class indexes
        detected_classes = r.boxes.cls.cpu().numpy().tolist()
        
        # 🚦 RULE 1: Red Light Violation
        # If 'red light' (ID: 5) and any 'vehicle' (IDs: 1,2,3,4) are in frame
        # (Note: Real-world logic would require movement tracking, 
        # but for static images, we flag vehicle presence at red lights)
        if 5 in detected_classes:
            vehicles = [id for id in detected_classes if id in [1, 2, 3, 4]]
            if vehicles:
                violations.append({
                    "violation": "Potential Red Light Jump",
                    "class_detected": "red light",
                    "severity": "High"
                })

        # 🚷 RULE 2: No Entry / No Turns
        # Check if vehicle is near restrictive signs
        restrictions = {8: "No Entry", 19: "No Left Turn", 20: "No Right Turn", 22: "No U-Turn"}
        for sign_id, sign_name in restrictions.items():
            if sign_id in detected_classes:
                violations.append({
                    "violation": f"Disobeying {sign_name} Sign",
                    "class_detected": sign_name,
                    "severity": "Medium"
                })

        # 🛑 RULE 3: Stop Sign Check
        if 7 in detected_classes:
            violations.append({
                "violation": "Stop Sign Detected - Verify Vehicle Stop",
                "class_detected": "stop sign",
                "severity": "Medium"
            })

        # 🏍️ RULE 4: Helmet Check (Safety)
        # If motorcycle (ID: 4) is present but no person (ID: 0) is detected with a helmet
        # (Assuming your model detects person as the proxy for rider)
        if 4 in detected_classes and 0 not in detected_classes:
            violations.append({
                "violation": "Rider Safety Alert",
                "class_detected": "motorcycle",
                "severity": "Medium"
            })

    return violations