
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.auth.role import role_permission

class Permission(Base):
    __tablename__ = "permissions"
    __table_args__ = {'extend_existing': True}
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(128), unique=True, nullable=False)
    description = Column(String(255), nullable=True)

    roles = relationship("Role", secondary=role_permission, back_populates="permissions")
