import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Headphones,
  BarChart3,
  Building2,
  Target,
  Activity,
  Heart,
  Megaphone,
  Package,
  Settings2,
  FileText
} from 'lucide-react';
import LeadsManagement from './LeadsManagement';
import ContactsManagement from './ContactsManagement';
import CompaniesManagement from './CompaniesManagement';
import DealsManagement from './DealsManagement';
import ActivitiesManagement from './ActivitiesManagement';
import SalesPipeline from './SalesPipeline';
import CustomerSupport from './CustomerSupport';
import CustomerSuccess from './CustomerSuccess';
import MarketingModule from './MarketingModule';
import ProductCatalog from './ProductCatalog';
import CRMReports from './CRMReports';
import CRMAnalytics from './CRMAnalytics';

interface CRMModuleProps {
  currentUser: any;
  onAddLead: (lead: any) => void;
  onUpdateLead: (id: string, lead: any) => void;
  onDeleteLead: (id: string) => void;
  onAddTicket: (ticket: any) => void;
  onUpdateTicket: (id: string, ticket: any) => void;
  onDeleteTicket: (id: string) => void;
  leads: any[];
  supportTickets: any[];
  companies: any[];
  deals: any[];
  activities: any[];
  campaigns: any[];
  products: any[];
}

const CRMModule: React.FC<CRMModuleProps> = ({
  currentUser,
  onAddLead,
  onUpdateLead,
  onDeleteLead,
  onAddTicket,
  onUpdateTicket,
  onDeleteTicket,
  leads,
  supportTickets,
  companies,
  deals,
  activities,
  campaigns,
  products,
}) => {
  const [activeView, setActiveView] = useState('leads');

  const views = [
    { id: 'leads', name: 'Leads', icon: Users, component: LeadsManagement },
    { id: 'contacts', name: 'Contacts', icon: Users, component: ContactsManagement },
    { id: 'companies', name: 'Companies', icon: Building2, component: CompaniesManagement },
    { id: 'deals', name: 'Deals', icon: Target, component: DealsManagement },
    { id: 'activities', name: 'Activities', icon: Activity, component: ActivitiesManagement },
    { id: 'pipeline', name: 'Pipeline', icon: TrendingUp, component: SalesPipeline },
    { id: 'support', name: 'Support', icon: Headphones, component: CustomerSupport },
    { id: 'success', name: 'Success', icon: Heart, component: CustomerSuccess },
    { id: 'marketing', name: 'Marketing', icon: Megaphone, component: MarketingModule },
    { id: 'products', name: 'Products', icon: Package, component: ProductCatalog },
    { id: 'reports', name: 'Reports', icon: FileText, component: CRMReports },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, component: CRMAnalytics },
  ];

  const renderActiveView = () => {
    const activeViewConfig = views.find(view => view.id === activeView);
    if (!activeViewConfig) return null;

    const Component = activeViewConfig.component;

    // If component is null, show coming soon placeholder
    if (!Component) {
      return (
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-100 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(activeViewConfig.icon, { className: "w-10 h-10 text-slate-400" })}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeViewConfig.name} Module
            </h3>
            <p className="text-gray-600 mb-4">
              This module is currently under development. Check back soon for updates!
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-600">
              <Activity className="w-4 h-4 mr-2" />
              Coming Soon
            </div>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'leads':
        return (
          <Component
            currentUser={currentUser}
            onAddLead={onAddLead}
            onUpdateLead={onUpdateLead}
            onDeleteLead={onDeleteLead}
            leads={leads}
          />
        );
      case 'contacts':
        return <Component />;
      case 'companies':
        return (
          <Component
            companies={companies}
            onAddCompany={(company: any) => console.log('Add company:', company)}
            onUpdateCompany={(id: string, company: any) => console.log('Update company:', id, company)}
            onDeleteCompany={(id: string) => console.log('Delete company:', id)}
          />
        );
      case 'deals':
        return (
          <Component
            deals={deals}
            onAddDeal={(deal: any) => console.log('Add deal:', deal)}
            onUpdateDeal={(id: string, deal: any) => console.log('Update deal:', id, deal)}
            onDeleteDeal={(id: string) => console.log('Delete deal:', id)}
          />
        );
      case 'activities':
        return (
          <Component
            activities={activities}
            onAddActivity={(activity: any) => console.log('Add activity:', activity)}
            onUpdateActivity={(id: string, activity: any) => console.log('Update activity:', id, activity)}
            onDeleteActivity={(id: string) => console.log('Delete activity:', id)}
          />
        );
      case 'pipeline':
        return <Component leads={leads} />;
      case 'support':
        return (
          <Component
            currentUser={currentUser}
            onAddTicket={onAddTicket}
            onUpdateTicket={onUpdateTicket}
            onDeleteTicket={onDeleteTicket}
            supportTickets={supportTickets}
          />
        );
      case 'success':
        return <Component companies={companies} />;
      case 'marketing':
        return <Component campaigns={campaigns} />;
      case 'products':
        return <Component products={products} />;
      case 'reports':
        return <Component leads={leads} companies={companies} deals={deals} activities={activities} />;
      case 'analytics':
        return <Component leads={leads} supportTickets={supportTickets} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Module Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Relationship Management</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Manage your sales, customers, and relationships</p>
        </div>
      </div>

      {/* Navigation Grid - All Visible */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg font-medium text-sm transition-all ${
                  activeView === view.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow'
                }`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span className="text-xs">{view.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active View Content */}
      <div className="min-h-0 flex-1">
        {renderActiveView()}
      </div>
    </div>
  );
};

export default CRMModule;