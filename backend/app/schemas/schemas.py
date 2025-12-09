from __future__ import annotations

from datetime import datetime, date, time
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, EmailStr, validator
from enum import Enum
from decimal import Decimal
from pydantic import BaseModel, ConfigDict

from datetime import datetime, date
from pydantic import BaseModel, Field



# --------------------------
# Base Models
# --------------------------

class IDModel(BaseModel):
    id: int

class TimestampModel(BaseModel):
    created_at: datetime
    updated_at: datetime

# --------------------------
# Enum Definitions
# --------------------------

class UserRoleEnum(str, Enum):
    admin = "admin"
    manager = "manager"
    employee = "employee"
    sales_executive = "sales_executive"
    documentation = "documentation"

class LeadStatus(str, Enum):
    hot = "hot"
    warm = "warm"
    cold = "cold"

class LeadStage(str, Enum):
    lead = "lead"
    qualified = "qualified"
    proposal = "proposal"
    negotiation = "negotiation"
    closed_won = "closed-won"
    closed_lost = "closed-lost"

class TicketPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    urgent = "urgent"

class TicketStatus(str, Enum):
    open = "open"
    in_progress = "in-progress"
    resolved = "resolved"
    closed = "closed"

class ActivityType(str, Enum):
    call = "call"
    email = "email"
    meeting = "meeting"
    note = "note"
    status_change = "status_change"

class EmployeeStatus(str, Enum):
    active = "active"
    inactive = "inactive"
    terminated = "terminated"

class GenderType(str, Enum):
    male = "male"
    female = "female"
    other = "other"

class MaritalStatus(str, Enum):
    single = "single"
    married = "married"
    divorced = "divorced"
    widowed = "widowed"

class AddressType(str, Enum):
    current = "current"
    permanent = "permanent"

class AccountType(str, Enum):
    savings = "savings"
    current = "current"
    salary = "salary"

class AttendanceStatus(str, Enum):
    present = "present"
    absent = "absent"
    late = "late"
    half_day = "half-day"
    work_from_home = "work-from-home"

class BreakType(str, Enum):
    lunch = "lunch"
    tea = "tea"
    personal = "personal"
    meeting = "meeting"
    other = "other"

class LeaveType(str, Enum):
    casual = "casual"
    sick = "sick"
    annual = "annual"
    maternity = "maternity"
    paternity = "paternity"
    emergency = "emergency"
    bereavement = "bereavement"

class LeaveStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    cancelled = "cancelled"

class ProjectStatus(str, Enum):
    active = "active"
    completed = "completed"
    on_hold = "on-hold"
    cancelled = "cancelled"

class DependencyType(str, Enum):
    finish_to_start = "finish-to-start"
    start_to_start = "start-to-start"
    finish_to_finish = "finish-to-finish"
    start_to_finish = "start-to-finish"

class TaskPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class ReviewType(str, Enum):
    annual = "annual"
    quarterly = "quarterly"
    probation = "probation"
    promotion = "promotion"
    pip = "pip"

class ReviewStatus(str, Enum):
    draft = "draft"
    in_progress = "in-progress"
    completed = "completed"
    approved = "approved"

class GoalStatus(str, Enum):
    not_started = "not-started"
    in_progress = "in-progress"
    completed = "completed"
    cancelled = "cancelled"

class AchievementImpact(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class FeedbackType(str, Enum):
    peer = "peer"
    manager = "manager"
    report = "report"
    self_review = "self-review"
    other = "other"

class PayrollStatus(str, Enum):
    draft = "draft"
    processed = "processed"
    paid = "paid"
    cancelled = "cancelled"

class ComponentType(str, Enum):
    allowance = "allowance"
    deduction = "deduction"

class CalculationType(str, Enum):
    fixed = "fixed"
    percentage = "percentage"
    formula = "formula"

class DocumentType(str, Enum):
    offer_letter = "offer-letter"
    salary_slip = "salary-slip"
    id_card = "id-card"
    experience_letter = "experience-letter"
    policy = "policy"
    contract = "contract"
    certificate = "certificate"
    other = "other"

class AccessLevel(str, Enum):
    private = "private"
    department = "department"
    company = "company"
    public = "public"

# --------------------------
# User Schemas
# --------------------------

class UserBase(BaseModel):
    username: str
    email: EmailStr
    department: str
    role: UserRoleEnum = UserRoleEnum.employee
    is_active: bool = True

    class Config:
        from_attributes = True






# 3456789876544567898765434567890


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

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Optional[UserRead] = None

class TokenData(BaseModel):
    username: Optional[str] = None

# --------------------------
# Permission Schemas
# --------------------------

class PermissionBase(BaseModel):
    code: str
    description: Optional[str] = None

class PermissionCreate(PermissionBase):
    pass

class PermissionResponse(PermissionBase):
    id: int

    class Config:
        from_attributes = True

# --------------------------
# Role Schemas
# --------------------------

class RoleBase(BaseModel):
    name: str
    description: Optional[str] = None

class RoleCreate(RoleBase):
    permissions: List[int] = []

class RoleResponse(RoleBase):
    id: int
    permissions: List[PermissionResponse] = []

    class Config:
        from_attributes = True

# --------------------------
# User Session Schemas
# --------------------------

class UserSessionBase(BaseModel):
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    is_active: bool = True

class UserSessionCreate(UserSessionBase):
    user_id: int
    token_hash: str
    refresh_token: Optional[str] = None
    expires_at: datetime

class UserSessionResponse(UserSessionBase, IDModel):
    user_id: int
    token_hash: str
    refresh_token: Optional[str] = None
    expires_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True



# --------------------------
# Employee Schemas
# --------------------------

class EmployeeBase(BaseModel):
    employee_id: str
    name: str
    email: EmailStr
    phone: str
    department: str
    designation: str
    joining_date: date
    salary: float
    status: EmployeeStatus = EmployeeStatus.active
    address: str
    emergency_contact: str
    avatar_url: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[GenderType] = None
    marital_status: Optional[MaritalStatus] = None
    nationality: str = "Indian"
    blood_group: Optional[str] = None

class EmployeeCreate(EmployeeBase):
    user_id: Optional[int] = None
    manager_id: Optional[int] = None

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    designation: Optional[str] = None
    salary: Optional[float] = None
    status: Optional[EmployeeStatus] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    avatar_url: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[GenderType] = None
    marital_status: Optional[MaritalStatus] = None
    nationality: Optional[str] = None
    blood_group: Optional[str] = None

class EmployeeResponse(EmployeeBase, IDModel):
    user_id: Optional[int] = None
    manager_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# # --------------------------
# # Bank Account Schemas
# # --------------------------

class BankAccountBase(BaseModel):
    account_number: str
    bank_name: str
    ifsc_code: str
    account_holder_name: str
    account_type: AccountType = AccountType.savings
    is_primary: bool = True

# class BankAccountCreate(BankAccountBase):
#     employee_id: intclass BankAccountCreate(BankAccountBase):
#     employee_id: int

class BankAccountCreate(BankAccountBase):
    pass  # client no longer sends employee_id


class BankAccountResponse(BankAccountBase, IDModel):
    employee_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True



# ✅ New schema for partial update
class BankAccountUpdate(BaseModel):
    account_number: str | None = None
    bank_name: str | None = None
    ifsc_code: str | None = None
    account_holder_name: str | None = None
    account_type: AccountType | None = None
    is_primary: bool | None = None



# --------------------------
# Employee Address Schemas
# --------------------------

class EmployeeAddressBase(BaseModel):
    address_type: AddressType
    line1: str
    line2: Optional[str] = None
    city: str
    state: str
    postal_code: str
    country: str = "India"

# class EmployeeAddressCreate(EmployeeAddressBase):
#     employee_id: int

class EmployeeAddressCreate(EmployeeAddressBase):
    employee_id: Optional[int] = None


class EmployeeAddressResponse(EmployeeAddressBase, IDModel):
    employee_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# --------------------------
# CRM Schemas
# --------------------------

class LeadBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: str
    status: LeadStatus = LeadStatus.warm
    stage: LeadStage = LeadStage.lead
    value: float = 0.0
    source: Optional[str] = None
    last_contact: Optional[date] = None
    next_follow_up: Optional[date] = None
    notes: Optional[str] = None
    lead_score: int = 0

class LeadCreate(LeadBase):
    assigned_to_employee_id: Optional[int] = None

class LeadResponse(LeadBase, IDModel):
    assigned_to_employee_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True





# Add these new schemas to your existing schemas.py

# --------------------------
# Lead Chat Schemas
# --------------------------


# Add to your schemas.py if missing
class SimplifiedLeadResponse(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    
    class Config:
        from_attributes = True

class SimplifiedEmployeeResponse(BaseModel):
    id: int
    name: str
    user_id: int
    
    class Config:
        from_attributes = True

class MessageDirection(str, Enum):
    employee_to_lead = "employee_to_lead"
    lead_to_employee = "lead_to_employee"

class MessageStatus(str, Enum):
    sent = "sent"
    delivered = "delivered"
    read = "read"
    failed = "failed"

class MessageType(str, Enum):
    text = "text"
    image = "image"
    file = "file"
    system = "system"

# Base Schemas
class ChatThreadBase(BaseModel):
    subject: Optional[str] = None
    status: str = "active"

class ChatMessageBase(BaseModel):
    content: str
    message_type: MessageType = MessageType.text
    attachment_url: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None

class ChatParticipantBase(BaseModel):
    participant_type: str
    participant_id: int
    is_active: bool = True

# Create Schemas
class ChatThreadCreate(ChatThreadBase):
    lead_id: int
    employee_id: int

class ChatMessageCreate(ChatMessageBase):
    thread_id: int
    sender_type: str  # "employee" or "lead"
    sender_id: int
    direction: MessageDirection

class ChatParticipantCreate(ChatParticipantBase):
    thread_id: int

# Update Schemas
class ChatThreadUpdate(BaseModel):
    subject: Optional[str] = None
    status: Optional[str] = None

class ChatMessageUpdate(BaseModel):
    status: Optional[MessageStatus] = None
    read_by_employee: Optional[bool] = None
    read_by_lead: Optional[bool] = None

# Response Schemas
class ChatMessageResponse(ChatMessageBase):
    id: int
    thread_id: int
    sender_type: str
    sender_id: int
    direction: MessageDirection
    status: MessageStatus
    read_by_employee: bool
    read_by_lead: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ChatThreadResponse(ChatThreadBase):
    id: int
    lead_id: int
    employee_id: int
    last_message_at: datetime
    message_count: int
    created_at: datetime
    updated_at: datetime
    messages: List[ChatMessageResponse] = []

    class Config:
        from_attributes = True

class ChatParticipantResponse(ChatParticipantBase):
    id: int
    thread_id: int
    joined_at: datetime
    left_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Specialized Schemas for API
class SendMessageRequest(BaseModel):
    content: str
    message_type: MessageType = MessageType.text
    attachment_url: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None

class CreateThreadRequest(BaseModel):
    lead_id: int
    subject: Optional[str] = None
    initial_message: Optional[str] = None

class MarkAsReadRequest(BaseModel):
    message_ids: List[int]



    # Update your list response models to use the simplified versions:

class ChatThreadListResponse(BaseModel):
    threads: List[ChatThreadSimpleResponse]  # Changed from ChatThreadResponse
    total: int
    page: int
    size: int
    has_next: bool

class ChatMessageListResponse(BaseModel):
    messages: List[SimplifiedChatMessageResponse]  # Changed from ChatMessageResponse
    total: int
    page: int
    size: int
    has_next: bool

# WebSocket Schemas
class WebSocketMessage(BaseModel):
    type: str  # "message", "typing", "read_receipt"
    thread_id: int
    sender_type: str
    sender_id: int
    data: Dict[str, Any]

class TypingIndicator(BaseModel):
    thread_id: int
    user_type: str
    user_id: int
    is_typing: bool

# Add these to your schemas.py

class SimplifiedLeadResponse(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    
    class Config:
        from_attributes = True

class SimplifiedEmployeeResponse(BaseModel):
    id: int
    name: str
    user_id: int
    
    class Config:
        from_attributes = True

class SimplifiedChatMessageResponse(BaseModel):
    id: int
    content: str
    message_type: MessageType
    sender_type: str
    sender_id: int
    direction: MessageDirection
    status: MessageStatus
    created_at: datetime
    read_by_employee: bool
    read_by_lead: bool
    attachment_url: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None
    thread_id: int

    class Config:
        from_attributes = True

# Remove any sender_employee or sender_lead fields from other message schemas

class ChatThreadSimpleResponse(BaseModel):
    id: int
    subject: Optional[str]
    lead_id: int
    employee_id: int
    status: str
    last_message_at: datetime
    message_count: int
    created_at: datetime
    updated_at: datetime
    lead: SimplifiedLeadResponse
    employee: SimplifiedEmployeeResponse
    
    class Config:
        from_attributes = True

class ChatThreadDetailResponse(ChatThreadSimpleResponse):
    messages: List[SimplifiedChatMessageResponse] = []
    
    class Config:
        from_attributes = True

# ---------- Teams ----------
class SupportTeamBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    description: Optional[str] = Field(None, max_length=2000)
    is_active: bool = True
    model_config = ConfigDict(from_attributes=True)

class SupportTeamCreate(SupportTeamBase):
    pass

class SupportTeamUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=120)
    description: Optional[str] = Field(None, max_length=2000)
    is_active: Optional[bool] = None
    model_config = ConfigDict(from_attributes=True)

class SupportTeamRead(SupportTeamBase):
    id: int
    created_at: datetime
    updated_at: datetime


# ---------- Team Members ----------
class SupportTeamMemberBase(BaseModel):
    team_id: int
    employee_id: int
    role_in_team: Optional[str] = Field(None, max_length=60)
    active: bool = True
    model_config = ConfigDict(from_attributes=True)

class SupportTeamMemberCreate(SupportTeamMemberBase):
    pass

class SupportTeamMemberUpdate(BaseModel):
    role_in_team: Optional[str] = Field(None, max_length=60)
    active: Optional[bool] = None
    model_config = ConfigDict(from_attributes=True)

class SupportTeamMemberRead(SupportTeamMemberBase):
    added_at: datetime
    updated_at: datetime


# ---------- Paging ----------
class SupportTeamPage(BaseModel):
    total: int
    items: List[SupportTeamRead]
    skip: int
    limit: int

class SupportTeamMemberPage(BaseModel):
    total: int
    items: List[SupportTeamMemberRead]
    skip: int
    limit: int



# --------------------------
# Support Ticket Schemas
# --------------------------




class SupportTicketBase(BaseModel):
    title: str
    description: str
    customer_name: str
    customer_email: EmailStr
    priority: TicketPriority = TicketPriority.medium
    status: TicketStatus = TicketStatus.open
    category: Optional[str] = None
    subcategory: Optional[str] = None
    resolution: Optional[str] = None

class SupportTicketCreate(SupportTicketBase):
    customer_id: Optional[int] = None
    assigned_to_employee_id: Optional[int] = None

class SupportTicketResponse(SupportTicketBase, IDModel):
    ticket_number: str
    customer_id: Optional[int] = None
    assigned_to_employee_id: Optional[int] = None
    created_at: datetime
    resolved_at: Optional[datetime] = None
    updated_at: datetime

    class Config:
        from_attributes = True




# --------------------------
# Lead Activity Schemas
# --------------------------

class LeadActivityBase(BaseModel):
    activity_type: ActivityType
    subject: str
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    outcome: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

class LeadActivityCreate(LeadActivityBase):
    lead_id: int
    employee_id: int

class LeadActivityResponse(LeadActivityBase, IDModel):
    lead_id: int
    employee_id: int
    created_at: datetime

    class Config:
        from_attributes = True





# --------------------------
# Ticket Comment Schemas
# --------------------------

class TicketCommentBase(BaseModel):
    content: str
    is_internal: bool = False
    attachments: Optional[Dict[str, Any]] = None

class TicketCommentCreate(TicketCommentBase):
    ticket_id: int
    author_id: int

class TicketCommentResponse(TicketCommentBase, IDModel):
    ticket_id: int
    author_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --------------------------
# Attendance Schemas
# --------------------------

class GeofenceLocationBase(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float
    radius: float
    timezone: str = "Asia/Kolkata"
    working_hours_start: time = time(9, 0)
    working_hours_end: time = time(18, 0)
    is_active: bool = True

class GeofenceLocationCreate(GeofenceLocationBase):
    pass

class GeofenceLocationResponse(GeofenceLocationBase, IDModel):
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class AttendanceRecordBase(BaseModel):
    date: date
    clock_in: time
    clock_out: Optional[time] = None
    status: AttendanceStatus = AttendanceStatus.present
    location_name: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    is_within_geofence: bool = False
    notes: Optional[str] = None

class AttendanceRecordCreate(AttendanceRecordBase):
    employee_id: int
    geofence_location_id: Optional[int] = None

class AttendanceRecordResponse(AttendanceRecordBase, IDModel):
    employee_id: int
    geofence_location_id: Optional[int] = None
    total_hours: float
    break_hours: float
    overtime_hours: float
    device_info: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    approved_by: Optional[int] = None
    approved_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class AttendanceBreakBase(BaseModel):
    break_start: time
    break_end: Optional[time] = None
    break_type: BreakType = BreakType.lunch
    duration_minutes: int = 0
    notes: Optional[str] = None

class AttendanceBreakCreate(AttendanceBreakBase):
    attendance_id: int

class AttendanceBreakResponse(AttendanceBreakBase, IDModel):
    attendance_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class AttendancePolicyBase(BaseModel):
    name: str
    department: Optional[str] = None
    min_hours_per_day: float = 8.0
    max_hours_per_day: float = 12.0
    late_threshold_minutes: int = 15
    half_day_threshold_hours: float = 4.0
    overtime_threshold_hours: float = 8.0
    max_break_minutes: int = 60
    requires_geofence: bool = True
    is_active: bool = True
    effective_from: date
    effective_to: Optional[date] = None

class AttendancePolicyCreate(AttendancePolicyBase):
    pass

class AttendancePolicyResponse(AttendancePolicyBase, IDModel):
    created_at: datetime

    class Config:
        from_attributes = True

# --------------------------
# Leave Schemas
# --------------------------

class LeavePolicyBase(BaseModel):
    leave_type: LeaveType
    department: Optional[str] = None
    annual_allocation: float
    max_consecutive_days: Optional[int] = None
    min_notice_days: int = 1
    max_advance_days: int = 365
    requires_approval: bool = True
    carry_forward_allowed: bool = False
    max_carry_forward: float = 0
    encashment_allowed: bool = False
    is_active: bool = True
    effective_from: date
    effective_to: Optional[date] = None

class LeavePolicyCreate(LeavePolicyBase):
    pass

class LeavePolicyResponse(LeavePolicyBase, IDModel):
    created_at: datetime

    class Config:
        from_attributes = True

class LeaveRequestBase(BaseModel):
    leave_type: LeaveType
    start_date: date
    end_date: date
    reason: str
    emergency_contact: Optional[str] = None

class LeaveRequestCreate(LeaveRequestBase):
    employee_id: int

class LeaveRequestResponse(LeaveRequestBase, IDModel):
    employee_id: int
    days: float
    status: LeaveStatus = LeaveStatus.pending
    applied_at: datetime
    approved_by: Optional[int] = None
    approved_at: Optional[datetime] = None
    rejected_by: Optional[int] = None
    rejected_at: Optional[datetime] = None
    comments: Optional[str] = None
    attachment_url: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class LeaveBalanceBase(BaseModel):
    leave_type: LeaveType
    year: int
    allocated: float
    used: float = 0
    pending: float = 0
    carry_forward: float = 0
    encashed: float = 0

class LeaveBalanceCreate(LeaveBalanceBase):
    employee_id: int

class LeaveBalanceResponse(LeaveBalanceBase, IDModel):
    employee_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class LeaveApprovalBase(BaseModel):
    approver_id: int
    approval_level: int
    status: LeaveStatus
    comments: Optional[str] = None

class LeaveApprovalCreate(LeaveApprovalBase):
    leave_request_id: int

class LeaveApprovalResponse(LeaveApprovalBase, IDModel):
    leave_request_id: int
    approved_at: datetime

    class Config:
        from_attributes = True

class CompanyHolidayBase(BaseModel):
    name: str
    date: date
    is_optional: bool = False
    description: Optional[str] = None

class CompanyHolidayCreate(CompanyHolidayBase):
    pass

class CompanyHolidayResponse(CompanyHolidayBase, IDModel):
    created_at: datetime

    class Config:
        from_attributes = True

# --------------------------
# Project Management Schemas
# --------------------------

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: ProjectStatus = ProjectStatus.active
    budget: Optional[float] = None

class ProjectCreate(ProjectBase):
    manager_id: Optional[int] = None

class ProjectResponse(ProjectBase, IDModel):
    manager_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: TaskPriority = TaskPriority.medium
    status: str = "todo"
    due_date: Optional[date] = None
    estimated_hours: Optional[float] = None
    actual_hours: Optional[float] = None

class TaskCreate(TaskBase):
    project_id: int
    assigned_to: Optional[int] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[TaskPriority] = None
    status: Optional[str] = None
    due_date: Optional[date] = None
    estimated_hours: Optional[float] = None
    actual_hours: Optional[float] = None
    assigned_to: Optional[int] = None

class TaskResponse(TaskBase, IDModel):
    project_id: int
    assigned_to: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TaskDependencyBase(BaseModel):
    depends_on_task_id: int
    dependency_type: DependencyType = DependencyType.finish_to_start

class TaskDependencyCreate(TaskDependencyBase):
    task_id: int

class TaskDependencyResponse(TaskDependencyBase, IDModel):
    task_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class TaskTimeEntryBase(BaseModel):
    start_time: datetime
    end_time: Optional[datetime] = None
    duration_minutes: Optional[int] = None
    description: Optional[str] = None
    billable: bool = False

class TaskTimeEntryCreate(TaskTimeEntryBase):
    task_id: int
    employee_id: int

class TaskTimeEntryResponse(TaskTimeEntryBase, IDModel):
    task_id: int
    employee_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class TaskTemplateBase(BaseModel):
    name: str
    description: Optional[str] = None
    estimated_hours: Optional[float] = None
    default_priority: TaskPriority = TaskPriority.medium
    checklist: Optional[Dict[str, Any]] = None
    tags: Optional[List[str]] = None
    department: Optional[str] = None
    is_active: bool = True

class TaskTemplateCreate(TaskTemplateBase):
    pass

class TaskTemplateResponse(TaskTemplateBase, IDModel):
    created_at: datetime

    class Config:
        from_attributes = True

# --------------------------
# Performance Management Schemas
# --------------------------

class PerformanceReviewBase(BaseModel):
    review_type: ReviewType
    review_date: date
    reviewer_id: int
    status: ReviewStatus = ReviewStatus.draft
    overall_rating: Optional[float] = None
    comments: Optional[str] = None
    goals: Optional[str] = None

class PerformanceReviewCreate(PerformanceReviewBase):
    employee_id: int

class PerformanceReviewResponse(PerformanceReviewBase, IDModel):
    employee_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PerformanceGoalBase(BaseModel):
    title: str
    description: Optional[str] = None
    target_date: Optional[date] = None
    status: GoalStatus = GoalStatus.not_started
    progress: int = 0

class PerformanceGoalCreate(PerformanceGoalBase):
    employee_id: int
    review_id: Optional[int] = None

class PerformanceGoalResponse(PerformanceGoalBase, IDModel):
    employee_id: int
    review_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PerformanceAchievementBase(BaseModel):
    title: str
    description: Optional[str] = None
    impact_level: AchievementImpact = AchievementImpact.medium
    date_achieved: Optional[date] = None

class PerformanceAchievementCreate(PerformanceAchievementBase):
    review_id: int

class PerformanceAchievementResponse(PerformanceAchievementBase, IDModel):
    review_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class DevelopmentAreaBase(BaseModel):
    area: str
    description: Optional[str] = None
    improvement_plan: Optional[str] = None
    target_date: Optional[date] = None
    status: GoalStatus = GoalStatus.not_started

class DevelopmentAreaCreate(DevelopmentAreaBase):
    review_id: int

class DevelopmentAreaResponse(DevelopmentAreaBase, IDModel):
    review_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Feedback360Base(BaseModel):
    feedback_provider_id: int
    feedback_type: FeedbackType
    rating: float
    comments: Optional[str] = None
    is_anonymous: bool = False

class Feedback360Create(Feedback360Base):
    review_id: int

class Feedback360Response(Feedback360Base, IDModel):
    review_id: int
    submitted_at: datetime

    class Config:
        from_attributes = True

# --------------------------
# Payroll Schemas
# --------------------------

class PayrollComponentBase(BaseModel):
    name: str
    type: ComponentType
    calculation_type: CalculationType
    value: Optional[float] = None
    formula: Optional[str] = None
    is_taxable: bool = False
    is_active: bool = True

class PayrollComponentCreate(PayrollComponentBase):
    pass

class PayrollComponentResponse(PayrollComponentBase, IDModel):
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class EmployeeSalaryComponentBase(BaseModel):
    custom_value: Optional[float] = None
    effective_from: date
    effective_to: Optional[date] = None
    is_active: bool = True

class EmployeeSalaryComponentCreate(EmployeeSalaryComponentBase):
    employee_id: int
    component_id: int

class EmployeeSalaryComponentResponse(EmployeeSalaryComponentBase, IDModel):
    employee_id: int
    component_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PayrollRecordBase(BaseModel):
    month: str
    year: int
    basic_salary: float
    allowances: float = 0
    deductions: float = 0
    overtime: float = 0
    bonus: float = 0
    gross_salary: float
    net_salary: float
    status: PayrollStatus = PayrollStatus.draft
    pay_date: Optional[date] = None

class PayrollRecordCreate(PayrollRecordBase):
    employee_id: int
    processed_by: Optional[int] = None

class PayrollRecordResponse(PayrollRecordBase, IDModel):
    employee_id: int
    processed_by: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class SalarySlipBase(BaseModel):
    month: str
    year: int
    basic_salary: float
    hra: float = 0
    transport: float = 0
    medical: float = 0
    other_allowances: float = 0
    pf: float = 0
    esi: float = 0
    tax: float = 0
    other_deductions: float = 0
    overtime: float = 0
    gross_salary: float
    net_salary: float

class SalarySlipCreate(SalarySlipBase):
    payroll_id: int
    employee_id: int

class SalarySlipResponse(SalarySlipBase, IDModel):
    payroll_id: int
    employee_id: int
    generated_at: datetime

    class Config:
        from_attributes = True

# --------------------------
# Document Management Schemas
# --------------------------

class DocumentBase(BaseModel):
    title: str
    description: Optional[str] = None
    file_name: str
    file_type: str
    file_size: int
    document_type: DocumentType
    access_level: AccessLevel = AccessLevel.private
    department: Optional[str] = None
    tags: Optional[List[str]] = None
    is_archived: bool = False
    expires_at: Optional[datetime] = None

class DocumentCreate(DocumentBase):
    owner_id: int

class DocumentResponse(DocumentBase, IDModel):
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class DocumentPermissionBase(BaseModel):
    access_type: str
    can_download: bool = True
    can_share: bool = False
    expires_at: Optional[datetime] = None

class DocumentPermissionCreate(DocumentPermissionBase):
    document_id: int
    user_id: Optional[int] = None
    role: Optional[str] = None
    department: Optional[str] = None
    granted_by: Optional[int] = None

class DocumentPermissionResponse(DocumentPermissionBase, IDModel):
    document_id: int
    user_id: Optional[int] = None
    role: Optional[str] = None
    department: Optional[str] = None
    granted_by: Optional[int] = None
    granted_at: datetime

    class Config:
        from_attributes = True

class DocumentVersionBase(BaseModel):
    version_number: int
    file_path: str
    file_size: int
    checksum: str
    change_notes: Optional[str] = None

class DocumentVersionCreate(DocumentVersionBase):
    document_id: int
    uploaded_by: int

class DocumentVersionResponse(DocumentVersionBase, IDModel):
    document_id: int
    uploaded_by: int
    uploaded_at: datetime

    class Config:
        from_attributes = True

class DocumentAccessLogBase(BaseModel):
    action: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class DocumentAccessLogCreate(DocumentAccessLogBase):
    document_id: int
    user_id: int

class DocumentAccessLogResponse(DocumentAccessLogBase, IDModel):
    document_id: int
    user_id: int
    accessed_at: datetime

    class Config:
        from_attributes = True

class GeofenceValidationBase(BaseModel):
    latitude: float
    longitude: float
    is_within_boundary: bool
    distance_from_center: Optional[float] = None
    validation_type: str
    device_info: Optional[Dict[str, Any]] = None

class GeofenceValidationCreate(GeofenceValidationBase):
    employee_id: int
    geofence_location_id: Optional[int] = None

class GeofenceValidationResponse(GeofenceValidationBase, IDModel):
    employee_id: int
    geofence_location_id: Optional[int] = None
    validated_at: datetime

    class Config:
        from_attributes = True

# --------------------------
# Response Schemas
# --------------------------

class BaseResponse(BaseModel):
    success: bool = True
    message: str = ""

class UserResponse(BaseResponse):
    data: Optional[UserRead] = None

class UsersResponse(BaseResponse):
    data: List[UserRead] = []

class EmployeeResponse(BaseResponse):
    data: Optional[EmployeeResponse] = None

class EmployeesResponse(BaseResponse):
    data: List[EmployeeResponse] = []

class LeadResponse(BaseResponse):
    data: Optional[LeadResponse] = None

class LeadsResponse(BaseResponse):
    data: List[LeadResponse] = []

class TokenResponse(BaseResponse):
    data: Optional[Token] = None

# Fix forward references
UserRead.model_rebuild()
EmployeeResponse.model_rebuild()
LeadResponse.model_rebuild()
SupportTicketResponse.model_rebuild()




# =====================================-============================

class UserRead(BaseModel):
    id: int
    username: str
    email: str
    role: str
    is_active: bool

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str
    department: str
    is_active: bool = True


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None
    role: Optional[UserRoleEnum] = None
    is_active: Optional[bool] = None






# --------------------------
# Product Schemas
# --------------------------
class ProductBase(BaseModel):
    name: str
    sku: str
    description: Optional[str] = None
    price: Decimal
    mrp: Optional[Decimal] = None
    stock: Optional[int] = 0
    is_active: Optional[bool] = True
    category_id: Optional[int] = None


class ProductCreate(ProductBase):
    pass


class ProductRead(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    mrp: Optional[float]
    stock: Optional[int]
    sku: Optional[str]
    category_id: Optional[int]
    is_active: Optional[bool]

    class Config:
        from_attributes = True




# --------------------------
# Category Schemas
# --------------------------
class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    is_active: Optional[bool] = True
    company_id: int


class CategoryCreate(BaseModel):
    name: str
    slug: str
    company_id: int
    description: Optional[str] = None
    is_active: Optional[bool] = True



class CategoryRead(CategoryBase):
    id: int
    created_at: datetime
    updated_at: datetime
    # products: List[ProductRead] = []

    class Config:
        from_attributes = True


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

    class Config:
        from_attributes = True



# --------------------------
# Address Base
# --------------------------

class AddressCreate(BaseModel):
    street: str
    city: str
    state: str
    country: str
    zip_code: str
    company_id: int   # 🔥 REQUIRED



class AddressBase(BaseModel):
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None


# --------------------------
# Address Update
# --------------------------
class AddressUpdate(AddressBase):
    pass  # partial update allowed

# --------------------------
# Address Read / Response
# --------------------------
class AddressRead(AddressBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2 का replacement for orm_mode









# --------------------------
# Company Schemas
# --------------------------
class CompanyBase(BaseModel):
    name: str
    gstin: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(CompanyBase):
    pass


class CompanyRead(BaseModel):
    id: int
    name: str
    gstin: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 


# --------------------------
# Address Schemas
# --------------------------
class AddressBase(BaseModel):
    street: str
    city: str
    state: Optional[str] = None
    country: Optional[str] = None
    zip_code: Optional[str] = None
    company_id: Optional[int] = None


class AddressCreate(AddressBase):
    pass


class AddressUpdate(AddressBase):
    pass


class AddressRead(AddressBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 



# -----------------------------
# Sales Order Item Schemas
# -----------------------------
class SalesOrderItemBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: float


class SalesOrderItemCreate(SalesOrderItemBase):
    pass


class SalesOrderItemResponse(SalesOrderItemBase):
    id: int

    class Config:
        from_attributes = True   # ✅ (Pydantic v2 replacement of orm_mode)


# -----------------------------
# Sales Order Schemas
# -----------------------------
class SalesOrderBase(BaseModel):
    company_id: int
    order_date: date
    due_date: Optional[date] = None
    notes: Optional[str] = None


class SalesOrderCreate(SalesOrderBase):
    items: List[SalesOrderItemCreate]  # ✅ Nested items required in POST


class SalesOrderResponse(SalesOrderBase):
    id: int
    created_at: datetime
    updated_at: datetime
    items: List[SalesOrderItemResponse] = []

    class Config:
        from_attributes = True




class EmployeeBase(BaseModel):
    employee_id: str
    name: str
    email: str
    phone: str
    department: str
    designation: str
    joining_date: date
    salary: float
    status: str
    address: str
    emergency_contact: str
    avatar_url: str
    date_of_birth: date
    gender: str
    marital_status: str
    nationality: str
    blood_group: str
    user_id: int
    manager_id: Optional[int] = None   # 👈 manager_id optional



# --------------------------
# Create schema
# --------------------------
class EmployeeCreate(EmployeeBase):
    user_id: Optional[int] = None
    manager_id: Optional[int] = None


# --------------------------
# Update schema (all optional)
# --------------------------
class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    designation: Optional[str] = None
    joining_date: Optional[date] = None
    salary: Optional[float] = None
    status: Optional[EmployeeStatus] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    avatar_url: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[GenderType] = None
    marital_status: Optional[MaritalStatus] = None
    nationality: Optional[str] = None
    blood_group: Optional[str] = None
    manager_id: Optional[int] = None


# --------------------------
# Response schema
# --------------------------
class EmployeeResponse(EmployeeBase):
    id: int
    user_id: Optional[int] = None
    manager_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # ✅ allows ORM -> Pydantic conversion




# # ------------------------------
# # Account
# # ------------------------------
# class AccountBase(BaseModel):
#     name: str
#     type: str                # e.g. "asset", "liability", "equity", "revenue", "expense"
#     description: Optional[str] = None
#     balance: Optional[float] = 0.0


# class AccountCreate(AccountBase):
#     pass


# class AccountUpdate(BaseModel):
#     name: Optional[str] = None
#     type: Optional[str] = None
#     description: Optional[str] = None
#     balance: Optional[float] = None


# class AccountRead(AccountBase):
#     id: int

#     class Config:
#         from_attributes = True  # ✅ replaces orm_mode in Pydantic v2


# # ------------------------------
# # Journal Entry Line
# # ------------------------------
# class JournalEntryLineBase(BaseModel):
#     account_id: int
#     debit: float = 0.0
#     credit: float = 0.0


# class JournalEntryLineCreate(JournalEntryLineBase):
#     pass


# class JournalEntryLineRead(JournalEntryLineBase):
#     id: int

#     class Config:
#         from_attributes = True


# # ------------------------------
# # Journal Entry
# # ------------------------------
# class JournalEntryBase(BaseModel):
#     description: Optional[str] = None


# class JournalEntryCreate(JournalEntryBase):
#     lines: List[JournalEntryLineCreate]


# class JournalEntryRead(JournalEntryBase):
#     id: int
#     lines: List[JournalEntryLineRead] = []

#     class Config:
#         from_attributes = True






# -----------------------------------------------------
# Account Schemas
# -----------------------------------------------------

class AccountBase(BaseModel):
    name: str
    code: Optional[str] = None
    group: Optional[str] = None             # Assets / Liabilities / Income / Expense / Equity
    parent_id: Optional[int] = None
    opening_balance: Decimal = Decimal("0")
    is_active: bool = True
    description: Optional[str] = None


class AccountCreate(AccountBase):
    pass


class AccountUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    group: Optional[str] = None
    parent_id: Optional[int] = None
    opening_balance: Optional[Decimal] = None
    is_active: Optional[bool] = None
    description: Optional[str] = None


class AccountResponse(AccountBase):
    """Used for reading accounts from DB"""
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# -----------------------------------------------------
# Journal Entry Schemas
# -----------------------------------------------------

class JournalEntryLineBase(BaseModel):
    account_id: int
    description: Optional[str] = None
    debit: Decimal = Decimal("0")
    credit: Decimal = Decimal("0")


class JournalEntryLineCreate(JournalEntryLineBase):
    pass


class JournalEntryLineRead(JournalEntryLineBase):
    id: int

    class Config:
        from_attributes = True


class JournalEntryCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)  # allow using the alias "date" in payloads
    entry_date: date = Field(default_factory=date.today, alias="date")
    reference: str | None = None
    narration: str | None = None
    lines: List["JournalEntryLineCreate"]  # keep as-is if you refer forward




class JournalEntryRead(BaseModel):
    id: int
    date: date
    reference: Optional[str] = None
    narration: Optional[str] = None
    total_debit: Decimal
    total_credit: Decimal
    lines: List[JournalEntryLineRead]

    class Config:
        from_attributes = True


# --------------------------
# Additional Enums for Missing Endpoints
# --------------------------

class AuditLogAction(str, Enum):
    create = "create"
    update = "update"
    delete = "delete"
    login = "login"
    logout = "logout"
    export = "export"
    import_data = "import"
    bulk_action = "bulk_action"

class NotificationType(str, Enum):
    info = "info"
    warning = "warning"
    success = "success"
    error = "error"
    task = "task"
    leave = "leave"
    attendance = "attendance"
    payroll = "payroll"

class DealStage(str, Enum):
    prospecting = "prospecting"
    qualification = "qualification"
    proposal = "proposal"
    negotiation = "negotiation"
    closed_won = "closed-won"
    closed_lost = "closed-lost"


# --------------------------
# Audit Log Schemas
# --------------------------

class AuditLogBase(BaseModel):
    action: AuditLogAction
    entity_type: str
    entity_id: Optional[int] = None
    description: Optional[str] = None

class AuditLogCreate(AuditLogBase):
    old_values: Optional[Dict[str, Any]] = None
    new_values: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class AuditLogResponse(AuditLogBase):
    id: int
    user_id: Optional[int] = None
    old_values: Optional[Dict[str, Any]] = None
    new_values: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


# --------------------------
# System Settings Schemas
# --------------------------

class SystemSettingsBase(BaseModel):
    key: str
    value: Optional[Dict[str, Any]] = None
    description: Optional[str] = None
    category: str = "general"
    is_public: bool = False

class SystemSettingsCreate(SystemSettingsBase):
    pass

class SystemSettingsUpdate(BaseModel):
    value: Optional[Dict[str, Any]] = None
    description: Optional[str] = None
    category: Optional[str] = None
    is_public: Optional[bool] = None

class SystemSettingsResponse(SystemSettingsBase):
    id: int
    updated_by: Optional[int] = None
    updated_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True


# --------------------------
# Notification Schemas
# --------------------------

class NotificationBase(BaseModel):
    title: str
    message: str
    type: NotificationType = NotificationType.info
    link: Optional[str] = None

class NotificationCreate(NotificationBase):
    user_id: int
    metadata: Optional[Dict[str, Any]] = None

class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = None

class NotificationResponse(NotificationBase):
    id: int
    user_id: int
    is_read: bool
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime
    read_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# --------------------------
# Contact Schemas
# --------------------------

class ContactBase(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    mobile: Optional[str] = None
    company_id: Optional[int] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    notes: Optional[str] = None
    source: Optional[str] = None

class ContactCreate(ContactBase):
    owner_id: Optional[int] = None

class ContactUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    mobile: Optional[str] = None
    company_id: Optional[int] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    notes: Optional[str] = None
    source: Optional[str] = None
    owner_id: Optional[int] = None
    is_active: Optional[bool] = None

class ContactResponse(ContactBase):
    id: int
    owner_id: Optional[int] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# --------------------------
# Deal Schemas
# --------------------------

class DealBase(BaseModel):
    name: str
    description: Optional[str] = None
    value: Optional[Decimal] = None
    currency: str = "INR"
    stage: DealStage = DealStage.prospecting
    probability: int = 0
    expected_close_date: Optional[date] = None
    source: Optional[str] = None
    notes: Optional[str] = None

class DealCreate(DealBase):
    company_id: Optional[int] = None
    contact_id: Optional[int] = None
    lead_id: Optional[int] = None
    owner_id: Optional[int] = None

class DealUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    value: Optional[Decimal] = None
    currency: Optional[str] = None
    stage: Optional[DealStage] = None
    probability: Optional[int] = None
    expected_close_date: Optional[date] = None
    actual_close_date: Optional[date] = None
    company_id: Optional[int] = None
    contact_id: Optional[int] = None
    lead_id: Optional[int] = None
    owner_id: Optional[int] = None
    source: Optional[str] = None
    notes: Optional[str] = None
    lost_reason: Optional[str] = None

class DealResponse(DealBase):
    id: int
    actual_close_date: Optional[date] = None
    company_id: Optional[int] = None
    contact_id: Optional[int] = None
    lead_id: Optional[int] = None
    owner_id: Optional[int] = None
    lost_reason: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# --------------------------
# Dashboard Stats Schemas
# --------------------------

class AdminDashboardStats(BaseModel):
    total_users: int
    total_employees: int
    total_leads: int
    total_tickets: int
    active_employees: int
    pending_leaves: int
    open_tickets: int
    revenue_this_month: Decimal = Decimal("0")

class ManagerTeamOverview(BaseModel):
    team_size: int
    present_today: int
    on_leave: int
    pending_leave_requests: int
    active_tasks: int
    completed_tasks: int

class EmployeeDashboard(BaseModel):
    pending_tasks: int
    completed_tasks: int
    leave_balance: Dict[str, int]
    attendance_this_month: int
    upcoming_reviews: int


# --------------------------
# Bulk Action Schemas
# --------------------------

class BulkUserAction(BaseModel):
    user_ids: List[int]
    action: str
    params: Optional[Dict[str, Any]] = None

class BulkActionResponse(BaseModel):
    success: bool
    affected_count: int
    message: str
    failed_ids: List[int] = []


# --------------------------
# Report Schemas
# --------------------------

class ReportRequest(BaseModel):
    report_type: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    filters: Optional[Dict[str, Any]] = None
    format: str = "json"

class ReportResponse(BaseModel):
    report_type: str
    generated_at: datetime
    data: List[Dict[str, Any]]
    summary: Optional[Dict[str, Any]] = None








