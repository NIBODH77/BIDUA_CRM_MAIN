import React from 'react';
import { Upload, Download, FileText, Shield, Search, Archive } from 'lucide-react';

const FileManagementEndpoints: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">File Management Endpoints</h1>
        <p className="text-lg text-gray-600 mb-6">
          Secure FastAPI file management system with advanced access control, versioning, 
          metadata tracking, and enterprise-grade document management capabilities.
        </p>
      </div>

      {/* File Management Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          File Management System Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Upload & Storage</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Secure file upload with validation</li>
              <li>• Virus scanning and malware detection</li>
              <li>• File type and size restrictions</li>
              <li>• Encrypted storage</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Role-based file permissions</li>
              <li>• Department-level access</li>
              <li>• Time-limited access links</li>
              <li>• Download tracking</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Document Management</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Version control and history</li>
              <li>• Metadata and tagging</li>
              <li>• Full-text search</li>
              <li>• Automated workflows</li>
            </ul>
          </div>
        </div>
      </div>

      {/* File Upload Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">POST /api/files/upload - Secure File Upload</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request (Multipart Form Data)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Fields:
- file: [Binary file data]
- document_type: "salary-slip"
- title: "Salary Slip - December 2024"
- employee_id: "emp-uuid-123" (optional)
- is_public: false
- access_level: "private"
- tags: ["payroll", "december", "2024"]
- expires_at: "2025-12-31T23:59:59Z" (optional)
- description: "Monthly salary slip for December 2024"

Supported File Types:
- Documents: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- Images: JPG, JPEG, PNG, GIF, WEBP
- Archives: ZIP, RAR, 7Z
- Text: TXT, CSV, JSON

File Size Limits:
- Documents: 10MB
- Images: 5MB
- Archives: 50MB`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (201 Created)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "doc-uuid-456",
  "title": "Salary Slip - December 2024",
  "file_name": "salary_slip_dec_2024.pdf",
  "file_size": 245760,
  "mime_type": "application/pdf",
  "document_type": "salary-slip",
  "is_public": false,
  "access_level": "private",
  "version": 1,
  "checksum": "sha256:a1b2c3d4e5f6...",
  "uploaded_by": {
    "id": "user-uuid-789",
    "name": "HR Manager"
  },
  "uploaded_at": "2025-01-15T10:30:00Z",
  "expires_at": "2025-12-31T23:59:59Z",
  "download_url": "/api/files/doc-uuid-456/download",
  "preview_url": "/api/files/doc-uuid-456/preview",
  "tags": ["payroll", "december", "2024"],
  "virus_scan": {
    "status": "clean",
    "scanned_at": "2025-01-15T10:30:15Z"
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* File Download Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">GET /api/files/&#123;file_id&#125;/download - Secure File Download</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GET /api/files/doc-uuid-456/download?inline=false&watermark=true
Authorization: Bearer <token>

Query Parameters:
- inline: true/false (default: false) - Display in browser vs download
- watermark: true/false (default: false) - Add watermark to document
- quality: high/medium/low (for images) - Compression level
- format: original/pdf/jpg (for conversions)
- expires_in: 3600 (seconds) - Temporary download link expiry`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (200 OK)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`Headers:
Content-Type: application/pdf
Content-Disposition: attachment; filename="salary_slip_dec_2024.pdf"
Content-Length: 245760
X-File-ID: doc-uuid-456
X-Download-Token: temp-token-123
X-Expires-At: 2025-01-15T11:30:00Z

Body: [Binary file data]

Access Log Entry Created:
{
  "document_id": "doc-uuid-456",
  "user_id": "user-uuid-789",
  "action": "download",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0...",
  "accessed_at": "2025-01-15T10:45:00Z"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* File Search Endpoint */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">GET /api/files/search - Advanced File Search</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GET /api/files/search?q=salary&type=salary-slip&employee_id=emp-uuid-123&date_from=2024-01-01&date_to=2024-12-31
Authorization: Bearer <token>

Query Parameters:
- q: Search query (searches in title, description, content)
- type: Document type filter
- employee_id: Filter by employee
- department: Filter by department
- is_public: Filter by public/private status
- tags: Filter by tags (comma-separated)
- date_from: Created after date
- date_to: Created before date
- file_size_min: Minimum file size in bytes
- file_size_max: Maximum file size in bytes
- page: Page number
- limit: Results per page`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Success Response (200 OK)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "documents": [
    {
      "id": "doc-uuid-456",
      "title": "Salary Slip - December 2024",
      "file_name": "salary_slip_dec_2024.pdf",
      "document_type": "salary-slip",
      "file_size": 245760,
      "employee": {
        "id": "emp-uuid-123",
        "name": "Priya Sharma",
        "employee_id": "BID001"
      },
      "uploaded_at": "2025-01-01T10:00:00Z",
      "tags": ["payroll", "december", "2024"],
      "relevance_score": 0.95,
      "preview_available": true,
      "can_download": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  },
  "search_metadata": {
    "query": "salary",
    "execution_time_ms": 45,
    "total_indexed_documents": 1250
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* File Permissions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">File Access Control</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Access Levels</h3>
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-red-900 text-sm">Private</h4>
                <p className="text-xs text-red-800">Only the owner and admins can access</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-900 text-sm">Department</h4>
                <p className="text-xs text-yellow-800">Accessible to department members</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-900 text-sm">Company</h4>
                <p className="text-xs text-green-800">All employees can access</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 text-sm">Public</h4>
                <p className="text-xs text-blue-800">Publicly accessible (policies, announcements)</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Permission Management</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/files/doc-uuid-456/permissions
Authorization: Bearer <admin_token>

{
  "permissions": [
    {
      "user_id": "user-uuid-789",
      "access_type": "read",
      "can_download": true,
      "can_share": false,
      "expires_at": "2025-02-15T23:59:59Z"
    },
    {
      "role": "manager",
      "department": "Sales",
      "access_type": "read",
      "can_download": true,
      "can_share": true
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManagementEndpoints;