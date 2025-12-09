import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import DocumentationSidebar from './components/DocumentationSidebar';
import NavigationButtons from './components/NavigationButtons';
import { getParentSection, getSectionTitle } from './utils/navigationUtils';

// Import all section components
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

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('project-overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'getting-started', 
    'development-guide', 
    'database-schema',
    'api-documentation',
    'frontend-guide',
    'deployment'
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getContentForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'project-overview':
        return <ProjectOverview />;
      case 'architecture':
        return <SystemArchitecture />;
      case 'tech-stack':
        return <TechnologyStack />;
      case 'project-blueprint':
        return <ProjectBlueprint />;
      case 'setup':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Development Setup</h1>
            <p className="text-lg text-gray-600">
              Quick start guide for setting up the development environment.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for detailed setup instructions.</p>
            </div>
          </div>
        );
      case 'frontend-setup':
        return <FrontendSetup />;
      case 'backend-setup':
        return <BackendSetup />;
      case 'database-setup':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Database Setup (PostgreSQL)</h1>
            <p className="text-lg text-gray-600">
              PostgreSQL database setup and configuration.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for detailed database setup instructions.</p>
            </div>
          </div>
        );
      case 'deployment':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Deployment Guide</h1>
            <p className="text-lg text-gray-600">
              Production deployment guide for React + FastAPI + PostgreSQL stack.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for deployment instructions.</p>
            </div>
          </div>
        );
      case 'testing':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Testing Strategy</h1>
            <p className="text-lg text-gray-600">
              Testing approaches for React frontend and FastAPI backend.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for testing documentation.</p>
            </div>
          </div>
        );
      case 'schema-overview':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Database Schema Overview</h1>
            <p className="text-lg text-gray-600">
              High-level overview of the complete PostgreSQL database schema.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for detailed schema overview.</p>
            </div>
          </div>
        );
      case 'user-auth-schema':
        return <UserAuthSchema />;
      case 'crm-schema':
        return <CRMSchema />;
      case 'hrms-employee-schema':
        return <HRMSEmployeeSchema />;
      case 'hrms-attendance-schema':
        return <HRMSAttendanceSchema />;
      case 'hrms-leave-schema':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">HRMS Leave Schema</h1>
            <p className="text-lg text-gray-600">
              Leave management database schema and workflow.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for leave schema documentation.</p>
            </div>
          </div>
        );
      case 'hrms-task-schema':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">HRMS Task Schema</h1>
            <p className="text-lg text-gray-600">
              Task management database schema and relationships.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for task schema documentation.</p>
            </div>
          </div>
        );
      case 'hrms-performance-schema':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">HRMS Performance Schema</h1>
            <p className="text-lg text-gray-600">
              Performance evaluation database schema and KPI tracking.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for performance schema documentation.</p>
            </div>
          </div>
        );
      case 'hrms-payroll-schema':
        return <HRMSPayrollSchema />;
      case 'hrms-document-geofence-schema':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">HRMS Document & Geofence Schema</h1>
            <p className="text-lg text-gray-600">
              Document management and geofence location database schema.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for document and geofence schema documentation.</p>
            </div>
          </div>
        );
      case 'relationships':
        return <DatabaseRelationships />;
      case 'api-overview':
        return <APIDocumentationOverview />;
      case 'auth-endpoints':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Authentication Endpoints</h1>
            <p className="text-lg text-gray-600">
              FastAPI authentication endpoints with JWT implementation.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for authentication endpoint documentation.</p>
            </div>
          </div>
        );
      case 'user-endpoints':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">User Management Endpoints</h1>
            <p className="text-lg text-gray-600">
              FastAPI endpoints for user management operations.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for user management endpoint documentation.</p>
            </div>
          </div>
        );
      case 'crm-endpoints':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">CRM Endpoints</h1>
            <p className="text-lg text-gray-600">
              FastAPI endpoints for CRM operations including leads and support tickets.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for CRM endpoint documentation.</p>
            </div>
          </div>
        );
      case 'hrms-endpoints':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">HRMS Endpoints</h1>
            <p className="text-lg text-gray-600">
              FastAPI endpoints for HRMS operations including employees, attendance, and payroll.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for HRMS endpoint documentation.</p>
            </div>
          </div>
        );
      case 'file-endpoints':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">File Management Endpoints</h1>
            <p className="text-lg text-gray-600">
              FastAPI endpoints for document upload, download, and management.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for file management endpoint documentation.</p>
            </div>
          </div>
        );
      case 'endpoints':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Complete Endpoint Reference</h1>
            <p className="text-lg text-gray-600">
              Comprehensive FastAPI endpoint documentation with examples.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for complete endpoint documentation.</p>
            </div>
          </div>
        );
      case 'components':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">React Components</h1>
            <p className="text-lg text-gray-600">
              Component architecture and reusable UI components.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for component documentation.</p>
            </div>
          </div>
        );
      case 'routing':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">React Routing</h1>
            <p className="text-lg text-gray-600">
              Client-side routing implementation with React Router.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for routing documentation.</p>
            </div>
          </div>
        );
      case 'state-management':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">State Management</h1>
            <p className="text-lg text-gray-600">
              React state management patterns and best practices.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for state management documentation.</p>
            </div>
          </div>
        );
      case 'api-integration':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">API Integration</h1>
            <p className="text-lg text-gray-600">
              Integrating React frontend with FastAPI backend.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for API integration documentation.</p>
            </div>
          </div>
        );
      case 'monitoring':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Monitoring</h1>
            <p className="text-lg text-gray-600">
              Application monitoring and performance tracking.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for monitoring documentation.</p>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Performance Optimization</h1>
            <p className="text-lg text-gray-600">
              Performance optimization techniques for React and FastAPI.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for performance optimization documentation.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Documentation Section</h1>
            <p className="text-lg text-gray-600">
              This section is currently under development.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">
                We're working on adding comprehensive documentation for this section. 
                Please check back later or explore other available sections.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <DocumentationSidebar
        activeSection={activeSection}
        searchTerm={searchTerm}
        expandedSections={expandedSections}
        onSectionChange={setActiveSection}
        onSearchChange={setSearchTerm}
        onToggleSection={toggleSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>Development Documentation</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {getParentSection(activeSection) || 'Project Overview'}
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-indigo-600 font-medium">
              {getSectionTitle(activeSection)}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl">
            {getContentForSection(activeSection)}
            
            {/* Navigation Buttons */}
            <NavigationButtons
              currentSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </main>

        {/* Content Footer */}
        <div className="bg-white border-t border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Last updated: January 15, 2025
            </div>
            <div className="flex items-center space-x-4">
              <span>Was this helpful?</span>
              <div className="flex space-x-2">
                <button className="text-green-600 hover:text-green-700 transition-colors">👍</button>
                <button className="text-red-600 hover:text-red-700 transition-colors">👎</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;