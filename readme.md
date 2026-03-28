# Traffic Sentry: AI-Powered Violation Detection 🚦🚗

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-05998b?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![YOLOv8](https://img.shields.io/badge/AI-YOLOv8-00599C?style=flat-square)](https://ultralytics.com/)

A high-performance, full-stack computer vision application designed to automate traffic enforcement. This system utilizes **YOLOv8n** for real-time object detection and **FastAPI** to process neural telemetry, presented through a high-tech **Next.js** dashboard.

---

## 🌟 Key Features
* **Neural Analysis:** Real-time detection of vehicles (cars, trucks, bikes) and traffic light states.
* **Violation Logic:** Automated identification of infractions, such as red-light jumping.
* **High-Tech Dashboard:** A custom-built UI featuring a "Neural Terminal" modal for seamless file analysis.
* **Optimized Inference:** Powered by Ultralytics YOLOv8 (Nano version) for maximum FPS.

## 🛠️ Tech Stack
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14, React, Tailwind CSS, Lucide Icons |
| **Backend** | Python, FastAPI, OpenCV |
| **Machine Learning** | YOLOv8n, PyTorch |
| **API Client** | Axios with Environment Configuration |

---

## 🚀 Getting Started

### Prerequisites
* **Python 3.9+**
* **Node.js 18+**
* **Virtual Environment (venv)**

### 1. Backend Setup
```bash
# Navigate to backend
cd backend

# Initialize Virtual Environment
python -m venv venv
source venv/Scripts/activate  # Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python main.py


# Navigate to frontend
cd frontend

# Create environment file
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000" > .env.local

# Install & Run
npm install
npm run dev