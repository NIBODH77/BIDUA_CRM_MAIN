import React from 'react';
import { Database, Clock, MapPin, Smartphone, Shield } from 'lucide-react';

const HRMSAttendanceSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Attendance Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive attendance tracking system with geofencing, time management, 
          and location-based verification.
        </p>
      </div>

      {/* Attendance Records Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            attendance_records - Daily Attendance Tracking
          </h3>
          <p className="text-sm text-blue-700 mt-1">Primary table for tracking employee daily attendance with location verification</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique attendance record identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">NOT NULL, FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee who marked attendance</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Date of attendance</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">clock_in</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Clock-in time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">clock_out</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Clock-out time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">total_hours</td><td className="px-6 py-4 text-sm">NUMERIC(4,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Calculated total hours worked</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">break_hours</td><td className="px-6 py-4 text-sm">NUMERIC(4,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Total break time taken</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">overtime_hours</td><td className="px-6 py-4 text-sm">NUMERIC(4,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Overtime hours worked</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">attendance_status</td><td className="px-6 py-4 text-sm">DEFAULT 'present'</td><td className="px-6 py-4 text-sm">present, absent, late, half-day</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">location_name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Location name (Office, Remote, etc.)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">latitude</td><td className="px-6 py-4 text-sm">NUMERIC(10,8)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">GPS latitude of clock-in/out</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">longitude</td><td className="px-6 py-4 text-sm">NUMERIC(11,8)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">GPS longitude of clock-in/out</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_within_geofence</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT FALSE</td><td className="px-6 py-4 text-sm">Whether location is within defined geofence</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">geofence_location_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES geofence_locations(id)</td><td className="px-6 py-4 text-sm">Geofence location ID if applicable</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">device_info</td><td className="px-6 py-4 text-sm">JSONB</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Device information for attendance marking</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">ip_address</td><td className="px-6 py-4 text-sm">INET</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">IP address of attendance marking</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">notes</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Additional notes</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">approved_by</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee who approved the record</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">approved_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Timestamp of approval</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Record creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Geofence Locations Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            geofence_locations - Location-Based Attendance
          </h3>
          <p className="text-sm text-green-700 mt-1">Define valid locations for attendance marking with GPS boundaries</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique location identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Location name (e.g., Mumbai Office)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">address</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Full address of the location</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">latitude</td><td className="px-6 py-4 text-sm">NUMERIC(10,8)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Center latitude of the geofence</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">longitude</td><td className="px-6 py-4 text-sm">NUMERIC(11,8)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Center longitude of the geofence</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">radius</td><td className="px-6 py-4 text-sm">NUMERIC(8,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Radius of the geofence in meters</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">timezone</td><td className="px-6 py-4 text-sm">VARCHAR(50)</td><td className="px-6 py-4 text-sm">DEFAULT 'Asia/Kolkata'</td><td className="px-6 py-4 text-sm">Location timezone</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">working_hours_start</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">DEFAULT '09:00'</td><td className="px-6 py-4 text-sm">Standard working hours start</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">working_hours_end</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">DEFAULT '18:00'</td><td className="px-6 py-4 text-sm">Standard working hours end</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_active</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">Whether the geofence is active</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Record creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Breaks Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-purple-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            attendance_breaks - Break Time Tracking
          </h3>
          <p className="text-sm text-purple-700 mt-1">Track break times during work hours for accurate time calculation</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Break record identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">attendance_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES attendance_records(id)</td><td className="px-6 py-4 text-sm">Associated attendance record</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">break_start</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Break start time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">break_end</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Break end time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">break_type</td><td className="px-6 py-4 text-sm">break_type</td><td className="px-6 py-4 text-sm">DEFAULT 'lunch'</td><td className="px-6 py-4 text-sm">lunch, tea, personal, meeting</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">duration_minutes</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Calculated break duration</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">notes</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Break notes or reason</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Attendance Schema SQL */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Complete Attendance Schema SQL</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create attendance-related enums
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'half-day', 'work-from-home');
CREATE TYPE break_type AS ENUM ('lunch', 'tea', 'personal', 'meeting', 'other');

-- Geofence locations table
CREATE TABLE geofence_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    latitude NUMERIC(10,8) NOT NULL,
    longitude NUMERIC(11,8) NOT NULL,
    radius NUMERIC(8,2) NOT NULL CHECK (radius > 0),
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    working_hours_start TIME DEFAULT '09:00',
    working_hours_end TIME DEFAULT '18:00',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance records table
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    clock_in TIME NOT NULL,
    clock_out TIME,
    total_hours NUMERIC(4,2) DEFAULT 0 CHECK (total_hours >= 0),
    break_hours NUMERIC(4,2) DEFAULT 0 CHECK (break_hours >= 0),
    overtime_hours NUMERIC(4,2) DEFAULT 0 CHECK (overtime_hours >= 0),
    status attendance_status DEFAULT 'present',
    location_name VARCHAR(255) NOT NULL,
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8),
    is_within_geofence BOOLEAN DEFAULT FALSE,
    geofence_location_id UUID REFERENCES geofence_locations(id),
    device_info JSONB,
    ip_address INET,
    notes TEXT,
    approved_by UUID REFERENCES employees(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, date)
);

-- Attendance breaks table
CREATE TABLE attendance_breaks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attendance_id UUID NOT NULL REFERENCES attendance_records(id) ON DELETE CASCADE,
    break_start TIME NOT NULL,
    break_end TIME,
    break_type break_type DEFAULT 'lunch',
    duration_minutes INTEGER DEFAULT 0 CHECK (duration_minutes >= 0),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance policies table
CREATE TABLE attendance_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    min_hours_per_day NUMERIC(4,2) DEFAULT 8.0,
    max_hours_per_day NUMERIC(4,2) DEFAULT 12.0,
    late_threshold_minutes INTEGER DEFAULT 15,
    half_day_threshold_hours NUMERIC(4,2) DEFAULT 4.0,
    overtime_threshold_hours NUMERIC(4,2) DEFAULT 8.0,
    max_break_minutes INTEGER DEFAULT 60,
    requires_geofence BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    effective_from DATE NOT NULL,
    effective_to DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_attendance_employee_date ON attendance_records(employee_id, date);
CREATE INDEX idx_attendance_date ON attendance_records(date);
CREATE INDEX idx_attendance_status ON attendance_records(status);
CREATE INDEX idx_attendance_geofence ON attendance_records(geofence_location_id);
CREATE INDEX idx_breaks_attendance ON attendance_breaks(attendance_id);
CREATE INDEX idx_geofence_active ON geofence_locations(is_active);

-- Function to calculate total hours
CREATE OR REPLACE FUNCTION calculate_attendance_hours()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.clock_out IS NOT NULL THEN
        -- Calculate total hours worked
        NEW.total_hours := EXTRACT(EPOCH FROM (NEW.clock_out::timestamp - NEW.clock_in::timestamp)) / 3600;
        
        -- Subtract break hours
        SELECT COALESCE(SUM(duration_minutes), 0) / 60.0 
        INTO NEW.break_hours
        FROM attendance_breaks 
        WHERE attendance_id = NEW.id;
        
        NEW.total_hours := NEW.total_hours - NEW.break_hours;
        
        -- Calculate overtime (assuming 8 hours standard)
        IF NEW.total_hours > 8 THEN
            NEW.overtime_hours := NEW.total_hours - 8;
        END IF;
        
        -- Determine status based on hours
        IF NEW.total_hours < 4 THEN
            NEW.status := 'half-day';
        ELSIF NEW.clock_in > '09:15'::time THEN
            NEW.status := 'late';
        ELSE
            NEW.status := 'present';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calculate_hours
    BEFORE UPDATE ON attendance_records
    FOR EACH ROW
    EXECUTE FUNCTION calculate_attendance_hours();`}
        </pre>
      </div>

      {/* Attendance Features */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Attendance System Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile Attendance
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• GPS-based location verification</li>
              <li>• Geofence boundary checking</li>
              <li>• Device fingerprinting</li>
              <li>• Offline attendance sync</li>
              <li>• Photo capture for verification</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Time Tracking
            </h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Automatic hour calculations</li>
              <li>• Break time management</li>
              <li>• Overtime tracking</li>
              <li>• Late arrival detection</li>
              <li>• Half-day identification</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Security & Compliance
            </h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• IP address logging</li>
              <li>• Device information tracking</li>
              <li>• Audit trail maintenance</li>
              <li>• Manager approval workflows</li>
              <li>• Data encryption at rest</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Attendance Policies */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Attendance Policies & Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Standard Policies</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 text-sm">Working Hours</h4>
                <p className="text-xs text-blue-800">Standard 8 hours per day (9 AM - 6 PM)</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-900 text-sm">Late Threshold</h4>
                <p className="text-xs text-yellow-800">15 minutes grace period for clock-in</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-900 text-sm">Half Day</h4>
                <p className="text-xs text-green-800">Less than 4 hours considered half-day</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-900 text-sm">Overtime</h4>
                <p className="text-xs text-purple-800">Hours beyond 8 hours counted as overtime</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Geofence Configuration</h3>
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-red-900 text-sm">Mumbai Office</h4>
                <p className="text-xs text-red-800">Lat: 19.0760, Lng: 72.8777, Radius: 100m</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="font-semibold text-orange-900 text-sm">Pune Office</h4>
                <p className="text-xs text-orange-800">Lat: 18.5204, Lng: 73.8567, Radius: 100m</p>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg">
                <h4 className="font-semibold text-teal-900 text-sm">Bangalore Office</h4>
                <p className="text-xs text-teal-800">Lat: 12.9716, Lng: 77.5946, Radius: 100m</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRMSAttendanceSchema;