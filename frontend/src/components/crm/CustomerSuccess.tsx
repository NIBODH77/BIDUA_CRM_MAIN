import React, { useState } from 'react';
import { Heart, TrendingUp, AlertTriangle, CheckCircle, Calendar, DollarSign, Users, Target } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  healthScore: number;
  type: string;
  dealValue: number;
  createdAt: string;
}

interface CustomerSuccessProps {
  companies: Company[];
}

const CustomerSuccess: React.FC<CustomerSuccessProps> = ({ companies }) => {
  const [viewMode, setViewMode] = useState<'overview' | 'health' | 'renewals'>('overview');

  const customers = companies.filter(c => c.type === 'customer');

  const healthyCustomers = customers.filter(c => c.healthScore >= 80).length;
  const atRiskCustomers = customers.filter(c => c.healthScore < 60).length;
  const avgHealthScore = customers.length > 0
    ? Math.round(customers.reduce((sum, c) => sum + c.healthScore, 0) / customers.length)
    : 0;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-800', bar: 'bg-green-500' };
    if (score >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-800', bar: 'bg-yellow-500' };
    return { bg: 'bg-red-100', text: 'text-red-800', bar: 'bg-red-500' };
  };

  const getHealthIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Customers</p>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
          <p className="text-xs text-gray-500 mt-1">Active accounts</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Healthy</p>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{healthyCustomers}</p>
          <p className="text-xs text-gray-500 mt-1">Score above 80</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">At Risk</p>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{atRiskCustomers}</p>
          <p className="text-xs text-gray-500 mt-1">Score below 60</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Health Score</p>
            <Heart className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgHealthScore}%</p>
          <p className="text-xs text-gray-500 mt-1">Overall health</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Health Overview</h3>
        <div className="space-y-4">
          {customers.slice().sort((a, b) => a.healthScore - b.healthScore).map((customer) => {
            const colors = getHealthColor(customer.healthScore);
            return (
              <div key={customer.id} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {getHealthIcon(customer.healthScore)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900 truncate">{customer.name}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                      {customer.healthScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${colors.bar} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${customer.healthScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderHealthMetrics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Health Score Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{healthyCustomers}</p>
            <p className="text-sm text-gray-600 mt-1">Healthy (80-100)</p>
            <p className="text-xs text-gray-500 mt-2">
              {customers.length > 0 ? Math.round((healthyCustomers / customers.length) * 100) : 0}% of customers
            </p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-3">
              <AlertTriangle className="w-12 h-12 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {customers.filter(c => c.healthScore >= 60 && c.healthScore < 80).length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Needs Attention (60-79)</p>
            <p className="text-xs text-gray-500 mt-2">
              {customers.length > 0
                ? Math.round((customers.filter(c => c.healthScore >= 60 && c.healthScore < 80).length / customers.length) * 100)
                : 0}% of customers
            </p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{atRiskCustomers}</p>
            <p className="text-sm text-gray-600 mt-1">At Risk (0-59)</p>
            <p className="text-xs text-gray-500 mt-2">
              {customers.length > 0 ? Math.round((atRiskCustomers / customers.length) * 100) : 0}% of customers
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Health Scores</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Health Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deal Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => {
                const colors = getHealthColor(customer.healthScore);
                return (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${colors.bar} h-2 rounded-full`}
                            style={{ width: `${customer.healthScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{customer.healthScore}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                        {customer.healthScore >= 80 ? 'Healthy' : customer.healthScore >= 60 ? 'Needs Attention' : 'At Risk'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(customer.dealValue)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(customer.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRenewals = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Renewals Management</h3>
      <p className="text-gray-600">Renewal tracking and management features coming soon</p>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Customer Success</h2>
        <p className="text-sm md:text-base text-gray-600">Monitor customer health and drive retention</p>
      </div>

      <div className="border-b border-gray-200 bg-white rounded-t-lg">
        <nav className="-mb-px flex space-x-4 px-4">
          <button
            onClick={() => setViewMode('overview')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm transition-all ${
              viewMode === 'overview'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setViewMode('health')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm transition-all ${
              viewMode === 'health'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Health Metrics</span>
          </button>
          <button
            onClick={() => setViewMode('renewals')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm transition-all ${
              viewMode === 'renewals'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Renewals</span>
          </button>
        </nav>
      </div>

      {viewMode === 'overview' && renderOverview()}
      {viewMode === 'health' && renderHealthMetrics()}
      {viewMode === 'renewals' && renderRenewals()}
    </div>
  );
};

export default CustomerSuccess;
