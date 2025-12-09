# # from fastapi import FastAPI, Request
# # from fastapi.responses import JSONResponse
# # # from fastapi.staticfiles import StaticFiles
# # from sqlalchemy import text
# # from app.api.v1.api import api_router
# # from app.core.settings import get_settings
# # from app.core.database import engine
# # from app.models.models import Base
# # from starlette.middleware.sessions import SessionMiddleware
# # import os





# # # Create FastAPI app with optimized settings
# # app = FastAPI()



# # SECRET_KEY = os.environ.get("SECRET_KEY", "logan")
# # app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

# # # Get settings
# # settings = get_settings()

# # # Create database tables (sync for initial setup)
# # Base.metadata.create_all(bind=engine)





# # # Include routers
# # app.include_router(api_router, prefix=settings.API_V1_STR)


# # @app.get("/")
# # async def root(request: Request):
# #     """Root endpoint with performance info"""
# #     return {
# #         "message": "FastAPI Backend is running! - Optimized for 1000+ users",
# #         "version": settings.VERSION,
# #         "docs": "/docs",
# #         "status": "healthy",
   
# #     }

# # @app.get("/health")
# # async def health_check(request: Request):
# #     """Enhanced health check with database connectivity"""
    
# #     return {
# #         "status": "healthy",
# #         "database": "connected",
# #         "version": settings.VERSION,
# #         "timestamp": "2025-09-20T09:38:00Z"
# #     }


# from fastapi import FastAPI, Request
# import os
# from app.core.settings import get_settings
# from app.core.database import async_engine, Base, init_db
# from app.api.v1.api import api_router

# # Get settings
# settings = get_settings()
# SECRET_KEY = os.environ.get("SECRET_KEY", settings.SECRET_KEY)

# # Create FastAPI app
# app = FastAPI(title=settings.PROJECT_NAME, debug=settings.DEBUG)

# # Async table creation on startup
# @app.on_event("startup")
# async def on_startup():
#     await init_db()

# # Include API routers
# app.include_router(api_router, prefix=settings.API_V1_STR)

# # Root endpoint
# @app.get("/")
# async def root(request: Request):
#     return {
#         "message": "FastAPI Backend is running! - Optimized",
#         "version": settings.VERSION,
#         "status": "healthy",
#         "docs": "/docs"
#     }

# # Health endpoint
# @app.get("/health")
# async def health_check(request: Request):
#     return {
#         "status": "healthy",
#         "database": "connected",
#         "version": settings.VERSION
#     }



# from fastapi import FastAPI
# from app.core.settings import get_settings
# from app.core.database import async_engine, Base
# # from app.api.v1.api import api_router  # ✅ import api_router from v1/api.py


# # Get settings
# settings = get_settings()

# # Initialize FastAPI app
# app = FastAPI(
#     title=settings.PROJECT_NAME,
#     debug=settings.DEBUG,
#     version=settings.VERSION
# )

# # Include API router
# app.include_router(api_router, prefix=settings.API_V1_STR)


# # Async table creation on startup
# @app.on_event("startup")
# async def on_startup():
#     async with async_engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)

# # Root endpoint
# @app.get("/")
# async def root():
#     return {
#         "message": "FastAPI Backend is running! 🚀",
#         "version": settings.VERSION,
#         "status": "healthy",
#         "docs": "/docs"
#     }

# # Health check
# @app.get("/health")
# async def health_check():
#     return {
#         "status": "healthy",
#         "database": "connected",
#         "version": settings.VERSION
#     }




from fastapi import FastAPI
from app.core.settings import get_settings
from app.core.database import async_engine, Base
from app.api.v1.api import api_router  # ✅ import the router

from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles





# Get settings
settings = get_settings()

# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    debug=settings.DEBUG,
    version=settings.VERSION
)


# ✅ Step 1: CORS setup (ye zaroori hai React se connect hone ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API router from api.py
app.include_router(api_router, prefix=settings.API_V1_STR)



# ✅ Mount static folder for uploaded images
app.mount("/uploads", StaticFiles(directory="app/upload/images"), name="uploads")



# Async table creation on startup
@app.on_event("startup")
async def on_startup():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "FastAPI Backend is running! 🚀",
        "version": settings.VERSION,
        "status": "healthy",
        "docs": "/docs"
    }

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "version": settings.VERSION
    }

