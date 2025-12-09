
from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.auth.user import UserRead, UserCreate, UserUpdate, Token
from app.crud.auth.user import user
from app.core.auth import (
    verify_password, 
    create_access_token, 
    get_current_active_user,
    get_password_hash
)
from app.core.settings import get_settings

router = APIRouter()
settings = get_settings()

@router.post("/login", response_model=Token)
async def login(
    email: str = Form(...),
    password: str = Form(...),
    db: AsyncSession = Depends(get_db),
) -> Any:
    """User login endpoint"""
    login_user = await user.get_by_email(db, email=email)
    if not login_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    if not verify_password(password, login_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    if not login_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(login_user.id)}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": login_user
    }

@router.post("/register", response_model=UserRead)
async def register(
    *,
    db: AsyncSession = Depends(get_db),
    user_in: UserCreate,
) -> Any:
    """Register new user"""
    existing_user = await user.get_by_email(db, email=user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists."
        )

    user_data = user_in.model_dump()
    user_data["hashed_password"] = get_password_hash(user_in.password)
    del user_data["password"]

    new_user = await user.create(db, obj_in=user_data)
    return new_user

@router.get("/me", response_model=UserRead)
async def read_current_user(
    current_user=Depends(get_current_active_user)
) -> Any:
    """Get current user profile"""
    return current_user

@router.put("/me", response_model=UserRead)
async def update_current_user(
    *,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
    user_in: UserUpdate,
) -> Any:
    """Update current user profile"""
    updated_user = await user.update(db, db_obj=current_user, obj_in=user_in)
    return updated_user
