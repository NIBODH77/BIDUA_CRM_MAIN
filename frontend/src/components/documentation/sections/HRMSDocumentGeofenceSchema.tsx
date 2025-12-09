import React from 'react';
import { Database, FileText, MapPin, Shield, Upload, Download } from 'lucide-react';

const HRMSDocumentGeofenceSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Document & Geofence Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Advanced document management and GPS-based geofence location database schema for 
          secure file management and location-based attendance verification.
        </p>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            documents - Employee Document Management
          </h3>
          <p className="text-sm text-blue-700 mt-1">Secure document storage and management with access control and versioning</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique document identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Document owner (NULL for company docs)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">document_type</td><td className="px-6 py-4 text-sm">document_type</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">offer-letter, salary-slip, id-card, policy</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">title</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Document title</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">file_name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Original file name</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">file_path</td><td className="px-6 py-4 text-sm">VARCHAR(500)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Secure file storage path</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">file_size</td><td className="px-6 py-4 text-sm">BIGINT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">File size in bytes</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">mime_type</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">File MIME type</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_public</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT FALSE</td><td className="px-6 py-4 text-sm">Public access flag</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_encrypted</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">File encryption status</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">version</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">DEFAULT 1</td><td className="px-6 py-4 text-sm">Document version number</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">uploaded_by</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES users(id)</td><td className="px-6 py-4 text-sm">User who uploaded document</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">uploaded_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Upload timestamp</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">expires_at</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Document expiry date</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Geofence Locations Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-purple-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            geofence_locations - GPS-Based Location Management
          </h3>
          <p className="text-sm text-purple-700 mt-1">Define valid office locations with GPS boundaries for attendance verification</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Location identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Location name (Mumbai Office)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">address</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Full address</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">latitude</td><td className="px-6 py-4 text-sm">NUMERIC(10,8)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">GPS latitude coordinate</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">longitude</td><td className="px-6 py-4 text-sm">NUMERIC(11,8)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">GPS longitude coordinate</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">radius</td><td className="px-6 py-4 text-sm">NUMERIC(8,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Geofence radius in meters</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">timezone</td><td className="px-6 py-4 text-sm">VARCHAR(50)</td><td className="px-6 py-4 text-sm">DEFAULT 'Asia/Kolkata'</td><td className="px-6 py-4 text-sm">Location timezone</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">working_hours_start</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">DEFAULT '09:00'</td><td className="px-6 py-4 text-sm">Standard start time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">working_hours_end</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">DEFAULT '18:00'</td><td className="px-6 py-4 text-sm">Standard end time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_active</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">Location status</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Schema SQL */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Complete Document & Geofence Schema</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Document and geofence related enums
CREATE TYPE document_type AS ENUM ('offer-letter', 'salary-slip', 'id-card', 'experience-letter', 'policy', 'contract', 'certificate', 'other');
CREATE TYPE access_level AS ENUM ('private', 'department', 'company', 'public');

-- Document access permissions table
CREATE TABLE document_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role user_role REFERENCES roles(name) ON DELETE CASCADE,
    department VARCHAR(100),
    access_type access_type NOT NULL,
    can_download BOOLEAN DEFAULT TRUE,
    can_share BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE,
    granted_by UUID REFERENCES users(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (user_id IS NOT NULL OR role IS NOT NULL OR department IS NOT NULL)
);

-- Document versions table
CREATE TABLE document_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    checksum VARCHAR(64) NOT NULL,
    uploaded_by UUID NOT NULL REFERENCES users(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    change_notes TEXT,
    UNIQUE(document_id, version_number)
);

-- Document access logs table
CREATE TABLE document_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action document_action NOT NULL,
    ip_address INET,
    user_agent TEXT,
    accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geofence validation logs table
CREATE TABLE geofence_validations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    geofence_location_id UUID REFERENCES geofence_locations(id),
    latitude NUMERIC(10,8) NOT NULL,
    longitude NUMERIC(11,8) NOT NULL,
    is_within_boundary BOOLEAN NOT NULL,
    distance_from_center NUMERIC(8,2),
    validation_type validation_type NOT NULL,
    validated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    device_info JSONB
);

-- Indexes for performance
CREATE INDEX idx_documents_employee ON documents(employee_id);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_document_permissions_user ON document_permissions(user_id);
CREATE INDEX idx_document_access_logs_document ON document_access_logs(document_id);
CREATE INDEX idx_geofence_validations_employee ON geofence_validations(employee_id);
CREATE INDEX idx_geofence_locations_active ON geofence_locations(is_active);`}
        </pre>
      </div>
    </div>
  );
};

export default HRMSDocumentGeofenceSchema;