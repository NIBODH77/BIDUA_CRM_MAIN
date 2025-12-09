// Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee' | 'documentation';
  department: string;
  avatar?: string;
  isActive: boolean;
}

// CRM Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'hot' | 'warm' | 'cold';
  stage: 'lead' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  source: string;
  assignedTo: string;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo: string;
  createdAt: string;
  resolvedAt?: string;
  category: string;
}

// HRMS Types
export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  manager?: string;
  joiningDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'terminated';
  avatar?: string;
  address: string;
  emergencyContact: string;
  documents: string[];
  bankAccount?: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    accountHolderName: string;
  };
  personalDetails?: {
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    nationality: string;
    bloodGroup: string;
  };
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isWithinGeofence?: boolean;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'casual' | 'sick' | 'annual' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  progress: number;
  startDate: string;
  dueDate: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  project?: string;
  tags: string[];
  comments: TaskComment[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  type: 'comment' | 'status-change' | 'progress-update' | 'work-report';
  metadata?: {
    oldValue?: string;
    newValue?: string;
    progressPercentage?: number;
    hoursWorked?: number;
    attachments?: string[];
  };
}

export interface Performance {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  overallRating: number;
  kpis: {
    name: string;
    target: number;
    achieved: number;
    rating: number;
  }[];
  managerFeedback: string;
  goals: string[];
  achievements: string[];
  areasOfImprovement: string[];
  reviewDate: string;
  reviewedBy: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  overtime: number;
  netSalary: number;
  status: 'draft' | 'processed' | 'paid';
  payDate?: string;
}

export interface SalarySlip {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: {
    hra: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    pf: number;
    esi: number;
    tax: number;
    other: number;
  };
  overtime: number;
  grossSalary: number;
  netSalary: number;
  generatedAt: string;
}

export interface Document {
  id: string;
  employeeId: string;
  type: 'offer-letter' | 'salary-slip' | 'experience-letter' | 'id-card' | 'policy' | 'other';
  title: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
  size: number;
  isPublic: boolean;
}

export interface GeofenceLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  isActive: boolean;
}

export type ModuleType = 'dashboard' | 'crm' | 'hrms' | 'reports' | 'settings';
export type CRMView = 'leads' | 'pipeline' | 'support' | 'analytics';
export type HRMSView = 'employees' | 'attendance' | 'leaves' | 'tasks' | 'performance' | 'payroll';
export type EmployeePortalView = 'dashboard' | 'tasks' | 'attendance' | 'leaves' | 'salary' | 'documents' | 'profile';

// Notification Types
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  userId?: string;
  read: boolean;
}