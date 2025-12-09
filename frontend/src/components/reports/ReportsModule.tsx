import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

interface ReportsModuleProps {
  currentUser: any;
  leads: any[];
  employees: any[];
  tasks: any[];
  attendance: any[];
  payroll: any[];
}

const ReportsModule: React.FC<ReportsModuleProps> = ({
  currentUser,
  leads,
  employees,
  tasks,
  attendance,
  payroll
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Calculate executive summary metrics
  const totalRevenue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  const totalEmployees = employees.length;
  const totalLeads = leads.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const avgAttendance = attendance.length > 0 ? (attendance.reduce((sum, att) => sum + att.totalHours, 0) / attendance.length) : 0;

  const executiveSummary = [
    {
      title: 'Total Revenue',
      value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Employees',
      value: totalEmployees,
      change: '+3.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Task Completion',
      value: `${((completedTasks / tasks.length) * 100).toFixed(1)}%`,
      change: '+8.1%',
      trend: 'up',
      icon: BarChart3,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg. Work Hours',
      value: `${avgAttendance.toFixed(1)}h`,
      change: '+2.3%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ];

  // Department distribution
  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departments = Object.entries(departmentStats).map(([name, count]) => ({
    name,
    count,
    percentage: ((count / totalEmployees) * 100).toFixed(1)
  }));

  // Lead source analysis
  const leadSources = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sources = Object.entries(leadSources).map(([name, count]) => ({
    name,
    count,
    percentage: ((count / totalLeads) * 100).toFixed(1)
  }));

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm md:text-base text-gray-600">Comprehensive business insights and metrics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {executiveSummary.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                    <span className="text-xs md:text-sm font-medium text-green-600 ml-1">
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-2 md:p-3 rounded-lg ${metric.color}`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Distribution & Lead Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Department Distribution</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {departments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-indigo-${(index + 1) * 100}`}></div>
                  <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{dept.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({dept.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Lead Sources</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {sources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-green-${(index + 1) * 100}`}></div>
                  <span className="text-sm font-medium text-gray-900">{source.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{source.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({source.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Performance Overview</h3>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Departments</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="R&D">R&D</option>
              <option value="IT">IT</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-indigo-600">94%</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Overall Performance</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-green-600">87%</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Task Completion Rate</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">92%</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">Employee Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Quick Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-gray-900">{totalLeads}</div>
            <div className="text-xs md:text-sm text-gray-600">Total Leads</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-gray-900">{totalTasks}</div>
            <div className="text-xs md:text-sm text-gray-600">Active Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-gray-900">{attendance.length}</div>
            <div className="text-xs md:text-sm text-gray-600">Attendance Records</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;