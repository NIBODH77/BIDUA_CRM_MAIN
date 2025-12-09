import React from 'react';
import { Database, GitBranch, Layers, Shield, Users, Building2 } from 'lucide-react';

const SchemaOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Schema Overview</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive overview of the complete PostgreSQL database schema with visual diagrams, 
          design principles, and architectural decisions for the BIDUA ERP system.
        </p>
      </div>

      {/* Schema Statistics */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Schema Statistics
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">25+</div>
            <div className="text-sm text-gray-600">Total Tables</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Core Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">15+</div>
            <div className="text-sm text-gray-600">Custom Types</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">50+</div>
            <div className="text-sm text-gray-600">Indexes</div>
          </div>
        </div>
      </div>

      {/* Core Schema Modules */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Layers className="w-5 h-5 mr-2" />
          Core Schema Modules
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Authentication Core</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>users</strong> - User accounts</li>
              <li>• <strong>user_sessions</strong> - JWT sessions</li>
              <li>• <strong>roles</strong> - System roles</li>
              <li>• <strong>permissions</strong> - Access control</li>
              <li>• <strong>role_permission</strong> - RBAC mapping</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-3">CRM Module</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• <strong>leads</strong> - Sales prospects</li>
              <li>• <strong>lead_activities</strong> - Interaction history</li>
              <li>• <strong>support_tickets</strong> - Customer support</li>
              <li>• <strong>ticket_comments</strong> - Communication</li>
              <li>• <strong>sales_pipeline</strong> - Deal tracking</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-3">HRMS Core</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• <strong>employees</strong> - Employee master</li>
              <li>• <strong>bank_accounts</strong> - Banking details</li>
              <li>• <strong>employee_addresses</strong> - Address info</li>
              <li>• <strong>departments</strong> - Org structure</li>
              <li>• <strong>designations</strong> - Job roles</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">HRMS Operations</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• <strong>attendance_records</strong> - Daily attendance</li>
              <li>• <strong>leave_requests</strong> - Leave management</li>
              <li>• <strong>payroll_records</strong> - Salary processing</li>
              <li>• <strong>performance_reviews</strong> - Evaluations</li>
              <li>• <strong>tasks</strong> - Task management</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Schema Design Principles */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schema Design Principles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Normalization Strategy</h4>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-semibold text-green-900 text-sm">3rd Normal Form (3NF)</h5>
                <p className="text-xs text-green-800">Most tables follow 3NF to eliminate redundancy while maintaining performance</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h5 className="font-semibold text-yellow-900 text-sm">Selective Denormalization</h5>
                <p className="text-xs text-yellow-800">Strategic denormalization for frequently accessed data (e.g., customer_name in tickets)</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-900 text-sm">JSONB for Flexibility</h5>
                <p className="text-xs text-blue-800">Use JSONB for semi-structured data like personal_details and metadata</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Data Integrity</h4>
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <h5 className="font-semibold text-red-900 text-sm">Foreign Key Constraints</h5>
                <p className="text-xs text-red-800">Strict referential integrity with appropriate CASCADE/SET NULL actions</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-semibold text-purple-900 text-sm">Check Constraints</h5>
                <p className="text-xs text-purple-800">Business rule enforcement at database level (e.g., salary &gt; 0)</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <h5 className="font-semibold text-indigo-900 text-sm">Unique Constraints</h5>
                <p className="text-xs text-indigo-800">Prevent duplicate data with composite unique constraints</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Entity Relationship Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GitBranch className="w-5 h-5 mr-2" />
          Entity Relationship Overview
        </h3>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">Core Entity Relationships</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Authentication Flow */}
              <div className="bg-blue-100 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-3 text-center">Authentication Flow</h5>
                <div className="space-y-2 text-center">
                  <div className="bg-white p-2 rounded border">
                    <strong className="text-sm">users</strong>
                    <div className="text-xs text-gray-600">Authentication & Authorization</div>
                  </div>
                  <div className="text-center">↓ (1:1)</div>
                  <div className="bg-white p-2 rounded border">
                    <strong className="text-sm">employees</strong>
                    <div className="text-xs text-gray-600">Employee Profile</div>
                  </div>
                  <div className="text-center">↓ (1:M)</div>
                  <div className="bg-white p-2 rounded border">
                    <strong className="text-sm">user_sessions</strong>
                    <div className="text-xs text-gray-600">Active Sessions</div>
                  </div>
                </div>
              </div>

              {/* CRM Flow */}
              <div className="bg-green-100 p-4 rounded-lg">
                <h5 className="font-semibold text-green-900 mb-3 text-center">CRM Flow</h5>
                <div className="space-y-2 text-center">
                  <div className="bg-white p-2 rounded border">
                    <strong className="text-sm">leads</strong>
                    <div className="text-xs text-gray-600">Customer Prospects</div>
                  </div>
                  <div className="text-center">↓ (1:M)</div>
                  <div className="bg-white p-2 rounded border">
                    <strong className="text-sm">lead_activities</strong>
                    <div className="text-xs text-gray-600">Interaction History</div>
                  </div>
                  <div className="text-center">↓ (1:M)</div>
                  <div className="bg-white p-2 rounded border">
                    <strong className="text-sm">support_tickets</strong>
                    <div className="text-xs text-gray-600">Customer Support</div>
                  </div>
                </div>
              </div>

              {/* HRMS Flow */}
              <div className="bg-purple-100 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-900 mb-3 text-center">HRMS Flow</h5>
                <div className="space-y-2 text-center">
                  <div className="bg-white p-2 rounded border">
                    <strong className="text-sm">employees</strong>
                    <div className="text-xs text-gray-600">Central Hub</div>
                  </div>
                  <div className="text-center">↓ (1:M)</div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-white p-1 rounded border text-center">
                      <strong className="text-xs">attendance</strong>
                    </div>
                    <div className="bg-white p-1 rounded border text-center">
                      <strong className="text-xs">leaves</strong>
                    </div>
                    <div className="bg-white p-1 rounded border text-center">
                      <strong className="text-xs">payroll</strong>
                    </div>
                    <div className="bg-white p-1 rounded border text-center">
                      <strong className="text-xs">tasks</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Considerations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Considerations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Indexing Strategy</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Primary indexes for lookups
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_employees_employee_id ON employees(employee_id);

-- Composite indexes for common queries
CREATE INDEX idx_attendance_employee_date ON attendance_records(employee_id, date);
CREATE INDEX idx_payroll_employee_month_year ON payroll_records(employee_id, month, year);
CREATE INDEX idx_leads_assigned_status ON leads(assigned_to_employee_id, status);

-- Partial indexes for filtered queries
CREATE INDEX idx_active_employees ON employees(department) WHERE status = 'active';
CREATE INDEX idx_open_tickets ON support_tickets(priority) WHERE status = 'open';

-- Full-text search indexes
CREATE INDEX idx_leads_search ON leads USING gin(to_tsvector('english', name || ' ' || company));`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Query Optimization</h4>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-semibold text-green-900 text-sm">Efficient Joins</h5>
                <p className="text-xs text-green-800">Use appropriate join types and avoid N+1 queries with eager loading</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-900 text-sm">Pagination</h5>
                <p className="text-xs text-blue-800">Implement cursor-based pagination for large datasets</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-semibold text-purple-900 text-sm">Aggregations</h5>
                <p className="text-xs text-purple-800">Use materialized views for complex aggregations and reporting</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Types and Patterns */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Types and Patterns</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Custom Enum Types</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- User and Employee related enums
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'employee', 'documentation');
CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'terminated');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE marital_status_type AS ENUM ('single', 'married', 'divorced', 'widowed');

-- CRM related enums
CREATE TYPE lead_status AS ENUM ('hot', 'warm', 'cold');
CREATE TYPE lead_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE ticket_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');

-- HRMS related enums
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'half-day', 'work-from-home');
CREATE TYPE leave_type AS ENUM ('casual', 'sick', 'annual', 'maternity', 'emergency');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE payroll_status AS ENUM ('draft', 'processed', 'paid', 'cancelled');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE task_status AS ENUM ('pending', 'in-progress', 'completed', 'cancelled');`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Common Patterns</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-900 text-sm">Audit Trail Pattern</h5>
                <pre className="text-xs text-blue-800 font-mono">
{`created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
created_by UUID REFERENCES users(id)
updated_by UUID REFERENCES users(id)`}
                </pre>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-semibold text-green-900 text-sm">Soft Delete Pattern</h5>
                <pre className="text-xs text-green-800 font-mono">
{`is_active BOOLEAN DEFAULT TRUE
deleted_at TIMESTAMP WITH TIME ZONE NULL
deleted_by UUID REFERENCES users(id)`}
                </pre>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-semibold text-purple-900 text-sm">Versioning Pattern</h5>
                <pre className="text-xs text-purple-800 font-mono">
{`version INTEGER DEFAULT 1
effective_from DATE NOT NULL
effective_to DATE NULL`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Implementation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Implementation
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Row Level Security (RLS)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Enable RLS on sensitive tables
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- Policies for employees table
CREATE POLICY "Employees can view own data" ON employees
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR 
           EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager')));

CREATE POLICY "Managers can view department employees" ON employees
    FOR SELECT TO authenticated
    USING (department = (SELECT department FROM users WHERE id = auth.uid()) OR
           EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- Policies for payroll records
CREATE POLICY "Employees can view own payroll" ON payroll_records
    FOR SELECT TO authenticated
    USING (employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager')));`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Data Encryption</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Install pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encrypt sensitive data
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id),
    account_number_encrypted BYTEA NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    ifsc_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Functions for encryption/decryption
CREATE OR REPLACE FUNCTION encrypt_account_number(account_number TEXT)
RETURNS BYTEA AS $$
BEGIN
    RETURN pgp_sym_encrypt(account_number, current_setting('app.encryption_key'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrypt_account_number(encrypted_data BYTEA)
RETURNS TEXT AS $$
BEGIN
    RETURN pgp_sym_decrypt(encrypted_data, current_setting('app.encryption_key'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;`}
            </pre>
          </div>
        </div>
      </div>

      {/* Migration Strategy */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Migration Strategy</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Alembic Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# alembic.ini
[alembic]
script_location = alembic
prepend_sys_path = .
version_path_separator = os
sqlalchemy.url = postgresql://bidua_user:password@localhost:5432/bidua_erp

[post_write_hooks]
hooks = black
black.type = console_scripts
black.entrypoint = black
black.options = -l 79 REVISION_SCRIPT_FILENAME

[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Migration Best Practices</h4>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-semibold text-green-900 text-sm">Safe Migrations</h5>
                <ul className="text-xs text-green-800 space-y-1">
                  <li>• Use IF EXISTS/IF NOT EXISTS</li>
                  <li>• Add columns with defaults</li>
                  <li>• Create indexes concurrently</li>
                  <li>• Test on staging first</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h5 className="font-semibold text-yellow-900 text-sm">Data Migrations</h5>
                <ul className="text-xs text-yellow-800 space-y-1">
                  <li>• Separate schema and data changes</li>
                  <li>• Use batch processing for large datasets</li>
                  <li>• Implement rollback procedures</li>
                  <li>• Monitor migration progress</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schema Documentation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schema Documentation Standards</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Table and Column Comments</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Add comments to tables and columns
COMMENT ON TABLE employees IS 'Master employee information table with personal and professional details';
COMMENT ON COLUMN employees.employee_id IS 'Internal employee identifier (e.g., BID001)';
COMMENT ON COLUMN employees.salary IS 'Annual salary in INR';
COMMENT ON COLUMN employees.status IS 'Current employment status';

COMMENT ON TABLE attendance_records IS 'Daily attendance tracking with location verification';
COMMENT ON COLUMN attendance_records.is_within_geofence IS 'Whether attendance was marked within defined office boundaries';

COMMENT ON TABLE payroll_records IS 'Monthly payroll processing records with detailed salary breakdown';
COMMENT ON COLUMN payroll_records.gross_salary IS 'Calculated gross salary before deductions';`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Schema Validation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Validation functions
CREATE OR REPLACE FUNCTION validate_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_phone(phone TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN phone ~* '^\+91[0-9]{10}$';
END;
$$ LANGUAGE plpgsql;

-- Add validation constraints
ALTER TABLE employees ADD CONSTRAINT valid_email CHECK (validate_email(email));
ALTER TABLE employees ADD CONSTRAINT valid_phone CHECK (validate_phone(phone));
ALTER TABLE employees ADD CONSTRAINT positive_salary CHECK (salary > 0);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaOverview;