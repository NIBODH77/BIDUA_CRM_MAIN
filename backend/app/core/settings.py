from typing import Any, Dict, Optional, List
from pydantic_settings import BaseSettings
import os
from functools import lru_cache






class Settings(BaseSettings):
    # ------------------------
    # Project Info
    # ------------------------
    PROJECT_NAME: str = "FastAPI Backend - Optimized"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = True


    # Performance
    CACHE_TTL: int = 300  # 5 minutes
    MAX_CONNECTIONS_PER_USER: int = 10



    # ------------------------
    # Database
    # ------------------------
    DATABASE_URL: str = (
        "postgresql+asyncpg://postgres:nibodh%40123@localhost:5432/bidua_db"

    )


        # ------------------------
    # Security & JWT
    # ------------------------
    SECRET_KEY: str = "logan"  # ✅ Production mein strong key use karo
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # ------------------------
    # DLT IDs
    # ------------------------
    DLT_ENTITY_ID: str | None = "3686"
    DLT_TEMPLATE_ID_OTP: str | None = "1707175239899941851"

    # ------------------------
    # Security

    # Security config
    SECRET_KEY = os.getenv("SECRET_KEY", "logan")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    # CORS - Allow frontend origin
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5000",
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://0.0.0.0:5000",
        "http://0.0.0.0:5173",
        "https://*.replit.dev",
        "https://*.repl.co"
    ]

# ek global object
settings = Settings()

# dependency injection ke liye function
def get_settings() -> Settings:
    return settings