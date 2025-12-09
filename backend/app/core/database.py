from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from typing import AsyncGenerator
import os
from dotenv import load_dotenv
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
import ssl

# Load environment variables
load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set. Please check your .env file.")

connect_args = {}

if DATABASE_URL:
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
    elif DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

    # Parse URL to handle sslmode parameter for asyncpg
    parsed = urlparse(DATABASE_URL)
    query_params = parse_qs(parsed.query)

    if 'sslmode' in query_params:
        sslmode = query_params.pop('sslmode')[0]
        if sslmode in ('require', 'verify-ca', 'verify-full'):
            ssl_context = ssl.create_default_context()
            ssl_context.check_hostname = False
            ssl_context.verify_mode = ssl.CERT_NONE
            connect_args['ssl'] = ssl_context
        # Rebuild URL without sslmode
        new_query = urlencode(query_params, doseq=True)
        DATABASE_URL = urlunparse((parsed.scheme, parsed.netloc, parsed.path, parsed.params, new_query, parsed.fragment))

async_engine = create_async_engine(DATABASE_URL, echo=False, future=True, connect_args=connect_args)

AsyncSessionLocal = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False
)

Base = declarative_base()

async def get_db() -> AsyncGenerator:
    async with AsyncSessionLocal() as session:
        yield session

async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

def get_target_metadata():
    return Base.metadata