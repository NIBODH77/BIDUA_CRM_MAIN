import React, { useState } from 'react';
import { FileText, Download, TrendingUp, Users, DollarSign, Target, Calendar, BarChart3 } from 'lucide-react';

interface CRMReportsProps {
  leads: any[];
  companies: any[];
  deals: any[];
  activities: any[];
}

const CRMReports: React.FC<CRMReportsProps> = ({ leads, companies, deals, activities }) => {
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('month');

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.status === 'hot').length;
  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0);
  const wonDeals = deals.filter(d => d.status === 'won').length;
  const totalCustomers = companies.filter(c => c.type === 'customer').length;
  const avgDealSize = deals.length > 0 ? totalPipeline / deals.length : 0;
  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.status === 'completed').length;

  const renderSummaryReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Leads</p>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
          <p className="text-sm text-green-600 mt-2">{hotLeads} hot leads</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pipeline Value</p>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalPipeline)}</p>
          <p className="text-sm text-gray-600 mt-2">{deals.length} deals</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Won Deals</p>
            <Target className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{wonDeals}</p>
          <p className="text-sm text-gray-600 mt-2">Closed successfully</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Customers</p>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
          <p className="text-sm text-gray-600 mt-2">Active accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Hot Leads</span>
                <span className="font-semibold text-gray-900">{hotLeads} ({totalLeads > 0 ? Math.round((hotLeads/totalLeads)*100) : 0}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${totalLeads > 0 ? (hotLeads/totalLeads)*100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Warm Leads</span>
                <span className="font-semibold text-gray-900">{leads.filter(l => l.status === 'warm').length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${totalLeads > 0 ? (leads.filter(l => l.status === 'warm').length/totalLeads)*100 : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Cold Leads</span>
                <span className="font-semibold text-gray-900">{leads.filter(l => l.status === 'cold').length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${totalLeads > 0 ? (leads.filter(l => l.status === 'cold').length/totalLeads)*100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Stages</h3>
          <div className="space-y-4">
            {['qualified', 'proposal', 'negotiation', 'closed-won'].map(stage => {
              const stageDeals = deals.filter(d => d.stage === stage);
              const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
              return (
                <div key={stage}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 capitalize">{stage}</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(stageValue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${totalPipeline > 0 ? (stageValue/totalPipeline)*100 : 0}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{totalActivities}</p>
            <p className="text-sm text-gray-600 mt-1">Total Activities</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{completedActivities}</p>
            <p className="text-sm text-gray-600 mt-1">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{activities.filter(a => a.type === 'call').length}</p>
            <p className="text-sm text-gray-600 mt-1">Calls</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">{activities.filter(a => a.type === 'meeting').length}</p>
            <p className="text-sm text-gray-600 mt-1">Meetings</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">CRM Reports</h2>
          <p className="text-sm md:text-base text-gray-600">Comprehensive sales and customer insights</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="summary">Summary Report</option>
            <option value="leads">Leads Report</option>
            <option value="deals">Deals Report</option>
            <option value="activities">Activities Report</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {renderSummaryReport()}
    </div>
  );
};

export default CRMReports;