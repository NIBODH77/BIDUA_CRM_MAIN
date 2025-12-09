import React from 'react';
import { Server, Shield, Users, UserCheck, Database, Globe, Zap, Lock } from 'lucide-react';

const APIDocumentationOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation Overview</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete REST API documentation for the BIDUA ERP system with FastAPI backend, 
          including authentication, endpoints, and integration examples.
        </p>
      </div>

      {/* API Base Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">API Base Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Base URL</h4>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm block">http://localhost:8000/api</code>
            <p className="text-xs text-gray-600 mt-1">Development server</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Authentication</h4>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm block">Bearer JWT Token</code>
            <p className="text-xs text-gray-600 mt-1">Required for protected endpoints</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Content Type</h4>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm block">application/json</code>
            <p className="text-xs text-gray-600 mt-1">Request/response format</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">API Documentation</h4>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm block">http://localhost:8000/docs</code>
            <p className="text-xs text-gray-600 mt-1">Interactive Swagger UI</p>
          </div>
        </div>
      </div>

      {/* API Modules Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">API Modules</h2>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Shield className="w-5 h-5 text-blue-600 mr-2" />
                Authentication API
              </h3>
              <p className="text-sm text-gray-600 mb-3">User login, logout, and token management</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
                  <code>/auth/login</code>
                  <span className="text-gray-500">- User authentication</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">POST</span>
                  <code>/auth/logout</code>
                  <span className="text-gray-500">- Session termination</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                  <code>/auth/me</code>
                  <span className="text-gray-500">- Current user info</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">POST</span>
                  <code>/auth/refresh</code>
                  <span className="text-gray-500">- Token refresh</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                CRM API
              </h3>
              <p className="text-sm text-gray-600 mb-3">Customer relationship management endpoints</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                  <code>/leads</code>
                  <span className="text-gray-500">- List all leads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
                  <code>/leads</code>
                  <span className="text-gray-500">- Create new lead</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">PUT</span>
                  <code>/leads/&#123;id&#125;</code>
                  <span className="text-gray-500">- Update lead</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                  <code>/support-tickets</code>
                  <span className="text-gray-500">- List tickets</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <UserCheck className="w-5 h-5 text-purple-600 mr-2" />
                HRMS API
              </h3>
              <p className="text-sm text-gray-600 mb-3">Human resource management endpoints</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                  <code>/employees</code>
                  <span className="text-gray-500">- List employees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
                  <code>/attendance</code>
                  <span className="text-gray-500">- Mark attendance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                  <code>/payroll/&#123;employee_id&#125;</code>
                  <span className="text-gray-500">- Get payroll</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">PUT</span>
                  <code>/leave-requests/&#123;id&#125;</code>
                  <span className="text-gray-500">- Update leave</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Request/Response Examples</h2>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Login Request</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "bidua123"
}

Response (200 OK):
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGci...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "uuid-here",
    "username": "admin",
    "email": "admin@bidua.com",
    "role": "admin",
    "department": "IT",
    "is_active": true
  }
}`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Create Employee</h3>
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
  "joining_date": "2025-01-15",
  "salary": 600000,
  "address": "Mumbai, Maharashtra",
  "emergency_contact": "+91 98765 43211"
}

Response (201 Created):
{
  "id": "uuid-here",
  "employee_id": "BID005",
  "name": "Priya Sharma",
  "email": "priya@bidua.com",
  "department": "Sales",
  "status": "active",
  "created_at": "2025-01-15T10:30:00Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* API Security */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">API Security & Authentication</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              JWT Authentication
            </h3>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Bearer token in Authorization header</li>
              <li>• Token expiration (1 hour default)</li>
              <li>• Refresh token mechanism</li>
              <li>• Automatic token validation</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Role-Based Access
            </h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Endpoint-level permission checks</li>
              <li>• Resource-based authorization</li>
              <li>• Department data filtering</li>
              <li>• Admin override capabilities</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Rate Limiting
            </h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Request rate limiting per user</li>
              <li>• IP-based throttling</li>
              <li>• Endpoint-specific limits</li>
              <li>• Graceful error responses</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Handling */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Error Handling & Status Codes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Standard HTTP Status Codes</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                <span className="font-mono">200 OK</span>
                <span className="text-green-800">Successful request</span>
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                <span className="font-mono">201 Created</span>
                <span className="text-blue-800">Resource created successfully</span>
              </div>
              <div className="flex items-center justify-between bg-yellow-50 p-2 rounded">
                <span className="font-mono">400 Bad Request</span>
                <span className="text-yellow-800">Invalid request data</span>
              </div>
              <div className="flex items-center justify-between bg-red-50 p-2 rounded">
                <span className="font-mono">401 Unauthorized</span>
                <span className="text-red-800">Authentication required</span>
              </div>
              <div className="flex items-center justify-between bg-red-50 p-2 rounded">
                <span className="font-mono">403 Forbidden</span>
                <span className="text-red-800">Insufficient permissions</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="font-mono">404 Not Found</span>
                <span className="text-gray-800">Resource not found</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Error Response Format</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "timestamp": "2025-01-15T10:30:00Z",
    "request_id": "req_123456"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* API Endpoints Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Complete API Endpoints Summary</h2>
        
        {/* Authentication Endpoints */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            Authentication Endpoints
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endpoint</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auth Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/auth/login</td>
                  <td className="px-4 py-3 text-sm">Authenticate user and return JWT token</td>
                  <td className="px-4 py-3 text-sm">No</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">POST</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/auth/logout</td>
                  <td className="px-4 py-3 text-sm">Invalidate current session</td>
                  <td className="px-4 py-3 text-sm">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/auth/me</td>
                  <td className="px-4 py-3 text-sm">Get current authenticated user details</td>
                  <td className="px-4 py-3 text-sm">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">POST</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/auth/refresh</td>
                  <td className="px-4 py-3 text-sm">Refresh JWT token using refresh token</td>
                  <td className="px-4 py-3 text-sm">Refresh Token</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* User Management Endpoints */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 text-green-600 mr-2" />
            User Management Endpoints (Admin Only)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endpoint</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/users</td>
                  <td className="px-4 py-3 text-sm">List all system users</td>
                  <td className="px-4 py-3 text-sm">Admin</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/users/&#123;user_id&#125;</td>
                  <td className="px-4 py-3 text-sm">Get user by ID</td>
                  <td className="px-4 py-3 text-sm">Admin</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/users</td>
                  <td className="px-4 py-3 text-sm">Create a new user account</td>
                  <td className="px-4 py-3 text-sm">Admin</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/users/&#123;user_id&#125;</td>
                  <td className="px-4 py-3 text-sm">Update user details</td>
                  <td className="px-4 py-3 text-sm">Admin</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">DELETE</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/users/&#123;user_id&#125;</td>
                  <td className="px-4 py-3 text-sm">Deactivate user account</td>
                  <td className="px-4 py-3 text-sm">Admin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Employee Management Endpoints */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UserCheck className="w-5 h-5 text-purple-600 mr-2" />
            Employee Management Endpoints
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endpoint</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/employees</td>
                  <td className="px-4 py-3 text-sm">List all employees with pagination</td>
                  <td className="px-4 py-3 text-sm">Admin, Manager</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/employees/&#123;employee_id&#125;</td>
                  <td className="px-4 py-3 text-sm">Get employee by ID</td>
                  <td className="px-4 py-3 text-sm">Admin, Manager, Self</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/employees</td>
                  <td className="px-4 py-3 text-sm">Create new employee record</td>
                  <td className="px-4 py-3 text-sm">Admin, Manager</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/employees/&#123;employee_id&#125;</td>
                  <td className="px-4 py-3 text-sm">Update employee details</td>
                  <td className="px-4 py-3 text-sm">Admin, Manager</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/employees/&#123;employee_id&#125;/bank_account</td>
                  <td className="px-4 py-3 text-sm">Get employee's bank account</td>
                  <td className="px-4 py-3 text-sm">Admin, Self</td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span></td>
                  <td className="px-4 py-3 font-mono text-sm">/employees/&#123;employee_id&#125;/bank_account</td>
                  <td className="px-4 py-3 text-sm">Update bank account details</td>
                  <td className="px-4 py-3 text-sm">Admin, Self</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentationOverview;