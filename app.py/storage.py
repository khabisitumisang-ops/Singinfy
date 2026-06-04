import asyncio
import io
from typing import Optional
import boto3
from botocore.exceptions import ClientError
from botocore.config import Config

from app.core.config import settings


class StorageService:
    """Handles all S3 / Cloudflare R2 file operations."""

    def __init__(self):
        kwargs = dict(
            aws_access_key_id=settings.storage_access_key_id,
            aws_secret_access_key=settings.storage_secret_access_key,
            region_name=settings.storage_region,
            config=Config(signature_version="s3v4"),
        )
        if settings.storage_endpoint_url:
            kwargs["endpoint_url"] = settings.storage_endpoint_url

        self._client = boto3.client("s3", **kwargs)
        self._bucket = settings.storage_bucket_name

    # ─── Upload ───────────────────────────────────────────────────────────────

    async def upload_file(
        self,
        data: bytes,
        storage_key: str,
        content_type: str = "audio/mpeg",
        public: bool = False,
    ) -> str:
        """Upload bytes to storage and return the CDN URL."""
        extra_args: dict = {"ContentType": content_type}
        if public:
            extra_args["ACL"] = "public-read"

        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            None,
            lambda: self._client.put_object(
                Bucket=self._bucket,
                Key=storage_key,
                Body=data,
                **extra_args,
            ),
        )
        return self._cdn_url(storage_key)

    async def upload_fileobj(
        self,
        fileobj: io.BytesIO,
        storage_key: str,
        content_type: str = "audio/mpeg",
    ) -> str:
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            None,
            lambda: self._client.upload_fileobj(
                fileobj,
                self._bucket,
                storage_key,
                ExtraArgs={"ContentType": content_type},
            ),
        )
        return self._cdn_url(storage_key)

    # ─── Download ─────────────────────────────────────────────────────────────

    async def download_file(self, storage_key: str) -> bytes:
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: self._client.get_object(Bucket=self._bucket, Key=storage_key),
        )
        return response["Body"].read()

    # ─── Presigned URLs ───────────────────────────────────────────────────────

    def generate_presigned_download_url(
        self, storage_key: str, expires_in: int = 3600
    ) -> str:
        """Generate a time-limited signed URL for streaming/download."""
        return self._client.generate_presigned_url(
            "get_object",
            Params={"Bucket": self._bucket, "Key": storage_key},
            ExpiresIn=expires_in,
        )

    def generate_presigned_upload_url(
        self, storage_key: str, content_type: str, expires_in: int = 900
    ) -> str:
        """Generate a signed URL for direct browser-to-storage upload."""
        return self._client.generate_presigned_url(
            "put_object",
            Params={
                "Bucket": self._bucket,
                "Key": storage_key,
                "ContentType": content_type,
            },
            ExpiresIn=expires_in,
        )

    # ─── Management ───────────────────────────────────────────────────────────

    async def delete_file(self, storage_key: str) -> None:
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            None,
            lambda: self._client.delete_object(Bucket=self._bucket, Key=storage_key),
        )

    async def file_exists(self, storage_key: str) -> bool:
        try:
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(
                None,
                lambda: self._client.head_object(Bucket=self._bucket, Key=storage_key),
            )
            return True
        except ClientError:
            return False

    # ─── Helpers ──────────────────────────────────────────────────────────────

    def _cdn_url(self, storage_key: str) -> str:
        return f"{settings.cdn_base_url}/{storage_key}"

    @staticmethod
    def beat_key(user_id: str, asset_id: str, filename: str) -> str:
        ext = filename.rsplit(".", 1)[-1].lower()
        return f"beats/{user_id}/{asset_id}.{ext}"

    @staticmethod
    def voice_key(user_id: str, asset_id: str) -> str:
        return f"voices/{user_id}/{asset_id}.wav"

    @staticmethod
    def preview_track_key(user_id: str, track_id: str) -> str:
        return f"tracks/previews/{user_id}/{track_id}.mp3"

    @staticmethod
    def full_track_key(user_id: str, track_id: str) -> str:
        return f"tracks/full/{user_id}/{track_id}.mp3"

    @staticmethod
    def watermarked_key(user_id: str, track_id: str) -> str:
        return f"tracks/watermarked/{user_id}/{track_id}.mp3"


storage_service = StorageService()
