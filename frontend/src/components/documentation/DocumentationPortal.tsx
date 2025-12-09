import React, { useState } from 'react';
import { Book, Search, ChevronRight, ChevronDown, LogOut, ArrowLeft, Menu, X } from 'lucide-react';
import ProjectOverview from './sections/ProjectOverview';
import SystemArchitecture from './sections/SystemArchitecture';
import TechnologyStack from './sections/TechnologyStack';
import ProjectBlueprint from './sections/ProjectBlueprint';
import DatabaseRelationships from './sections/DatabaseRelationships';
import UserAuthSchema from './sections/UserAuthSchema';
import HRMSEmployeeSchema from './sections/HRMSEmployeeSchema';
import HRMSPayrollSchema from './sections/HRMSPayrollSchema';
import HRMSAttendanceSchema from './sections/HRMSAttendanceSchema';
import CRMSchema from './sections/CRMSchema';
import APIDocumentationOverview from './sections/APIDocumentationOverview';
import FrontendSetup from './sections/FrontendSetup';
import BackendSetup from './sections/BackendSetup';
import DevelopmentSetup from './sections/DevelopmentSetup';
import DatabaseSetup from './sections/DatabaseSetup';
import DeploymentGuide from './sections/DeploymentGuide';
import TestingStrategy from './sections/TestingStrategy';
import SchemaOverview from './sections/SchemaOverview';
import UnderDevelopmentSection from './sections/UnderDevelopmentSection';
import NavigationButtons from './components/NavigationButtons';
import HRMSLeaveSchema from './sections/HRMSLeaveSchema';
import HRMSTaskSchema from './sections/HRMSTaskSchema';
import HRMSPerformanceSchema from './sections/HRMSPerformanceSchema';
import HRMSDocumentGeofenceSchema from './sections/HRMSDocumentGeofenceSchema';
import AuthenticationEndpoints from './sections/AuthenticationEndpoints';
import UserManagementEndpoints from './sections/UserManagementEndpoints';
import CRMEndpoints from './sections/CRMEndpoints';
import HRMSEndpoints from './sections/HRMSEndpoints';
import FileManagementEndpoints from './sections/FileManagementEndpoints';
import CompleteEndpoints from './sections/CompleteEndpoints';
import ReactComponents from './sections/ReactComponents';
import ReactRouting from './sections/ReactRouting';
import StateManagement from './sections/StateManagement';
import APIIntegration from './sections/APIIntegration';
import DeploymentOverview from './sections/DeploymentOverview';
import Monitoring from './sections/Monitoring';
import PerformanceOptimization from './sections/PerformanceOptimization';

interface DocumentationPortalProps {
  currentUser: any;
  activeSection: string;
  onLogout: () => void;
  onSectionChange: (sectionId: string) => void;
}

const DocumentationPortal: React.FC<DocumentationPortalProps> = ({
  currentUser,
  activeSection,
  onLogout,
  onSectionChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'getting-started', 
    'development-guide', 
    'database-schema',
    'api-documentation',
    'frontend-guide',
    'deployment'
  ]);

  const navigationItems = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      children: [
        { id: 'overview', title: 'Project Overview' },
        { id: 'system-architecture', title: 'System Architecture' },
        { id: 'technology-stack', title: 'Technology Stack' },
        { id: 'project-blueprint', title: 'Project Blueprint' },
        { id: 'setup', title: 'Development Setup' },
      ]
    },
    {
      id: 'development-guide',
      title: 'Development Guide',
      children: [
        { id: 'frontend-setup', title: 'Frontend Setup (React)' },
        { id: 'backend-setup', title: 'Backend Setup (FastAPI)' },
        { id: 'database-setup', title: 'Database Setup (PostgreSQL)' },
        { id: 'deployment-guide', title: 'Deployment Guide' },
        { id: 'testing', title: 'Testing Strategy' }
      ]
    },
    {
      id: 'database-schema',
      title: 'Database Schema',
      children: [
        { id: 'schema-overview', title: 'Schema Overview' },
        { id: 'user-auth-schema', title: 'User & Authentication' },
        { id: 'crm-schema', title: 'CRM Schema' },
        { id: 'hrms-employee-schema', title: 'HRMS Employee Schema' },
        { id: 'hrms-attendance-schema', title: 'HRMS Attendance Schema' },
        { id: 'hrms-leave-schema', title: 'HRMS Leave Schema' },
        { id: 'hrms-task-schema', title: 'HRMS Task Schema' },
        { id: 'hrms-performance-schema', title: 'HRMS Performance Schema' },
        { id: 'hrms-payroll-schema', title: 'HRMS Payroll Schema' },
        { id: 'hrms-document-geofence-schema', title: 'HRMS Document & Geofence Schema' },
        { id: 'relationships', title: 'Table Relationships' },
      ]
    },
    {
      id: 'api-documentation',
      title: 'API Documentation',
      children: [
        { id: 'api-overview', title: 'API Overview' },
        { id: 'auth-endpoints', title: 'Authentication Endpoints' },
        { id: 'user-endpoints', title: 'User Management Endpoints' },
        { id: 'crm-endpoints', title: 'CRM Endpoints' },
        { id: 'hrms-endpoints', title: 'HRMS Endpoints' },
        { id: 'file-endpoints', title: 'File Management Endpoints' },
        { id: 'endpoints', title: 'Endpoints' },
      ]
    },
    {
      id: 'frontend-guide',
      title: 'Frontend Guide',
      children: [
        { id: 'components', title: 'Components' },
        { id: 'routing', title: 'Routing' },
        { id: 'state-management', title: 'State Management' },
        { id: 'api-integration', title: 'API Integration' }
      ]
    },
    {
      id: 'deployment',
      title: 'Deployment',
      children: [
        { id: 'deployment-overview', title: 'Deployment Overview' },
        { id: 'monitoring', title: 'Monitoring' },
        { id: 'performance', title: 'Performance Optimization' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getContentForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'overview':
      case 'project-overview':
        return <ProjectOverview />;
      case 'architecture':
      case 'system-architecture':
        return <SystemArchitecture />;
      case 'tech-stack':
      case 'technology-stack':
        return <TechnologyStack />;
      case 'project-blueprint':
        return <ProjectBlueprint />;
      case 'setup':
        return <DevelopmentSetup />;
      case 'frontend-setup':
        return <FrontendSetup />;
      case 'backend-setup':
        return <BackendSetup />;
      case 'database-setup':
        return <DatabaseSetup />;
      case 'deployment-guide':
        return <DeploymentGuide />;
      case 'deployment-overview':
        return <DeploymentOverview />;
      case 'testing':
        return <TestingStrategy />;
      case 'schema':
      case 'schema-overview':
        return <SchemaOverview />;
      case 'user-auth-schema':
        return <UserAuthSchema />;
      case 'crm-schema':
        return <CRMSchema />;
      case 'hrms-employee-schema':
        return <HRMSEmployeeSchema />;
      case 'hrms-attendance-schema':
        return <HRMSAttendanceSchema />;
      case 'hrms-leave-schema':
        return <HRMSLeaveSchema />;
      case 'hrms-task-schema':
        return <HRMSTaskSchema />;
      case 'hrms-performance-schema':
        return <HRMSPerformanceSchema />;
      case 'hrms-payroll-schema':
        return <HRMSPayrollSchema />;
      case 'hrms-document-geofence-schema':
        return <HRMSDocumentGeofenceSchema />;
      case 'relationships':
        return <DatabaseRelationships />;
      case 'api-overview':
        return <APIDocumentationOverview />;
      case 'auth-endpoints':
        return <AuthenticationEndpoints />;
      case 'user-endpoints':
        return <UserManagementEndpoints />;
      case 'crm-endpoints':
        return <CRMEndpoints />;
      case 'hrms-endpoints':
        return <HRMSEndpoints />;
      case 'file-endpoints':
        return <FileManagementEndpoints />;
      case 'endpoints':
        return <CompleteEndpoints />;
      case 'components':
        return <ReactComponents />;
      case 'routing':
        return <ReactRouting />;
      case 'state-management':
        return <StateManagement />;
      case 'api-integration':
        return <APIIntegration />;
      case 'monitoring':
        return <Monitoring />;
      case 'performance':
        return <PerformanceOptimization />;
      default:
        return (
          <UnderDevelopmentSection 
            title="Documentation Section"
            description="This section is currently under development."
            estimatedCompletion="Coming soon"
          />
        );
    }
  };

  const filteredNavItems = navigationItems.map(section => ({
    ...section,
    children: section.children?.filter(child => 
      child.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (section.children && section.children.length > 0)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Book className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">BIDUA ERP</h1>
            <p className="text-xs text-gray-500">Development Docs</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Documentation Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="hidden md:flex items-center space-x-3 p-6 border-b border-gray-200">
          <div className="bg-indigo-600 p-3 rounded-xl">
            <Book className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">BIDUA ERP</h1>
            <p className="text-sm text-gray-500">Development Docs</p>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 md:p-6 border-b border-gray-200 mt-16 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-sm">
                {currentUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.username}
              </p>
              <p className="text-xs text-gray-500 capitalize truncate">
                {currentUser.role} • Documentation Access
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 md:p-6 space-y-2 overflow-y-auto">
          <div className="space-y-2">
            {filteredNavItems.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              
              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span>{section.title}</span>
                    {section.children && (
                      isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {section.children && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => {
                            onSectionChange(child.id);
                            if (window.innerWidth < 768) setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeSection === child.id
                              ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-500'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {child.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Logout button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>Development Documentation</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-indigo-600 font-medium">
              {navigationItems.find(section => 
                section.children?.some(child => child.id === activeSection)
              )?.title || 'Getting Started'}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto mt-16 md:mt-0">
          <div className="max-w-5xl">
            {getContentForSection(activeSection)}
            
            {/* Navigation Buttons */}
            <NavigationButtons
              currentSection={activeSection}
              onSectionChange={onSectionChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentationPortal;