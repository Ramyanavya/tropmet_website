from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from .core.config import settings
from .core.database import engine, Base
from .routers import registration, abstracts, content, payment

# Create tables
Base.metadata.create_all(bind=engine)

# Create upload dirs
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

app = FastAPI(
    title="TROPMET 2026 API",
    description="Backend API for TROPMET 2026 - PRaGaTI Conference",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Routers
app.include_router(registration.router)
app.include_router(abstracts.router)
app.include_router(content.router)
app.include_router(payment.router)

@app.get("/")
def root():
    return {"message": "TROPMET 2026 API is running", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok"}
