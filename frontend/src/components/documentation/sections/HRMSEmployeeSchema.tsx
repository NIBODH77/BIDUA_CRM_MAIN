import React from 'react';
import { Database, Users, Building2, CreditCard, MapPin } from 'lucide-react';

const HRMSEmployeeSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Employee Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive database schema for employee management, including personal details, 
          job information, and bank account details.
        </p>
      </div>

      {/* Employees Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-purple-900 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            employees - Master Employee Data
          </h3>
          <p className="text-sm text-purple-700 mt-1">Complete employee information including personal and professional details</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique employee identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">user_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">UNIQUE, FOREIGN KEY REFERENCES users(id)</td><td className="px-6 py-4 text-sm">Link to user authentication record</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL, UNIQUE</td><td className="px-6 py-4 text-sm">Internal employee ID (e.g., BID001)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Full name of the employee</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">email</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL, UNIQUE</td><td className="px-6 py-4 text-sm">Employee's work email</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">phone</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Employee's phone number</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">department</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Department (e.g., Sales, Marketing)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">designation</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Job title (e.g., Sales Manager)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">manager_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Self-referencing foreign key for manager</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">joining_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Date of joining the company</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">salary</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Annual salary</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">employee_status</td><td className="px-6 py-4 text-sm">DEFAULT 'active'</td><td className="px-6 py-4 text-sm">active, inactive, terminated</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">address</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Employee's residential address</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">emergency_contact</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Emergency contact number</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">avatar_url</td><td className="px-6 py-4 text-sm">VARCHAR(500)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">URL to employee's avatar image</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">date_of_birth</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Employee's date of birth</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">gender</td><td className="px-6 py-4 text-sm">gender_type</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">male, female, other</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">marital_status</td><td className="px-6 py-4 text-sm">marital_status_type</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">single, married, divorced, widowed</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">nationality</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">DEFAULT 'Indian'</td><td className="px-6 py-4 text-sm">Employee's nationality</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">blood_group</td><td className="px-6 py-4 text-sm">VARCHAR(10)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Employee's blood group</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Record creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank Accounts Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            bank_accounts - Employee Banking Details
          </h3>
          <p className="text-sm text-green-700 mt-1">Secure storage of employee bank account information for payroll processing</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">NOT NULL, UNIQUE, FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Link to employee record</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">account_number</td><td className="px-6 py-4 text-sm">VARCHAR(50)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Bank account number (encrypted)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">bank_name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Name of the bank</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">ifsc_code</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">IFSC code for Indian banks</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">account_holder_name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Name of the account holder</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">account_type</td><td className="px-6 py-4 text-sm">VARCHAR(50)</td><td className="px-6 py-4 text-sm">DEFAULT 'savings'</td><td className="px-6 py-4 text-sm">savings, current, salary</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_primary</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">Primary account for salary</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Record creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Addresses Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-orange-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-orange-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            employee_addresses - Address Management
          </h3>
          <p className="text-sm text-orange-700 mt-1">Structured address storage for employees (current and permanent)</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Address identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Link to employee</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">address_type</td><td className="px-6 py-4 text-sm">address_type</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">current, permanent</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">line1</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Address line 1</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">line2</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Address line 2</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">city</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">City name</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">state</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">State/Province</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">postal_code</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Postal/ZIP code</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">country</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">DEFAULT 'India'</td><td className="px-6 py-4 text-sm">Country name</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SQL Schema */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Complete Employee Schema SQL</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create employee-related enums
CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'terminated');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE marital_status_type AS ENUM ('single', 'married', 'divorced', 'widowed');
CREATE TYPE address_type AS ENUM ('current', 'permanent');
CREATE TYPE account_type AS ENUM ('savings', 'current', 'salary');

-- Employees table
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    manager_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    joining_date DATE NOT NULL,
    salary NUMERIC(10,2) NOT NULL,
    status employee_status DEFAULT 'active',
    address TEXT NOT NULL,
    emergency_contact VARCHAR(20) NOT NULL,
    avatar_url VARCHAR(500),
    date_of_birth DATE,
    gender gender_type,
    marital_status marital_status_type,
    nationality VARCHAR(100) DEFAULT 'Indian',
    blood_group VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bank accounts table
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL UNIQUE REFERENCES employees(id) ON DELETE CASCADE,
    account_number VARCHAR(50) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    ifsc_code VARCHAR(20) NOT NULL,
    account_holder_name VARCHAR(255) NOT NULL,
    account_type account_type DEFAULT 'savings',
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee addresses table
CREATE TABLE employee_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    address_type address_type NOT NULL,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, address_type)
);

-- Indexes for performance
CREATE INDEX idx_employees_employee_id ON employees(employee_id);
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_manager ON employees(manager_id);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_bank_accounts_employee ON bank_accounts(employee_id);`}
        </pre>
      </div>

      {/* Employee Data Relationships */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Employee Data Relationships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Primary Relationships</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 text-sm">employees → users</h4>
                <p className="text-xs text-blue-800">One-to-one relationship for authentication</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-900 text-sm">employees → employees (manager)</h4>
                <p className="text-xs text-green-800">Self-referencing for organizational hierarchy</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-900 text-sm">employees → bank_accounts</h4>
                <p className="text-xs text-purple-800">One-to-one for banking information</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Secondary Relationships</h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-900 text-sm">employees → attendance_records</h4>
                <p className="text-xs text-yellow-800">One-to-many for daily attendance</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-red-900 text-sm">employees → leave_requests</h4>
                <p className="text-xs text-red-800">One-to-many for leave applications</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <h4 className="font-semibold text-indigo-900 text-sm">employees → tasks</h4>
                <p className="text-xs text-indigo-800">One-to-many for task assignments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRMSEmployeeSchema;