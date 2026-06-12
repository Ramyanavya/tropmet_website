import hmac
import hashlib
import os
import shutil
import uuid
from typing import Optional

import razorpay
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..core.config import settings
from ..models.models import Abstract, Registration

router = APIRouter(prefix="/api/payment", tags=["Payment"])

# Razorpay credentials — loaded from env; fallback to test keys
RAZORPAY_KEY_ID     = os.getenv("RAZORPAY_KEY_ID",     "rzp_test_SxoYfVay7SLJNm")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET",  "f5RFw8R1tpxLXQTVR9eHZpcS")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))


class CreateOrderRequest(BaseModel):
    amount: int          # INR (will be converted to paise)
    category: str
    name: str
    email: str
    phone: str


@router.post("/create-order")
def create_order(req: CreateOrderRequest):
    """Create a Razorpay order. Returns order_id and amount_paise."""
    amount_paise = req.amount * 100   # Razorpay expects paise
    try:
        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "receipt": f"tropmet_{uuid.uuid4().hex[:8]}",
            "notes": {
                "category": req.category,
                "name": req.name,
                "email": req.email,
            }
        })
        return {
            "order_id": order["id"],
            "amount_paise": amount_paise,
            "currency": "INR",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Razorpay order creation failed: {str(e)}")


@router.post("/verify-and-submit")
async def verify_and_submit(
    # Personal details
    full_name:          str           = Form(...),
    email:              str           = Form(...),
    phone:              str           = Form(...),
    designation:        Optional[str] = Form(None),
    institution:        Optional[str] = Form(None),
    address:            Optional[str] = Form(None),
    city:               Optional[str] = Form(None),
    state:              Optional[str] = Form(None),
    pincode:            Optional[str] = Form(None),
    country:            Optional[str] = Form(None),
    membership_no:      Optional[str] = Form(None),
    # Abstract details
    title:              str           = Form(...),
    abstract_text:      str           = Form(...),
    co_authors:         Optional[str] = Form(None),
    presentation_type:  Optional[str] = Form(None),
    theme:              Optional[str] = Form(None),
    keywords:           Optional[str] = Form(None),
    file:               Optional[UploadFile] = File(None),
    # Payment details
    razorpay_order_id:   str  = Form(...),
    razorpay_payment_id: str  = Form(...),
    razorpay_signature:  str  = Form(...),
    registration_category: str = Form(...),
    amount:              int  = Form(...),
    early_bird:          str  = Form("false"),
    db: Session = Depends(get_db),
):
    """Verify Razorpay signature → save Registration + Abstract → return confirmation."""

    # 1. Verify HMAC signature
    expected = hmac.new(
        RAZORPAY_KEY_SECRET.encode(),
        f"{razorpay_order_id}|{razorpay_payment_id}".encode(),
        hashlib.sha256
    ).hexdigest()  # hmac.new is valid in Python 3

    if not hmac.compare_digest(expected, razorpay_signature):
        raise HTTPException(status_code=400, detail="Payment signature verification failed")

    # 2. Fetch payment details from Razorpay to get UTR / bank ref
    utr = None
    try:
        payment_info = client.payment.fetch(razorpay_payment_id)
        # UTR is in acquirer_data for UPI payments; for cards it's bank_transaction_id
        acq = payment_info.get("acquirer_data", {})
        utr = acq.get("utr") or acq.get("bank_transaction_id") or acq.get("rrn") or razorpay_payment_id
    except Exception:
        utr = razorpay_payment_id  # fallback to payment_id if fetch fails

    # 3. Save Registration
    registration = Registration(
        full_name=full_name,
        email=email,
        phone=phone,
        institution=f"{institution or ''}, {city or ''}, {state or ''}".strip(", "),
        category=registration_category,
        payment_status="paid",
        razorpay_order_id=razorpay_order_id,
        razorpay_payment_id=razorpay_payment_id,
        amount=amount,
        early_bird=(early_bird.lower() == "true"),
    )
    db.add(registration)
    db.flush()  # get registration.id before commit

    # 4. Handle file upload
    file_path = None
    if file and file.filename:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        ext = os.path.splitext(file.filename)[1]
        fname = f"{uuid.uuid4()}{ext}"
        fpath = os.path.join(settings.UPLOAD_DIR, fname)
        with open(fpath, "wb") as f_out:
            shutil.copyfileobj(file.file, f_out)
        file_path = fpath

    # 5. Save Abstract
    if len(abstract_text.split()) > 350:
        raise HTTPException(status_code=400, detail="Abstract exceeds 350 words")

    abstract = Abstract(
        registration_id=registration.id,
        author_name=full_name,
        co_authors=co_authors,
        title=title,
        abstract_text=abstract_text,
        theme=theme,
        keywords=keywords,
        file_path=file_path,
        status="submitted",
        razorpay_payment_id=razorpay_payment_id,
        utr=utr,
    )
    db.add(abstract)
    db.commit()
    db.refresh(abstract)
    db.refresh(registration)

    return {
        "abstract_id": abstract.id,
        "registration_id": registration.id,
        "payment_id": razorpay_payment_id,
        "utr": utr,
        "amount": amount,
        "status": "paid",
        "message": "Abstract submitted and payment confirmed",
    }
