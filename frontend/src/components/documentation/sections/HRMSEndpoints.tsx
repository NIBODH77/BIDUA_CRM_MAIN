import React from 'react';
import { UserCheck, Clock, Calendar, DollarSign, BarChart3, CheckSquare } from 'lucide-react';

const HRMSEndpoints: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Endpoints</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive FastAPI HRMS system covering complete employee lifecycle management, 
          attendance tracking, payroll processing, performance management, and compliance reporting.
        </p>
      </div>

      {/* HRMS Endpoints Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <UserCheck className="w-5 h-5 mr-2" />
          HRMS Modules Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Employee Management</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Employee CRUD operations</li>
              <li>• Profile management</li>
              <li>• Organizational hierarchy</li>
              <li>• Document management</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Time & Attendance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Attendance marking</li>
              <li>• Geofence verification</li>
              <li>• Leave management</li>
              <li>• Time tracking</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Payroll & Performance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Payroll processing</li>
              <li>• Salary slip generation</li>
              <li>• Performance reviews</li>
              <li>• KPI tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Employee Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Management Endpoints</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">POST /api/employees - Create Employee</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "employee_id": "BID005",
  "name": "Priya Sharma",
  "email": "priya@bidua.com",
  "phone": "+91 98765 43210",
  "department": "Sales",
  "designation": "Sales Executive",
  "manager_id": "emp-uuid-123",
  "joining_date": "2025-01-15",
  "salary": 600000,
  "address": "Mumbai, Maharashtra",
  "emergency_contact": "+91 98765 43211",
  "personal_details": {
    "date_of_birth": "1995-06-15",
    "gender": "female",
    "marital_status": "single",
    "nationality": "Indian",
    "blood_group": "O+"
  },
  "bank_account": {
    "account_number": "1234567890123456",
    "bank_name": "HDFC Bank",
    "ifsc_code": "HDFC0001234",
    "account_holder_name": "Priya Sharma"
  }
}

Response (201 Created):
{
  "id": "emp-uuid-789",
  "employee_id": "BID005",
  "name": "Priya Sharma",
  "email": "priya@bidua.com",
  "department": "Sales",
  "status": "active",
  "created_at": "2025-01-15T10:30:00Z",
  "user_account_created": true
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Attendance Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Management Endpoints</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">POST /api/attendance/clock-in - Clock In</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/attendance/clock-in
Authorization: Bearer <token>
Content-Type: application/json

{
  "employee_id": "BID005",
  "location": {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "accuracy": 5.0
  },
  "device_info": {
    "device_id": "device-123",
    "platform": "mobile",
    "app_version": "1.0.0"
  },
  "notes": "Regular office attendance"
}

Response (201 Created):
{
  "id": "att-uuid-123",
  "employee_id": "BID005",
  "date": "2025-01-15",
  "clock_in": "09:15:00",
  "status": "present",
  "location_verified": true,
  "geofence_location": {
    "id": "geo-uuid-456",
    "name": "Mumbai Office",
    "distance_from_center": 25.5
  },
  "message": "Attendance marked successfully"
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">POST /api/attendance/clock-out - Clock Out</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/attendance/clock-out
Authorization: Bearer <token>
Content-Type: application/json

{
  "attendance_id": "att-uuid-123",
  "location": {
    "latitude": 19.0760,
    "longitude": 72.8777,
    "accuracy": 5.0
  },
  "work_summary": "Completed Q1 sales strategy presentation and client calls"
}

Response (200 OK):
{
  "id": "att-uuid-123",
  "clock_out": "18:30:00",
  "total_hours": 9.25,
  "overtime_hours": 1.25,
  "break_hours": 1.0,
  "status": "present",
  "productivity_score": 85
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Payroll Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Management Endpoints</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">POST /api/payroll/process - Process Monthly Payroll</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/payroll/process
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "month": "January",
  "year": 2025,
  "department": "Sales",
  "employee_ids": ["emp-uuid-123", "emp-uuid-456"],
  "include_overtime": true,
  "include_bonus": true,
  "bonus_criteria": {
    "performance_rating_min": 4.0,
    "target_achievement_min": 90.0
  }
}

Response (202 Accepted):
{
  "job_id": "payroll-job-789",
  "status": "processing",
  "estimated_completion": "2025-01-15T11:00:00Z",
  "employees_count": 25,
  "message": "Payroll processing started"
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">GET /api/payroll/&#123;employee_id&#125;/salary-slip - Generate Salary Slip</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GET /api/payroll/emp-uuid-123/salary-slip?month=December&year=2024&format=pdf
Authorization: Bearer <token>

Response (200 OK):
{
  "employee": {
    "id": "emp-uuid-123",
    "name": "Priya Sharma",
    "employee_id": "BID001",
    "department": "Sales",
    "designation": "Sales Manager"
  },
  "payroll_period": {
    "month": "December",
    "year": 2024,
    "pay_date": "2024-12-31"
  },
  "earnings": {
    "basic_salary": 70000,
    "hra": 28000,
    "transport_allowance": 3000,
    "medical_allowance": 2000,
    "overtime": 5000,
    "bonus": 10000,
    "total_earnings": 118000
  },
  "deductions": {
    "pf": 8400,
    "esi": 0,
    "income_tax": 12000,
    "professional_tax": 200,
    "total_deductions": 20600
  },
  "net_salary": 97400,
  "salary_slip_url": "/api/documents/salary-slips/slip-uuid-456/download"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRMSEndpoints;