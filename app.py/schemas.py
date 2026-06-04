from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator

from app.models.user import Genre, JobStatus, JobType, SubscriptionTier


# ─── Auth ─────────────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=100)
    display_name: str = Field(min_length=2, max_length=100)

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one number")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


# ─── User ─────────────────────────────────────────────────────────────────────

class UserPublic(BaseModel):
    id: str
    email: str
    display_name: str
    avatar_url: Optional[str]
    credits: int
    free_previews_used: int
    is_verified: bool
    subscription_tier: Optional[SubscriptionTier] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    display_name: Optional[str] = Field(None, min_length=2, max_length=100)
    avatar_url: Optional[str] = None


# ─── Audio Assets ─────────────────────────────────────────────────────────────

class AudioAssetResponse(BaseModel):
    id: str
    asset_type: str
    original_filename: str
    duration_seconds: Optional[float]
    bpm: Optional[float]
    key: Optional[str]
    genre_detected: Optional[str]
    waveform_data: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class UploadBeatResponse(AudioAssetResponse):
    upload_url: Optional[str] = None  # Presigned URL if needed


# ─── Generation Jobs ──────────────────────────────────────────────────────────

class CreateJobRequest(BaseModel):
    beat_asset_id: str
    voice_asset_id: str
    job_type: JobType = JobType.PREVIEW
    genre: Optional[Genre] = None
    style_prompt: Optional[str] = Field(None, max_length=500)

    @field_validator("style_prompt")
    @classmethod
    def sanitize_prompt(cls, v: Optional[str]) -> Optional[str]:
        if v:
            return v.strip()
        return v


class JobStatusResponse(BaseModel):
    id: str
    celery_task_id: Optional[str]
    job_type: JobType
    status: JobStatus
    progress_percent: int
    genre: Optional[Genre]
    style_prompt: Optional[str]
    generated_lyrics: Optional[str]
    error_message: Optional[str]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    created_at: datetime
    track: Optional["TrackResponse"] = None

    model_config = {"from_attributes": True}


# ─── Tracks ───────────────────────────────────────────────────────────────────

class TrackResponse(BaseModel):
    id: str
    title: str
    is_preview: bool
    duration_seconds: float
    play_count: int
    share_count: int
    public_share_token: Optional[str]
    lyrics: Optional[str]
    stream_url: Optional[str] = None   # Signed URL, injected at response time
    download_url: Optional[str] = None # Only for full tracks the user owns
    created_at: datetime

    model_config = {"from_attributes": True}


class TrackListResponse(BaseModel):
    tracks: list[TrackResponse]
    total: int
    page: int
    page_size: int


# ─── Payments ─────────────────────────────────────────────────────────────────

class CreateCheckoutRequest(BaseModel):
    price_id: str
    success_url: str
    cancel_url: str


class CheckoutSessionResponse(BaseModel):
    session_id: str
    checkout_url: str


class SubscriptionResponse(BaseModel):
    id: str
    tier: SubscriptionTier
    status: str
    current_period_end: Optional[datetime]
    cancel_at_period_end: bool

    model_config = {"from_attributes": True}


class CreditTransactionResponse(BaseModel):
    id: str
    amount: int
    balance_after: int
    transaction_type: str
    description: str
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Share ────────────────────────────────────────────────────────────────────

class PublicTrackResponse(BaseModel):
    """Minimal track info for public share page."""
    title: str
    duration_seconds: float
    stream_url: str
    created_by: str  # User display name, not email
    is_preview: bool


# Update forward reference
JobStatusResponse.model_rebuild()
