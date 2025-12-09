
# import int
# from datetime import datetime, date, time
# from typing import Optional, List, Any, Dict
# from pydantic import BaseModel, EmailStr, validator
# from enum import Enum
# from int import int
# from decimal import Decimal

# # --------------------------
# # Base Models
# # --------------------------

# class IDModel(BaseModel):
#     id: int

# class TimestampModel(BaseModel):
#     created_at: datetime
#     updated_at: datetime

# # --------------------------
# # Enum Definitions
# # --------------------------

# class UserRoleEnum(str, Enum):
#     admin = "admin"
#     manager = "manager"
#     employee = "employee"
#     documentation = "documentation"

# class LeadStatus(str, Enum):
#     hot = "hot"
#     warm = "warm"
#     cold = "cold"

# class LeadStage(str, Enum):
#     lead = "lead"
#     qualified = "qualified"
#     proposal = "proposal"
#     negotiation = "negotiation"
#     closed_won = "closed-won"
#     closed_lost = "closed-lost"

# class TicketPriority(str, Enum):
#     low = "low"
#     medium = "medium"
#     high = "high"
#     urgent = "urgent"

# class TicketStatus(str, Enum):
#     open = "open"
#     in_progress = "in-progress"
#     resolved = "resolved"
#     closed = "closed"

# class ActivityType(str, Enum):
#     call = "call"
#     email = "email"
#     meeting = "meeting"
#     note = "note"
#     status_change = "status_change"

# class EmployeeStatus(str, Enum):
#     active = "active"
#     inactive = "inactive"
#     terminated = "terminated"

# class GenderType(str, Enum):
#     male = "male"
#     female = "female"
#     other = "other"

# class MaritalStatus(str, Enum):
#     single = "single"
#     married = "married"
#     divorced = "divorced"
#     widowed = "widowed"

# class AddressType(str, Enum):
#     current = "current"
#     permanent = "permanent"

# class AccountType(str, Enum):
#     savings = "savings"
#     current = "current"
#     salary = "salary"

# class AttendanceStatus(str, Enum):
#     present = "present"
#     absent = "absent"
#     late = "late"
#     half_day = "half-day"
#     work_from_home = "work-from-home"

# class BreakType(str, Enum):
#     lunch = "lunch"
#     tea = "tea"
#     personal = "personal"
#     meeting = "meeting"
#     other = "other"

# class LeaveType(str, Enum):
#     casual = "casual"
#     sick = "sick"
#     annual = "annual"
#     maternity = "maternity"
#     paternity = "paternity"
#     emergency = "emergency"
#     bereavement = "bereavement"

# class LeaveStatus(str, Enum):
#     pending = "pending"
#     approved = "approved"
#     rejected = "rejected"
#     cancelled = "cancelled"

# class ProjectStatus(str, Enum):
#     active = "active"
#     completed = "completed"
#     on_hold = "on-hold"
#     cancelled = "cancelled"

# class DependencyType(str, Enum):
#     finish_to_start = "finish-to-start"
#     start_to_start = "start-to-start"
#     finish_to_finish = "finish-to-finish"
#     start_to_finish = "start-to-finish"

# class TaskPriority(str, Enum):
#     low = "low"
#     medium = "medium"
#     high = "high"
#     critical = "critical"

# class ReviewType(str, Enum):
#     annual = "annual"
#     quarterly = "quarterly"
#     probation = "probation"
#     promotion = "promotion"
#     pip = "pip"

# class ReviewStatus(str, Enum):
#     draft = "draft"
#     in_progress = "in-progress"
#     completed = "completed"
#     approved = "approved"

# class GoalStatus(str, Enum):
#     not_started = "not-started"
#     in_progress = "in-progress"
#     completed = "completed"
#     cancelled = "cancelled"

# class AchievementImpact(str, Enum):
#     low = "low"
#     medium = "medium"
#     high = "high"
#     critical = "critical"

# class FeedbackType(str, Enum):
#     peer = "peer"
#     manager = "manager"
#     report = "report"
#     self_review = "self-review"
#     other = "other"

# class PayrollStatus(str, Enum):
#     draft = "draft"
#     processed = "processed"
#     paid = "paid"
#     cancelled = "cancelled"

# class ComponentType(str, Enum):
#     allowance = "allowance"
#     deduction = "deduction"

# class CalculationType(str, Enum):
#     fixed = "fixed"
#     percentage = "percentage"
#     formula = "formula"

# class DocumentType(str, Enum):
#     offer_letter = "offer-letter"
#     salary_slip = "salary-slip"
#     id_card = "id-card"
#     experience_letter = "experience-letter"
#     policy = "policy"
#     contract = "contract"
#     certificate = "certificate"
#     other = "other"

# class AccessLevel(str, Enum):
#     private = "private"
#     department = "department"
#     company = "company"
#     public = "public"

# # --------------------------
# # User Schemas
# # --------------------------

# class UserBase(BaseModel):
#     username: str
#     email: EmailStr
#     department: str
#     role: UserRoleEnum = UserRoleEnum.employee
#     is_active: bool = True

#     class Config:
#         from_attributes = True






# # 3456789876544567898765434567890


# class UserRead(BaseModel):
#     id: int
#     username: str
#     email: str
#     role: str
#     department: str
#     is_active: bool

#     class Config:
#         orm_mode = True

# class UserCreate(BaseModel):
#     username: str
#     email: str
#     password: str
#     role: str
#     department: str
#     is_active: bool = True

# class UserUpdate(BaseModel):
#     username: Optional[str] = None
#     email: Optional[str] = None
#     password: Optional[str] = None
#     role: Optional[str] = None
#     department: Optional[str] = None
#     is_active: Optional[bool] = None

# class UserLogin(BaseModel):
#     username: str
#     password: str

# class Token(BaseModel):
#     access_token: str
#     token_type: str
#     user: Optional[UserRead] = None

# class TokenData(BaseModel):
#     username: Optional[str] = None

# # --------------------------
# # Permission Schemas
# # --------------------------

# class PermissionBase(BaseModel):
#     code: str
#     description: Optional[str] = None

# class PermissionCreate(PermissionBase):
#     pass

# class PermissionResponse(PermissionBase):
#     id: int

#     class Config:
#         from_attributes = True

# # --------------------------
# # Role Schemas
# # --------------------------

# class RoleBase(BaseModel):
#     name: str
#     description: Optional[str] = None

# class RoleCreate(RoleBase):
#     permissions: List[int] = []

# class RoleResponse(RoleBase):
#     id: int
#     permissions: List[PermissionResponse] = []

#     class Config:
#         from_attributes = True

# # --------------------------
# # User Session Schemas
# # --------------------------

# class UserSessionBase(BaseModel):
#     ip_address: Optional[str] = None
#     user_agent: Optional[str] = None
#     is_active: bool = True

# class UserSessionCreate(UserSessionBase):
#     user_id: int
#     token_hash: str
#     refresh_token: Optional[str] = None
#     expires_at: datetime

# class UserSessionResponse(UserSessionBase, IDModel):
#     user_id: int
#     token_hash: str
#     refresh_token: Optional[str] = None
#     expires_at: datetime
#     created_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Employee Schemas
# # --------------------------

# class EmployeeBase(BaseModel):
#     employee_id: str
#     name: str
#     email: EmailStr
#     phone: str
#     department: str
#     designation: str
#     joining_date: date
#     salary: float
#     status: EmployeeStatus = EmployeeStatus.active
#     address: str
#     emergency_contact: str
#     avatar_url: Optional[str] = None
#     date_of_birth: Optional[date] = None
#     gender: Optional[GenderType] = None
#     marital_status: Optional[MaritalStatus] = None
#     nationality: str = "Indian"
#     blood_group: Optional[str] = None

# class EmployeeCreate(EmployeeBase):
#     user_id: Optional[int] = None
#     manager_id: Optional[int] = None

# class EmployeeUpdate(BaseModel):
#     name: Optional[str] = None
#     email: Optional[EmailStr] = None
#     phone: Optional[str] = None
#     department: Optional[str] = None
#     designation: Optional[str] = None
#     salary: Optional[float] = None
#     status: Optional[EmployeeStatus] = None
#     address: Optional[str] = None
#     emergency_contact: Optional[str] = None
#     avatar_url: Optional[str] = None
#     date_of_birth: Optional[date] = None
#     gender: Optional[GenderType] = None
#     marital_status: Optional[MaritalStatus] = None
#     nationality: Optional[str] = None
#     blood_group: Optional[str] = None

# class EmployeeResponse(EmployeeBase, IDModel):
#     user_id: Optional[int] = None
#     manager_id: Optional[int] = None
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Bank Account Schemas
# # --------------------------

# class BankAccountBase(BaseModel):
#     account_number: str
#     bank_name: str
#     ifsc_code: str
#     account_holder_name: str
#     account_type: AccountType = AccountType.savings
#     is_primary: bool = True

# class BankAccountCreate(BankAccountBase):
#     employee_id: int

# class BankAccountResponse(BankAccountBase, IDModel):
#     employee_id: int
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Employee Address Schemas
# # --------------------------

# class EmployeeAddressBase(BaseModel):
#     address_type: AddressType
#     line1: str
#     line2: Optional[str] = None
#     city: str
#     state: str
#     postal_code: str
#     country: str = "India"

# class EmployeeAddressCreate(EmployeeAddressBase):
#     employee_id: int

# class EmployeeAddressResponse(EmployeeAddressBase, IDModel):
#     employee_id: int
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # CRM Schemas
# # --------------------------

# class LeadBase(BaseModel):
#     name: str
#     email: EmailStr
#     phone: Optional[str] = None
#     company: str
#     status: LeadStatus = LeadStatus.warm
#     stage: LeadStage = LeadStage.lead
#     value: float = 0.0
#     source: Optional[str] = None
#     last_contact: Optional[date] = None
#     next_follow_up: Optional[date] = None
#     notes: Optional[str] = None
#     lead_score: int = 0

# class LeadCreate(LeadBase):
#     assigned_to_employee_id: Optional[int] = None

# class LeadResponse(LeadBase, IDModel):
#     assigned_to_employee_id: Optional[int] = None
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Support Ticket Schemas
# # --------------------------

# class SupportTicketBase(BaseModel):
#     title: str
#     description: str
#     customer_name: str
#     customer_email: EmailStr
#     priority: TicketPriority = TicketPriority.medium
#     status: TicketStatus = TicketStatus.open
#     category: Optional[str] = None
#     subcategory: Optional[str] = None
#     resolution: Optional[str] = None

# class SupportTicketCreate(SupportTicketBase):
#     customer_id: Optional[int] = None
#     assigned_to_employee_id: Optional[int] = None

# class SupportTicketResponse(SupportTicketBase, IDModel):
#     ticket_number: str
#     customer_id: Optional[int] = None
#     assigned_to_employee_id: Optional[int] = None
#     created_at: datetime
#     resolved_at: Optional[datetime] = None
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Lead Activity Schemas
# # --------------------------

# class LeadActivityBase(BaseModel):
#     activity_type: ActivityType
#     subject: str
#     description: Optional[str] = None
#     duration_minutes: Optional[int] = None
#     outcome: Optional[str] = None
#     scheduled_at: Optional[datetime] = None
#     completed_at: Optional[datetime] = None

# class LeadActivityCreate(LeadActivityBase):
#     lead_id: int
#     employee_id: int

# class LeadActivityResponse(LeadActivityBase, IDModel):
#     lead_id: int
#     employee_id: int
#     created_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Ticket Comment Schemas
# # --------------------------

# class TicketCommentBase(BaseModel):
#     content: str
#     is_internal: bool = False
#     attachments: Optional[Dict[str, Any]] = None

# class TicketCommentCreate(TicketCommentBase):
#     ticket_id: int
#     author_id: int

# class TicketCommentResponse(TicketCommentBase, IDModel):
#     ticket_id: int
#     author_id: int
#     created_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Attendance Schemas
# # --------------------------

# class GeofenceLocationBase(BaseModel):
#     name: str
#     address: str
#     latitude: float
#     longitude: float
#     radius: float
#     timezone: str = "Asia/Kolkata"
#     working_hours_start: time = time(9, 0)
#     working_hours_end: time = time(18, 0)
#     is_active: bool = True

# class GeofenceLocationCreate(GeofenceLocationBase):
#     pass

# class GeofenceLocationResponse(GeofenceLocationBase, IDModel):
#     created_at: datetime
#     updated_at: Optional[datetime] = None

#     class Config:
#         from_attributes = True

# class AttendanceRecordBase(BaseModel):
#     date: date
#     clock_in: time
#     clock_out: Optional[time] = None
#     status: AttendanceStatus = AttendanceStatus.present
#     location_name: str
#     latitude: Optional[float] = None
#     longitude: Optional[float] = None
#     is_within_geofence: bool = False
#     notes: Optional[str] = None

# class AttendanceRecordCreate(AttendanceRecordBase):
#     employee_id: int
#     geofence_location_id: Optional[int] = None

# class AttendanceRecordResponse(AttendanceRecordBase, IDModel):
#     employee_id: int
#     geofence_location_id: Optional[int] = None
#     total_hours: float
#     break_hours: float
#     overtime_hours: float
#     device_info: Optional[Dict[str, Any]] = None
#     ip_address: Optional[str] = None
#     approved_by: Optional[int] = None
#     approved_at: Optional[datetime] = None
#     created_at: datetime
#     updated_at: Optional[datetime] = None

#     class Config:
#         from_attributes = True

# class AttendanceBreakBase(BaseModel):
#     break_start: time
#     break_end: Optional[time] = None
#     break_type: BreakType = BreakType.lunch
#     duration_minutes: int = 0
#     notes: Optional[str] = None

# class AttendanceBreakCreate(AttendanceBreakBase):
#     attendance_id: int

# class AttendanceBreakResponse(AttendanceBreakBase, IDModel):
#     attendance_id: int
#     created_at: datetime

#     class Config:
#         from_attributes = True

# class AttendancePolicyBase(BaseModel):
#     name: str
#     department: Optional[str] = None
#     min_hours_per_day: float = 8.0
#     max_hours_per_day: float = 12.0
#     late_threshold_minutes: int = 15
#     half_day_threshold_hours: float = 4.0
#     overtime_threshold_hours: float = 8.0
#     max_break_minutes: int = 60
#     requires_geofence: bool = True
#     is_active: bool = True
#     effective_from: date
#     effective_to: Optional[date] = None

# class AttendancePolicyCreate(AttendancePolicyBase):
#     pass

# class AttendancePolicyResponse(AttendancePolicyBase, IDModel):
#     created_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Leave Schemas
# # --------------------------

# class LeavePolicyBase(BaseModel):
#     leave_type: LeaveType
#     department: Optional[str] = None
#     annual_allocation: float
#     max_consecutive_days: Optional[int] = None
#     min_notice_days: int = 1
#     max_advance_days: int = 365
#     requires_approval: bool = True
#     carry_forward_allowed: bool = False
#     max_carry_forward: float = 0
#     encashment_allowed: bool = False
#     is_active: bool = True
#     effective_from: date
#     effective_to: Optional[date] = None

# class LeavePolicyCreate(LeavePolicyBase):
#     pass

# class LeavePolicyResponse(LeavePolicyBase, IDModel):
#     created_at: datetime

#     class Config:
#         from_attributes = True

# class LeaveRequestBase(BaseModel):
#     leave_type: LeaveType
#     start_date: date
#     end_date: date
#     reason: str
#     emergency_contact: Optional[str] = None

# class LeaveRequestCreate(LeaveRequestBase):
#     employee_id: int

# class LeaveRequestResponse(LeaveRequestBase, IDModel):
#     employee_id: int
#     days: float
#     status: LeaveStatus = LeaveStatus.pending
#     applied_at: datetime
#     approved_by: Optional[int] = None
#     approved_at: Optional[datetime] = None
#     rejected_by: Optional[int] = None
#     rejected_at: Optional[datetime] = None
#     comments: Optional[str] = None
#     attachment_url: Optional[str] = None
#     created_at: datetime
#     updated_at: Optional[datetime] = None

#     class Config:
#         from_attributes = True

# class LeaveBalanceBase(BaseModel):
#     leave_type: LeaveType
#     year: int
#     allocated: float
#     used: float = 0
#     pending: float = 0
#     carry_forward: float = 0
#     encashed: float = 0

# class LeaveBalanceCreate(LeaveBalanceBase):
#     employee_id: int

# class LeaveBalanceResponse(LeaveBalanceBase, IDModel):
#     employee_id: int
#     created_at: datetime
#     updated_at: Optional[datetime] = None

#     class Config:
#         from_attributes = True

# class LeaveApprovalBase(BaseModel):
#     approver_id: int
#     approval_level: int
#     status: LeaveStatus
#     comments: Optional[str] = None

# class LeaveApprovalCreate(LeaveApprovalBase):
#     leave_request_id: int

# class LeaveApprovalResponse(LeaveApprovalBase, IDModel):
#     leave_request_id: int
#     approved_at: datetime

#     class Config:
#         from_attributes = True

# class CompanyHolidayBase(BaseModel):
#     name: str
#     date: date
#     is_optional: bool = False
#     description: Optional[str] = None

# class CompanyHolidayCreate(CompanyHolidayBase):
#     pass

# class CompanyHolidayResponse(CompanyHolidayBase, IDModel):
#     created_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Project Management Schemas
# # --------------------------

# class ProjectBase(BaseModel):
#     name: str
#     description: Optional[str] = None
#     start_date: Optional[date] = None
#     end_date: Optional[date] = None
#     status: ProjectStatus = ProjectStatus.active
#     budget: Optional[float] = None

# class ProjectCreate(ProjectBase):
#     manager_id: Optional[int] = None

# class ProjectResponse(ProjectBase, IDModel):
#     manager_id: Optional[int] = None
#     created_at: datetime

#     class Config:
#         from_attributes = True

# class TaskBase(BaseModel):
#     title: str
#     description: Optional[str] = None
#     priority: TaskPriority = TaskPriority.medium
#     status: str = "todo"
#     due_date: Optional[date] = None
#     estimated_hours: Optional[float] = None
#     actual_hours: Optional[float] = None

# class TaskCreate(TaskBase):
#     project_id: int
#     assigned_to: Optional[int] = None

# class TaskResponse(TaskBase, IDModel):
#     project_id: int
#     assigned_to: Optional[int] = None
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# class TaskDependencyBase(BaseModel):
#     depends_on_task_id: int
#     dependency_type: DependencyType = DependencyType.finish_to_start

# class TaskDependencyCreate(TaskDependencyBase):
#     task_id: int

# class TaskDependencyResponse(TaskDependencyBase, IDModel):
#     task_id: int
#     created_at: datetime

#     class Config:
#         from_attributes = True

# class TaskTimeEntryBase(BaseModel):
#     start_time: datetime
#     end_time: Optional[datetime] = None
#     duration_minutes: Optional[int] = None
#     description: Optional[str] = None
#     billable: bool = False

# class TaskTimeEntryCreate(TaskTimeEntryBase):
#     task_id: int
#     employee_id: int

# class TaskTimeEntryResponse(TaskTimeEntryBase, IDModel):
#     task_id: int
#     employee_id: int
#     created_at: datetime

#     class Config:
#         from_attributes = True

# class TaskTemplateBase(BaseModel):
#     name: str
#     description: Optional[str] = None
#     estimated_hours: Optional[float] = None
#     default_priority: TaskPriority = TaskPriority.medium
#     checklist: Optional[Dict[str, Any]] = None
#     tags: Optional[List[str]] = None
#     department: Optional[str] = None
#     is_active: bool = True

# class TaskTemplateCreate(TaskTemplateBase):
#     pass

# class TaskTemplateResponse(TaskTemplateBase, IDModel):
#     created_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Performance Management Schemas
# # --------------------------

# class PerformanceReviewBase(BaseModel):
#     review_type: ReviewType
#     review_date: date
#     reviewer_id: int
#     status: ReviewStatus = ReviewStatus.draft
#     overall_rating: Optional[float] = None
#     comments: Optional[str] = None
#     goals: Optional[str] = None

# class PerformanceReviewCreate(PerformanceReviewBase):
#     employee_id: int

# class PerformanceReviewResponse(PerformanceReviewBase, IDModel):
#     employee_id: int
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# class PerformanceGoalBase(BaseModel):
#     title: str
#     description: Optional[str] = None
#     target_date: Optional[date] = None
#     status: GoalStatus = GoalStatus.not_started
#     progress: int = 0

# class PerformanceGoalCreate(PerformanceGoalBase):
#     employee_id: int
#     review_id: Optional[int] = None

# class PerformanceGoalResponse(PerformanceGoalBase, IDModel):
#     employee_id: int
#     review_id: Optional[int] = None
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# class PerformanceAchievementBase(BaseModel):
#     title: str
#     description: Optional[str] = None
#     impact_level: AchievementImpact = AchievementImpact.medium
#     date_achieved: Optional[date] = None

# class PerformanceAchievementCreate(PerformanceAchievementBase):
#     review_id: int

# class PerformanceAchievementResponse(PerformanceAchievementBase, IDModel):
#     review_id: int
#     created_at: datetime

#     class Config:
#         from_attributes = True

# class DevelopmentAreaBase(BaseModel):
#     area: str
#     description: Optional[str] = None
#     improvement_plan: Optional[str] = None
#     target_date: Optional[date] = None
#     status: GoalStatus = GoalStatus.not_started

# class DevelopmentAreaCreate(DevelopmentAreaBase):
#     review_id: int

# class DevelopmentAreaResponse(DevelopmentAreaBase, IDModel):
#     review_id: int
#     created_at: datetime

#     class Config:
#         from_attributes = True

# class Feedback360Base(BaseModel):
#     feedback_provider_id: int
#     feedback_type: FeedbackType
#     rating: float
#     comments: Optional[str] = None
#     is_anonymous: bool = False

# class Feedback360Create(Feedback360Base):
#     review_id: int

# class Feedback360Response(Feedback360Base, IDModel):
#     review_id: int
#     submitted_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Payroll Schemas
# # --------------------------

# class PayrollComponentBase(BaseModel):
#     name: str
#     type: ComponentType
#     calculation_type: CalculationType
#     value: Optional[float] = None
#     formula: Optional[str] = None
#     is_taxable: bool = False
#     is_active: bool = True

# class PayrollComponentCreate(PayrollComponentBase):
#     pass

# class PayrollComponentResponse(PayrollComponentBase, IDModel):
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# class EmployeeSalaryComponentBase(BaseModel):
#     custom_value: Optional[float] = None
#     effective_from: date
#     effective_to: Optional[date] = None
#     is_active: bool = True

# class EmployeeSalaryComponentCreate(EmployeeSalaryComponentBase):
#     employee_id: int
#     component_id: int

# class EmployeeSalaryComponentResponse(EmployeeSalaryComponentBase, IDModel):
#     employee_id: int
#     component_id: int
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# class PayrollRecordBase(BaseModel):
#     month: str
#     year: int
#     basic_salary: float
#     allowances: float = 0
#     deductions: float = 0
#     overtime: float = 0
#     bonus: float = 0
#     gross_salary: float
#     net_salary: float
#     status: PayrollStatus = PayrollStatus.draft
#     pay_date: Optional[date] = None

# class PayrollRecordCreate(PayrollRecordBase):
#     employee_id: int
#     processed_by: Optional[int] = None

# class PayrollRecordResponse(PayrollRecordBase, IDModel):
#     employee_id: int
#     processed_by: Optional[int] = None
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# class SalarySlipBase(BaseModel):
#     month: str
#     year: int
#     basic_salary: float
#     hra: float = 0
#     transport: float = 0
#     medical: float = 0
#     other_allowances: float = 0
#     pf: float = 0
#     esi: float = 0
#     tax: float = 0
#     other_deductions: float = 0
#     overtime: float = 0
#     gross_salary: float
#     net_salary: float

# class SalarySlipCreate(SalarySlipBase):
#     payroll_id: int
#     employee_id: int

# class SalarySlipResponse(SalarySlipBase, IDModel):
#     payroll_id: int
#     employee_id: int
#     generated_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Document Management Schemas
# # --------------------------

# class DocumentBase(BaseModel):
#     title: str
#     description: Optional[str] = None
#     file_name: str
#     file_type: str
#     file_size: int
#     document_type: DocumentType
#     access_level: AccessLevel = AccessLevel.private
#     department: Optional[str] = None
#     tags: Optional[List[str]] = None
#     is_archived: bool = False
#     expires_at: Optional[datetime] = None

# class DocumentCreate(DocumentBase):
#     owner_id: int

# class DocumentResponse(DocumentBase, IDModel):
#     owner_id: int
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         from_attributes = True

# class DocumentPermissionBase(BaseModel):
#     access_type: str
#     can_download: bool = True
#     can_share: bool = False
#     expires_at: Optional[datetime] = None

# class DocumentPermissionCreate(DocumentPermissionBase):
#     document_id: int
#     user_id: Optional[int] = None
#     role: Optional[str] = None
#     department: Optional[str] = None
#     granted_by: Optional[int] = None

# class DocumentPermissionResponse(DocumentPermissionBase, IDModel):
#     document_id: int
#     user_id: Optional[int] = None
#     role: Optional[str] = None
#     department: Optional[str] = None
#     granted_by: Optional[int] = None
#     granted_at: datetime

#     class Config:
#         from_attributes = True

# class DocumentVersionBase(BaseModel):
#     version_number: int
#     file_path: str
#     file_size: int
#     checksum: str
#     change_notes: Optional[str] = None

# class DocumentVersionCreate(DocumentVersionBase):
#     document_id: int
#     uploaded_by: int

# class DocumentVersionResponse(DocumentVersionBase, IDModel):
#     document_id: int
#     uploaded_by: int
#     uploaded_at: datetime

#     class Config:
#         from_attributes = True

# class DocumentAccessLogBase(BaseModel):
#     action: str
#     ip_address: Optional[str] = None
#     user_agent: Optional[str] = None

# class DocumentAccessLogCreate(DocumentAccessLogBase):
#     document_id: int
#     user_id: int

# class DocumentAccessLogResponse(DocumentAccessLogBase, IDModel):
#     document_id: int
#     user_id: int
#     accessed_at: datetime

#     class Config:
#         from_attributes = True

# class GeofenceValidationBase(BaseModel):
#     latitude: float
#     longitude: float
#     is_within_boundary: bool
#     distance_from_center: Optional[float] = None
#     validation_type: str
#     device_info: Optional[Dict[str, Any]] = None

# class GeofenceValidationCreate(GeofenceValidationBase):
#     employee_id: int
#     geofence_location_id: Optional[int] = None

# class GeofenceValidationResponse(GeofenceValidationBase, IDModel):
#     employee_id: int
#     geofence_location_id: Optional[int] = None
#     validated_at: datetime

#     class Config:
#         from_attributes = True

# # --------------------------
# # Response Schemas
# # --------------------------

# class BaseResponse(BaseModel):
#     success: bool = True
#     message: str = ""

# class UserResponse(BaseResponse):
#     data: Optional[UserRead] = None

# class UsersResponse(BaseResponse):
#     data: List[UserRead] = []

# class EmployeeResponse(BaseResponse):
#     data: Optional[EmployeeResponse] = None

# class EmployeesResponse(BaseResponse):
#     data: List[EmployeeResponse] = []

# class LeadResponse(BaseResponse):
#     data: Optional[LeadResponse] = None

# class LeadsResponse(BaseResponse):
#     data: List[LeadResponse] = []

# class TokenResponse(BaseResponse):
#     data: Optional[Token] = None

# # Fix forward references
# UserRead.model_rebuild()
# EmployeeResponse.model_rebuild()
# LeadResponse.model_rebuild()
# SupportTicketResponse.model_rebuild()




# # =====================================-============================

# class UserRead(BaseModel):
#     id: int
#     username: str
#     email: str
#     role: str
#     is_active: bool

# class UserCreate(BaseModel):
#     email: EmailStr
#     password: str
#     full_name: str


# class UserCreate(BaseModel):
#     username: str
#     email: EmailStr
#     password: str
#     role: str
#     department: str
#     is_active: bool = True


# class UserUpdate(BaseModel):
#     username: Optional[str] = None
#     email: Optional[EmailStr] = None
#     department: Optional[str] = None
#     role: Optional[UserRoleEnum] = None
#     is_active: Optional[bool] = None



# # Shared properties
# class ProductBase(BaseModel):
#     name: str
#     description: Optional[str] = None
#     price: float
#     sku: str
#     category_id: int

# # Properties for creation (input from user)
# class ProductCreate(ProductBase):
#     pass

# # Properties for update
# class ProductUpdate(BaseModel):
#     name: Optional[str] = None
#     description: Optional[str] = None
#     price: Optional[float] = None
#     sku: Optional[str] = None
#     category_id: Optional[int] = None

# # Properties for reading (output to user)
# class ProductRead(ProductBase):
#     id: int

#     class Config:
#         from_attributes = True  # ✅ replaces orm_mode in Pydantic v2





# # Shared properties
# class CompanyBase(BaseModel):
#     name: str
#     description: Optional[str] = None
#     address: Optional[str] = None
#     website: Optional[str] = None


# # Properties to receive via POST (create)
# class CompanyCreate(CompanyBase):
#     pass


# # Properties to receive via PUT/PATCH (update)
# class CompanyUpdate(BaseModel):
#     name: Optional[str] = None
#     description: Optional[str] = None
#     address: Optional[str] = None
#     website: Optional[str] = None


# # Properties to return to client
# class CompanyRead(CompanyBase):
#     id: int

#     class Config:
#         from_attributes = True  # ✅ replaces orm_mode in Pydantic v2






# # ------------------------------
# # Sales Order Item
# # ------------------------------
# class SalesOrderItemBase(BaseModel):
#     product_id: int
#     quantity: int
#     price: float


# class SalesOrderItemCreate(SalesOrderItemBase):
#     pass


# class SalesOrderItemRead(SalesOrderItemBase):
#     id: int

#     class Config:
#         from_attributes = True  # ✅ replaces orm_mode in Pydantic v2


# # ------------------------------
# # Sales Order
# # ------------------------------
# class SalesOrderBase(BaseModel):
#     customer_id: int
#     status: Optional[str] = "pending"
#     total_amount: Optional[float] = 0.0


# class SalesOrderCreate(SalesOrderBase):
#     items: List[SalesOrderItemCreate]


# class SalesOrderUpdate(BaseModel):
#     status: Optional[str] = None
#     total_amount: Optional[float] = None


# class SalesOrderRead(SalesOrderBase):
#     id: int
#     items: List[SalesOrderItemRead] = []

#     class Config:
#         from_attributes = True






# # ------------------------------
# # Shared properties
# # ------------------------------
# class EmployeeBase(BaseModel):
#     first_name: str
#     last_name: str
#     email: str
#     phone: Optional[str] = None
#     position: Optional[str] = None
#     salary: Optional[float] = None


# # ------------------------------
# # Create Schema
# # ------------------------------
# class EmployeeCreate(EmployeeBase):
#     pass


# # ------------------------------
# # Update Schema
# # ------------------------------
# class EmployeeUpdate(BaseModel):
#     first_name: Optional[str] = None
#     last_name: Optional[str] = None
#     email: Optional[str] = None
#     phone: Optional[str] = None
#     position: Optional[str] = None
#     salary: Optional[float] = None


# # ------------------------------
# # Read Schema (response model)
# # ------------------------------
# class EmployeeRead(EmployeeBase):
#     id: int

#     class Config:
#         from_attributes = True  # ✅ replaces orm_mode in Pydantic v2






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








from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime, date, time
from decimal import Decimal

# ----------------- Base Schemas -----------------
class BaseResponse(BaseModel):
    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


# ----------------- User Schemas -----------------
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True


class UserCreate(BaseModel):
    email: EmailStr        # ✅ required
    password: str          # ✅ required
    full_name: Optional[str] = None  # optional



class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    password: Optional[str] = None

# UserRead schema (for public user data without sensitive information)
class UserRead(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool
    created_at: Optional[datetime] = None
    roles: List['RoleResponse'] = []  # default empty, but if lazy load fails, may skip

    class Config:
        from_attributes = True



class UserResponse(UserBase, BaseResponse):
    id: int
    created_at: datetime
    # roles: List['RoleResponse'] = []   # ✅ same here

    class Config:
        from_attributes = True


# ----------------- Role Schemas -----------------
class RoleBase(BaseModel):
    name: str
    description: Optional[str] = None

class RoleCreate(RoleBase):
    pass

class RoleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class RoleResponse(RoleBase, BaseResponse):
    id: int
    permissions: List['PermissionResponse'] = []
    users: List['UserResponse'] = []



    

# ----------------- Permission Schemas -----------------
class PermissionBase(BaseModel):
    code: str
    description: Optional[str] = None

class PermissionCreate(PermissionBase):
    pass

class PermissionUpdate(BaseModel):
    code: Optional[str] = None
    description: Optional[str] = None

class PermissionResponse(PermissionBase, BaseResponse):
    id: int
    roles: List[RoleResponse] = []

# ----------------- Address Schemas -----------------
class AddressBase(BaseModel):
    line1: str
    line2: Optional[str] = None
    city: str
    state: str
    postal_code: str
    country: str = "India"

class AddressCreate(AddressBase):
    pass

class AddressUpdate(BaseModel):
    line1: Optional[str] = None
    line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None

class AddressResponse(AddressBase, BaseResponse):
    id: int

# ----------------- Company Schemas -----------------
class CompanyBase(BaseModel):
    name: str
    gstin: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None
    address_id: Optional[int] = None

class CompanyCreate(CompanyBase):
    pass

class CompanyRead(CompanyBase):
    id: int  # include database ID
    class Config:
        from_attributes = True  

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    gstin: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None
    address_id: Optional[int] = None

class CompanyResponse(CompanyBase, BaseResponse):
    id: int
    created_at: datetime
    address: Optional[AddressResponse] = None

# ----------------- Category Schemas -----------------
class CategoryBase(BaseModel):
    name: str
    parent_id: Optional[int] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    parent_id: Optional[int] = None

class CategoryResponse(CategoryBase, BaseResponse):
    id: int
    parent: Optional['CategoryResponse'] = None
    children: List['CategoryResponse'] = []

# ----------------- Product Schemas -----------------
class ProductBase(BaseModel):
    sku: str
    name: str
    description: Optional[str] = None
    unit_price: Decimal
    cost_price: Optional[Decimal] = None
    is_active: bool = True
    category_id: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    sku: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    unit_price: Optional[Decimal] = None
    cost_price: Optional[Decimal] = None
    is_active: Optional[bool] = None
    category_id: Optional[int] = None

class ProductResponse(ProductBase, BaseResponse):
    id: int
    category: Optional[CategoryResponse] = None




class ProductRead(ProductBase):
    id: int  # include database ID
   
    class Config:
        from_attributes = True


# ----------------- Warehouse Schemas -----------------
class WarehouseBase(BaseModel):
    name: str
    location: Optional[str] = None

class WarehouseCreate(WarehouseBase):
    pass

class WarehouseUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None

class WarehouseResponse(WarehouseBase, BaseResponse):
    id: int

# ----------------- Stock Movement Schemas -----------------
class StockMovementBase(BaseModel):
    product_id: int
    warehouse_id: int
    change: int
    reason: Optional[str] = None
    occurred_at: Optional[datetime] = None

class StockMovementCreate(StockMovementBase):
    pass

class StockMovementUpdate(BaseModel):
    product_id: Optional[int] = None
    warehouse_id: Optional[int] = None
    change: Optional[int] = None
    reason: Optional[str] = None
    occurred_at: Optional[datetime] = None

class StockMovementResponse(StockMovementBase, BaseResponse):
    id: int
    product: Optional[ProductResponse] = None
    warehouse: Optional[WarehouseResponse] = None

# ----------------- Sales Order Item Schemas -----------------

class SalesOrderItemBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: Decimal

class SalesOrderItemCreate(SalesOrderItemBase):
    pass

class SalesOrderItemUpdate(BaseModel):
    product_id: Optional[int] = None
    quantity: Optional[int] = None
    unit_price: Optional[Decimal] = None

class SalesOrderItemResponse(SalesOrderItemBase, BaseResponse):
    id: int
    sales_order_id: int
    product: Optional[ProductResponse] = None

# ----------------- Sales Order Schemas -----------------
class SalesOrderBase(BaseModel):
    company_id: int
    order_date: date
    due_date: Optional[date] = None
    notes: Optional[str] = None

class SalesOrderCreate(SalesOrderBase):
    items: List[SalesOrderItemCreate] = []

class SalesOrderUpdate(BaseModel):
    company_id: Optional[int] = None
    order_date: Optional[date] = None
    due_date: Optional[date] = None
    notes: Optional[str] = None



class SalesOrderResponse(SalesOrderBase, BaseResponse):
    id: int
    company: Optional[CompanyResponse] = None
    items: List[SalesOrderItemResponse] = []





# ----------------- Account Schemas -----------------
class AccountBase(BaseModel):
    name: str
    code: Optional[str] = None
    account_type: Optional[str] = None
    balance: Decimal = Decimal('0.00')

class AccountCreate(AccountBase):
    pass

class AccountUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    account_type: Optional[str] = None
    balance: Optional[Decimal] = None

class AccountResponse(AccountBase, BaseResponse):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# ----------------- Journal Entry Line Schemas -----------------
class JournalEntryLineBase(BaseModel):
    account_id: int
    debit: Decimal = Decimal('0.00')
    credit: Decimal = Decimal('0.00')
    narration: Optional[str] = None

class JournalEntryLineCreate(JournalEntryLineBase):
    pass

class JournalEntryLineUpdate(BaseModel):
    account_id: Optional[int] = None
    debit: Optional[Decimal] = None
    credit: Optional[Decimal] = None
    narration: Optional[str] = None

class JournalEntryLineResponse(JournalEntryLineBase, BaseResponse):
    id: int
    journal_entry_id: int
    account: Optional[AccountResponse] = None

# ----------------- Journal Entry Schemas -----------------
class JournalEntryBase(BaseModel):
    date: date
    narration: Optional[str] = None

class JournalEntryCreate(JournalEntryBase):
    lines: List[JournalEntryLineCreate] = []

class JournalEntryUpdate(BaseModel):
    entry_date: Optional[date] = None
    narration: Optional[str] = None

class JournalEntryRead(JournalEntryBase, BaseResponse):
    id: int
    lines: List[JournalEntryLineResponse] = []








    

# ----------------- Employee Schemas -----------------



# Base schema shared by Create/Read/Update
class EmployeeBase(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    emp_code: Optional[str] = None
    joined_at: Optional[date] = None

# Schema for creating a new employee
class EmployeeCreate(EmployeeBase):
    first_name: str  # required
    emp_code: str  # required
    email: Optional[EmailStr] = None

# Schema for reading employee data (response_model)
class EmployeeRead(EmployeeBase):
    id: int  # include ID for responses

    class Config:
        from_attributes = True  # ✅ Required for SQLAlchemy models


class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    emp_code: Optional[str] = None
    joined_at: Optional[date] = None

class EmployeeResponse(EmployeeBase, BaseResponse):
    id: int

# ----------------- Attendance Schemas -----------------


class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceUpdate(BaseModel):
    employee_id: Optional[int] = None
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None

# class AttendanceUpdate(BaseModel):
#     employee_id: Optional[int] = None
#     attendance_date: Optional[date] = None
#     check_in: Optional[datetime] = None
#     check_out: Optional[datetime] = None

class AttendanceResponse(AttendanceBase, BaseResponse):
    id: int
    employee: Optional[EmployeeResponse] = None

# ----------------- Association Schemas -----------------
class UserRoleAssignment(BaseModel):
    user_id: int
    role_id: int

class RolePermissionAssignment(BaseModel):
    role_id: int
    permission_id: int

# ----------------- Pagination Schemas -----------------
class PaginatedResponse(BaseModel):
    items: List[BaseResponse]
    total: int
    page: int
    size: int
    pages: int

# ----------------- Token Schemas -----------------
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[int] = None

# ----------------- Login Schemas -----------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ----------------- Update forward references -----------------
UserRead.update_forward_refs()
UserResponse.update_forward_refs()
RoleResponse.update_forward_refs()
PermissionResponse.update_forward_refs()
CategoryResponse.update_forward_refs()

# ----------------- Generic Response Schemas -----------------
class MessageResponse(BaseResponse):
    message: str

class ErrorResponse(BaseResponse):
    error: str
    details: Optional[Dict[str, Any]] = None

class ValidationErrorResponse(BaseResponse):
    errors: List[Dict[str, Any]]



# ============================= CRM Schemas ====================================
from datetime import date, datetime
from typing import Optional, Any
from int import int
from pydantic import BaseModel, Field


# ----------------- Lead Schemas -----------------
class LeadBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: str
    status: Optional[str] = Field(default="warm", pattern="^(hot|warm|cold)$")
    stage: Optional[str] = Field(
        default="lead",
        pattern="^(lead|qualified|proposal|negotiation|closed-won|closed-lost)$"
    )
    value: Optional[float] = 0
    source: Optional[str] = None
    assigned_to_employee_id: Optional[int] = None
    last_contact: Optional[date] = None
    next_follow_up: Optional[date] = None
    notes: Optional[str] = None
    lead_score: Optional[int] = 0


class LeadCreate(LeadBase):
    name: str
    email: str
    company: str


class LeadUpdate(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    company: Optional[str]
    status: Optional[str]
    stage: Optional[str]
    value: Optional[float]
    source: Optional[str]
    assigned_to_employee_id: Optional[int]
    last_contact: Optional[date]
    next_follow_up: Optional[date]
    notes: Optional[str]
    lead_score: Optional[int]


class LeadOut(LeadBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ----------------- SupportTicket Schemas -----------------
class SupportTicketBase(BaseModel):
    ticket_number: str
    title: str
    description: str
    customer_id: int
    customer_name: str
    customer_email: str
    priority: Optional[str] = Field(default="medium", pattern="^(low|medium|high|urgent)$")
    status: Optional[str] = Field(default="open", pattern="^(open|in-progress|resolved|closed)$")
    assigned_to_employee_id: Optional[int] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    resolution: Optional[str] = None


class SupportTicketCreate(SupportTicketBase):
    pass


class SupportTicketUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    priority: Optional[str]
    status: Optional[str]
    assigned_to_employee_id: Optional[int]
    category: Optional[str]
    subcategory: Optional[str]
    resolution: Optional[str]


class SupportTicketOut(SupportTicketBase):
    id: int
    created_at: datetime
    resolved_at: Optional[datetime]
    updated_at: datetime

    class Config:
        from_attributes = True


# ----------------- LeadActivity Schemas -----------------
class LeadActivityBase(BaseModel):
    lead_id: int
    employee_id: Optional[int] = None
    activity_type: str
    subject: str
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    outcome: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None


class LeadActivityCreate(LeadActivityBase):
    pass


class LeadActivityUpdate(BaseModel):
    activity_type: Optional[str]
    subject: Optional[str]
    description: Optional[str]
    duration_minutes: Optional[int]
    outcome: Optional[str]
    scheduled_at: Optional[datetime]
    completed_at: Optional[datetime]


class LeadActivityOut(LeadActivityBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ----------------- TicketComment Schemas -----------------
class TicketCommentBase(BaseModel):
    ticket_id: int
    author_id: Optional[int] = None
    content: str
    is_internal: Optional[bool] = False
    attachments: Optional[Any] = None  # JSONB can be dict or list


class TicketCommentCreate(TicketCommentBase):
    pass


class TicketCommentUpdate(BaseModel):
    content: Optional[str]
    is_internal: Optional[bool]
    attachments: Optional[Any]


class TicketCommentOut(TicketCommentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

    