from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, date
import razorpay
import hmac, hashlib

from ..core.database import get_db
from ..core.config import settings
from ..models.models import Registration

router = APIRouter(prefix="/api/registration", tags=["Registration"])

EARLY_BIRD_DEADLINE = date(2026, 10, 31)

FEES = {
    "IMS/OSI Members":      {"early": 3000, "onspot": 4000},
    "Non-IMS/OSI Members":  {"early": 4000, "onspot": 5000},
    "Scholars/Students":    {"early": 1000, "onspot": 1500},
    "Foreign Nationals":    {"early": 10000, "onspot": 12000},
}

class RegistrationCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    institution: Optional[str] = None
    category: str
    paper_title: Optional[str] = None
    abstract: Optional[str] = None

class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

@router.post("/create")
def create_registration(data: RegistrationCreate, db: Session = Depends(get_db)):
    existing = db.query(Registration).filter(Registration.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    if data.category not in FEES:
        raise HTTPException(status_code=400, detail="Invalid category")

    is_early = date.today() <= EARLY_BIRD_DEADLINE
    fee_type = "early" if is_early else "onspot"
    amount = FEES[data.category][fee_type]

    # Create Razorpay order
    try:
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        order = client.order.create({
            "amount": amount * 100,  # paise
            "currency": "INR",
            "payment_capture": 1,
            "notes": {"email": data.email, "category": data.category}
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment gateway error: {str(e)}")

    reg = Registration(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        institution=data.institution,
        category=data.category,
        paper_title=data.paper_title,
        abstract=data.abstract,
        razorpay_order_id=order["id"],
        amount=amount,
        early_bird=is_early,
        payment_status="pending"
    )
    db.add(reg)
    db.commit()
    db.refresh(reg)

    return {
        "registration_id": reg.id,
        "razorpay_order_id": order["id"],
        "amount": amount,
        "currency": "INR",
        "razorpay_key": settings.RAZORPAY_KEY_ID,
        "prefill": {"name": data.full_name, "email": data.email, "contact": data.phone}
    }

@router.post("/verify-payment")
def verify_payment(data: PaymentVerify, db: Session = Depends(get_db)):
    # Verify Razorpay signature
    msg = f"{data.razorpay_order_id}|{data.razorpay_payment_id}"
    expected = hmac.new(
        settings.RAZORPAY_KEY_SECRET.encode(),
        msg.encode(),
        hashlib.sha256
    ).hexdigest()

    if expected != data.razorpay_signature:
        raise HTTPException(status_code=400, detail="Payment verification failed")

    reg = db.query(Registration).filter(
        Registration.razorpay_order_id == data.razorpay_order_id
    ).first()

    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")

    reg.payment_status = "paid"
    reg.razorpay_payment_id = data.razorpay_payment_id
    db.commit()

    return {"message": "Payment verified successfully", "registration_id": reg.id}

@router.get("/status/{email}")
def get_status(email: str, db: Session = Depends(get_db)):
    reg = db.query(Registration).filter(Registration.email == email).first()
    if not reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    return {
        "id": reg.id,
        "full_name": reg.full_name,
        "email": reg.email,
        "category": reg.category,
        "payment_status": reg.payment_status,
        "amount": float(reg.amount) if reg.amount else 0,
        "early_bird": reg.early_bird,
        "created_at": reg.created_at
    }

@router.get("/fees")
def get_fees():
    is_early = date.today() <= EARLY_BIRD_DEADLINE
    return {"fees": FEES, "is_early_bird": is_early, "deadline": str(EARLY_BIRD_DEADLINE)}
