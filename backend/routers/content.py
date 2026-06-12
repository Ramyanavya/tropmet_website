from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional, List
import os, shutil, uuid

from ..core.database import get_db
from ..core.config import settings
from ..models.models import Announcement, ImportantDate, Speaker, Gallery, Sponsor

router = APIRouter(prefix="/api", tags=["Content"])

# --- Announcements ---
@router.get("/announcements")
def get_announcements(db: Session = Depends(get_db)):
    items = db.query(Announcement).filter(Announcement.is_active == True).order_by(Announcement.created_at.desc()).all()
    return [{"id": a.id, "title": a.title, "content": a.content, "created_at": a.created_at} for a in items]

# --- Important Dates ---
@router.get("/dates")
def get_dates(db: Session = Depends(get_db)):
    items = db.query(ImportantDate).order_by(ImportantDate.display_order).all()
    return [{"id": d.id, "event_name": d.event_name, "event_date": str(d.event_date), "is_deadline": d.is_deadline} for d in items]

# --- Speakers ---
@router.get("/speakers")
def get_speakers(db: Session = Depends(get_db)):
    items = db.query(Speaker).order_by(Speaker.is_keynote.desc(), Speaker.name).all()
    return [{
        "id": s.id,
        "name": s.name,
        "designation": s.designation,
        "institution": s.institution,
        "bio": s.bio,
        "photo_url": s.photo_url,
        "talk_title": s.talk_title,
        "is_keynote": s.is_keynote
    } for s in items]

@router.post("/speakers")
async def add_speaker(
    name: str = Form(...),
    designation: Optional[str] = Form(None),
    institution: Optional[str] = Form(None),
    bio: Optional[str] = Form(None),
    talk_title: Optional[str] = Form(None),
    is_keynote: bool = Form(False),
    photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    photo_url = None
    if photo:
        os.makedirs(f"{settings.UPLOAD_DIR}/speakers", exist_ok=True)
        ext = os.path.splitext(photo.filename)[1]
        fname = f"{uuid.uuid4()}{ext}"
        fpath = os.path.join(settings.UPLOAD_DIR, "speakers", fname)
        with open(fpath, "wb") as f:
            shutil.copyfileobj(photo.file, f)
        photo_url = f"/uploads/speakers/{fname}"

    speaker = Speaker(name=name, designation=designation, institution=institution,
                      bio=bio, talk_title=talk_title, is_keynote=is_keynote, photo_url=photo_url)
    db.add(speaker)
    db.commit()
    db.refresh(speaker)
    return {"id": speaker.id, "message": "Speaker added"}

# --- Gallery ---
@router.get("/gallery")
def get_gallery(db: Session = Depends(get_db)):
    items = db.query(Gallery).order_by(Gallery.uploaded_at.desc()).all()
    return [{"id": g.id, "title": g.title, "image_url": g.image_url, "category": g.category} for g in items]

@router.post("/gallery/upload")
async def upload_gallery_image(
    title: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    os.makedirs(f"{settings.UPLOAD_DIR}/gallery", exist_ok=True)
    ext = os.path.splitext(image.filename)[1]
    fname = f"{uuid.uuid4()}{ext}"
    fpath = os.path.join(settings.UPLOAD_DIR, "gallery", fname)
    with open(fpath, "wb") as f:
        shutil.copyfileobj(image.file, f)

    item = Gallery(title=title, image_url=f"/uploads/gallery/{fname}", category=category)
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"id": item.id, "image_url": item.image_url}

# --- Sponsors ---
@router.get("/sponsors")
def get_sponsors(db: Session = Depends(get_db)):
    items = db.query(Sponsor).order_by(Sponsor.display_order).all()
    return [{"id": s.id, "name": s.name, "logo_url": s.logo_url, "website": s.website, "tier": s.tier} for s in items]
