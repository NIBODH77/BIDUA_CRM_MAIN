import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface EmployeeLeavesProps {
  currentUser: any;
  leaveRequests: any[];
  onAddLeaveRequest: (leave: any) => void;
}

const EmployeeLeaves: React.FC<EmployeeLeavesProps> = ({
  currentUser,
  leaveRequests,
  onAddLeaveRequest
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Filter leave requests for current user
  const userLeaves = leaveRequests.filter(leave => 
    leave.employeeName === currentUser.username || leave.employeeId === 'BID004'
  );

  const filteredLeaves = selectedPeriod === 'all' 
    ? userLeaves 
    : userLeaves.filter(leave => {
        const leaveDate = new Date(leave.appliedAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - leaveDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (selectedPeriod) {
          case 'week': return diffDays <= 7;
          case 'month': return diffDays <= 30;
          case 'quarter': return diffDays <= 90;
          default: return true;
        }
      });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'annual': return 'bg-blue-100 text-blue-800';
      case 'sick': return 'bg-red-100 text-red-800';
      case 'casual': return 'bg-green-100 text-green-800';
      case 'maternity': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock leave balance data
  const leaveBalance = {
    annual: { used: 5, total: 21, remaining: 16 },
    sick: { used: 2, total: 12, remaining: 10 },
    casual: { used: 3, total: 7, remaining: 4 },
    maternity: { used: 0, total: 180, remaining: 180 }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Leaves</h2>
          <p className="text-sm md:text-base text-gray-600">Manage your leave requests and balance</p>
        </div>
        <button
          onClick={() => onAddLeaveRequest({})}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span>Apply Leave</span>
        </button>
      </div>

      {/* Leave Balance */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Leave Balance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(leaveBalance).map(([type, balance]) => (
            <div key={type} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg md:text-xl font-bold text-gray-900">{balance.remaining}</div>
              <div className="text-xs md:text-sm text-gray-600 capitalize">{type}</div>
              <div className="text-xs text-gray-500">of {balance.total}</div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div 
                  className="bg-indigo-600 h-1 rounded-full" 
                  style={{ width: `${(balance.remaining / balance.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {userLeaves.filter(l => l.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Approved</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {userLeaves.filter(l => l.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">This Month</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {userLeaves.filter(l => new Date(l.startDate).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Days Used</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {userLeaves.reduce((sum, l) => sum + l.days, 0)}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h3 className="text-base font-semibold text-gray-900">Leave History</h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Duration</span>
                  <span className="sm:hidden">Days</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Applied Date</span>
                  <span className="sm:hidden">Applied</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(leave.leaveType)}`}>
                      <span className="hidden sm:inline capitalize">{leave.leaveType}</span>
                      <span className="sm:hidden">{leave.leaveType.charAt(0).toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <span className="font-medium">{leave.days} days</span>
                      <div className="text-xs text-gray-500 hidden md:block">
                        {leave.startDate} to {leave.endDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 truncate max-w-32 md:max-w-none">
                      {leave.reason}
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {getStatusIcon(leave.status)}
                      <span className="ml-1 hidden sm:inline capitalize">{leave.status}</span>
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="hidden md:inline">{leave.appliedAt}</span>
                    <span className="md:hidden">{leave.appliedAt.split('-')[2]}/{leave.appliedAt.split('-')[1]}</span>
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

export default EmployeeLeaves;