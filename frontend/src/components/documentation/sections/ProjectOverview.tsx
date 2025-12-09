import React from 'react';
import { Layers, Monitor, Server, Database, Users, UserCheck, CheckCircle, AlertTriangle, Clock, Globe } from 'lucide-react';

const ProjectOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">BIDUA ERP - Complete Development Guide</h1>
        <p className="text-xl text-gray-600 mb-8">
          A comprehensive Enterprise Resource Planning system for beauty and cosmetics businesses, 
          featuring integrated CRM and HRMS modules with role-based access control.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
        <div className="text-center">
          <Layers className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Full-Stack Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <Monitor className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Frontend</h3>
              <p className="text-sm text-gray-600">React + TypeScript + Tailwind CSS</p>
            </div>
            <div className="text-center">
              <Server className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Backend</h3>
              <p className="text-sm text-gray-600">FastAPI + Python + Pydantic</p>
            </div>
            <div className="text-center">
              <Database className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Database</h3>
              <p className="text-sm text-gray-600">PostgreSQL + SQLAlchemy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Core Modules</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-6">
              <Users className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Relationship Management</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lead management and tracking</li>
                <li>• Sales pipeline visualization</li>
                <li>• Customer support ticketing</li>
                <li>• Sales analytics and reporting</li>
                <li>• Lead source tracking</li>
                <li>• Follow-up scheduling</li>
                <li>• Deal value estimation</li>
                <li>• Customer communication history</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <UserCheck className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Human Resource Management</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Employee information management</li>
                <li>• Attendance and time tracking</li>
                <li>• Leave management system</li>
                <li>• Payroll processing</li>
                <li>• Performance evaluations</li>
                <li>• Task assignment and tracking</li>
                <li>• Document management</li>
                <li>• Geofence-based attendance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">User Roles & Access</h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Administrator</h3>
              <p className="text-sm text-red-800 mb-2">Full system access, user management, system configuration</p>
              <ul className="text-xs text-red-700 space-y-1">
                <li>• Complete CRUD operations on all modules</li>
                <li>• User account creation and management</li>
                <li>• System settings and configuration</li>
                <li>• Advanced reporting and analytics</li>
                <li>• Audit log access</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Manager</h3>
              <p className="text-sm text-yellow-800 mb-2">Department management, team oversight, approval workflows</p>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Department-specific data access</li>
                <li>• Team member management</li>
                <li>• Leave request approvals</li>
                <li>• Performance review creation</li>
                <li>• Task assignment and monitoring</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Employee</h3>
              <p className="text-sm text-green-800 mb-2">Personal portal, self-service features, task management</p>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• Personal dashboard and profile</li>
                <li>• Attendance marking (clock in/out)</li>
                <li>• Leave application submission</li>
                <li>• Task progress updates</li>
                <li>• Document access and download</li>
                <li>• Salary slip viewing</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Documentation</h3>
              <p className="text-sm text-blue-800 mb-2">Technical documentation access and management</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Complete system documentation</li>
                <li>• API reference guides</li>
                <li>• Database schema details</li>
                <li>• Development setup guides</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Development Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">Frontend (React)</span>
                <span className="text-sm font-semibold text-blue-900">✅ Complete</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-full"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">Backend (FastAPI)</span>
                <span className="text-sm font-semibold text-yellow-700">🚧 In Progress</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full w-1/3"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">Database (PostgreSQL)</span>
                <span className="text-sm font-semibold text-yellow-700">🚧 In Progress</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features & Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Database className="w-5 h-5 text-blue-600 mr-2" />
              Data Management
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Centralized PostgreSQL database</li>
              <li>• Real-time data synchronization</li>
              <li>• Automated backup systems</li>
              <li>• Data validation and integrity</li>
              <li>• Audit trail tracking</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              User Experience
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Responsive design for all devices</li>
              <li>• Role-based interface customization</li>
              <li>• Intuitive navigation and workflows</li>
              <li>• Real-time notifications</li>
              <li>• Dark/light theme support</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Globe className="w-5 h-5 text-purple-600 mr-2" />
              Integration & Security
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• JWT-based authentication</li>
              <li>• Role-based access control</li>
              <li>• API-first architecture</li>
              <li>• Third-party integrations ready</li>
              <li>• GDPR compliance features</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Development Roadmap */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Development Roadmap</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Phase 1: Frontend Development (Completed)</h3>
            </div>
            <ul className="text-sm text-green-800 space-y-1 ml-8">
              <li>• React components with TypeScript</li>
              <li>• Responsive UI with Tailwind CSS</li>
              <li>• Role-based portal views</li>
              <li>• Mock data integration</li>
              <li>• Component testing</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-900">Phase 2: Backend Development (In Progress)</h3>
            </div>
            <ul className="text-sm text-yellow-800 space-y-1 ml-8">
              <li>• FastAPI application setup</li>
              <li>• Authentication system with JWT</li>
              <li>• API endpoints development</li>
              <li>• Business logic implementation</li>
              <li>• Request/response validation</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Phase 3: Database Implementation (Planned)</h3>
            </div>
            <ul className="text-sm text-blue-800 space-y-1 ml-8">
              <li>• PostgreSQL schema creation</li>
              <li>• Data migration scripts</li>
              <li>• Indexing and optimization</li>
              <li>• Backup and recovery setup</li>
              <li>• Performance tuning</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Phase 4: Deployment & Production (Future)</h3>
            </div>
            <ul className="text-sm text-purple-800 space-y-1 ml-8">
              <li>• Docker containerization</li>
              <li>• CI/CD pipeline setup</li>
              <li>• Production deployment</li>
              <li>• Monitoring and logging</li>
              <li>• Performance optimization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Business Context */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Business Context</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Target Industry</h3>
            <p className="text-gray-600 mb-3">
              BIDUA ERP is specifically designed for beauty and cosmetics companies, addressing 
              the unique challenges of this industry including:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Product lifecycle management</li>
              <li>• Seasonal demand fluctuations</li>
              <li>• Regulatory compliance tracking</li>
              <li>• Multi-channel sales management</li>
              <li>• Inventory expiration tracking</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Business Benefits</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Streamlined operations and workflows</li>
              <li>• Improved customer relationship management</li>
              <li>• Enhanced employee productivity</li>
              <li>• Real-time business insights</li>
              <li>• Reduced manual processes</li>
              <li>• Better compliance management</li>
              <li>• Scalable growth support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;