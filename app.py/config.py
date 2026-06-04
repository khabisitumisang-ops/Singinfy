from functools import lru_cache
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Application
    app_name: str = "Singify"
    app_env: str = "development"
    debug: bool = False
    secret_key: str
    allowed_origins: List[str] = ["http://localhost:3000"]

    # Database
    database_url: str
    database_pool_size: int = 20
    database_max_overflow: int = 40

    # Redis / Celery
    redis_url: str = "redis://localhost:6379/0"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/1"

    # Storage
    storage_bucket_name: str
    storage_region: str = "us-east-1"
    storage_access_key_id: str
    storage_secret_access_key: str
    storage_endpoint_url: Optional[str] = None  # None = AWS S3, set for R2
    cdn_base_url: str

    # Stripe
    stripe_secret_key: str
    stripe_webhook_secret: str
    stripe_price_id_monthly: str
    stripe_price_id_yearly: str
    stripe_price_id_credits_10: str
    stripe_price_id_credits_50: str

    # AI Services
    openai_api_key: str
    anthropic_api_key: str
    huggingface_token: Optional[str] = None

    # Audio Processing
    max_beat_file_size_mb: int = 50
    max_voice_sample_duration_seconds: int = 60
    preview_duration_seconds: int = 30
    full_track_max_duration_seconds: int = 180

    # Model Paths
    rvc_model_path: str = "/models/rvc"
    rvc_device: str = "cpu"
    xtts_model_path: str = "/models/xtts"
    demucs_model: str = "htdemucs"

    # Business Logic
    free_previews_per_user: int = 3
    credits_per_full_download: int = 1
    max_concurrent_jobs_per_user: int = 2

    # Monitoring
    sentry_dsn: Optional[str] = None

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"

    @property
    def max_beat_file_size_bytes(self) -> int:
        return self.max_beat_file_size_mb * 1024 * 1024


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
