# Traffic Violation Detection System 🚦🚗

A full-stack AI application that detects traffic violations using computer vision. This project leverages **YOLOv8** for object detection and **FastAPI** for a high-performance backend, with a modern **Next.js** dashboard.

## 🌟 Features
* **Real-time Detection:** Detects vehicles (cars, trucks, bikes) and traffic lights.
* **Violation Logic:** Identifies specific traffic rule breaks (e.g., running red lights).
* **High Performance:** Backend powered by FastAPI and Ultralytics YOLOv8.
* **Modern UI:** Responsive frontend built with Next.js and Tailwind CSS.

## 🛠️ Tech Stack
* **Frontend:** Next.js, React, Tailwind CSS.
* **Backend:** FastAPI (Python), OpenCV, Ultralytics (YOLOv8).
* **Machine Learning:** YOLOv8n (Nano) for optimized inference speed.

## 🚀 Getting Started

### Prerequisites
* Python 3.9+
* Node.js 18+
* Virtual Environment (venv)

### Backend Setup

# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python main.py


### Frontend Configuration
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev