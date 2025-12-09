import React, { useState } from 'react';
import { Clock, Calendar, MapPin, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

interface EmployeeAttendanceProps {
  currentUser: any;
  attendance: any[];
}

const EmployeeAttendance: React.FC<EmployeeAttendanceProps> = ({
  currentUser,
  attendance
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Filter attendance for current user
  const userAttendance = attendance.filter(att => 
    att.employeeName === currentUser.username || att.employeeId === 'BID004'
  );

  const filteredAttendance = selectedPeriod === 'all' 
    ? userAttendance 
    : userAttendance.filter(att => {
        const attDate = new Date(att.date);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - attDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (selectedPeriod) {
          case 'week': return diffDays <= 7;
          case 'month': return diffDays <= 30;
          case 'quarter': return diffDays <= 90;
          default: return true;
        }
      });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'half-day': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <AlertTriangle className="w-4 h-4" />;
      case 'absent': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Calculate stats
  const totalDays = filteredAttendance.length;
  const presentDays = filteredAttendance.filter(att => att.status === 'present').length;
  const lateDays = filteredAttendance.filter(att => att.status === 'late').length;
  const totalHours = filteredAttendance.reduce((sum, att) => sum + att.totalHours, 0);
  const avgHours = totalDays > 0 ? (totalHours / totalDays).toFixed(1) : '0';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Attendance</h2>
          <p className="text-sm md:text-base text-gray-600">Track your attendance and working hours</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Days</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{totalDays}</p>
            </div>
            <Calendar className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Present Days</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{presentDays}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Late Days</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{lateDays}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Avg Hours/Day</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{avgHours}h</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Today's Status */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Today's Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold text-green-600">09:00</div>
            <div className="text-xs md:text-sm text-gray-600">Clock In</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold text-blue-600">18:00</div>
            <div className="text-xs md:text-sm text-gray-600">Clock Out</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold text-purple-600">9.0h</div>
            <div className="text-xs md:text-sm text-gray-600">Total Hours</div>
          </div>
          <div className="text-center p-3 bg-indigo-50 rounded-lg">
            <MapPin className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold text-indigo-600">Office</div>
            <div className="text-xs md:text-sm text-gray-600">Location</div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Attendance History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Clock In</span>
                  <span className="sm:hidden">In</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Clock Out</span>
                  <span className="sm:hidden">Out</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Total Hours</span>
                  <span className="sm:hidden">Hours</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.map((att) => (
                <tr key={att.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="hidden md:inline">{att.date}</span>
                    <span className="md:hidden">{att.date.split('-')[2]}/{att.date.split('-')[1]}</span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {att.clockIn}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {att.clockOut}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {att.totalHours}h
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(att.status)}`}>
                      {getStatusIcon(att.status)}
                      <span className="ml-1 hidden sm:inline capitalize">{att.status}</span>
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-24 md:max-w-none">
                    {att.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;