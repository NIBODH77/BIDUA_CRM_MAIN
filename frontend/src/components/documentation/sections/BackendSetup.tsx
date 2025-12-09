import React from 'react';
import { Server, Database, Shield, Code, Package, Settings } from 'lucide-react';

const BackendSetup: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Backend Setup (FastAPI + PostgreSQL)</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete guide to set up the FastAPI backend with PostgreSQL database, authentication, and API endpoints.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Prerequisites
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Required Software</h4>
            <ul className="text-green-800 space-y-2">
              <li>• <strong>Python 3.11+</strong> - Programming language</li>
              <li>• <strong>PostgreSQL 14+</strong> - Database server</li>
              <li>• <strong>pip</strong> - Package manager</li>
              <li>• <strong>virtualenv/venv</strong> - Virtual environment</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Development Tools</h4>
            <ul className="text-green-800 space-y-2">
              <li>• <strong>PyCharm/VS Code</strong> - IDE</li>
              <li>• <strong>Postman/Insomnia</strong> - API testing</li>
              <li>• <strong>pgAdmin</strong> - Database management</li>
              <li>• <strong>Docker</strong> - Containerization (optional)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Project Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          1. Project Setup
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Create project directory
mkdir bidua-erp-backend
cd bidua-erp-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Create requirements.txt
cat > requirements.txt << EOF
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.12.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
email-validator==2.1.0
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
EOF

# Install dependencies
pip install -r requirements.txt`}
        </pre>
      </div>

      {/* Project Structure */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Server className="w-5 h-5 mr-2" />
          2. Project Structure
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Backend Directory Structure</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`bidua-erp-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base.py         # Base model class
│   │   ├── user.py         # User model
│   │   ├── employee.py     # Employee model
│   │   ├── lead.py         # Lead model
│   │   ├── attendance.py   # Attendance model
│   │   ├── task.py         # Task model
│   │   └── payroll.py      # Payroll model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py         # User Pydantic schemas
│   │   ├── employee.py     # Employee schemas
│   │   ├── lead.py         # Lead schemas
│   │   ├── attendance.py   # Attendance schemas
│   │   ├── task.py         # Task schemas
│   │   └── common.py       # Common schemas
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py         # Dependencies
│   │   ├── auth.py         # Authentication endpoints
│   │   ├── users.py        # User management
│   │   ├── employees.py    # Employee endpoints
│   │   ├── leads.py        # Lead endpoints
│   │   ├── attendance.py   # Attendance endpoints
│   │   ├── tasks.py        # Task endpoints
│   │   ├── payroll.py      # Payroll endpoints
│   │   └── documents.py    # Document endpoints`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Supporting Modules</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py     # Password hashing, JWT
│   │   ├── permissions.py  # RBAC implementation
│   │   ├── exceptions.py   # Custom exceptions
│   │   └── middleware.py   # Custom middleware
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py # Authentication logic
│   │   ├── employee_service.py
│   │   ├── lead_service.py
│   │   ├── email_service.py
│   │   └── file_service.py
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── helpers.py      # Utility functions
│   │   ├── validators.py   # Custom validators
│   │   └── formatters.py   # Data formatters
│   └── tests/
│       ├── __init__.py
│       ├── conftest.py     # Test configuration
│       ├── test_auth.py    # Authentication tests
│       ├── test_employees.py
│       └── test_leads.py
├── alembic/                # Database migrations
│   ├── versions/
│   ├── env.py
│   └── script.py.mako
├── requirements.txt        # Python dependencies
├── .env                   # Environment variables
├── .gitignore
├── README.md
└── Dockerfile             # Container configuration`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Main Application */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Main Application (main.py)</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager

from app.core.config import settings
from app.database import engine
from app.models import Base
from app.api import auth, users, employees, leads, attendance, tasks, payroll, documents

# Create database tables
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown
    pass

app = FastAPI(
    title="BIDUA ERP API",
    description="Enterprise Resource Planning System for Beauty & Cosmetics Business",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Include API routers
app.include_router(
    auth.router, 
    prefix="/api/auth", 
    tags=["Authentication"]
)
app.include_router(
    users.router, 
    prefix="/api/users", 
    tags=["User Management"],
    dependencies=[Depends(security)]
)
app.include_router(
    employees.router, 
    prefix="/api/employees", 
    tags=["Employee Management"],
    dependencies=[Depends(security)]
)
app.include_router(
    leads.router, 
    prefix="/api/leads", 
    tags=["CRM - Leads"],
    dependencies=[Depends(security)]
)
app.include_router(
    attendance.router, 
    prefix="/api/attendance", 
    tags=["HRMS - Attendance"],
    dependencies=[Depends(security)]
)
app.include_router(
    tasks.router, 
    prefix="/api/tasks", 
    tags=["HRMS - Tasks"],
    dependencies=[Depends(security)]
)
app.include_router(
    payroll.router, 
    prefix="/api/payroll", 
    tags=["HRMS - Payroll"],
    dependencies=[Depends(security)]
)
app.include_router(
    documents.router, 
    prefix="/api/documents", 
    tags=["Document Management"],
    dependencies=[Depends(security)]
)

@app.get("/")
async def root():
    return {
        "message": "BIDUA ERP API is running",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": "2025-01-15T10:30:00Z"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )`}
        </pre>
      </div>

      {/* Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          4. Configuration Setup
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Environment Variables (.env)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Database Configuration
DATABASE_URL=postgresql://bidua_user:secure_password@localhost:5432/bidua_erp
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bidua_erp
DB_USER=bidua_user
DB_PASSWORD=secure_password

# Security Configuration
SECRET_KEY=your-super-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Application Configuration
APP_NAME=BIDUA ERP API
APP_VERSION=1.0.0
DEBUG=True
ALLOWED_HOSTS=["http://localhost:5173", "http://localhost:3000"]

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Storage Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_FILE_TYPES=["pdf", "doc", "docx", "jpg", "png"]`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Configuration Class (config.py)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "bidua_erp"
    DB_USER: str = "bidua_user"
    DB_PASSWORD: str

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Application
    APP_NAME: str = "BIDUA ERP API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ALLOWED_HOSTS: List[str] = ["http://localhost:5173"]

    # Email
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""

    # File Storage
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE: int = 10485760  # 10MB
    ALLOWED_FILE_TYPES: List[str] = ["pdf", "doc", "docx", "jpg", "png"]

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()`}
            </pre>
          </div>
        </div>
      </div>

      {/* Database Connection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          5. Database Connection (database.py)
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=10,
    max_overflow=20,
    echo=settings.DEBUG  # Log SQL queries in debug mode
)

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
)

# Base class for all models
Base = declarative_base()

# Metadata for migrations
metadata = MetaData()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Database initialization
def init_db():
    """Initialize database with tables and initial data"""
    Base.metadata.create_all(bind=engine)
    
    # Create initial data (roles, permissions, admin user)
    from app.services.init_service import create_initial_data
    create_initial_data()

# Database health check
async def check_db_health():
    """Check database connectivity"""
    try:
        db = SessionLocal()
        db.execute("SELECT 1")
        db.close()
        return True
    except Exception:
        return False`}
        </pre>
      </div>

      {/* Authentication System */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          6. Authentication System
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Security Module (core/security.py)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`from datetime import datetime, timedelta
from typing import Optional, Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database import get_db
from app.models.user import User

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT token handling
security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = verify_token(credentials.credentials)
        if payload is None:
            raise credentials_exception
        
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    
    return user

def require_role(required_role: str):
    """Decorator to require specific role"""
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role != required_role and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    return role_checker`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Authentication Endpoints (api/auth.py)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRead, Token
from app.core.security import (
    verify_password, 
    create_access_token, 
    get_current_user
)

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Authenticate user and return access token"""
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, 
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=UserRead)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """Logout user (invalidate token on client side)"""
    return {"message": "Successfully logged out"}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Development Commands */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">7. Development Commands</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Running the Application</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Start with specific log level
uvicorn app.main:app --reload --log-level debug

# Production server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4

# With Gunicorn (production)
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Database Operations</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head

# Downgrade migration
alembic downgrade -1

# Check current revision
alembic current

# Show migration history
alembic history`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendSetup;