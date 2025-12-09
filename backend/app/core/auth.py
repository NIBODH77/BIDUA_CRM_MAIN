
# from datetime import datetime, timedelta, timezone
# from typing import Optional, Union, Any
# from jose import JWTError, jwt
# from passlib.context import CryptContext
# from fastapi import HTTPException, status, Depends
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from sqlalchemy.orm import Session
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import select
# from app.core.settings import get_settings
# from app.core.database import get_db
# from app import crud
# from app.crud.users import user as user_crud
# from app.models.models import User


# settings = get_settings()
# security = HTTPBearer()

# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     """Verify a password against its hash"""
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password: str) -> str:
#     """Hash a password"""
#     return pwd_context.hash(password)

# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
#     to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})

#     # ensure sub is string
#     if "sub" in to_encode:
#         to_encode["sub"] = str(to_encode["sub"])

#     encoded_jwt = jwt.encode(
#         to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
#     )
#     return encoded_jwt


# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
#     to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})

#     # ensure sub is string
#     if "sub" in to_encode:
#         to_encode["sub"] = str(to_encode["sub"])

#     encoded_jwt = jwt.encode(
#         to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
#     )
#     return encoded_jwt


# def verify_token(token: str) -> Optional[dict]:
#     """Verify and decode JWT token"""
#     try:
#         payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
#         return payload
#     except JWTError:
#         return None



# def get_current_user_from_token(
#     credentials: HTTPAuthorizationCredentials = Depends(security),
#     db: Session = Depends(get_db)
# ):
#     """Get current user from JWT token"""
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
    
#     try:
#         payload = verify_token(credentials.credentials)
#         if payload is None:
#             raise credentials_exception
        
#         user_id: int = payload.get("sub")
#         if user_id is None:
#             raise credentials_exception
            
#     except JWTError:
#         raise credentials_exception
    
#     user = user_crud.get(db, id=user_id)
#     if user is None:
#         raise credentials_exception
    
#     return user



# # Dependency for protected routes
# async def get_current_user(
#     credentials: HTTPAuthorizationCredentials = Depends(security),
#     db: Session = Depends(get_db)
# ):
#     """Dependency to get current authenticated user"""
#     return get_current_user_from_token(credentials, db)

# async def get_current_user(
#     credentials: HTTPAuthorizationCredentials = Depends(security),
#     db: Session = Depends(get_db)
# ):
#     """Dependency to get current authenticated user"""
#     return await get_current_user_from_token(credentials, db)  # ✅ await lagaya



# # Optional: Dependency for active users only
# async def get_current_active_user(
#     current_user = Depends(get_current_user)
# ):
#     """Get current active user"""
#     if not current_user.is_active:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user







from datetime import datetime, timedelta, timezone
from typing import Optional, Union, Any
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.settings import get_settings
from app.core.database import get_db
from app.models.models import User, Employee
from sqlalchemy.orm import Session

settings = get_settings()
security = HTTPBearer()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})

    # ensure sub is string
    if "sub" in to_encode:
        to_encode["sub"] = str(to_encode["sub"])

    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None

# ASYNC VERSION - if you're using async database
async def get_current_user_from_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """Get current user from JWT token"""
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
    
    # Use async database query
    from app.crud.users import user as user_crud
    user = await user_crud.get(db, id=int(user_id))
    if user is None:
        raise credentials_exception
    
    return user

# ASYNC VERSION
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """Dependency to get current authenticated user"""
    return await get_current_user_from_token(credentials, db)

# ASYNC VERSION
async def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """Get current active user"""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user



# ASYNC VERSION
# In your auth.py
async def get_current_employee(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> Employee:
    from sqlalchemy import select
    result = await db.execute(select(Employee).filter(Employee.user_id == current_user.id))
    employee = result.scalar_one_or_none()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee profile not found"
        )
    
    return employee


# ASYNC VERSION
async def get_current_active_employee(current_employee: Employee = Depends(get_current_employee)) -> Employee:
    """
    Get current active employee
    """
    if current_employee.status != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee account is not active"
        )
    return current_employee

# ASYNC VERSION
async def get_optional_employee(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
) -> Optional[Employee]:
    """
    Get employee record if exists, otherwise return None
    """
    try:
        from app.crud.employees import employee as employee_crud
        employee = await employee_crud.get_by_user_id(db, user_id=current_user.id)
        return employee
    except Exception:
        return None


async def get_by_user_id(self, db: AsyncSession, user_id: int) -> Optional[Employee]:
    result = await db.execute(
        select(Employee).where(Employee.user_id == user_id)
    )
    return result.scalar_one_or_none()