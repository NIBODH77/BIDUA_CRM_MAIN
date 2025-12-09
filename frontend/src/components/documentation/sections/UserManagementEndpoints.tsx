import React from 'react';
import { Users, UserPlus, UserCheck, Shield, Search, Settings } from 'lucide-react';

const UserManagementEndpoints: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User Management Endpoints</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete FastAPI user management system with role-based access control, profile management, 
          bulk operations, and administrative tools for user lifecycle management.
        </p>
      </div>

      {/* Endpoints Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          User Management Endpoints Overview
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
                <td className="px-4 py-3 text-sm">List all users with pagination and filtering</td>
                <td className="px-4 py-3 text-sm">Admin</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                <td className="px-4 py-3 font-mono text-sm">/users/&#123;user_id&#125;</td>
                <td className="px-4 py-3 text-sm">Get user details by ID</td>
                <td className="px-4 py-3 text-sm">Admin, Self</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                <td className="px-4 py-3 font-mono text-sm">/users</td>
                <td className="px-4 py-3 text-sm">Create new user account</td>
                <td className="px-4 py-3 text-sm">Admin</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span></td>
                <td className="px-4 py-3 font-mono text-sm">/users/&#123;user_id&#125;</td>
                <td className="px-4 py-3 text-sm">Update user information</td>
                <td className="px-4 py-3 text-sm">Admin, Self (limited)</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">DELETE</span></td>
                <td className="px-4 py-3 font-mono text-sm">/users/&#123;user_id&#125;</td>
                <td className="px-4 py-3 text-sm">Deactivate user account</td>
                <td className="px-4 py-3 text-sm">Admin</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">POST</span></td>
                <td className="px-4 py-3 font-mono text-sm">/users/bulk</td>
                <td className="px-4 py-3 text-sm">Bulk user operations</td>
                <td className="px-4 py-3 text-sm">Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">POST /api/users - Create New User</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/users
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "username": "john.doe",
  "email": "john.doe@bidua.com",
  "password": "SecurePass123!",
  "role": "employee",
  "department": "Sales",
  "is_active": true,
  "profile": {
    "full_name": "John Doe",
    "phone": "+91 98765 43210",
    "timezone": "Asia/Kolkata",
    "language": "en"
  },
  "permissions": [
    "leads.read",
    "leads.create",
    "tasks.read"
  ]
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (201 Created)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "username": "john.doe",
  "email": "john.doe@bidua.com",
  "role": "employee",
  "department": "Sales",
  "is_active": true,
  "created_at": "2025-01-15T10:30:00Z",
  "profile": {
    "full_name": "John Doe",
    "phone": "+91 98765 43210",
    "timezone": "Asia/Kolkata",
    "language": "en"
  },
  "permissions": [
    "leads.read",
    "leads.create",
    "tasks.read"
  ]
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* List Users Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">GET /api/users - List Users with Filtering</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request Parameters</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GET /api/users?page=1&limit=20&role=employee&department=Sales&is_active=true&search=john
Authorization: Bearer <admin_token>

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20, max: 100)
- role: Filter by user role
- department: Filter by department
- is_active: Filter by active status
- search: Search in username, email, full_name
- sort_by: Sort field (username, email, created_at)
- sort_order: Sort direction (asc, desc)`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (200 OK)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "users": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "username": "john.doe",
      "email": "john.doe@bidua.com",
      "role": "employee",
      "department": "Sales",
      "is_active": true,
      "created_at": "2025-01-15T10:30:00Z",
      "last_login": "2025-01-15T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1,
    "has_next": false,
    "has_prev": false
  },
  "filters_applied": {
    "role": "employee",
    "department": "Sales",
    "is_active": true,
    "search": "john"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Bulk Operations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">POST /api/users/bulk - Bulk User Operations</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Bulk Create Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/users/bulk
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "operation": "create",
  "users": [
    {
      "username": "user1",
      "email": "user1@bidua.com",
      "password": "TempPass123!",
      "role": "employee",
      "department": "Marketing"
    },
    {
      "username": "user2",
      "email": "user2@bidua.com",
      "password": "TempPass123!",
      "role": "employee",
      "department": "Sales"
    }
  ],
  "send_welcome_email": true,
  "force_password_change": true
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Bulk Update Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/users/bulk
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "operation": "update",
  "filters": {
    "department": "Sales",
    "role": "employee"
  },
  "updates": {
    "is_active": false,
    "deactivation_reason": "Department restructuring"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementEndpoints;