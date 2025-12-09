import React from 'react';
import { Shield, Key, Lock, Users, Clock, AlertTriangle } from 'lucide-react';

const AuthenticationEndpoints: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Endpoints</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive FastAPI authentication system with JWT implementation, session management, 
          multi-factor authentication, and advanced security features.
        </p>
      </div>

      {/* Authentication Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Authentication System Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">JWT Tokens</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Access tokens (1 hour expiry)</li>
              <li>• Refresh tokens (7 days expiry)</li>
              <li>• Secure token storage</li>
              <li>• Automatic token refresh</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Session Management</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Active session tracking</li>
              <li>• Concurrent session limits</li>
              <li>• Device fingerprinting</li>
              <li>• Session invalidation</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Security Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Rate limiting</li>
              <li>• Account lockout</li>
              <li>• Password policies</li>
              <li>• Audit logging</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Login Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">POST /api/auth/login - User Authentication</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "bidua123",
  "remember_me": true,
  "device_info": {
    "device_id": "unique-device-identifier",
    "device_name": "John's MacBook Pro",
    "platform": "web",
    "user_agent": "Mozilla/5.0..."
  }
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (200 OK)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "admin",
    "email": "admin@bidua.com",
    "role": "admin",
    "department": "IT",
    "is_active": true,
    "last_login": "2025-01-15T10:30:00Z",
    "permissions": [
      "users.create",
      "users.read",
      "users.update",
      "users.delete",
      "employees.manage",
      "reports.generate"
    ]
  },
  "session": {
    "session_id": "sess_123456789",
    "expires_at": "2025-01-15T18:30:00Z",
    "device_registered": true
  }
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Error Responses</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-red-900 mb-2">401 Unauthorized</h5>
                <pre className="bg-gray-900 text-red-400 p-3 rounded text-sm">
{`{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password",
    "details": {
      "attempts_remaining": 2,
      "lockout_time": null
    }
  }
}`}
                </pre>
              </div>
              <div>
                <h5 className="font-semibold text-red-900 mb-2">423 Locked</h5>
                <pre className="bg-gray-900 text-red-400 p-3 rounded text-sm">
{`{
  "error": {
    "code": "ACCOUNT_LOCKED",
    "message": "Account locked due to multiple failed attempts",
    "details": {
      "lockout_expires_at": "2025-01-15T11:00:00Z",
      "contact_admin": true
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Token Refresh Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">POST /api/auth/refresh - Token Refresh</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (200 OK)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Current User Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">GET /api/auth/me - Current User Information</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GET /api/auth/me
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (200 OK)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "admin",
  "email": "admin@bidua.com",
  "role": "admin",
  "department": "IT",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z",
  "last_login": "2025-01-15T10:30:00Z",
  "permissions": [
    "users.create",
    "users.read",
    "users.update",
    "users.delete"
  ],
  "profile": {
    "full_name": "System Administrator",
    "avatar_url": null,
    "timezone": "Asia/Kolkata",
    "language": "en"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Logout Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">POST /api/auth/logout - Session Termination</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/auth/logout
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
Content-Type: application/json

{
  "logout_all_devices": false
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (200 OK)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "message": "Successfully logged out",
  "sessions_terminated": 1,
  "timestamp": "2025-01-15T10:45:00Z"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Security Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Password Security
            </h3>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• bcrypt hashing with salt rounds</li>
              <li>• Minimum 8 character requirement</li>
              <li>• Password complexity validation</li>
              <li>• Password history tracking</li>
              <li>• Forced password rotation</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Session Security
            </h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• JWT with short expiration</li>
              <li>• Refresh token rotation</li>
              <li>• Session invalidation on logout</li>
              <li>• Concurrent session limits</li>
              <li>• Device registration tracking</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Threat Protection
            </h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Rate limiting per IP/user</li>
              <li>• Brute force protection</li>
              <li>• Account lockout policies</li>
              <li>• Suspicious activity detection</li>
              <li>• IP whitelist/blacklist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationEndpoints;