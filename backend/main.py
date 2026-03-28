# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # <--- Add this import
from app.routes import detect
import os

app = FastAPI(title="Traffic Violation Detection API")

# 🟢 CRITICAL: Mount the uploads folder so it's accessible via URL
# This maps the physical "uploads" folder to the "/uploads" URL path
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(detect.router, prefix="/api/v1")

@app.get("/")
async def health_check():
    return {"status": "online", "system": "Traffic Violation Detection"}

if __name__ == "__main__":
    import uvicorn
    # Using 0.0.0.0 makes it accessible on your local network IP
    uvicorn.run("main:app", host="10.77.108.221", port=8000, reload=True)