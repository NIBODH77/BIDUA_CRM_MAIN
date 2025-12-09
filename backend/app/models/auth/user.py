
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from datetime import datetime
import enum
from app.core.database import Base

class UserRoleEnum(str, enum.Enum):
    admin = "admin"
    manager = "manager"
    employee = "employee"
    sales_executive = "sales_executive"
    documentation = "documentation"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRoleEnum), default=UserRoleEnum.employee, nullable=False)
    department = Column(String(100), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
