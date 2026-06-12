from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Date, Enum, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import enum

class PaymentStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    failed = "failed"

class AbstractStatus(str, enum.Enum):
    submitted = "submitted"
    under_review = "under_review"
    accepted = "accepted"
    rejected = "rejected"

class Registration(Base):
    __tablename__ = "registrations"
    id                  = Column(Integer, primary_key=True, index=True)
    full_name           = Column(String(255), nullable=False)
    email               = Column(String(255), nullable=False)
    phone               = Column(String(20), nullable=False)
    institution         = Column(String(500))
    category            = Column(String(100), nullable=False)
    payment_status      = Column(String(20), default="pending")
    razorpay_order_id   = Column(String(255))
    razorpay_payment_id = Column(String(255))
    amount              = Column(Numeric(10, 2))
    early_bird          = Column(Boolean, default=False)
    created_at          = Column(DateTime, server_default=func.now())
    updated_at          = Column(DateTime, server_default=func.now(), onupdate=func.now())
    abstracts           = relationship("Abstract", back_populates="registration")

class Abstract(Base):
    __tablename__ = "abstracts"
    id                  = Column(Integer, primary_key=True, index=True)
    registration_id     = Column(Integer, ForeignKey("registrations.id", ondelete="SET NULL"), nullable=True)
    author_name         = Column(String(255), nullable=False)
    co_authors          = Column(Text)
    title               = Column(String(500), nullable=False)
    abstract_text       = Column(Text, nullable=False)
    theme               = Column(String(255))
    keywords            = Column(String(500))
    file_path           = Column(String(500))
    status              = Column(String(50), default="submitted")
    reviewer_comments   = Column(Text)
    # Payment confirmation fields
    razorpay_payment_id = Column(String(255))
    utr                 = Column(String(255))   # UTR / bank ref number from Razorpay
    submitted_at        = Column(DateTime, server_default=func.now())
    registration        = relationship("Registration", back_populates="abstracts")

class Announcement(Base):
    __tablename__ = "announcements"
    id         = Column(Integer, primary_key=True, index=True)
    title      = Column(String(500), nullable=False)
    content    = Column(Text, nullable=False)
    is_active  = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())

class ImportantDate(Base):
    __tablename__ = "important_dates"
    id            = Column(Integer, primary_key=True, index=True)
    event_name    = Column(String(255), nullable=False)
    event_date    = Column(Date, nullable=False)
    is_deadline   = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)

class Gallery(Base):
    __tablename__ = "gallery"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String(255))
    image_url   = Column(String(500), nullable=False)
    category    = Column(String(100))
    uploaded_at = Column(DateTime, server_default=func.now())

class Speaker(Base):
    __tablename__ = "speakers"
    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(255), nullable=False)
    designation = Column(String(255))
    institution = Column(String(255))
    bio         = Column(Text)
    photo_url   = Column(String(500))
    talk_title  = Column(String(500))
    talk_date   = Column(Date)
    is_keynote  = Column(Boolean, default=False)

class Sponsor(Base):
    __tablename__ = "sponsors"
    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String(255), nullable=False)
    logo_url      = Column(String(500))
    website       = Column(String(500))
    tier          = Column(String(50), default="silver")
    display_order = Column(Integer, default=0)
