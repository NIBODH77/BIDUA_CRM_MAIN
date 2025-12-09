
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr
    department: str
    role: str = "employee"
    is_active: bool = True

class UserRead(BaseModel):
    id: int
    username: str
    email: str
    role: str
    department: str
    is_active: bool

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str
    department: str
    is_active: bool = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None
    department: Optional[str] = None
    is_active: Optional[bool] = None

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Optional[UserRead] = None

class TokenData(BaseModel):
    username: Optional[str] = None
