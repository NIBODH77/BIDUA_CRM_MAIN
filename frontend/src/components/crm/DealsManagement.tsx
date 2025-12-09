import React, { useState } from 'react';
import { Plus, Search, Target, DollarSign, Calendar, TrendingUp, Eye, Edit, Trash2, Award, Clock, ChevronRight, X } from 'lucide-react';

interface Deal {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  products: string[];
  competitors: string[];
  status: string;
  createdAt: string;
  lastActivity: string;
  closedDate?: string;
}

interface DealsManagementProps {
  deals: Deal[];
  onAddDeal?: (deal: any) => void;
  onUpdateDeal?: (id: string, deal: any) => void;
  onDeleteDeal?: (id: string) => void;
}

const DealsManagement: React.FC<DealsManagementProps> = ({
  deals,
  onAddDeal,
  onUpdateDeal,
  onDeleteDeal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('open');
  const [sortBy, setSortBy] = useState<'value' | 'probability' | 'closeDate'>('value');
  const [viewingDeal, setViewingDeal] = useState<any>(null);
  const [editingDeal, setEditingDeal] = useState<any>(null);

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;

    return matchesSearch && matchesStage && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'value') return b.value - a.value;
    if (sortBy === 'probability') return b.probability - a.probability;
    if (sortBy === 'closeDate') return new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime();
    return 0;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed-won': return 'bg-green-100 text-green-800';
      case 'closed-lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600';
    if (probability >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const totalValue = filteredDeals.reduce((sum, d) => sum + d.value, 0);
  const weightedValue = filteredDeals.reduce((sum, d) => sum + (d.value * d.probability / 100), 0);
  const openDeals = filteredDeals.filter(d => d.status === 'open').length;
  const wonDeals = filteredDeals.filter(d => d.status === 'won').length;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Opportunities & Deals</h2>
          <p className="text-sm md:text-base text-gray-600">Track and manage your sales opportunities</p>
        </div>
        <button
          onClick={() => onAddDeal?.({})}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Deal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Pipeline</p>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
          <p className="text-xs text-gray-500 mt-1">{openDeals} open deals</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Weighted Value</p>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(weightedValue)}</p>
          <p className="text-xs text-gray-500 mt-1">Expected revenue</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Won Deals</p>
            <Award className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{wonDeals}</p>
          <p className="text-xs text-gray-500 mt-1">Closed successfully</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Deal Size</p>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {filteredDeals.length > 0 ? formatCurrency(totalValue / filteredDeals.length) : '₹0'}
          </p>
          <p className="text-xs text-gray-500 mt-1">Per opportunity</p>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed-won">Closed Won</option>
              <option value="closed-lost">Closed Lost</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="value">Highest Value</option>
              <option value="probability">Best Probability</option>
              <option value="closeDate">Closing Soon</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredDeals.map((deal) => (
          <div key={deal.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{deal.name}</h3>
                    <p className="text-sm text-gray-600">{deal.companyName}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                    {deal.stage}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  <div>
                    <p className="text-xs text-gray-500">Deal Value</p>
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(deal.value)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Probability</p>
                    <p className={`text-sm font-semibold ${getProbabilityColor(deal.probability)}`}>
                      {deal.probability}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Close Date</p>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-900">{formatDate(deal.expectedCloseDate)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Owner</p>
                    <p className="text-sm font-semibold text-gray-900">{deal.owner}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {deal.products.slice(0, 3).map((product, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                      {product}
                    </span>
                  ))}
                  {deal.products.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                      +{deal.products.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-end gap-2">
                <button
                  onClick={() => setViewingDeal(deal)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => setEditingDeal(deal)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDeleteDeal?.(deal.id)}
                  className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No deals found</h3>
          <p className="text-gray-600">Try adjusting your filters or add a new deal</p>
        </div>
      )}

      {/* View Deal Modal */}
      {viewingDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Deal Details</h3>
              <button
                onClick={() => setViewingDeal(null)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-1">{viewingDeal.name}</h4>
                <p className="text-gray-600">{viewingDeal.companyName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Stage</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStageColor(viewingDeal.stage)}`}>
                    {viewingDeal.stage}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <p className="text-base text-gray-900 capitalize">{viewingDeal.status}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Deal Value</h4>
                  <p className="text-base font-semibold text-gray-900">{formatCurrency(viewingDeal.value)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Probability</h4>
                  <p className={`text-base font-semibold ${getProbabilityColor(viewingDeal.probability)}`}>
                    {viewingDeal.probability}%
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Expected Close Date</h4>
                  <p className="text-base text-gray-900">{formatDate(viewingDeal.expectedCloseDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Owner</h4>
                  <p className="text-base text-gray-900">{viewingDeal.owner}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Created Date</h4>
                  <p className="text-base text-gray-900">{formatDate(viewingDeal.createdAt)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Last Activity</h4>
                  <p className="text-base text-gray-900">{formatDate(viewingDeal.lastActivity)}</p>
                </div>
              </div>

              {viewingDeal.products && viewingDeal.products.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Products/Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingDeal.products.map((product: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-700"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {viewingDeal.competitors && viewingDeal.competitors.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Competitors</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingDeal.competitors.map((competitor: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-red-100 text-red-700"
                      >
                        {competitor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {viewingDeal.closedDate && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Closed Date</h4>
                  <p className="text-base text-gray-900">{formatDate(viewingDeal.closedDate)}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setViewingDeal(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setEditingDeal(viewingDeal);
                  setViewingDeal(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Deal Modal */}
      {editingDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Edit Deal</h3>
              <button
                onClick={() => setEditingDeal(null)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateDeal?.(editingDeal.id, editingDeal);
                setEditingDeal(null);
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deal Name *</label>
                  <input
                    type="text"
                    value={editingDeal.name}
                    onChange={(e) => setEditingDeal({ ...editingDeal, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    value={editingDeal.companyName}
                    onChange={(e) => setEditingDeal({ ...editingDeal, companyName: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value (₹)</label>
                  <input
                    type="number"
                    value={editingDeal.value}
                    onChange={(e) => setEditingDeal({ ...editingDeal, value: Number(e.target.value) })}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                  <select
                    value={editingDeal.stage}
                    onChange={(e) => setEditingDeal({ ...editingDeal, stage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed-won">Closed Won</option>
                    <option value="closed-lost">Closed Lost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
                  <input
                    type="number"
                    value={editingDeal.probability}
                    onChange={(e) => setEditingDeal({ ...editingDeal, probability: Number(e.target.value) })}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
                  <input
                    type="date"
                    value={editingDeal.expectedCloseDate}
                    onChange={(e) => setEditingDeal({ ...editingDeal, expectedCloseDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                  <input
                    type="text"
                    value={editingDeal.owner}
                    onChange={(e) => setEditingDeal({ ...editingDeal, owner: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editingDeal.status}
                    onChange={(e) => setEditingDeal({ ...editingDeal, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingDeal(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealsManagement;
