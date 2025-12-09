import React from 'react';
import { TrendingUp, DollarSign, Target, Award } from 'lucide-react';

interface SalesPipelineProps {
  leads: any[];
}

const SalesPipeline: React.FC<SalesPipelineProps> = ({ leads }) => {
  const stages = [
    { id: 'lead', name: 'Lead', color: 'bg-gray-500' },
    { id: 'qualified', name: 'Qualified', color: 'bg-blue-500' },
    { id: 'proposal', name: 'Proposal', color: 'bg-yellow-500' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-500' },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-500' },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-500' }
  ];

  const getLeadsByStage = (stage: string) => {
    return leads.filter(lead => lead.stage === stage);
  };

  const getTotalValue = (stageLeads: any[]) => {
    return stageLeads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPipelineValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  const wonDeals = getLeadsByStage('closed-won');
  const wonValue = getTotalValue(wonDeals);
  const conversionRate = leads.length > 0 ? ((wonDeals.length / leads.length) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Sales Pipeline</h2>
        <p className="text-sm md:text-base text-gray-600">Track your sales progress and conversion rates</p>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Pipeline Value</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(totalPipelineValue / 100000).toFixed(1)}L
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Won Deals</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                ₹{(wonValue / 100000).toFixed(1)}L
              </p>
            </div>
            <Award className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{conversionRate}%</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Active Leads</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{leads.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Pipeline Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            const stageValue = getTotalValue(stageLeads);
            
            return (
              <div key={stage.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">{stage.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                </div>
                <div className="space-y-2">
                  <div className="text-lg md:text-xl font-bold text-gray-900">
                    {stageLeads.length}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    ₹{(stageValue / 100000).toFixed(1)}L
                  </div>
                  <div className="space-y-1">
                    {stageLeads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="text-xs text-gray-500 truncate">
                        {lead.name}
                      </div>
                    ))}
                    {stageLeads.length > 3 && (
                      <div className="text-xs text-gray-400">
                        +{stageLeads.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Recent Leads</h3>
        <div className="space-y-3">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-sm">
                    {lead.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.company}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  <span className="hidden md:inline">₹{lead.value?.toLocaleString()}</span>
                  <span className="md:hidden">₹{(lead.value / 100000).toFixed(1)}L</span>
                </p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  <span className="hidden sm:inline">{lead.status}</span>
                  <span className="sm:hidden">{lead.status.charAt(0).toUpperCase()}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesPipeline;