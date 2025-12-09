import React from 'react';
import { Database, Calendar, Clock, CheckCircle, XCircle, Users } from 'lucide-react';

const HRMSLeaveSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Leave Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive leave management database schema with flexible policy configuration, 
          multi-level approval workflows, and integration with attendance and payroll systems.
        </p>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            leave_requests - Leave Application Management
          </h3>
          <p className="text-sm text-blue-700 mt-1">Primary table for managing employee leave applications with approval workflow</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique leave request identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">NOT NULL, FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee applying for leave</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">leave_type</td><td className="px-6 py-4 text-sm">leave_type</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">casual, sick, annual, maternity, emergency</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">start_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Leave start date</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">end_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Leave end date</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">days</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Total number of leave days</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">reason</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Reason for leave application</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">leave_status</td><td className="px-6 py-4 text-sm">DEFAULT 'pending'</td><td className="px-6 py-4 text-sm">pending, approved, rejected, cancelled</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">applied_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Application submission time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">approved_by</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Approving manager/HR</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">approved_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Approval timestamp</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">comments</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Manager/HR comments</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">attachment_url</td><td className="px-6 py-4 text-sm">VARCHAR(500)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Supporting document URL</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Balances Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            leave_balances - Employee Leave Balance Tracking
          </h3>
          <p className="text-sm text-green-700 mt-1">Track available, used, and remaining leave balances for each employee by leave type</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Balance record identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee reference</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">leave_type</td><td className="px-6 py-4 text-sm">leave_type</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Type of leave</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">year</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Calendar year</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">allocated</td><td className="px-6 py-4 text-sm">NUMERIC(5,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Total allocated days</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">used</td><td className="px-6 py-4 text-sm">NUMERIC(5,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Days used</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">pending</td><td className="px-6 py-4 text-sm">NUMERIC(5,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Days in pending requests</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">remaining</td><td className="px-6 py-4 text-sm">NUMERIC(5,2)</td><td className="px-6 py-4 text-sm">GENERATED ALWAYS AS (allocated - used) STORED</td><td className="px-6 py-4 text-sm">Calculated remaining balance</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">carry_forward</td><td className="px-6 py-4 text-sm">NUMERIC(5,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Days carried from previous year</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Leave Schema SQL */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Complete Leave Management Schema</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create leave-related enums
CREATE TYPE leave_type AS ENUM ('casual', 'sick', 'annual', 'maternity', 'paternity', 'emergency', 'bereavement');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled');

-- Leave policies table
CREATE TABLE leave_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    leave_type leave_type NOT NULL,
    department VARCHAR(100),
    annual_allocation NUMERIC(5,2) NOT NULL,
    max_consecutive_days INTEGER,
    min_notice_days INTEGER DEFAULT 1,
    max_advance_days INTEGER DEFAULT 365,
    requires_approval BOOLEAN DEFAULT TRUE,
    carry_forward_allowed BOOLEAN DEFAULT FALSE,
    max_carry_forward NUMERIC(5,2) DEFAULT 0,
    encashment_allowed BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    effective_from DATE NOT NULL,
    effective_to DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave requests table
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    leave_type leave_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days NUMERIC(5,2) NOT NULL,
    reason TEXT NOT NULL,
    status leave_status DEFAULT 'pending',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_by UUID REFERENCES employees(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_by UUID REFERENCES employees(id),
    rejected_at TIMESTAMP WITH TIME ZONE,
    comments TEXT,
    attachment_url VARCHAR(500),
    emergency_contact VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_date_range CHECK (end_date >= start_date),
    CONSTRAINT positive_days CHECK (days > 0)
);

-- Leave balances table
CREATE TABLE leave_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    leave_type leave_type NOT NULL,
    year INTEGER NOT NULL,
    allocated NUMERIC(5,2) NOT NULL,
    used NUMERIC(5,2) DEFAULT 0,
    pending NUMERIC(5,2) DEFAULT 0,
    remaining NUMERIC(5,2) GENERATED ALWAYS AS (allocated - used) STORED,
    carry_forward NUMERIC(5,2) DEFAULT 0,
    encashed NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, leave_type, year)
);

-- Leave approval workflow table
CREATE TABLE leave_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    leave_request_id UUID NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
    approver_id UUID NOT NULL REFERENCES employees(id),
    approval_level INTEGER NOT NULL,
    status leave_status NOT NULL,
    comments TEXT,
    approved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(leave_request_id, approver_id)
);

-- Company holidays table
CREATE TABLE company_holidays (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    is_optional BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, name)
);

-- Indexes for performance
CREATE INDEX idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
CREATE INDEX idx_leave_requests_dates ON leave_requests(start_date, end_date);
CREATE INDEX idx_leave_balances_employee_year ON leave_balances(employee_id, year);
CREATE INDEX idx_leave_approvals_request ON leave_approvals(leave_request_id);
CREATE INDEX idx_company_holidays_date ON company_holidays(date);`}
        </pre>
      </div>

      {/* Leave Workflow */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Leave Management Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-2">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">1. Application</h4>
            <p className="text-xs text-gray-600">Employee submits leave request</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 p-4 rounded-lg mb-2">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">2. Review</h4>
            <p className="text-xs text-gray-600">Manager reviews application</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-lg mb-2">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">3. Approval</h4>
            <p className="text-xs text-gray-600">Approve or reject request</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-lg mb-2">
              <Users className="w-8 h-8 text-purple-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">4. Update</h4>
            <p className="text-xs text-gray-600">Update balance and notify</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRMSLeaveSchema;