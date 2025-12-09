import React, { useState } from 'react';
import { DollarSign, Download, TrendingUp, Calendar, CreditCard, Building } from 'lucide-react';

interface EmployeeSalaryProps {
  currentUser: any;
  payroll: any[];
}

const EmployeeSalary: React.FC<EmployeeSalaryProps> = ({
  currentUser,
  payroll
}) => {
  const [selectedMonth, setSelectedMonth] = useState('December');

  // Filter payroll for current user (assuming employee username maps to payroll)
  const userPayroll = payroll.filter(pay => 
    pay.employeeName === 'Rahul Verma' || pay.employeeId === 'BID004'
  );

  const currentMonthPayroll = userPayroll.find(pay => pay.month === selectedMonth);
  const latestPayroll = userPayroll[0] || {
    basicSalary: 45000,
    allowances: 8000,
    deductions: 5400,
    overtime: 1500,
    netSalary: 49100
  };

  // Mock bank account details
  const bankDetails = {
    accountNumber: '1234567890123456',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0001234',
    accountHolderName: 'Rahul Verma'
  };

  // Calculate yearly stats
  const yearlyStats = {
    totalEarned: userPayroll.reduce((sum, pay) => sum + pay.netSalary, 0),
    totalDeductions: userPayroll.reduce((sum, pay) => sum + pay.deductions, 0),
    averageSalary: userPayroll.length > 0 ? userPayroll.reduce((sum, pay) => sum + pay.netSalary, 0) / userPayroll.length : 0,
    bonusReceived: userPayroll.reduce((sum, pay) => sum + (pay.overtime || 0), 0)
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Salary</h2>
          <p className="text-sm md:text-base text-gray-600">View your salary details and download pay slips</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="December">December 2024</option>
            <option value="November">November 2024</option>
            <option value="October">October 2024</option>
          </select>
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span>Download Slip</span>
          </button>
        </div>
      </div>

      {/* Current Salary Overview */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Current Month Salary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg md:text-xl font-bold text-green-600">
              ₹{(latestPayroll.basicSalary / 1000).toFixed(0)}K
            </div>
            <div className="text-xs md:text-sm text-gray-600">Basic Salary</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg md:text-xl font-bold text-blue-600">
              ₹{(latestPayroll.allowances / 1000).toFixed(0)}K
            </div>
            <div className="text-xs md:text-sm text-gray-600">Allowances</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-lg md:text-xl font-bold text-red-600">
              ₹{(latestPayroll.deductions / 1000).toFixed(0)}K
            </div>
            <div className="text-xs md:text-sm text-gray-600">Deductions</div>
          </div>
          <div className="text-center p-3 bg-indigo-50 rounded-lg">
            <div className="text-lg md:text-xl font-bold text-indigo-600">
              ₹{(latestPayroll.netSalary / 1000).toFixed(0)}K
            </div>
            <div className="text-xs md:text-sm text-gray-600">Net Salary</div>
          </div>
        </div>
      </div>

      {/* Yearly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Earned</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(yearlyStats.totalEarned / 100000).toFixed(1)}L
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Deductions</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(yearlyStats.totalDeductions / 1000).toFixed(0)}K
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Average Salary</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(yearlyStats.averageSalary / 1000).toFixed(0)}K
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Bonus Received</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(yearlyStats.bonusReceived / 1000).toFixed(0)}K
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Account Number</p>
                <p className="text-sm font-medium text-gray-900">
                  ****{bankDetails.accountNumber.slice(-4)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Bank Name</p>
                <p className="text-sm font-medium text-gray-900">{bankDetails.bankName}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">IFSC Code</p>
              <p className="text-sm font-medium text-gray-900">{bankDetails.ifscCode}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Account Holder</p>
              <p className="text-sm font-medium text-gray-900">{bankDetails.accountHolderName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Salary History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Salary History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userPayroll.map((pay) => (
                <tr key={pay.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 text-xs md:text-sm">
                      <Download className="w-4 h-4" />
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

export default EmployeeSalary;