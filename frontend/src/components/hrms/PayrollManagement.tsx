import React, { useState } from 'react';
import { DollarSign, Download, Search, Filter, MoreVertical, TrendingUp, Users, Calendar } from 'lucide-react';

interface PayrollManagementProps {
  currentUser: any;
  payroll: any[];
  employees: any[];
}

const PayrollManagement: React.FC<PayrollManagementProps> = ({
  currentUser,
  payroll,
  employees
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [monthFilter, setMonthFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPayroll = payroll.filter(pay => {
    const matchesSearch = pay.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = monthFilter === 'all' || pay.month === monthFilter;
    const matchesStatus = statusFilter === 'all' || pay.status === statusFilter;
    
    return matchesSearch && matchesMonth && matchesStatus;
  });

  const totalPayroll = payroll.reduce((sum, pay) => sum + pay.netSalary, 0);
  const paidPayroll = payroll.filter(p => p.status === 'paid').reduce((sum, pay) => sum + pay.netSalary, 0);
  const pendingPayroll = payroll.filter(p => p.status === 'processed').reduce((sum, pay) => sum + pay.netSalary, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Payroll Management</h2>
          <p className="text-sm md:text-base text-gray-600">Manage employee salaries and payments</p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base">
          <Download className="w-4 h-4 md:w-5 md:h-5" />
          <span>Export Payroll</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Payroll</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(totalPayroll / 100000).toFixed(1)}L
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Paid Amount</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(paidPayroll / 100000).toFixed(1)}L
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Pending</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(pendingPayroll / 100000).toFixed(1)}L
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Employees</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{employees.length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Months</option>
              <option value="December">December</option>
              <option value="November">November</option>
              <option value="October">October</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="processed">Processed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Basic Salary</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{(payroll.reduce((sum, p) => sum + p.basicSalary, 0) / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Allowances</span>
              <span className="text-sm font-medium text-gray-900">
                ₹{(payroll.reduce((sum, p) => sum + p.allowances, 0) / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Deductions</span>
              <span className="text-sm font-medium text-red-600">
                -₹{(payroll.reduce((sum, p) => sum + p.deductions, 0) / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm font-semibold text-gray-900">Net Payroll</span>
              <span className="text-sm font-bold text-green-600">
                ₹{(totalPayroll / 100000).toFixed(1)}L
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Paid</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-green-600">
                  {payroll.filter(p => p.status === 'paid').length} employees
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Processed</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-yellow-600">
                  {payroll.filter(p => p.status === 'processed').length} employees
                </span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-red-600">
                  {payroll.filter(p => p.status === 'pending').length} employees
                </span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Basic Salary</span>
                  <span className="sm:hidden">Basic</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Allowances</span>
                  <span className="sm:hidden">Allow</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Deductions</span>
                  <span className="sm:hidden">Deduct</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Net Salary</span>
                  <span className="sm:hidden">Net</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayroll.map((pay) => (
                <tr key={pay.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-32 md:max-w-none">
                        {pay.employeeName}
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block">
                        {pay.employeeId}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pay.month} {pay.year}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="hidden md:inline">₹{pay.basicSalary.toLocaleString()}</span>
                    <span className="md:hidden">₹{(pay.basicSalary / 1000).toFixed(0)}K</span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    <span className="hidden md:inline">₹{pay.allowances.toLocaleString()}</span>
                    <span className="md:hidden">₹{(pay.allowances / 1000).toFixed(0)}K</span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    <span className="hidden md:inline">₹{pay.deductions.toLocaleString()}</span>
                    <span className="md:hidden">₹{(pay.deductions / 1000).toFixed(0)}K</span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="hidden md:inline">₹{pay.netSalary.toLocaleString()}</span>
                    <span className="md:hidden">₹{(pay.netSalary / 1000).toFixed(0)}K</span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pay.status)}`}>
                      <span className="hidden sm:inline capitalize">{pay.status}</span>
                      <span className="sm:hidden">{pay.status.charAt(0).toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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

export default PayrollManagement;