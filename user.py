import uuid
from datetime import datetime, timezone
from enum import Enum as PyEnum
from sqlalchemy import (
    String, Integer, Boolean, DateTime, Float, ForeignKey,
    Enum, Text, BigInteger, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


def utcnow():
    return datetime.now(timezone.utc)


def new_uuid():
    return str(uuid.uuid4())


# ─── Enums ───────────────────────────────────────────────────────────────────

class SubscriptionTier(str, PyEnum):
    FREE = "free"
    PRO = "pro"
    ENTERPRISE = "enterprise"


class SubscriptionStatus(str, PyEnum):
    ACTIVE = "active"
    CANCELLED = "cancelled"
    PAST_DUE = "past_due"
    TRIALING = "trialing"


class JobStatus(str, PyEnum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class JobType(str, PyEnum):
    PREVIEW = "preview"         # Free 30-second preview
    FULL_TRACK = "full_track"   # Full 2-3 minute song


class Genre(str, PyEnum):
    HIP_HOP = "hip_hop"
    POP = "pop"
    RNB = "rnb"
    TRAP = "trap"
    DRILL = "drill"
    AFROBEATS = "afrobeats"
    DANCEHALL = "dancehall"
    REGGAETON = "reggaeton"
    OTHER = "other"


# ─── Models ──────────────────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(String(500))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    stripe_customer_id: Mapped[str | None] = mapped_column(String(100), unique=True)
    credits: Mapped[int] = mapped_column(Integer, default=0)
    free_previews_used: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    # Relationships
    subscription: Mapped["Subscription | None"] = relationship(back_populates="user", uselist=False)
    jobs: Mapped[list["GenerationJob"]] = relationship(back_populates="user")
    tracks: Mapped[list["Track"]] = relationship(back_populates="user")
    credit_transactions: Mapped[list["CreditTransaction"]] = relationship(back_populates="user")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    stripe_subscription_id: Mapped[str] = mapped_column(String(100), unique=True)
    stripe_price_id: Mapped[str] = mapped_column(String(100))
    tier: Mapped[SubscriptionTier] = mapped_column(Enum(SubscriptionTier), default=SubscriptionTier.FREE)
    status: Mapped[SubscriptionStatus] = mapped_column(Enum(SubscriptionStatus))
    current_period_start: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    current_period_end: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    cancel_at_period_end: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    user: Mapped["User"] = relationship(back_populates="subscription")


class AudioAsset(Base):
    """Stores metadata for uploaded audio files (beats, voice samples)."""
    __tablename__ = "audio_assets"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    asset_type: Mapped[str] = mapped_column(String(20))  # "beat" | "voice_sample"
    original_filename: Mapped[str] = mapped_column(String(255))
    storage_key: Mapped[str] = mapped_column(String(500), unique=True)
    file_size_bytes: Mapped[int] = mapped_column(BigInteger)
    duration_seconds: Mapped[float | None] = mapped_column(Float)
    sample_rate: Mapped[int | None] = mapped_column(Integer)
    bpm: Mapped[float | None] = mapped_column(Float)
    key: Mapped[str | None] = mapped_column(String(10))  # Detected musical key
    genre_detected: Mapped[str | None] = mapped_column(String(50))
    waveform_data: Mapped[str | None] = mapped_column(Text)  # JSON array for waveform viz
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class GenerationJob(Base):
    """Tracks async AI generation tasks (Celery jobs)."""
    __tablename__ = "generation_jobs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    celery_task_id: Mapped[str | None] = mapped_column(String(100), unique=True, index=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    beat_asset_id: Mapped[str] = mapped_column(ForeignKey("audio_assets.id"))
    voice_asset_id: Mapped[str] = mapped_column(ForeignKey("audio_assets.id"))
    job_type: Mapped[JobType] = mapped_column(Enum(JobType))
    status: Mapped[JobStatus] = mapped_column(Enum(JobStatus), default=JobStatus.PENDING, index=True)
    genre: Mapped[Genre | None] = mapped_column(Enum(Genre))
    style_prompt: Mapped[str | None] = mapped_column(Text)       # User's mood/style description
    generated_lyrics: Mapped[str | None] = mapped_column(Text)
    error_message: Mapped[str | None] = mapped_column(Text)
    progress_percent: Mapped[int] = mapped_column(Integer, default=0)
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    user: Mapped["User"] = relationship(back_populates="jobs")
    beat_asset: Mapped["AudioAsset"] = relationship(foreign_keys=[beat_asset_id])
    voice_asset: Mapped["AudioAsset"] = relationship(foreign_keys=[voice_asset_id])
    track: Mapped["Track | None"] = relationship(back_populates="job", uselist=False)

    __table_args__ = (
        Index("ix_jobs_user_status", "user_id", "status"),
    )


class Track(Base):
    """A completed generated track (preview or full)."""
    __tablename__ = "tracks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    job_id: Mapped[str] = mapped_column(ForeignKey("generation_jobs.id"), unique=True)
    title: Mapped[str] = mapped_column(String(200))
    is_preview: Mapped[bool] = mapped_column(Boolean, default=True)
    storage_key: Mapped[str] = mapped_column(String(500), unique=True)
    watermarked_key: Mapped[str | None] = mapped_column(String(500))  # Preview has watermark
    duration_seconds: Mapped[float] = mapped_column(Float)
    file_size_bytes: Mapped[int] = mapped_column(BigInteger)
    play_count: Mapped[int] = mapped_column(Integer, default=0)
    share_count: Mapped[int] = mapped_column(Integer, default=0)
    public_share_token: Mapped[str | None] = mapped_column(String(100), unique=True, index=True)
    lyrics: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    user: Mapped["User"] = relationship(back_populates="tracks")
    job: Mapped["GenerationJob"] = relationship(back_populates="track")


class CreditTransaction(Base):
    """Audit log for credit purchases and usage."""
    __tablename__ = "credit_transactions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    amount: Mapped[int] = mapped_column(Integer)  # Positive = purchase, negative = spend
    balance_after: Mapped[int] = mapped_column(Integer)
    transaction_type: Mapped[str] = mapped_column(String(50))  # "purchase" | "spend" | "refund" | "bonus"
    description: Mapped[str] = mapped_column(String(255))
    stripe_payment_intent_id: Mapped[str | None] = mapped_column(String(100))
    related_track_id: Mapped[str | None] = mapped_column(ForeignKey("tracks.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    user: Mapped["User"] = relationship(back_populates="credit_transactions")
