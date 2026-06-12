from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import os, shutil, uuid

from ..core.database import get_db
from ..core.config import settings
from ..models.models import Abstract

router = APIRouter(prefix="/api/abstracts", tags=["Abstracts"])

THEMES = [
    "Extreme Weather Events: Prediction, Impact Assessment, and Early Warning Systems",
    "Satellite, Radar, and Multi-Platform Observations for Tropical Weather and Climate",
    "Advances in Numerical Weather Prediction and Seamless Forecasting",
    "Artificial Intelligence and Machine Learning Applications in Weather and Climate Science",
    "Physics-Driven and Hybrid AI Approaches for Tropical Meteorology and Forecasting",
    "Data Assimilation, Observing System Experiments, and Impact Studies",
    "Monsoon Dynamics, Land-Ocean-Atmosphere Interactions, and Tropical Processes",
    "Climate Variability, Climate Change, and Long-Term Tropical Climate Projections",
    "Forecast Verification, Uncertainty Quantification, and Process-Based Evaluation",
    "Weather and Climate Services for Agriculture, Water Resources, Disaster Risk Reduction, Transport, etc.",
    "Emerging Technologies and Future Observing Systems in Tropical Meteorology",
    "High-Impact Weather and Climate Extremes over the Indian Subcontinent and Surrounding Seas",
    "Multi-Scale Interactions: From Convective Scales to Large-Scale Tropical Dynamics",
    "Applications of Weather and Climate Intelligence for Societal Resilience and Sustainable Development",
]

@router.get("/themes")
def get_themes():
    return {"themes": THEMES}

@router.post("/submit")
async def submit_abstract(
    author_name: str = Form(...),
    co_authors: Optional[str] = Form(None),
    title: str = Form(...),
    abstract_text: str = Form(...),
    theme: Optional[str] = Form(None),
    keywords: Optional[str] = Form(None),
    registration_id: Optional[int] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    if len(abstract_text.split()) > 300:
        raise HTTPException(status_code=400, detail="Abstract must not exceed 300 words")

    file_path = None
    if file:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        ext = os.path.splitext(file.filename)[1]
        fname = f"{uuid.uuid4()}{ext}"
        fpath = os.path.join(settings.UPLOAD_DIR, fname)
        with open(fpath, "wb") as f:
            shutil.copyfileobj(file.file, f)
        file_path = fpath

    abstract = Abstract(
        registration_id=registration_id,
        author_name=author_name,
        co_authors=co_authors,
        title=title,
        abstract_text=abstract_text,
        theme=theme,
        keywords=keywords,
        file_path=file_path,
        status="submitted"
    )
    db.add(abstract)
    db.commit()
    db.refresh(abstract)

    return {
        "id": abstract.id,
        "message": "Abstract submitted successfully",
        "status": abstract.status,
        "submitted_at": abstract.submitted_at
    }

@router.get("/{abstract_id}")
def get_abstract(abstract_id: int, db: Session = Depends(get_db)):
    ab = db.query(Abstract).filter(Abstract.id == abstract_id).first()
    if not ab:
        raise HTTPException(status_code=404, detail="Abstract not found")
    return {
        "id": ab.id,
        "author_name": ab.author_name,
        "title": ab.title,
        "status": ab.status,
        "submitted_at": ab.submitted_at,
        "reviewer_comments": ab.reviewer_comments
    }
