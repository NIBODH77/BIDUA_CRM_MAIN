import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Target, Award, Clock, Activity, Phone, Mail, CheckCircle, XCircle, Percent, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { Lead, SupportTicket } from '../../types';

interface CRMAnalyticsProps {
  leads: Lead[];
  supportTickets: SupportTicket[];
}

const CRMAnalytics: React.FC<CRMAnalyticsProps> = ({ leads, supportTickets }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'leads' | 'revenue' | 'conversion'>('leads');

  // Calculate metrics from leads data
  const totalLeads = leads.length;
  const hotLeads = leads.filter(lead => lead.status === 'hot').length;
  const warmLeads = leads.filter(lead => lead.status === 'warm').length;
  const coldLeads = leads.filter(lead => lead.status === 'cold').length;
  const closedWonLeads = leads.filter(lead => lead.stage === 'closed-won').length;
  const closedLostLeads = leads.filter(lead => lead.stage === 'closed-lost').length;
  const qualifiedLeadsCount = leads.filter(lead => lead.stage === 'qualified').length;
  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const wonValue = leads.filter(l => l.stage === 'closed-won').reduce((sum, lead) => sum + lead.value, 0);
  const avgDealSize = totalLeads > 0 ? totalValue / totalLeads : 0;
  const conversionRate = totalLeads > 0 ? (closedWonLeads / totalLeads) * 100 : 0;
  const winRate = (closedWonLeads + closedLostLeads) > 0 ? (closedWonLeads / (closedWonLeads + closedLostLeads)) * 100 : 0;

  // Calculate support metrics
  const totalTickets = supportTickets.length;
  const openTickets = supportTickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = supportTickets.filter(ticket => ticket.status === 'in-progress').length;
  const resolvedTickets = supportTickets.filter(ticket => ticket.status === 'resolved').length;

  // Pipeline stages
  const pipelineStages = [
    { name: 'Lead', count: leads.filter(l => l.stage === 'lead').length, color: 'bg-gray-500' },
    { name: 'Qualified', count: leads.filter(l => l.stage === 'qualified').length, color: 'bg-blue-500' },
    { name: 'Proposal', count: leads.filter(l => l.stage === 'proposal').length, color: 'bg-yellow-500' },
    { name: 'Negotiation', count: leads.filter(l => l.stage === 'negotiation').length, color: 'bg-orange-500' },
    { name: 'Closed Won', count: leads.filter(l => l.stage === 'closed-won').length, color: 'bg-green-500' },
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CRM Analytics & Reports</h2>
          <p className="text-gray-600">Comprehensive insights into your sales performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Filter className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{totalLeads}</p>
            </div>
            <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 md:mt-4 flex items-center">
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
            <span className="text-xs md:text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Won Revenue</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {formatCurrency(wonValue)}
              </p>
            </div>
            <div className="h-10 w-10 md:h-12 md:w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 md:mt-4 flex items-center">
            <ArrowUp className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
            <span className="text-xs md:text-sm text-green-600">+18% from last {timeRange}</span>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{winRate.toFixed(1)}%</p>
            </div>
            <div className="h-10 w-10 md:h-12 md:w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Percent className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 md:mt-4 flex items-center">
            <ArrowUp className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
            <span className="text-xs md:text-sm text-green-600">+5.2% from last {timeRange}</span>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Avg Deal Size</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {formatCurrency(avgDealSize)}
              </p>
            </div>
            <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2 md:mt-4 flex items-center">
            <ArrowUp className="h-3 w-3 md:h-4 md:w-4 text-green-500 mr-1" />
            <span className="text-xs md:text-sm text-green-600">+12% from last {timeRange}</span>
          </div>
        </div>
      </div>

      {/* Additional Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Sales Velocity</h3>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Pipeline Value</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(totalValue)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Avg Sales Cycle</span>
                <span className="text-sm font-semibold text-gray-900">28 days</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Velocity Score</span>
                <span className="text-sm font-semibold text-green-600">+32%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Lead Quality</h3>
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Qualified Rate</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{((qualifiedLeadsCount / totalLeads) * 100 || 0).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">MQL to SQL</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-sm text-gray-600">Lost Rate</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{((closedLostLeads / totalLeads) * 100 || 0).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Activity Metrics</h3>
            <Phone className="w-5 h-5 text-purple-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">Calls Made</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">342</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Emails Sent</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">1,248</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-purple-500 mr-2" />
                <span className="text-sm text-gray-600">Meetings</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">87</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Lead Status Distribution */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Lead Status Distribution</h3>
            <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 md:mr-3"></div>
                <span className="text-xs md:text-sm text-gray-600">Hot Leads</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm md:text-base font-semibold text-gray-900 mr-2">{hotLeads}</span>
                <div className="w-16 md:w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${totalLeads > 0 ? (hotLeads / totalLeads) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 md:mr-3"></div>
                <span className="text-xs md:text-sm text-gray-600">Warm Leads</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm md:text-base font-semibold text-gray-900 mr-2">{warmLeads}</span>
                <div className="w-16 md:w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${totalLeads > 0 ? (warmLeads / totalLeads) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 md:mr-3"></div>
                <span className="text-xs md:text-sm text-gray-600">Cold Leads</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm md:text-base font-semibold text-gray-900 mr-2">{coldLeads}</span>
                <div className="w-16 md:w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${totalLeads > 0 ? (coldLeads / totalLeads) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Tickets Overview */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Support Tickets</h3>
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 md:mr-3"></div>
                <span className="text-xs md:text-sm text-gray-600">Open</span>
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-900">{openTickets}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 md:mr-3"></div>
                <span className="text-xs md:text-sm text-gray-600">In Progress</span>
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-900">{inProgressTickets}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 md:mr-3"></div>
                <span className="text-xs md:text-sm text-gray-600">Resolved</span>
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-900">{resolvedTickets}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-gray-600">Total Tickets</span>
              <span className="text-sm md:text-base font-semibold text-gray-900">{totalTickets}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Analysis */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Sales Pipeline Analysis</h3>
          <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={index} className="text-center">
              <div className={`${stage.color} text-white p-3 md:p-4 rounded-lg mb-2`}>
                <div className="text-lg md:text-xl font-bold">{stage.count}</div>
                <div className="text-xs md:text-sm opacity-90">{stage.name}</div>
              </div>
              <div className="text-xs text-gray-500">
                {totalLeads > 0 ? ((stage.count / totalLeads) * 100).toFixed(1) : 0}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3 md:space-y-4">
          {leads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.company}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₹{(lead.value / 100000).toFixed(1)}L</p>
                <p className="text-xs text-gray-500">{lead.stage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRMAnalytics;