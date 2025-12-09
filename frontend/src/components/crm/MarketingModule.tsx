import React, { useState } from 'react';
import { Megaphone, TrendingUp, DollarSign, Users, Target, Calendar, BarChart3, Mail } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  leadsGenerated: number;
  conversions: number;
  roi: number;
  targetAudience: string;
  channels: string[];
}

interface MarketingModuleProps {
  campaigns: Campaign[];
}

const MarketingModule: React.FC<MarketingModuleProps> = ({ campaigns }) => {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCampaigns = campaigns.filter(c =>
    statusFilter === 'all' || c.status === statusFilter
  );

  const totalBudget = filteredCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = filteredCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalLeads = filteredCampaigns.reduce((sum, c) => sum + c.leadsGenerated, 0);
  const totalConversions = filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgROI = filteredCampaigns.length > 0
    ? Math.round(filteredCampaigns.reduce((sum, c) => sum + c.roi, 0) / filteredCampaigns.length)
    : 0;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Marketing Campaigns</h2>
          <p className="text-sm md:text-base text-gray-600">Track campaign performance and ROI</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Campaigns</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="planned">Planned</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Budget</p>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
          <p className="text-xs text-gray-500 mt-1">Allocated</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Spent</p>
            <BarChart3 className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
          <p className="text-xs text-gray-500 mt-1">{Math.round((totalSpent/totalBudget)*100)}% used</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Leads</p>
            <Users className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
          <p className="text-xs text-gray-500 mt-1">Generated</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Conversions</p>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalConversions}</p>
          <p className="text-xs text-gray-500 mt-1">{totalLeads > 0 ? Math.round((totalConversions/totalLeads)*100) : 0}% rate</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg ROI</p>
            <TrendingUp className="w-8 h-8 text-teal-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgROI}%</p>
          <p className="text-xs text-gray-500 mt-1">Return</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                  <p className="text-xs text-gray-500">{campaign.type}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Budget:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(campaign.budget)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Spent:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(campaign.spent)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xs text-gray-500">Leads</p>
                <p className="text-lg font-bold text-gray-900">{campaign.leadsGenerated}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Conversions</p>
                <p className="text-lg font-bold text-gray-900">{campaign.conversions}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">ROI</p>
                <p className="text-lg font-bold text-green-600">{campaign.roi}%</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Channels:</p>
              <div className="flex flex-wrap gap-1">
                {campaign.channels.map((channel, idx) => (
                  <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center">
          <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default MarketingModule;