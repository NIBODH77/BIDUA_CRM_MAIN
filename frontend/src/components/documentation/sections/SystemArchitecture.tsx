import React from 'react';
import { Monitor, Server, Database, Layers, Shield, Globe, Zap } from 'lucide-react';

const SystemArchitecture: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">System Architecture</h1>
        <p className="text-lg text-gray-600 mb-6">
          BIDUA ERP follows a modern three-tier architecture with clear separation of concerns, 
          ensuring scalability, maintainability, and security.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Architecture Layers</h2>
        
        <div className="space-y-6">
          {/* Presentation Layer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Monitor className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-blue-900">Presentation Layer (Frontend)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">React Application</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• React Router for navigation</li>
                  <li>• Lucide React for icons</li>
                  <li>• Responsive design patterns</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">State Management</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• React Hooks (useState, useEffect)</li>
                  <li>• Context API for global state</li>
                  <li>• Local storage for persistence</li>
                  <li>• Form state management</li>
                  <li>• Real-time data updates</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Components</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Modular component architecture</li>
                  <li>• Reusable UI components</li>
                  <li>• Role-based rendering</li>
                  <li>• Responsive design</li>
                  <li>• Accessibility features</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Business Logic Layer */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Server className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-green-900">Business Logic Layer (Backend)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">FastAPI Framework</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• RESTful API endpoints</li>
                  <li>• Automatic API documentation</li>
                  <li>• Request/Response validation</li>
                  <li>• Async/await support</li>
                  <li>• High-performance routing</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Authentication & Security</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• JWT token authentication</li>
                  <li>• Role-based access control</li>
                  <li>• Password hashing (bcrypt)</li>
                  <li>• CORS configuration</li>
                  <li>• Rate limiting</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Business Logic</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CRM operations</li>
                  <li>• HRMS workflows</li>
                  <li>• Report generation</li>
                  <li>• File management</li>
                  <li>• Notification services</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Layer */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-purple-900">Data Layer (Database)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">PostgreSQL Database</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• ACID compliance</li>
                  <li>• Advanced indexing</li>
                  <li>• JSON/JSONB support</li>
                  <li>• Full-text search</li>
                  <li>• Concurrent connections</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">SQLAlchemy ORM</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Object-relational mapping</li>
                  <li>• Database migrations</li>
                  <li>• Query optimization</li>
                  <li>• Connection pooling</li>
                  <li>• Lazy loading</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">Data Management</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Automated backups</li>
                  <li>• Data validation</li>
                  <li>• Audit trails</li>
                  <li>• Performance monitoring</li>
                  <li>• Data archiving</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Principles */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Architecture Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Security First</h3>
                <p className="text-sm text-gray-600">
                  Every component is designed with security in mind, from authentication 
                  to data access patterns and API endpoint protection.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Layers className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Modular Design</h3>
                <p className="text-sm text-gray-600">
                  Clear separation of concerns with modular components that can be 
                  developed, tested, and deployed independently.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Zap className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Performance Optimized</h3>
                <p className="text-sm text-gray-600">
                  Built for speed with efficient database queries, optimized API responses, 
                  and fast frontend rendering.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Globe className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Scalable Infrastructure</h3>
                <p className="text-sm text-gray-600">
                  Designed to scale horizontally with microservices-ready architecture 
                  and cloud-native deployment patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;