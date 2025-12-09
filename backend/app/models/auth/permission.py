
from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Permission(Base):
    __tablename__ = "permissions"
    
    id = Column(Integer, primary_key=True)
    code = Column(String(128), unique=True, nullable=False)
    description = Column(String(255))
