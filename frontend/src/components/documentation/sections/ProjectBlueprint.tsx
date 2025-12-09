import React from 'react';
import { Layers, GitBranch, Database, Server, Monitor, Users, Shield, Zap } from 'lucide-react';

const ProjectBlueprint: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Blueprint & Architecture</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete project blueprint showing system architecture, data flow, and component relationships for the BIDUA ERP system.
        </p>
      </div>

      {/* System Architecture Diagram */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">System Architecture Overview</h2>
        
        {/* Three-Tier Architecture */}
        <div className="space-y-8">
          {/* Presentation Tier */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Monitor className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-blue-900">Presentation Tier (Frontend)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm">Admin Portal</h4>
                <p className="text-xs text-gray-600">Full system access</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm">Manager Portal</h4>
                <p className="text-xs text-gray-600">Department management</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm">Employee Portal</h4>
                <p className="text-xs text-gray-600">Self-service features</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm">Documentation</h4>
                <p className="text-xs text-gray-600">Technical docs</p>
              </div>
            </div>
          </div>

          {/* Application Tier */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Server className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-green-900">Application Tier (Backend)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">API Layer</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• FastAPI endpoints</li>
                  <li>• Request validation</li>
                  <li>• Response serialization</li>
                  <li>• Error handling</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Business Logic</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• CRM operations</li>
                  <li>• HRMS workflows</li>
                  <li>• Authentication</li>
                  <li>• Authorization</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Services</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Email notifications</li>
                  <li>• File management</li>
                  <li>• Report generation</li>
                  <li>• Audit logging</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Tier */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-purple-900">Data Tier (Database)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">Core Tables</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• users</li>
                  <li>• employees</li>
                  <li>• leads</li>
                  <li>• support_tickets</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">HRMS Tables</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• attendance_records</li>
                  <li>• leave_requests</li>
                  <li>• payroll_records</li>
                  <li>• performance_reviews</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">Supporting Tables</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• tasks</li>
                  <li>• documents</li>
                  <li>• geofence_locations</li>
                  <li>• audit_logs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Flow Architecture */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Flow Architecture</h2>
        <div className="space-y-6">
          {/* Request Flow */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Flow (Frontend → Backend → Database)</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-lg mb-2">
                  <Monitor className="w-8 h-8 text-blue-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">React Component</h4>
                <p className="text-xs text-gray-600">User interaction</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 p-4 rounded-lg mb-2">
                  <Zap className="w-8 h-8 text-indigo-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">API Service</h4>
                <p className="text-xs text-gray-600">HTTP request</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-2">
                  <Server className="w-8 h-8 text-green-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">FastAPI Endpoint</h4>
                <p className="text-xs text-gray-600">Request processing</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 p-4 rounded-lg mb-2">
                  <GitBranch className="w-8 h-8 text-teal-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">SQLAlchemy ORM</h4>
                <p className="text-xs text-gray-600">Query building</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-lg mb-2">
                  <Database className="w-8 h-8 text-purple-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">PostgreSQL</h4>
                <p className="text-xs text-gray-600">Data storage</p>
              </div>
            </div>
          </div>

          {/* Response Flow */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Flow (Database → Backend → Frontend)</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-lg mb-2">
                  <Database className="w-8 h-8 text-purple-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Query Result</h4>
                <p className="text-xs text-gray-600">Raw data</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 p-4 rounded-lg mb-2">
                  <GitBranch className="w-8 h-8 text-teal-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">ORM Mapping</h4>
                <p className="text-xs text-gray-600">Object conversion</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-2">
                  <Shield className="w-8 h-8 text-green-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Pydantic Validation</h4>
                <p className="text-xs text-gray-600">Data serialization</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 p-4 rounded-lg mb-2">
                  <Zap className="w-8 h-8 text-indigo-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">JSON Response</h4>
                <p className="text-xs text-gray-600">HTTP response</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-lg mb-2">
                  <Monitor className="w-8 h-8 text-blue-600 mx-auto" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">React State</h4>
                <p className="text-xs text-gray-600">UI update</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Architecture */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Component Architecture</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend Component Hierarchy</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`App.tsx
├── LoginForm (Authentication)
├── Sidebar (Navigation)
├── Dashboard (Overview)
├── CRMModule
│   ├── LeadsManagement
│   ├── SalesPipeline
│   ├── CustomerSupport
│   └── CRMAnalytics
├── HRMSModule
│   ├── EmployeeManagement
│   ├── AttendanceManagement
│   ├── LeaveManagement
│   ├── PayrollManagement
│   ├── PerformanceManagement
│   └── TaskManagement
├── EmployeePortal
│   ├── EmployeeDashboard
│   ├── EmployeeAttendance
│   ├── EmployeeLeaves
│   ├── EmployeeSalary
│   ├── EmployeeDocuments
│   └── EmployeeTaskView
├── ReportsModule
├── SettingsModule
└── DocumentationPortal`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend API Structure</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`main.py (FastAPI App)
├── /api/auth
│   ├── POST /login
│   ├── POST /logout
│   ├── GET /me
│   └── POST /refresh
├── /api/users (Admin only)
│   ├── GET /users
│   ├── POST /users
│   ├── PUT /users/{id}
│   └── DELETE /users/{id}
├── /api/employees
│   ├── GET /employees
│   ├── POST /employees
│   ├── PUT /employees/{id}
│   └── GET /employees/{id}/bank_account
├── /api/leads
│   ├── GET /leads
│   ├── POST /leads
│   ├── PUT /leads/{id}
│   └── DELETE /leads/{id}
├── /api/attendance
│   ├── GET /attendance
│   ├── POST /attendance
│   └── PUT /attendance/{id}
├── /api/leave-requests
├── /api/tasks
├── /api/payroll
├── /api/performance
├── /api/documents
└── /api/settings`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Security Architecture */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              Authentication Flow
            </h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 text-sm">1. User Login</h4>
                <p className="text-xs text-blue-800">Username/password validation</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-900 text-sm">2. JWT Generation</h4>
                <p className="text-xs text-green-800">Secure token creation with expiry</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-900 text-sm">3. Token Storage</h4>
                <p className="text-xs text-purple-800">Frontend localStorage with security</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="font-semibold text-orange-900 text-sm">4. Request Authorization</h4>
                <p className="text-xs text-orange-800">Bearer token in API headers</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              Role-Based Access Control
            </h3>
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-red-900 text-sm">Admin Role</h4>
                <p className="text-xs text-red-800">Full CRUD on all resources</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-900 text-sm">Manager Role</h4>
                <p className="text-xs text-yellow-800">Department-scoped access + approvals</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-900 text-sm">Employee Role</h4>
                <p className="text-xs text-green-800">Personal data access only</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 text-sm">Documentation Role</h4>
                <p className="text-xs text-blue-800">Read-only documentation access</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Architecture */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Deployment Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <Monitor className="w-12 h-12 text-blue-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Frontend Deployment</h3>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Static site hosting (Vercel/Netlify)</li>
              <li>• CDN distribution</li>
              <li>• Environment variables</li>
              <li>• Build optimization</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-lg mb-4">
              <Server className="w-12 h-12 text-green-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Backend Deployment</h3>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Docker containerization</li>
              <li>• Cloud hosting (AWS/GCP)</li>
              <li>• Load balancing</li>
              <li>• Auto-scaling</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-lg mb-4">
              <Database className="w-12 h-12 text-purple-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Database Deployment</h3>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Managed PostgreSQL service</li>
              <li>• Automated backups</li>
              <li>• Read replicas</li>
              <li>• Connection pooling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBlueprint;