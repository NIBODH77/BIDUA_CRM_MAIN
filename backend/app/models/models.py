

# import int
# from datetime import datetime, date
# from sqlalchemy import (
#     Column, String, Text, DateTime, Date, Boolean, ForeignKey,
#     Integer, Numeric, Enum, JSON, UniqueConstraint, TIMESTAMP, ARRAY, Float,
#     CheckConstraint, BigInteger, Table, Time
# )
# from sqlalchemy.dialects.postgresql import int, INET, JSONB
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import func, text
# from app.core.database import Base
# import enum


# # --------------------------
# # Enum Definitions
# # --------------------------

# class UserRoleEnum(str, enum.Enum):
#     admin = "admin"
#     manager = "manager"
#     employee = "employee"
#     documentation = "documentation"

# class AttendanceStatus(str, enum.Enum):
#     present = "present"
#     absent = "absent"
#     late = "late"
#     half_day = "half-day"
#     work_from_home = "work-from-home"

# class BreakType(str, enum.Enum):
#     lunch = "lunch"
#     tea = "tea"
#     personal = "personal"
#     meeting = "meeting"
#     other = "other"

# class LeaveType(str, enum.Enum):
#     casual = "casual"
#     sick = "sick"
#     annual = "annual"
#     maternity = "maternity"
#     paternity = "paternity"
#     emergency = "emergency"
#     bereavement = "bereavement"

# class LeaveStatus(str, enum.Enum):
#     pending = "pending"
#     approved = "approved"
#     rejected = "rejected"
#     cancelled = "cancelled"

# class LeadStatus(str, enum.Enum):
#     hot = "hot"
#     warm = "warm"
#     cold = "cold"

# class LeadStage(str, enum.Enum):
#     lead = "lead"
#     qualified = "qualified"
#     proposal = "proposal"
#     negotiation = "negotiation"
#     closed_won = "closed-won"
#     closed_lost = "closed-lost"

# class TicketPriority(str, enum.Enum):
#     low = "low"
#     medium = "medium"
#     high = "high"
#     urgent = "urgent"

# class TicketStatus(str, enum.Enum):
#     open = "open"
#     in_progress = "in-progress"
#     resolved = "resolved"
#     closed = "closed"

# class ActivityType(str, enum.Enum):
#     call = "call"
#     email = "email"
#     meeting = "meeting"
#     note = "note"
#     status_change = "status_change"

# class EmployeeStatus(str, enum.Enum):
#     active = "active"
#     inactive = "inactive"
#     terminated = "terminated"

# class GenderType(str, enum.Enum):
#     male = "male"
#     female = "female"
#     other = "other"

# class MaritalStatus(str, enum.Enum):
#     single = "single"
#     married = "married"
#     divorced = "divorced"
#     widowed = "widowed"

# class AddressType(str, enum.Enum):
#     current = "current"
#     permanent = "permanent"

# class AccountType(str, enum.Enum):
#     savings = "savings"
#     current = "current"
#     salary = "salary"

# class ProjectStatus(str, enum.Enum):
#     active = "active"
#     completed = "completed"
#     on_hold = "on-hold"
#     cancelled = "cancelled"

# class DependencyType(str, enum.Enum):
#     finish_to_start = "finish-to-start"
#     start_to_start = "start-to-start"
#     finish_to_finish = "finish-to-finish"
#     start_to_finish = "start-to-finish"

# class TaskPriority(str, enum.Enum):
#     low = "low"
#     medium = "medium"
#     high = "high"
#     critical = "critical"

# class ReviewType(str, enum.Enum):
#     annual = "annual"
#     quarterly = "quarterly"
#     probation = "probation"
#     promotion = "promotion"
#     pip = "pip"

# class ReviewStatus(str, enum.Enum):
#     draft = "draft"
#     in_progress = "in-progress"
#     completed = "completed"
#     approved = "approved"

# class GoalStatus(str, enum.Enum):
#     not_started = "not-started"
#     in_progress = "in-progress"
#     completed = "completed"
#     cancelled = "cancelled"

# class AchievementImpact(str, enum.Enum):
#     low = "low"
#     medium = "medium"
#     high = "high"
#     critical = "critical"

# class FeedbackType(str, enum.Enum):
#     peer = "peer"
#     manager = "manager"
#     report = "report"
#     self_review = "self-review"
#     other = "other"

# class PayrollStatus(str, enum.Enum):
#     draft = "draft"
#     processed = "processed"
#     paid = "paid"
#     cancelled = "cancelled"

# class ComponentType(str, enum.Enum):
#     allowance = "allowance"
#     deduction = "deduction"

# class CalculationType(str, enum.Enum):
#     fixed = "fixed"
#     percentage = "percentage"
#     formula = "formula"

# class DocumentType(str, enum.Enum):
#     offer_letter = "offer-letter"
#     salary_slip = "salary-slip"
#     id_card = "id-card"
#     experience_letter = "experience-letter"
#     policy = "policy"
#     contract = "contract"
#     certificate = "certificate"
#     other = "other"

# class AccessLevel(str, enum.Enum):
#     private = "private"
#     department = "department"
#     company = "company"
#     public = "public"

# # --------------------------
# # Association Tables
# # --------------------------

# role_permission = Table(
#     "role_permission",
#     Base.metadata,
#     Column("role_id", Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
#     Column("permission_id", Integer, ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True),
# )

# user_role = Table(
#     "user_role",
#     Base.metadata,
#     Column("user_id", int(as_int=True), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
#     Column("role_id", Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
# )

# # --------------------------
# # Core Authentication Tables
# # --------------------------

# class User(Base):
#     __tablename__ = "users"


#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String(50), unique=True, nullable=False)
#     email = Column(String(255), unique=True, nullable=False, index=True)
#     hashed_password = Column(String(255), nullable=False)
#     role = Column(Enum(UserRoleEnum), default=UserRoleEnum.employee, nullable=False)
#     department = Column(String(100), nullable=False)
#     is_active = Column(Boolean, default=True)
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     sessions = relationship("UserSession", back_populates="user", cascade="all, delete-orphan")
#     roles = relationship("Role", secondary=user_role, back_populates="users")


# class UserSession(Base):
#     __tablename__ = "user_sessions"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     user_id = Column(int(as_int=True), ForeignKey("users.id", ondelete="CASCADE"))
#     token_hash = Column(String(255), nullable=False)
#     refresh_token = Column(String(255), nullable=True)
#     expires_at = Column(DateTime(timezone=True), nullable=False)
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     ip_address = Column(INET, nullable=True)
#     user_agent = Column(Text, nullable=True)
#     is_active = Column(Boolean, default=True)

#     user = relationship("User", back_populates="sessions")

# class Role(Base):
#     __tablename__ = "roles"

#     id = Column(Integer, primary_key=True)
#     name = Column(String(100), unique=True, nullable=False)
#     description = Column(String(255), nullable=True)

#     permissions = relationship("Permission", secondary=role_permission, back_populates="roles")
#     users = relationship("User", secondary=user_role, back_populates="roles")

# class Permission(Base):
#     __tablename__ = "permissions"

#     id = Column(Integer, primary_key=True)
#     code = Column(String(128), unique=True, nullable=False)
#     description = Column(String(255), nullable=True)

#     roles = relationship("Role", secondary=role_permission, back_populates="permissions")

# # --------------------------
# # Employee Tables
# # --------------------------

# class Employee(Base):
#     __tablename__ = "employees"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     user_id = Column(int(as_int=True), ForeignKey("users.id", ondelete="SET NULL"), unique=True)
#     employee_id = Column(String(20), nullable=False, unique=True)
#     name = Column(String(255), nullable=False)
#     email = Column(String(255), nullable=False, unique=True)
#     phone = Column(String(20), nullable=False)
#     department = Column(String(100), nullable=False)
#     designation = Column(String(100), nullable=False)
#     manager_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="SET NULL"))
#     joining_date = Column(Date, nullable=False)
#     salary = Column(Numeric(10, 2), nullable=False)
#     status = Column(Enum(EmployeeStatus), default=EmployeeStatus.active)
#     address = Column(Text, nullable=False)
#     emergency_contact = Column(String(20), nullable=False)
#     avatar_url = Column(String(500))
#     date_of_birth = Column(Date)
#     gender = Column(Enum(GenderType))
#     marital_status = Column(Enum(MaritalStatus))
#     nationality = Column(String(100), default="Indian")
#     blood_group = Column(String(10))
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     manager = relationship("Employee", remote_side=[id])
#     bank_account = relationship("BankAccount", back_populates="employee", uselist=False, cascade="all, delete-orphan")
#     addresses = relationship("EmployeeAddress", back_populates="employee", cascade="all, delete-orphan")

# class BankAccount(Base):
#     __tablename__ = "bank_accounts"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), unique=True, nullable=False)
#     account_number = Column(String(50), nullable=False)
#     bank_name = Column(String(255), nullable=False)
#     ifsc_code = Column(String(20), nullable=False)
#     account_holder_name = Column(String(255), nullable=False)
#     account_type = Column(Enum(AccountType), default=AccountType.savings)
#     is_primary = Column(Boolean, default=True)
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     employee = relationship("Employee", back_populates="bank_account")

# class EmployeeAddress(Base):
#     __tablename__ = "employee_addresses"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     address_type = Column(Enum(AddressType), nullable=False)
#     line1 = Column(String(255), nullable=False)
#     line2 = Column(String(255))
#     city = Column(String(100), nullable=False)
#     state = Column(String(100), nullable=False)
#     postal_code = Column(String(20), nullable=False)
#     country = Column(String(100), default="India")
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     employee = relationship("Employee", back_populates="addresses")

# # --------------------------
# # Performance Review Tables
# # --------------------------

# class PerformanceReview(Base):
#     __tablename__ = "performance_reviews"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     review_type = Column(Enum(ReviewType), nullable=False)
#     review_date = Column(Date, nullable=False)
#     reviewer_id = Column(int(as_int=True), ForeignKey("employees.id"), nullable=False)
#     status = Column(Enum(ReviewStatus), default=ReviewStatus.draft)
#     overall_rating = Column(Numeric(3, 2))
#     comments = Column(Text)
#     goals = Column(Text)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
#     updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     __table_args__ = (
#         CheckConstraint("overall_rating >= 1 AND overall_rating <= 5", name="chk_overall_rating"),
#     )




# # --------------------------
# # Project Management Tables
# # --------------------------

# class Project(Base):
#     __tablename__ = "projects"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     name = Column(String(255), nullable=False)
#     description = Column(Text)
#     manager_id = Column(int(as_int=True), ForeignKey("employees.id"))
#     start_date = Column(Date)
#     end_date = Column(Date)
#     status = Column(Enum(ProjectStatus), default=ProjectStatus.active)
#     budget = Column(Numeric(12, 2))
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     manager = relationship("Employee", foreign_keys=[manager_id])
#     tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")


# class Task(Base):
#     __tablename__ = "tasks"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     project_id = Column(int(as_int=True), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
#     title = Column(String(255), nullable=False)
#     description = Column(Text)
#     assigned_to = Column(int(as_int=True), ForeignKey("employees.id"))
#     priority = Column(Enum(TaskPriority), default=TaskPriority.medium)
#     status = Column(String(50), default="todo")
#     due_date = Column(Date)
#     estimated_hours = Column(Numeric(6, 2))
#     actual_hours = Column(Numeric(6, 2))
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
#     updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     project = relationship("Project", back_populates="tasks")

# class TaskDependency(Base):
#     __tablename__ = "task_dependencies"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     task_id = Column(int(as_int=True), ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
#     depends_on_task_id = Column(int(as_int=True), ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
#     dependency_type = Column(Enum(DependencyType), default=DependencyType.finish_to_start)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     __table_args__ = (
#         UniqueConstraint("task_id", "depends_on_task_id", name="uq_task_dependency"),
#         CheckConstraint("task_id != depends_on_task_id", name="chk_task_self_dependency"),
#     )

# class TaskTimeEntry(Base):
#     __tablename__ = "task_time_entries"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     task_id = Column(int(as_int=True), ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     start_time = Column(TIMESTAMP(timezone=True), nullable=False)
#     end_time = Column(TIMESTAMP(timezone=True))
#     duration_minutes = Column(Integer)
#     description = Column(Text)
#     billable = Column(Boolean, default=False)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

# class TaskTemplate(Base):
#     __tablename__ = "task_templates"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     name = Column(String(255), nullable=False)
#     description = Column(Text)
#     estimated_hours = Column(Numeric(6, 2))
#     default_priority = Column(Enum(TaskPriority), default=TaskPriority.medium)
#     checklist = Column(JSON)
#     tags = Column(ARRAY(Text))
#     department = Column(String(100))
#     is_active = Column(Boolean, default=True)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

# # --------------------------
# # Performance Management Tables
# # --------------------------

# class PerformanceGoal(Base):
#     __tablename__ = "performance_goals"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     review_id = Column(int(as_int=True), ForeignKey("performance_reviews.id"))
#     title = Column(String(255), nullable=False)
#     description = Column(Text)
#     target_date = Column(Date)
#     status = Column(Enum(GoalStatus), default=GoalStatus.not_started)
#     progress = Column(Integer, default=0)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
#     updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     __table_args__ = (
#         CheckConstraint("progress >= 0 AND progress <= 100", name="chk_goal_progress"),
#     )

# class PerformanceAchievement(Base):
#     __tablename__ = "performance_achievements"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     review_id = Column(int(as_int=True), ForeignKey("performance_reviews.id", ondelete="CASCADE"), nullable=False)
#     title = Column(String(255), nullable=False)
#     description = Column(Text)
#     impact_level = Column(Enum(AchievementImpact), default=AchievementImpact.medium)
#     date_achieved = Column(Date)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

# class DevelopmentArea(Base):
#     __tablename__ = "development_areas"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     review_id = Column(int(as_int=True), ForeignKey("performance_reviews.id", ondelete="CASCADE"), nullable=False)
#     area = Column(String(255), nullable=False)
#     description = Column(Text)
#     improvement_plan = Column(Text)
#     target_date = Column(Date)
#     status = Column(Enum(GoalStatus), default=GoalStatus.not_started)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

# class Feedback360(Base):
#     __tablename__ = "feedback_360"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     review_id = Column(int(as_int=True), ForeignKey("performance_reviews.id", ondelete="CASCADE"), nullable=False)
#     feedback_provider_id = Column(int(as_int=True), ForeignKey("employees.id"), nullable=False)
#     feedback_type = Column(Enum(FeedbackType), nullable=False)
#     rating = Column(Numeric(3, 2))
#     comments = Column(Text)
#     is_anonymous = Column(Boolean, default=False)
#     submitted_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     __table_args__ = (
#         CheckConstraint("rating >= 1 AND rating <= 5", name="chk_feedback_rating"),
#     )

# # --------------------------
# # CRM Tables
# # --------------------------

# class Lead(Base):
#     __tablename__ = "leads"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     name = Column(String(255), nullable=False)
#     email = Column(String(255), nullable=False)
#     phone = Column(String(20))
#     company = Column(String(255), nullable=False)
#     status = Column(Enum(LeadStatus), default=LeadStatus.warm)
#     stage = Column(Enum(LeadStage), default=LeadStage.lead)
#     value = Column(Numeric(12, 2), default=0)
#     source = Column(String(100))
#     assigned_to_employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="SET NULL"))
#     last_contact = Column(Date)
#     next_follow_up = Column(Date)
#     notes = Column(Text)
#     lead_score = Column(Integer, default=0)
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

#     activities = relationship("LeadActivity", back_populates="lead", cascade="all, delete-orphan")
#     tickets = relationship("SupportTicket", back_populates="customer")

# class SupportTicket(Base):
#     __tablename__ = "crm_tickets"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     ticket_number = Column(String(20), unique=True, nullable=False)
#     title = Column(String(255), nullable=False)
#     description = Column(Text, nullable=False)
#     customer_id = Column(int(as_int=True), ForeignKey("leads.id", ondelete="SET NULL"))
#     customer_name = Column(String(255), nullable=False)
#     customer_email = Column(String(255), nullable=False)
#     priority = Column(Enum(TicketPriority), default=TicketPriority.medium)
#     status = Column(Enum(TicketStatus), default=TicketStatus.open)
#     assigned_to_employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="SET NULL"))
#     category = Column(String(100))
#     subcategory = Column(String(100))
#     resolution = Column(Text)
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     resolved_at = Column(DateTime(timezone=True))
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

#     customer = relationship("Lead", back_populates="tickets")
#     comments = relationship("TicketComment", back_populates="ticket", cascade="all, delete-orphan")

# class LeadActivity(Base):
#     __tablename__ = "lead_activities"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     lead_id = Column(int(as_int=True), ForeignKey("leads.id", ondelete="CASCADE"), nullable=False)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     activity_type = Column(Enum(ActivityType), nullable=False)
#     subject = Column(String(255), nullable=False)
#     description = Column(Text)
#     duration_minutes = Column(Integer)
#     outcome = Column(String(100))
#     scheduled_at = Column(DateTime(timezone=True))
#     completed_at = Column(DateTime(timezone=True))
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

#     lead = relationship("Lead", back_populates="activities")

# class TicketComment(Base):
#     __tablename__ = "ticket_comments"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     ticket_id = Column(int(as_int=True), ForeignKey("crm_tickets.id", ondelete="CASCADE"), nullable=False)
#     author_id = Column(int(as_int=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
#     content = Column(Text, nullable=False)
#     is_internal = Column(Boolean, default=False)
#     attachments = Column(JSON)
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

#     ticket = relationship("SupportTicket", back_populates="comments")

# # --------------------------
# # Attendance & Leave Tables
# # --------------------------

# class GeofenceLocation(Base):
#     __tablename__ = "geofence_locations"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     name = Column(String(255), nullable=False)
#     address = Column(Text, nullable=False)
#     latitude = Column(Numeric(10, 8), nullable=False)
#     longitude = Column(Numeric(11, 8), nullable=False)
#     radius = Column(Numeric(8, 2), nullable=False)
#     timezone = Column(String(50), default="Asia/Kolkata")
#     working_hours_start = Column(Time, default="09:00")
#     working_hours_end = Column(Time, default="18:00")
#     is_active = Column(Boolean, default=True)
#     created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
#     updated_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     attendance_records = relationship("AttendanceRecord", back_populates="geofence_location")

# class AttendanceRecord(Base):
#     __tablename__ = "attendance_records"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     date = Column(Date, nullable=False)
#     clock_in = Column(Time, nullable=False)
#     clock_out = Column(Time)
#     total_hours = Column(Numeric(4, 2), default=0)
#     break_hours = Column(Numeric(4, 2), default=0)
#     overtime_hours = Column(Numeric(4, 2), default=0)
#     status = Column(Enum(AttendanceStatus), default=AttendanceStatus.present)
#     location_name = Column(String(255), nullable=False)
#     latitude = Column(Numeric(10, 8))
#     longitude = Column(Numeric(11, 8))
#     is_within_geofence = Column(Boolean, default=False)
#     geofence_location_id = Column(int(as_int=True), ForeignKey("geofence_locations.id"))
#     device_info = Column(JSON)
#     ip_address = Column(INET)
#     notes = Column(Text)
#     approved_by = Column(int(as_int=True), ForeignKey("employees.id"))
#     approved_at = Column(TIMESTAMP(timezone=True))
#     created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
#     updated_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     geofence_location = relationship("GeofenceLocation", back_populates="attendance_records")
#     breaks = relationship("AttendanceBreak", back_populates="attendance_record")

# class AttendanceBreak(Base):
#     __tablename__ = "attendance_breaks"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     attendance_id = Column(int(as_int=True), ForeignKey("attendance_records.id", ondelete="CASCADE"), nullable=False)
#     break_start = Column(Time, nullable=False)
#     break_end = Column(Time)
#     break_type = Column(Enum(BreakType), default=BreakType.lunch)
#     duration_minutes = Column(Integer, default=0)
#     notes = Column(Text)
#     created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)

#     attendance_record = relationship("AttendanceRecord", back_populates="breaks")

# class AttendancePolicy(Base):
#     __tablename__ = "attendance_policies"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     name = Column(String(255), nullable=False)
#     department = Column(String(100))
#     min_hours_per_day = Column(Numeric(4, 2), default=8.0)
#     max_hours_per_day = Column(Numeric(4, 2), default=12.0)
#     late_threshold_minutes = Column(Integer, default=15)
#     half_day_threshold_hours = Column(Numeric(4, 2), default=4.0)
#     overtime_threshold_hours = Column(Numeric(4, 2), default=8.0)
#     max_break_minutes = Column(Integer, default=60)
#     requires_geofence = Column(Boolean, default=True)
#     is_active = Column(Boolean, default=True)
#     effective_from = Column(Date, nullable=False)
#     effective_to = Column(Date)
#     created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)

# class LeavePolicy(Base):
#     __tablename__ = "leave_policies"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     leave_type = Column(Enum(LeaveType), nullable=False)
#     department = Column(String(100))
#     annual_allocation = Column(Numeric(5, 2), nullable=False)
#     max_consecutive_days = Column(Integer)
#     min_notice_days = Column(Integer, default=1)
#     max_advance_days = Column(Integer, default=365)
#     requires_approval = Column(Boolean, default=True)
#     carry_forward_allowed = Column(Boolean, default=False)
#     max_carry_forward = Column(Numeric(5, 2), default=0)
#     encashment_allowed = Column(Boolean, default=False)
#     is_active = Column(Boolean, default=True)
#     effective_from = Column(Date, nullable=False)
#     effective_to = Column(Date)
#     created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)

# class LeaveRequest(Base):
#     __tablename__ = "leave_requests"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     leave_type = Column(Enum(LeaveType), nullable=False)
#     start_date = Column(Date, nullable=False)
#     end_date = Column(Date, nullable=False)
#     days = Column(Numeric(5, 2), nullable=False)
#     reason = Column(Text, nullable=False)
#     status = Column(Enum(LeaveStatus), default=LeaveStatus.pending)
#     applied_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
#     approved_by = Column(int(as_int=True), ForeignKey("employees.id"))
#     approved_at = Column(TIMESTAMP(timezone=True))
#     rejected_by = Column(int(as_int=True), ForeignKey("employees.id"))
#     rejected_at = Column(TIMESTAMP(timezone=True))
#     comments = Column(Text)
#     attachment_url = Column(String(500))
#     emergency_contact = Column(String(20))
#     created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
#     updated_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     approvals = relationship("LeaveApproval", back_populates="leave_request")

# class LeaveBalance(Base):
#     __tablename__ = "leave_balances"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     leave_type = Column(Enum(LeaveType), nullable=False)
#     year = Column(Integer, nullable=False)
#     allocated = Column(Numeric(5, 2), nullable=False)
#     used = Column(Numeric(5, 2), default=0)
#     pending = Column(Numeric(5, 2), default=0)
#     carry_forward = Column(Numeric(5, 2), default=0)
#     encashed = Column(Numeric(5, 2), default=0)
#     created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
#     updated_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

# class LeaveApproval(Base):
#     __tablename__ = "leave_approvals"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     leave_request_id = Column(int(as_int=True), ForeignKey("leave_requests.id", ondelete="CASCADE"), nullable=False)
#     approver_id = Column(int(as_int=True), ForeignKey("employees.id"), nullable=False)
#     approval_level = Column(Integer, nullable=False)
#     status = Column(Enum(LeaveStatus), nullable=False)
#     comments = Column(Text)
#     approved_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)

#     leave_request = relationship("LeaveRequest", back_populates="approvals")

# class CompanyHoliday(Base):
#     __tablename__ = "company_holidays"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     name = Column(String(255), nullable=False)
#     date = Column(Date, nullable=False)
#     is_optional = Column(Boolean, default=False)
#     description = Column(Text)
#     created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)



# class Category(Base):
#     __tablename__ = "categories"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     slug = Column(String(100), unique=True, nullable=False, index=True)
#     name = Column(String(150), nullable=False)
#     description = Column(Text)
#     is_active = Column(Boolean, default=True)
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     products = relationship("Product", back_populates="category", cascade="all, delete-orphan")


# class Product(Base):
#     __tablename__ = "products"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     sku = Column(String(64), unique=True, nullable=False, index=True)
#     name = Column(String(255), nullable=False, index=True)
#     description = Column(Text)
#     price = Column(Numeric(12, 2), nullable=False)
#     mrp = Column(Numeric(12, 2))
#     stock = Column(Integer, default=0)
#     is_active = Column(Boolean, default=True)
#     category_id = Column(int(as_int=True), ForeignKey("categories.id", ondelete="SET NULL"))
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     category = relationship("Category", back_populates="products")

#     __table_args__ = (
#         UniqueConstraint("name", "category_id", name="uq_product_name_category"),
#     )



# # --------------------------
# # Payroll Tables
# # --------------------------

# class PayrollComponent(Base):
#     __tablename__ = "payroll_components"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     name = Column(String(100), nullable=False, unique=True)
#     type = Column(Enum(ComponentType), nullable=False)
#     calculation_type = Column(Enum(CalculationType), nullable=False)
#     value = Column(Numeric(10, 2))
#     formula = Column(Text)
#     is_taxable = Column(Boolean, default=False)
#     is_active = Column(Boolean, default=True)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
#     updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

# class EmployeeSalaryComponent(Base):
#     __tablename__ = "employee_salary_components"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     component_id = Column(int(as_int=True), ForeignKey("payroll_components.id", ondelete="CASCADE"), nullable=False)
#     custom_value = Column(Numeric(10, 2))
#     effective_from = Column(Date, nullable=False)
#     effective_to = Column(Date)
#     is_active = Column(Boolean, default=True)
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
#     updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     __table_args__ = (
#         UniqueConstraint("employee_id", "component_id", "effective_from", name="uq_employee_component_effective"),
#     )

# class PayrollRecord(Base):
#     __tablename__ = "payroll_records"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     month = Column(String(20), nullable=False)
#     year = Column(Integer, nullable=False)
#     basic_salary = Column(Numeric(10, 2), nullable=False)
#     allowances = Column(Numeric(10, 2), nullable=False, default=0)
#     deductions = Column(Numeric(10, 2), nullable=False, default=0)
#     overtime = Column(Numeric(10, 2), nullable=False, default=0)
#     bonus = Column(Numeric(10, 2), default=0)
#     gross_salary = Column(Numeric(10, 2), nullable=False)
#     net_salary = Column(Numeric(10, 2), nullable=False)
#     status = Column(Enum(PayrollStatus), default=PayrollStatus.draft)
#     pay_date = Column(Date)
#     processed_by = Column(int(as_int=True), ForeignKey("users.id"))
#     created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
#     updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     __table_args__ = (
#         UniqueConstraint("employee_id", "month", "year", name="uq_employee_payroll_month"),
#     )

# class SalarySlip(Base):
#     __tablename__ = "salary_slips"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     payroll_id = Column(int(as_int=True), ForeignKey("payroll_records.id", ondelete="CASCADE"), nullable=False, unique=True)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     month = Column(String(20), nullable=False)
#     year = Column(Integer, nullable=False)
#     basic_salary = Column(Numeric(10, 2), nullable=False)
#     hra = Column(Numeric(10, 2), nullable=False, default=0)
#     transport = Column(Numeric(10, 2), nullable=False, default=0)
#     medical = Column(Numeric(10, 2), nullable=False, default=0)
#     other_allowances = Column(Numeric(10, 2), nullable=False, default=0)
#     pf = Column(Numeric(10, 2), nullable=False, default=0)
#     esi = Column(Numeric(10, 2), nullable=False, default=0)
#     tax = Column(Numeric(10, 2), nullable=False, default=0)
#     other_deductions = Column(Numeric(10, 2), nullable=False, default=0)
#     overtime = Column(Numeric(10, 2), nullable=False, default=0)
#     gross_salary = Column(Numeric(10, 2), nullable=False)
#     net_salary = Column(Numeric(10, 2), nullable=False)
#     generated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

# # --------------------------
# # Document Management Tables
# # --------------------------


# class Document(Base):
#     __tablename__ = "documents"

#     id = Column(int(as_int=True), primary_key=True, server_default=text("gen_random_int()"))
#     title = Column(String(255), nullable=False)
#     description = Column(Text)
#     file_name = Column(String(255), nullable=False)
#     file_type = Column(String(100), nullable=False)
#     file_size = Column(BigInteger, nullable=False)
#     document_type = Column(Enum(DocumentType, name="documenttype"), nullable=False)  # ✅ fixed
#     access_level = Column(Enum(AccessLevel, name="accesslevel"))
#     # 🔥 fix here: must be int
#     owner_id = Column(int(as_int=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
#     department = Column(String(100))
#     tags = Column(Text)  # or ARRAY(Text) if you want
#     is_archived = Column(Boolean, default=False)
#     expires_at = Column(DateTime(timezone=True))
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())




# class DocumentPermission(Base):
#     __tablename__ = "document_permissions"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     document_id = Column(int(as_int=True), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
#     user_id = Column(int(as_int=True), ForeignKey("users.id", ondelete="CASCADE"))
#     role = Column(String, ForeignKey("roles.name", ondelete="CASCADE"))
#     department = Column(String(100))
#     access_type = Column(String, nullable=False)
#     can_download = Column(Boolean, default=True)
#     can_share = Column(Boolean, default=False)
#     expires_at = Column(TIMESTAMP(timezone=True))
#     granted_by = Column(int(as_int=True), ForeignKey("users.id"))
#     granted_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

#     __table_args__ = (
#         CheckConstraint("user_id IS NOT NULL OR role IS NOT NULL OR department IS NOT NULL",
#                         name="chk_permission_target"),
#     )

# class DocumentVersion(Base):
#     __tablename__ = "document_versions"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     document_id = Column(int(as_int=True), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
#     version_number = Column(Integer, nullable=False)
#     file_path = Column(String(500), nullable=False)
#     file_size = Column(BigInteger, nullable=False)
#     checksum = Column(String(64), nullable=False)
#     uploaded_by = Column(int(as_int=True), ForeignKey("users.id"), nullable=False)
#     uploaded_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
#     change_notes = Column(Text)

# class DocumentAccessLog(Base):
#     __tablename__ = "document_access_logs"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     document_id = Column(int(as_int=True), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
#     user_id = Column(int(as_int=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
#     action = Column(String, nullable=False)
#     ip_address = Column(INET)
#     user_agent = Column(Text)
#     accessed_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

# class GeofenceValidation(Base):
#     __tablename__ = "geofence_validations"

#     id = Column(int(as_int=True), primary_key=True, default=int.int4)
#     employee_id = Column(int(as_int=True), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
#     geofence_location_id = Column(int(as_int=True), ForeignKey("geofence_locations.id"))
#     latitude = Column(Numeric(10, 8), nullable=False)
#     longitude = Column(Numeric(11, 8), nullable=False)
#     is_within_boundary = Column(Boolean, nullable=False)
#     distance_from_center = Column(Numeric(8, 2))
#     validation_type = Column(String, nullable=False)
#     validated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
#     device_info = Column(JSONB)










from __future__ import annotations

from datetime import datetime, date
from sqlalchemy import (
    Column, String, Text, DateTime, Date, Boolean, ForeignKey,
    Integer, Numeric, Enum, JSON, UniqueConstraint, TIMESTAMP, ARRAY, Float,
    CheckConstraint, BigInteger, Table, Time
)
from sqlalchemy.dialects.postgresql import INET, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum

from sqlalchemy import (
    Column, Integer, String, Boolean, Text, TIMESTAMP,
    func, UniqueConstraint, Index, ForeignKey
)



# --------------------------
# Enum Definitions
# --------------------------

class UserRoleEnum(str, enum.Enum):
    admin = "admin"
    manager = "manager"
    employee = "employee"
    documentation = "documentation"

class AttendanceStatus(str, enum.Enum):
    present = "present"
    absent = "absent"
    late = "late"
    half_day = "half-day"
    work_from_home = "work-from-home"

class BreakType(str, enum.Enum):
    lunch = "lunch"
    tea = "tea"
    personal = "personal"
    meeting = "meeting"
    other = "other"

class LeaveType(str, enum.Enum):
    casual = "casual"
    sick = "sick"
    annual = "annual"
    maternity = "maternity"
    paternity = "paternity"
    emergency = "emergency"
    bereavement = "bereavement"

class LeaveStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    cancelled = "cancelled"

class LeadStatus(str, enum.Enum):
    hot = "hot"
    warm = "warm"
    cold = "cold"

class LeadStage(str, enum.Enum):
    lead = "lead"
    qualified = "qualified"
    proposal = "proposal"
    negotiation = "negotiation"
    closed_won = "closed-won"
    closed_lost = "closed-lost"

class TicketPriority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    urgent = "urgent"

class TicketStatus(str, enum.Enum):
    open = "open"
    in_progress = "in-progress"
    resolved = "resolved"
    closed = "closed"

class ActivityType(str, enum.Enum):
    call = "call"
    email = "email"
    meeting = "meeting"
    note = "note"
    status_change = "status_change"

class EmployeeStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    terminated = "terminated"

class GenderType(str, enum.Enum):
    male = "male"
    female = "female"
    other = "other"

class MaritalStatus(str, enum.Enum):
    single = "single"
    married = "married"
    divorced = "divorced"
    widowed = "widowed"

class AddressType(str, enum.Enum):
    current = "current"
    permanent = "permanent"

class AccountType(str, enum.Enum):
    savings = "savings"
    current = "current"
    salary = "salary"

class ProjectStatus(str, enum.Enum):
    active = "active"
    completed = "completed"
    on_hold = "on-hold"
    cancelled = "cancelled"

class DependencyType(str, enum.Enum):
    finish_to_start = "finish-to-start"
    start_to_start = "start-to-start"
    finish_to_finish = "finish-to-finish"
    start_to_finish = "start-to-finish"

class TaskPriority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class ReviewType(str, enum.Enum):
    annual = "annual"
    quarterly = "quarterly"
    probation = "probation"
    promotion = "promotion"
    pip = "pip"

class ReviewStatus(str, enum.Enum):
    draft = "draft"
    in_progress = "in-progress"
    completed = "completed"
    approved = "approved"

class GoalStatus(str, enum.Enum):
    not_started = "not-started"
    in_progress = "in-progress"
    completed = "completed"
    cancelled = "cancelled"

class AchievementImpact(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class FeedbackType(str, enum.Enum):
    peer = "peer"
    manager = "manager"
    report = "report"
    self_review = "self-review"
    other = "other"

class PayrollStatus(str, enum.Enum):
    draft = "draft"
    processed = "processed"
    paid = "paid"
    cancelled = "cancelled"

class ComponentType(str, enum.Enum):
    allowance = "allowance"
    deduction = "deduction"

class CalculationType(str, enum.Enum):
    fixed = "fixed"
    percentage = "percentage"
    formula = "formula"

class DocumentType(str, enum.Enum):
    offer_letter = "offer-letter"
    salary_slip = "salary-slip"
    id_card = "id-card"
    experience_letter = "experience-letter"
    policy = "policy"
    contract = "contract"
    certificate = "certificate"
    other = "other"

class AccessLevel(str, enum.Enum):
    private = "private"
    department = "department"
    company = "company"
    public = "public"


# --------------------------
# Association Tables
# --------------------------

role_permission = Table(
    "role_permission",
    Base.metadata,
    Column("role_id", Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
    Column("permission_id", Integer, ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True),
)

user_role = Table(
    "user_role",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("role_id", Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
)


# --------------------------
# Core Authentication Tables
# --------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRoleEnum), default=UserRoleEnum.employee, nullable=False)
    department = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    sessions = relationship("UserSession", back_populates="user", cascade="all, delete-orphan")
    roles = relationship("Role", secondary=user_role, back_populates="users")


class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    token_hash = Column(String(255), nullable=False)
    refresh_token = Column(String(255), nullable=True)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    ip_address = Column(INET, nullable=True)
    user_agent = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="sessions")


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255), nullable=True)

    permissions = relationship("Permission", secondary=role_permission, back_populates="roles")
    users = relationship("User", secondary=user_role, back_populates="roles")


class Permission(Base):
    __tablename__ = "permissions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(128), unique=True, nullable=False)
    description = Column(String(255), nullable=True)

    roles = relationship("Role", secondary=role_permission, back_populates="permissions")


# --------------------------
# Employee Tables
# --------------------------

# class Employee(Base):
#     __tablename__ = "employees"

#     id = Column(Integer, primary_key=True, autoincrement=True)
#     user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), unique=True)
#     employee_id = Column(String(20), nullable=False, unique=True)
#     name = Column(String(255), nullable=False)
#     email = Column(String(255), nullable=False, unique=True)
#     phone = Column(String(20), nullable=False)
#     department = Column(String(100), nullable=False)
#     designation = Column(String(100), nullable=False)
#     joining_date = Column(Date, nullable=False)
#     salary = Column(Numeric(10, 2), nullable=False)
#     status = Column(Enum(EmployeeStatus), default=EmployeeStatus.active)
#     address = Column(Text, nullable=False)
#     emergency_contact = Column(String(20), nullable=False)
#     avatar_url = Column(String(500))
#     date_of_birth = Column(Date)
#     gender = Column(Enum(GenderType))
#     marital_status = Column(Enum(MaritalStatus))
#     nationality = Column(String(100), default="Indian")
#     blood_group = Column(String(10))
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

#     manager = relationship("Employee", remote_side=[id])
#     bank_account = relationship("BankAccount", back_populates="employee", uselist=False, cascade="all, delete-orphan")
#     addresses = relationship("EmployeeAddress", back_populates="employee", cascade="all, delete-orphan")
#     manager_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"), nullable=True)
#     leads = relationship("Lead", back_populates="employee", cascade="all, delete-orphan")




class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), unique=True)
    employee_id = Column(String(20), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    phone = Column(String(20), nullable=False)
    department = Column(String(100), nullable=False)
    designation = Column(String(100), nullable=False)
    joining_date = Column(Date, nullable=False)
    salary = Column(Numeric(10, 2), nullable=False)
    status = Column(Enum(EmployeeStatus), default=EmployeeStatus.active)
    address = Column(Text, nullable=False)
    emergency_contact = Column(String(20), nullable=False)
    avatar_url = Column(String(500))
    date_of_birth = Column(Date)
    gender = Column(Enum(GenderType))
    marital_status = Column(Enum(MaritalStatus))
    nationality = Column(String(100), default="Indian")
    blood_group = Column(String(10))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Self-referencing manager
    manager_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"), nullable=True)
    manager = relationship("Employee", remote_side=[id], backref="subordinates")

    # Leads relationships
    leads = relationship(
        "Lead",
        back_populates="employee",
        foreign_keys="[Lead.employee_id]"
    )
    assigned_leads = relationship(
        "Lead",
        back_populates="assigned_to",
        foreign_keys="[Lead.assigned_to_employee_id]"
    )

    # Support tickets assigned to this employee
    tickets_assigned = relationship(
        "SupportTicket",
        back_populates="assigned_to_employee",
        foreign_keys="[SupportTicket.assigned_to_employee_id]"
    )

    # Bank accounts and addresses
    bank_account = relationship("BankAccount", back_populates="employee", uselist=False, cascade="all, delete-orphan")
    addresses = relationship("EmployeeAddress", back_populates="employee", cascade="all, delete-orphan")

    chat_threads = relationship("ChatThread", back_populates="employee", cascade="all, delete-orphan")



class BankAccount(Base):
    __tablename__ = "bank_accounts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), unique=True, nullable=False)
    # employee_id = Column(String(20), ForeignKey("employees.employee_id", ondelete="CASCADE"), unique=True, nullable=False)
    account_number = Column(String(50), nullable=False)
    bank_name = Column(String(255), nullable=False)
    ifsc_code = Column(String(20), nullable=False)
    account_holder_name = Column(String(255), nullable=False)
    account_type = Column(Enum(AccountType), default=AccountType.savings)
    is_primary = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    employee = relationship("Employee", back_populates="bank_account")




class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)


    # 🔥 Add this foreign key
    company_id = Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)

    # 🔗 Relationship to Company
    company = relationship("Company", back_populates="addresses")




class EmployeeAddress(Base):
    __tablename__ = "employee_addresses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    address_type = Column(Enum(AddressType), nullable=False)
    line1 = Column(String(255), nullable=False)
    line2 = Column(String(255))
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    postal_code = Column(String(20), nullable=False)
    country = Column(String(100), default="India")
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    employee = relationship("Employee", back_populates="addresses")


# --------------------------
# Performance Review Tables
# --------------------------

class PerformanceReview(Base):
    __tablename__ = "performance_reviews"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    review_type = Column(Enum(ReviewType), nullable=False)
    review_date = Column(Date, nullable=False)
    reviewer_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    status = Column(Enum(ReviewStatus), default=ReviewStatus.draft)
    overall_rating = Column(Numeric(3, 2))
    comments = Column(Text)
    goals = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("overall_rating >= 1 AND overall_rating <= 5", name="chk_overall_rating"),
    )


# --------------------------
# Project Management Tables
# --------------------------

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    manager_id = Column(Integer, ForeignKey("employees.id"))
    start_date = Column(Date)
    end_date = Column(Date)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.active)
    budget = Column(Numeric(12, 2))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    manager = relationship("Employee", foreign_keys=[manager_id])
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    assigned_to = Column(Integer, ForeignKey("employees.id"))
    priority = Column(Enum(TaskPriority), default=TaskPriority.medium)
    status = Column(String(50), default="todo")
    due_date = Column(Date)
    estimated_hours = Column(Numeric(6, 2))
    actual_hours = Column(Numeric(6, 2))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    # ✅ Keep only valid relationships
    project = relationship("Project", back_populates="tasks")


class TaskDependency(Base):
    __tablename__ = "task_dependencies"

    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    depends_on_task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    dependency_type = Column(Enum(DependencyType), default=DependencyType.finish_to_start)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("task_id", "depends_on_task_id", name="uq_task_dependency"),
        CheckConstraint("task_id != depends_on_task_id", name="chk_task_self_dependency"),
    )


class TaskTimeEntry(Base):
    __tablename__ = "task_time_entries"

    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    start_time = Column(TIMESTAMP(timezone=True), nullable=False)
    end_time = Column(TIMESTAMP(timezone=True))
    duration_minutes = Column(Integer)
    description = Column(Text)
    billable = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


class TaskTemplate(Base):
    __tablename__ = "task_templates"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    estimated_hours = Column(Numeric(6, 2))
    default_priority = Column(Enum(TaskPriority), default=TaskPriority.medium)
    checklist = Column(JSON)
    tags = Column(ARRAY(Text))
    department = Column(String(100))
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


# --------------------------
# Performance Management Tables
# --------------------------

class PerformanceGoal(Base):
    __tablename__ = "performance_goals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    review_id = Column(Integer, ForeignKey("performance_reviews.id"))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    target_date = Column(Date)
    status = Column(Enum(GoalStatus), default=GoalStatus.not_started)
    progress = Column(Integer, default=0)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("progress >= 0 AND progress <= 100", name="chk_goal_progress"),
    )


class PerformanceAchievement(Base):
    __tablename__ = "performance_achievements"

    id = Column(Integer, primary_key=True, autoincrement=True)
    review_id = Column(Integer, ForeignKey("performance_reviews.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    impact_level = Column(Enum(AchievementImpact), default=AchievementImpact.medium)
    date_achieved = Column(Date)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


class DevelopmentArea(Base):
    __tablename__ = "development_areas"

    id = Column(Integer, primary_key=True, autoincrement=True)
    review_id = Column(Integer, ForeignKey("performance_reviews.id", ondelete="CASCADE"), nullable=False)
    area = Column(String(255), nullable=False)
    description = Column(Text)
    improvement_plan = Column(Text)
    target_date = Column(Date)
    status = Column(Enum(GoalStatus), default=GoalStatus.not_started)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


class Feedback360(Base):
    __tablename__ = "feedback_360"

    id = Column(Integer, primary_key=True, autoincrement=True)
    review_id = Column(Integer, ForeignKey("performance_reviews.id", ondelete="CASCADE"), nullable=False)
    feedback_provider_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    feedback_type = Column(Enum(FeedbackType), nullable=False)
    rating = Column(Numeric(3, 2))
    comments = Column(Text)
    is_anonymous = Column(Boolean, default=False)
    submitted_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("rating >= 1 AND rating <= 5", name="chk_feedback_rating"),
    )


# --------------------------
# CRM Tables
# --------------------------

# class Lead(Base):
#     __tablename__ = "leads"

#     id = Column(Integer, primary_key=True, autoincrement=True)
#     name = Column(String(255), nullable=False)
#     email = Column(String(255), nullable=False)
#     phone = Column(String(20))
#     company = Column(String(255), nullable=False)
#     status = Column(Enum(LeadStatus), default=LeadStatus.warm)
#     stage = Column(Enum(LeadStage), default=LeadStage.lead)
#     value = Column(Numeric(12, 2), default=0)
#     source = Column(String(100))
#     assigned_to_employee_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"))
#     last_contact = Column(Date)
#     next_follow_up = Column(Date)
#     notes = Column(Text)
#     lead_score = Column(Integer, default=0)
#     created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
#     updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)


#     assigned_to = relationship("Employee", back_populates="leads")   # Employee <-> Leads
#     activities = relationship("LeadActivity", back_populates="lead", cascade="all, delete-orphan")
#     tickets = relationship("SupportTicket", back_populates="customer")

#     employee_id = Column(Integer, ForeignKey("employees.id"))
#     employee = relationship("Employee", back_populates="leads")


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20))
    company = Column(String(255), nullable=False)
    status = Column(Enum(LeadStatus), default=LeadStatus.warm)
    stage = Column(Enum(LeadStage), default=LeadStage.lead)
    value = Column(Numeric(12, 2), default=0)
    source = Column(String(100))

    assigned_to_employee_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"))
    employee_id = Column(Integer, ForeignKey("employees.id"))

    last_contact = Column(Date)
    next_follow_up = Column(Date)
    notes = Column(Text)
    lead_score = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    # Relationships
    assigned_to = relationship(
        "Employee",
        foreign_keys=[assigned_to_employee_id],
        back_populates="assigned_leads"
    )
    employee = relationship(
        "Employee",
        foreign_keys=[employee_id],
        back_populates="leads"
    )

    activities = relationship("LeadActivity", back_populates="lead", cascade="all, delete-orphan")
    tickets = relationship("SupportTicket", back_populates="customer", cascade="all, delete-orphan")

    # 🔗 Sales Orders relationship
    sales_orders = relationship("SalesOrder", back_populates="lead", cascade="all, delete-orphan")

   # Add this relationship
    chat_threads = relationship("ChatThread", back_populates="lead", cascade="all, delete-orphan")



class LeadActivity(Base):
    __tablename__ = "lead_activities"

    id = Column(Integer, primary_key=True, autoincrement=True)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="CASCADE"), nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    activity_type = Column(Enum(ActivityType), nullable=False)
    subject = Column(String(255), nullable=False)
    description = Column(Text)
    duration_minutes = Column(Integer)
    outcome = Column(String(100))
    scheduled_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    lead = relationship("Lead", back_populates="activities")




class MessageDirection(str, enum.Enum):
    employee_to_lead = "employee_to_lead"
    lead_to_employee = "lead_to_employee"

class MessageStatus(str, enum.Enum):
    sent = "sent"
    delivered = "delivered"
    read = "read"
    failed = "failed"

class MessageType(str, enum.Enum):
    text = "text"
    image = "image"
    file = "file"
    system = "system"

class ChatThread(Base):
    __tablename__ = "chat_threads"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="CASCADE"), nullable=False, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    subject = Column(String(255))
    status = Column(String(50), default="active")  # active, closed, resolved
    last_message_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    message_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    lead = relationship("Lead", back_populates="chat_threads")
    employee = relationship("Employee", back_populates="chat_threads")
    messages = relationship("ChatMessage", back_populates="thread", cascade="all, delete-orphan")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    thread_id = Column(Integer, ForeignKey("chat_threads.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Sender information
    sender_type = Column(String(20), nullable=False)  # "employee" or "lead"
    sender_id = Column(Integer, nullable=False)  # employee_id or lead_id
    
    # Message content
    message_type = Column(Enum(MessageType), default=MessageType.text, nullable=False)
    content = Column(Text)
    attachment_url = Column(String(500))  # For files, images
    file_name = Column(String(255))
    file_size = Column(Integer)  # in bytes
    
    # Status tracking
    status = Column(Enum(MessageStatus), default=MessageStatus.sent, nullable=False)
    direction = Column(Enum(MessageDirection), nullable=False)
    
    # Read receipts
    read_by_employee = Column(Boolean, default=False)
    read_by_lead = Column(Boolean, default=False)
    read_at = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    thread = relationship("ChatThread", back_populates="messages")
    
    # Index for better performance
    __table_args__ = (
        Index('idx_chat_messages_thread_created', 'thread_id', 'created_at'),
        Index('idx_chat_messages_sender', 'sender_type', 'sender_id'),
    )

class ChatParticipant(Base):
    __tablename__ = "chat_participants"

    id = Column(Integer, primary_key=True, index=True)
    thread_id = Column(Integer, ForeignKey("chat_threads.id", ondelete="CASCADE"), nullable=False)
    participant_type = Column(String(20), nullable=False)  # "employee" or "lead"
    participant_id = Column(Integer, nullable=False)
    joined_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    left_at = Column(DateTime(timezone=True))
    is_active = Column(Boolean, default=True)
    
    # Relationships
    thread = relationship("ChatThread")
    
    __table_args__ = (
        UniqueConstraint('thread_id', 'participant_type', 'participant_id', name='uq_thread_participant'),
        Index('idx_chat_participants_user', 'participant_type', 'participant_id'),
    )

    

class SupportTicket(Base):
    __tablename__ = "crm_tickets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    ticket_number = Column(String(50), unique=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)

    customer_id = Column(Integer, ForeignKey("leads.id", ondelete="SET NULL"))
    assigned_to_employee_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"))

    customer_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), nullable=False)
    priority = Column(Enum(TicketPriority), default=TicketPriority.medium)
    status = Column(Enum(TicketStatus), default=TicketStatus.open)
    category = Column(String(100))
    subcategory = Column(String(100))
    resolution = Column(Text)

    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    resolved_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    # Relationships
    customer = relationship("Lead", back_populates="tickets", foreign_keys=[customer_id])
    assigned_to_employee = relationship("Employee", back_populates="tickets_assigned", foreign_keys=[assigned_to_employee_id])
    comments = relationship("TicketComment", back_populates="ticket", cascade="all, delete-orphan")




class TicketComment(Base):
    __tablename__ = "ticket_comments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    ticket_id = Column(Integer, ForeignKey("crm_tickets.id", ondelete="CASCADE"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    is_internal = Column(Boolean, default=False)
    attachments = Column(JSON)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    ticket = relationship("SupportTicket", back_populates="comments")


# --------------------------
# Attendance & Leave Tables
# --------------------------

class GeofenceLocation(Base):
    __tablename__ = "geofence_locations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    address = Column(Text, nullable=False)
    latitude = Column(Numeric(10, 8), nullable=False)
    longitude = Column(Numeric(11, 8), nullable=False)
    radius = Column(Numeric(8, 2), nullable=False)
    timezone = Column(String(50), default="Asia/Kolkata")
    working_hours_start = Column(Time, default="09:00")
    working_hours_end = Column(Time, default="18:00")
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    updated_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    attendance_records = relationship("AttendanceRecord", back_populates="geofence_location")


class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    date = Column(Date, nullable=False)
    clock_in = Column(Time, nullable=False)
    clock_out = Column(Time)
    total_hours = Column(Numeric(4, 2), default=0)
    break_hours = Column(Numeric(4, 2), default=0)
    overtime_hours = Column(Numeric(4, 2), default=0)
    status = Column(Enum(AttendanceStatus), default=AttendanceStatus.present)
    location_name = Column(String(255), nullable=False)
    latitude = Column(Numeric(10, 8))
    longitude = Column(Numeric(11, 8))
    is_within_geofence = Column(Boolean, default=False)
    geofence_location_id = Column(Integer, ForeignKey("geofence_locations.id"))
    device_info = Column(JSON)
    ip_address = Column(INET)
    notes = Column(Text)
    approved_by = Column(Integer, ForeignKey("employees.id"))
    approved_at = Column(TIMESTAMP(timezone=True))
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    updated_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    geofence_location = relationship("GeofenceLocation", back_populates="attendance_records")
    breaks = relationship("AttendanceBreak", back_populates="attendance_record")


class AttendanceBreak(Base):
    __tablename__ = "attendance_breaks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    attendance_id = Column(Integer, ForeignKey("attendance_records.id", ondelete="CASCADE"), nullable=False)
    break_start = Column(Time, nullable=False)
    break_end = Column(Time)
    break_type = Column(Enum(BreakType), default=BreakType.lunch)
    duration_minutes = Column(Integer, default=0)
    notes = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)

    attendance_record = relationship("AttendanceRecord", back_populates="breaks")


class AttendancePolicy(Base):
    __tablename__ = "attendance_policies"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    department = Column(String(100))
    min_hours_per_day = Column(Numeric(4, 2), default=8.0)
    max_hours_per_day = Column(Numeric(4, 2), default=12.0)
    late_threshold_minutes = Column(Integer, default=15)
    half_day_threshold_hours = Column(Numeric(4, 2), default=4.0)
    overtime_threshold_hours = Column(Numeric(4, 2), default=8.0)
    max_break_minutes = Column(Integer, default=60)
    requires_geofence = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    effective_from = Column(Date, nullable=False)
    effective_to = Column(Date)
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)


class LeavePolicy(Base):
    __tablename__ = "leave_policies"

    id = Column(Integer, primary_key=True, autoincrement=True)
    leave_type = Column(Enum(LeaveType), nullable=False)
    department = Column(String(100))
    annual_allocation = Column(Numeric(5, 2), nullable=False)
    max_consecutive_days = Column(Integer)
    min_notice_days = Column(Integer, default=1)
    max_advance_days = Column(Integer, default=365)
    requires_approval = Column(Boolean, default=True)
    carry_forward_allowed = Column(Boolean, default=False)
    max_carry_forward = Column(Numeric(5, 2), default=0)
    encashment_allowed = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    effective_from = Column(Date, nullable=False)
    effective_to = Column(Date)
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)


class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    leave_type = Column(Enum(LeaveType), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    days = Column(Numeric(5, 2), nullable=False)
    reason = Column(Text, nullable=False)
    status = Column(Enum(LeaveStatus), default=LeaveStatus.pending)
    applied_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    approved_by = Column(Integer, ForeignKey("employees.id"))
    approved_at = Column(TIMESTAMP(timezone=True))
    rejected_by = Column(Integer, ForeignKey("employees.id"))
    rejected_at = Column(TIMESTAMP(timezone=True))
    comments = Column(Text)
    attachment_url = Column(String(500))
    emergency_contact = Column(String(20))
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    updated_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    approvals = relationship("LeaveApproval", back_populates="leave_request")


class LeaveBalance(Base):
    __tablename__ = "leave_balances"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    leave_type = Column(Enum(LeaveType), nullable=False)
    year = Column(Integer, nullable=False)
    allocated = Column(Numeric(5, 2), nullable=False)
    used = Column(Numeric(5, 2), default=0)
    pending = Column(Numeric(5, 2), default=0)
    carry_forward = Column(Numeric(5, 2), default=0)
    encashed = Column(Numeric(5, 2), default=0)
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    updated_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)


class LeaveApproval(Base):
    __tablename__ = "leave_approvals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    leave_request_id = Column(Integer, ForeignKey("leave_requests.id", ondelete="CASCADE"), nullable=False)
    approver_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    approval_level = Column(Integer, nullable=False)
    status = Column(Enum(LeaveStatus), nullable=False)
    comments = Column(Text)
    approved_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)

    leave_request = relationship("LeaveRequest", back_populates="approvals")


class CompanyHoliday(Base):
    __tablename__ = "company_holidays"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    date = Column(Date, nullable=False)
    is_optional = Column(Boolean, default=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)







# --------------------------
# Company Model
# --------------------------
class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    gstin = Column(String, unique=True, index=True, nullable=False)
    contact_email = Column(String, nullable=True)
    contact_phone = Column(String, nullable=True)
    address = Column(String, nullable=True)

    # 🔗 One-to-Many Relation
    addresses = relationship("Address", back_populates="company", cascade="all, delete")
    categories = relationship("Category", back_populates="company")
    sales_orders = relationship("SalesOrder", back_populates="company", cascade="all, delete-orphan")

# --------------------------
# Category Model
# --------------------------

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"), nullable=False, index=True)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    company = relationship("Company", back_populates="categories")
    products = relationship("Product", back_populates="category", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}', company_id={self.company_id})>"


# --------------------------
# Product Model
# --------------------------
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="SET NULL"))
    sku = Column(String(64), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    price = Column(Numeric(12, 2), nullable=False)
    mrp = Column(Numeric(12, 2))
    stock = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    category = relationship("Category", back_populates="products")
    order_items = relationship("SalesOrderItem", back_populates="product", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("name", "category_id", name="uq_product_name_category"),
        CheckConstraint("price >= 0", name="check_price_nonnegative"),
        CheckConstraint("stock >= 0", name="check_stock_nonnegative"),
    )

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', category_id={self.category_id})>"


# --------------------------
# Sales Order Model
# --------------------------


class SalesOrder(Base):
    __tablename__ = "sales_orders"

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False, index=True)
    order_date = Column(Date, nullable=False, index=True)
    due_date = Column(Date, index=True)
    notes = Column(Text)

    # 🔗 Lead से संबंध जोड़ना
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="SET NULL"), nullable=True)

    # Relationships
    company = relationship("Company", back_populates="sales_orders")
    items = relationship("SalesOrderItem", back_populates="sales_order", cascade="all, delete-orphan")
    lead = relationship("Lead", back_populates="sales_orders")  # ← यह नया relation

    __table_args__ = (
        Index('idx_order_company_date', 'company_id', 'order_date'),
        Index('idx_order_due_date', 'due_date'),
        Index('idx_order_date_range', 'order_date', 'due_date'),
    )



# --------------------------
# Sales Order Item Model
# --------------------------
class SalesOrderItem(Base):
    __tablename__ = "sales_order_items"

    id = Column(Integer, primary_key=True)
    sales_order_id = Column(Integer, ForeignKey("sales_orders.id"), nullable=False, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)
    quantity = Column(Integer, nullable=False, index=True)
    unit_price = Column(Numeric(12,2), nullable=False)

    # Relationships
    sales_order = relationship("SalesOrder", back_populates="items")
    product = relationship("Product", back_populates="order_items")

    __table_args__ = (
        Index('idx_orderitem_order_product', 'sales_order_id', 'product_id'),
    )

# --------------------------
# Payroll Tables
# --------------------------

class PayrollComponent(Base):
    __tablename__ = "payroll_components"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    type = Column(Enum(ComponentType), nullable=False)
    calculation_type = Column(Enum(CalculationType), nullable=False)
    value = Column(Numeric(10, 2))
    formula = Column(Text)
    is_taxable = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


class EmployeeSalaryComponent(Base):
    __tablename__ = "employee_salary_components"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    component_id = Column(Integer, ForeignKey("payroll_components.id", ondelete="CASCADE"), nullable=False)
    custom_value = Column(Numeric(10, 2))
    effective_from = Column(Date, nullable=False)
    effective_to = Column(Date)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("employee_id", "component_id", "effective_from", name="uq_employee_component_effective"),
    )


class PayrollRecord(Base):
    __tablename__ = "payroll_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    month = Column(String(20), nullable=False)
    year = Column(Integer, nullable=False)
    basic_salary = Column(Numeric(10, 2), nullable=False)
    allowances = Column(Numeric(10, 2), nullable=False, default=0)
    deductions = Column(Numeric(10, 2), nullable=False, default=0)
    overtime = Column(Numeric(10, 2), nullable=False, default=0)
    bonus = Column(Numeric(10, 2), default=0)
    gross_salary = Column(Numeric(10, 2), nullable=False)
    net_salary = Column(Numeric(10, 2), nullable=False)
    status = Column(Enum(PayrollStatus), default=PayrollStatus.draft)
    pay_date = Column(Date)
    processed_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("employee_id", "month", "year", name="uq_employee_payroll_month"),
    )


class SalarySlip(Base):
    __tablename__ = "salary_slips"

    id = Column(Integer, primary_key=True, autoincrement=True)
    payroll_id = Column(Integer, ForeignKey("payroll_records.id", ondelete="CASCADE"), nullable=False, unique=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    month = Column(String(20), nullable=False)
    year = Column(Integer, nullable=False)
    basic_salary = Column(Numeric(10, 2), nullable=False)
    hra = Column(Numeric(10, 2), nullable=False, default=0)
    transport = Column(Numeric(10, 2), nullable=False, default=0)
    medical = Column(Numeric(10, 2), nullable=False, default=0)
    other_allowances = Column(Numeric(10, 2), nullable=False, default=0)
    pf = Column(Numeric(10, 2), nullable=False, default=0)
    esi = Column(Numeric(10, 2), nullable=False, default=0)
    tax = Column(Numeric(10, 2), nullable=False, default=0)
    other_deductions = Column(Numeric(10, 2), nullable=False, default=0)
    overtime = Column(Numeric(10, 2), nullable=False, default=0)
    gross_salary = Column(Numeric(10, 2), nullable=False)
    net_salary = Column(Numeric(10, 2), nullable=False)
    generated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


# --------------------------
# Document Management Tables
# --------------------------

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    file_name = Column(String(255), nullable=False)
    file_type = Column(String(100), nullable=False)
    file_size = Column(BigInteger, nullable=False)
    document_type = Column(Enum(DocumentType, name="documenttype"), nullable=False)
    access_level = Column(Enum(AccessLevel, name="accesslevel"))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    department = Column(String(100))
    tags = Column(Text)  # or ARRAY(Text) if you want
    is_archived = Column(Boolean, default=False)
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class DocumentPermission(Base):
    __tablename__ = "document_permissions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    role = Column(String, ForeignKey("roles.name", ondelete="CASCADE"))
    department = Column(String(100))
    access_type = Column(String, nullable=False)
    can_download = Column(Boolean, default=True)
    can_share = Column(Boolean, default=False)
    expires_at = Column(TIMESTAMP(timezone=True))
    granted_by = Column(Integer, ForeignKey("users.id"))
    granted_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("user_id IS NOT NULL OR role IS NOT NULL OR department IS NOT NULL",
                        name="chk_permission_target"),
    )


class DocumentVersion(Base):
    __tablename__ = "document_versions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    version_number = Column(Integer, nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(BigInteger, nullable=False)
    checksum = Column(String(64), nullable=False)
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    uploaded_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    change_notes = Column(Text)



    

class DocumentAccessLog(Base):
    __tablename__ = "document_access_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(Integer, ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    action = Column(String, nullable=False)
    ip_address = Column(INET)
    user_agent = Column(Text)
    accessed_at = Column(TIMESTAMP(timezone=True), server_default=func.now())


class GeofenceValidation(Base):
    __tablename__ = "geofence_validations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=False)
    geofence_location_id = Column(Integer, ForeignKey("geofence_locations.id"))
    latitude = Column(Numeric(10, 8), nullable=False)
    longitude = Column(Numeric(11, 8), nullable=False)
    is_within_boundary = Column(Boolean, nullable=False)
    distance_from_center = Column(Numeric(8, 2))
    validation_type = Column(String, nullable=False)
    validated_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    device_info = Column(JSONB)








class SupportTeam(Base):
    __tablename__ = "support_teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False, unique=True, index=True)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, nullable=False, server_default="true", default=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        Index("ix_support_teams_active_name", "is_active", "name"),
    )


class SupportTeamMember(Base):
    __tablename__ = "support_team_members"

    team_id = Column(Integer, ForeignKey("support_teams.id", ondelete="CASCADE"), primary_key=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), primary_key=True)

    role_in_team = Column(String(60), nullable=True)
    active = Column(Boolean, nullable=False, server_default="true", default=True)

    added_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        UniqueConstraint("team_id", "employee_id"),
        Index("ix_stm_team_active", "team_id", "active"),
        Index("ix_stm_employee", "employee_id"),
    )


# --------------------------
# Additional Models for Missing Endpoints
# --------------------------

class AuditLogAction(str, enum.Enum):
    create = "create"
    update = "update"
    delete = "delete"
    login = "login"
    logout = "logout"
    export = "export"
    import_data = "import"
    bulk_action = "bulk_action"

class NotificationType(str, enum.Enum):
    info = "info"
    warning = "warning"
    success = "success"
    error = "error"
    task = "task"
    leave = "leave"
    attendance = "attendance"
    payroll = "payroll"

class DealStage(str, enum.Enum):
    prospecting = "prospecting"
    qualification = "qualification"
    proposal = "proposal"
    negotiation = "negotiation"
    closed_won = "closed-won"
    closed_lost = "closed-lost"


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(Enum(AuditLogAction), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(Integer, nullable=True)
    old_values = Column(JSONB, nullable=True)
    new_values = Column(JSONB, nullable=True)
    ip_address = Column(INET, nullable=True)
    user_agent = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    user = relationship("User", backref="audit_logs")

    __table_args__ = (
        Index("ix_audit_logs_user_id", "user_id"),
        Index("ix_audit_logs_entity", "entity_type", "entity_id"),
        Index("ix_audit_logs_created_at", "created_at"),
    )


class SystemSettings(Base):
    __tablename__ = "system_settings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(JSONB, nullable=True)
    description = Column(Text, nullable=True)
    category = Column(String(50), nullable=False, default="general")
    is_public = Column(Boolean, default=False)
    updated_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    __table_args__ = (
        Index("ix_system_settings_category", "category"),
    )


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(Enum(NotificationType), default=NotificationType.info)
    is_read = Column(Boolean, default=False)
    link = Column(String(500), nullable=True)
    metadata_json = Column(JSONB, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    read_at = Column(TIMESTAMP(timezone=True), nullable=True)

    user = relationship("User", backref="notifications")

    __table_args__ = (
        Index("ix_notifications_user_unread", "user_id", "is_read"),
        Index("ix_notifications_created_at", "created_at"),
    )


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=True)
    email = Column(String(255), nullable=True, index=True)
    phone = Column(String(20), nullable=True)
    mobile = Column(String(20), nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id", ondelete="SET NULL"), nullable=True)
    job_title = Column(String(100), nullable=True)
    department = Column(String(100), nullable=True)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    postal_code = Column(String(20), nullable=True)
    notes = Column(Text, nullable=True)
    source = Column(String(50), nullable=True)
    owner_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    company = relationship("Company", backref="contacts")
    owner = relationship("Employee", backref="owned_contacts")

    __table_args__ = (
        Index("ix_contacts_company_id", "company_id"),
        Index("ix_contacts_owner_id", "owner_id"),
    )


class Deal(Base):
    __tablename__ = "deals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    value = Column(Numeric(15, 2), nullable=True)
    currency = Column(String(3), default="INR")
    stage = Column(Enum(DealStage), default=DealStage.prospecting)
    probability = Column(Integer, default=0)
    expected_close_date = Column(Date, nullable=True)
    actual_close_date = Column(Date, nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id", ondelete="SET NULL"), nullable=True)
    contact_id = Column(Integer, ForeignKey("contacts.id", ondelete="SET NULL"), nullable=True)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="SET NULL"), nullable=True)
    owner_id = Column(Integer, ForeignKey("employees.id", ondelete="SET NULL"), nullable=True)
    source = Column(String(50), nullable=True)
    notes = Column(Text, nullable=True)
    lost_reason = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

    company = relationship("Company", backref="deals")
    contact = relationship("Contact", backref="deals")
    lead = relationship("Lead", backref="deals")
    owner = relationship("Employee", backref="owned_deals")

    __table_args__ = (
        Index("ix_deals_stage", "stage"),
        Index("ix_deals_owner_id", "owner_id"),
        Index("ix_deals_company_id", "company_id"),
    )
