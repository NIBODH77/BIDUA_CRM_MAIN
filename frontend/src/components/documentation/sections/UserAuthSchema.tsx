import React from 'react';
import { Database, Shield, Key, Users, Clock } from 'lucide-react';

const UserAuthSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User & Authentication Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete database schema for user management, authentication, role-based access control, and session management.
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            users - Core Authentication Table
          </h3>
          <p className="text-sm text-blue-700 mt-1">Primary table for user authentication and basic profile information</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique user identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">username</td><td className="px-6 py-4 text-sm">VARCHAR(50)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">Login username</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">email</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">User email address</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">password_hash</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Hashed password (bcrypt)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">role</td><td className="px-6 py-4 text-sm">user_role</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 'employee'</td><td className="px-6 py-4 text-sm">admin, manager, employee, documentation</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">department</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">User department</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_active</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">Account status</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Account creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* User Sessions Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            user_sessions - JWT Token Management
          </h3>
          <p className="text-sm text-green-700 mt-1">Active user sessions and JWT token tracking for security and audit</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Session identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">user_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES users(id)</td><td className="px-6 py-4 text-sm">Reference to users table</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">token_hash</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Hashed JWT token</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">refresh_token</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Refresh token for extended sessions</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">expires_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Token expiration time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Session creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">ip_address</td><td className="px-6 py-4 text-sm">INET</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Client IP address</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">user_agent</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Client user agent</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_active</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">Session status</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-purple-900 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            roles - Role-Based Access Control
          </h3>
          <p className="text-sm text-purple-700 mt-1">System roles for permission management</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Role identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">name</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">Role name</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">description</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Role description</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-orange-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-orange-900 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            permissions - System Permissions
          </h3>
          <p className="text-sm text-orange-700 mt-1">Granular permissions for system access control</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Permission identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">code</td><td className="px-6 py-4 text-sm">VARCHAR(128)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">Permission code (e.g., 'users.create')</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">description</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Human-readable description</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SQL Schema Creation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Complete SQL Schema</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create user role enum
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'employee', 'documentation');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'employee',
    department VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions table for JWT management
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Roles table
CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255)
);

-- Permissions table
CREATE TABLE permissions (
    id INTEGER PRIMARY KEY,
    code VARCHAR(128) UNIQUE NOT NULL,
    description VARCHAR(255)
);

-- Many-to-many relationship tables
CREATE TABLE role_permission (
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_role (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Indexes for performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX idx_sessions_active ON user_sessions(is_active);

-- Insert default roles
INSERT INTO roles (id, name, description) VALUES
(1, 'admin', 'System administrator with full access'),
(2, 'manager', 'Department manager with team oversight'),
(3, 'employee', 'Regular employee with limited access'),
(4, 'documentation', 'Documentation access role');

-- Insert default permissions
INSERT INTO permissions (id, code, description) VALUES
(1, 'users.create', 'Create new users'),
(2, 'users.read', 'View user information'),
(3, 'users.update', 'Update user details'),
(4, 'users.delete', 'Delete users'),
(5, 'employees.create', 'Create employee records'),
(6, 'employees.read', 'View employee information'),
(7, 'employees.update', 'Update employee details'),
(8, 'employees.delete', 'Delete employee records'),
(9, 'leads.create', 'Create new leads'),
(10, 'leads.read', 'View lead information'),
(11, 'leads.update', 'Update lead details'),
(12, 'leads.delete', 'Delete leads'),
(13, 'attendance.mark', 'Mark attendance'),
(14, 'attendance.view', 'View attendance records'),
(15, 'payroll.process', 'Process payroll'),
(16, 'payroll.view', 'View payroll information'),
(17, 'reports.generate', 'Generate reports'),
(18, 'settings.manage', 'Manage system settings');`}
        </pre>
      </div>

      {/* Authentication Flow */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Authentication Flow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Login Process</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>User submits username/password</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Backend validates credentials</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Generate JWT access token</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Store session in user_sessions table</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Return token and user info to frontend</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Session Management</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Token included in API requests</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Middleware validates token</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Check session in database</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Verify user permissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Process request or deny access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">Password Security</h3>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• bcrypt hashing algorithm</li>
              <li>• Minimum 8 character requirement</li>
              <li>• Salt rounds for additional security</li>
              <li>• Password history tracking</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Token Management</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• JWT with expiration times</li>
              <li>• Refresh token rotation</li>
              <li>• Session invalidation on logout</li>
              <li>• Concurrent session limits</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Access Control</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Role-based permissions</li>
              <li>• Resource-level authorization</li>
              <li>• Department-based data filtering</li>
              <li>• API endpoint protection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthSchema;