import React from 'react';
import { Globe, Zap, Shield, Database, Code, Monitor } from 'lucide-react';

const CompleteEndpoints: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Endpoint Reference</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive FastAPI endpoint documentation with interactive examples, code samples, 
          testing strategies, and integration guides for the complete BIDUA ERP API.
        </p>
      </div>

      {/* API Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Complete API Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
            <div className="text-2xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-gray-600">Total Endpoints</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">API Modules</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
            <div className="text-2xl font-bold text-purple-600">4</div>
            <div className="text-sm text-gray-600">Auth Methods</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
            <div className="text-2xl font-bold text-orange-600">99.9%</div>
            <div className="text-sm text-gray-600">Uptime SLA</div>
          </div>
        </div>
      </div>

      {/* Complete Endpoint List */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Endpoint Catalog</h3>
        
        <div className="space-y-8">
          {/* Authentication Module */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              Authentication Module
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endpoint</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/auth/login</td>
                    <td className="px-4 py-3 text-sm">User authentication with credentials</td>
                    <td className="px-4 py-3 text-sm">None</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/auth/refresh</td>
                    <td className="px-4 py-3 text-sm">Refresh JWT access token</td>
                    <td className="px-4 py-3 text-sm">Refresh Token</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/auth/me</td>
                    <td className="px-4 py-3 text-sm">Get current user information</td>
                    <td className="px-4 py-3 text-sm">Bearer Token</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">POST</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/auth/logout</td>
                    <td className="px-4 py-3 text-sm">Terminate user session</td>
                    <td className="px-4 py-3 text-sm">Bearer Token</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/auth/change-password</td>
                    <td className="px-4 py-3 text-sm">Change user password</td>
                    <td className="px-4 py-3 text-sm">Bearer Token</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Employee Module */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Monitor className="w-5 h-5 text-green-600 mr-2" />
              Employee Management Module
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endpoint</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/employees</td>
                    <td className="px-4 py-3 text-sm">List employees with filtering and pagination</td>
                    <td className="px-4 py-3 text-sm">Admin, Manager</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/employees</td>
                    <td className="px-4 py-3 text-sm">Create new employee record</td>
                    <td className="px-4 py-3 text-sm">Admin, Manager</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/employees/&#123;id&#125;</td>
                    <td className="px-4 py-3 text-sm">Get employee details by ID</td>
                    <td className="px-4 py-3 text-sm">Admin, Manager, Self</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/employees/&#123;id&#125;</td>
                    <td className="px-4 py-3 text-sm">Update employee information</td>
                    <td className="px-4 py-3 text-sm">Admin, Manager</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/employees/&#123;id&#125;/hierarchy</td>
                    <td className="px-4 py-3 text-sm">Get employee organizational hierarchy</td>
                    <td className="px-4 py-3 text-sm">Admin, Manager</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Attendance Module */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Database className="w-5 h-5 text-purple-600 mr-2" />
              Attendance & Time Tracking Module
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endpoint</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/attendance/clock-in</td>
                    <td className="px-4 py-3 text-sm">Mark attendance clock-in with location</td>
                    <td className="px-4 py-3 text-sm">Employee</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/attendance/clock-out</td>
                    <td className="px-4 py-3 text-sm">Mark attendance clock-out</td>
                    <td className="px-4 py-3 text-sm">Employee</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/attendance/records</td>
                    <td className="px-4 py-3 text-sm">Get attendance records with filtering</td>
                    <td className="px-4 py-3 text-sm">Admin, Manager, Self</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/attendance/summary</td>
                    <td className="px-4 py-3 text-sm">Get attendance summary and statistics</td>
                    <td className="px-4 py-3 text-sm">Admin, Manager, Self</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span></td>
                    <td className="px-4 py-3 font-mono text-sm">/attendance/&#123;id&#125;/approve</td>
                    <td className="px-4 py-3 text-sm">Approve attendance record</td>
                    <td className="px-4 py-3 text-sm">Manager, Admin</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* API Testing Guide */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Testing & Integration</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Postman Collection</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "info": {
    "name": "BIDUA ERP API",
    "description": "Complete API collection for BIDUA ERP system",
    "version": "1.0.0"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{access_token}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8000/api",
      "type": "string"
    },
    {
      "key": "access_token",
      "value": "",
      "type": "string"
    }
  ]
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Python SDK Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# bidua_erp_sdk.py
import requests
from typing import Optional, Dict, Any

class BiduaERPClient:
    def __init__(self, base_url: str, username: str, password: str):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.access_token = None
        self.refresh_token = None
        self.login(username, password)
    
    def login(self, username: str, password: str) -> bool:
        """Authenticate and get access token"""
        response = self.session.post(
            f"{self.base_url}/auth/login",
            json={"username": username, "password": password}
        )
        
        if response.status_code == 200:
            data = response.json()
            self.access_token = data["access_token"]
            self.refresh_token = data["refresh_token"]
            self.session.headers.update({
                "Authorization": f"Bearer {self.access_token}"
            })
            return True
        return False
    
    def get_employees(self, **filters) -> Dict[str, Any]:
        """Get employees with optional filtering"""
        response = self.session.get(
            f"{self.base_url}/employees",
            params=filters
        )
        response.raise_for_status()
        return response.json()
    
    def create_employee(self, employee_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create new employee"""
        response = self.session.post(
            f"{self.base_url}/employees",
            json=employee_data
        )
        response.raise_for_status()
        return response.json()
    
    def mark_attendance(self, employee_id: str, location: Dict[str, float]) -> Dict[str, Any]:
        """Mark employee attendance"""
        response = self.session.post(
            f"{self.base_url}/attendance/clock-in",
            json={
                "employee_id": employee_id,
                "location": location
            }
        )
        response.raise_for_status()
        return response.json()

# Usage example
client = BiduaERPClient("http://localhost:8000/api", "admin", "bidua123")
employees = client.get_employees(department="Sales", is_active=True)
print(f"Found {len(employees['employees'])} active sales employees")`}
            </pre>
          </div>
        </div>
      </div>

      {/* Error Handling */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Handling & Status Codes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Standard Error Response Format</h4>
            <pre className="bg-gray-900 text-red-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format",
        "value": "invalid-email"
      },
      {
        "field": "salary",
        "message": "Must be greater than 0",
        "value": -1000
      }
    ],
    "timestamp": "2025-01-15T10:30:00Z",
    "request_id": "req_123456789",
    "documentation_url": "https://docs.bidua.com/api/errors"
  }
}`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">HTTP Status Codes</h4>
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
                <span className="font-mono">429 Too Many Requests</span>
                <span className="text-gray-800">Rate limit exceeded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limiting */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limiting & Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Rate Limits</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Authentication:</strong> 5 requests/minute</li>
              <li>• <strong>General API:</strong> 100 requests/minute</li>
              <li>• <strong>File Upload:</strong> 10 requests/minute</li>
              <li>• <strong>Reports:</strong> 20 requests/hour</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Performance Metrics</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• <strong>Average Response:</strong> &lt; 200ms</li>
              <li>• <strong>95th Percentile:</strong> &lt; 500ms</li>
              <li>• <strong>Uptime SLA:</strong> 99.9%</li>
              <li>• <strong>Throughput:</strong> 1000 req/sec</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Optimization</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Response caching</li>
              <li>• Database query optimization</li>
              <li>• Async request processing</li>
              <li>• Connection pooling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteEndpoints;