import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Target, Star, User } from 'lucide-react';

interface PerformanceManagementProps {
  currentUser: any;
  performance: any[];
  employees: any[];
}

const PerformanceManagement: React.FC<PerformanceManagementProps> = ({
  currentUser,
  performance,
  employees
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2024');

  const filteredPerformance = performance.filter(perf => {
    const matchesEmployee = selectedEmployee === 'all' || perf.employeeId === selectedEmployee;
    const matchesPeriod = selectedPeriod === 'all' || perf.period === selectedPeriod;
    return matchesEmployee && matchesPeriod;
  });

  const averageRating = filteredPerformance.length > 0 
    ? (filteredPerformance.reduce((sum, perf) => sum + perf.overallRating, 0) / filteredPerformance.length).toFixed(1)
    : '0';

  const topPerformers = performance
    .sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 3);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Performance Management</h2>
          <p className="text-sm md:text-base text-gray-600">Track and evaluate employee performance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Q4 2024">Q4 2024</option>
            <option value="Q3 2024">Q3 2024</option>
            <option value="Q2 2024">Q2 2024</option>
            <option value="all">All Periods</option>
          </select>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Employees</option>
            {employees.map(emp => (
              <option key={emp.employeeId} value={emp.employeeId}>{emp.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
          <BarChart3 className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <div className="text-xl md:text-2xl font-bold text-gray-900">{averageRating}</div>
          <div className="text-xs md:text-sm text-gray-600">Avg Rating</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-xl md:text-2xl font-bold text-gray-900">{filteredPerformance.length}</div>
          <div className="text-xs md:text-sm text-gray-600">Reviews</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
          <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-xl md:text-2xl font-bold text-gray-900">{topPerformers.length}</div>
          <div className="text-xs md:text-sm text-gray-600">Top Performers</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
          <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-xl md:text-2xl font-bold text-gray-900">95%</div>
          <div className="text-xs md:text-sm text-gray-600">Goal Achievement</div>
        </div>
      </div>

      {/* Performance Details */}
      {filteredPerformance.map((perf) => (
        <div key={perf.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">{perf.employeeName}</h3>
              <p className="text-sm text-gray-600">{perf.period} Performance Review</p>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-gray-900">{perf.overallRating}/5</span>
            </div>
          </div>

          {/* KPIs */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Performance Indicators</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {perf.kpis.map((kpi: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{kpi.name}</span>
                    <span className="text-sm font-bold text-indigo-600">{kpi.rating}/5</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Target: {kpi.target}% | Achieved: {kpi.achieved}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(kpi.achieved / kpi.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals and Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Goals</h4>
              <ul className="space-y-2">
                {perf.goals.map((goal: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Achievements</h4>
              <ul className="space-y-2">
                {perf.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Manager Feedback */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Manager Feedback</h4>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
              {perf.managerFeedback}
            </p>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Reviewed by: {perf.reviewedBy}</span>
              <span>Date: {perf.reviewDate}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Top Performers */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((performer, index) => (
            <div key={performer.id} className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-indigo-600 font-semibold">
                  {performer.employeeName.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-gray-900">{performer.employeeName}</h4>
              <div className="flex items-center justify-center space-x-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-gray-900">{performer.overallRating}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{performer.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceManagement;