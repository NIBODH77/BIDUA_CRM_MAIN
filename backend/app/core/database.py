

# # from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# # from sqlalchemy.orm import sessionmaker, declarative_base
# # import os
# # # from app.core.settings import get_settings

# # # setttings = get_settings()





# # DATABASE_URL = os.getenv(
# #     "DATABASE_URL",
# #     "postgresql+asyncpg://postgres:nibodh%40123@localhost/odhreceptiondb"
# # )

# # engine = create_async_engine(DATABASE_URL, echo=False, future=True)

# # AsyncSessionLocal = sessionmaker(
# #     bind=engine,
# #     class_=AsyncSession,
# #     expire_on_commit=False,
# #     autoflush=False,
# #     autocommit=False
# # )

# # Base = declarative_base()

# # async def get_db():
# #     async with AsyncSessionLocal() as session:
# #         yield session


# # # ✅ ye function tables create karega
# # async def init_db():
# #     async with engine.begin() as conn:
# #         await conn.run_sync(Base.metadata.create_all)



# # def get_target_metadata():
# #     return Base.metadata




# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# from sqlalchemy.orm import sessionmaker, declarative_base
# import os

# DATABASE_URL = os.getenv(
#     "DATABASE_URL",
#     "postgresql+asyncpg://postgres:nibodh%40123@localhost/odhreceptiondb"
# )

# # Async engine for app
# async_engine = create_async_engine(DATABASE_URL, echo=False, future=True)

# AsyncSessionLocal = sessionmaker(
#     bind=async_engine,
#     class_=AsyncSession,
#     expire_on_commit=False
# )

# Base = declarative_base()

# async def get_db():
#     async with AsyncSessionLocal() as session:
#         yield session



# database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:nibodh%40123@localhost/biduadb"
)

async_engine = create_async_engine(DATABASE_URL, echo=False, future=True)

AsyncSessionLocal = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

def get_target_metadata():
    return Base.metadata
