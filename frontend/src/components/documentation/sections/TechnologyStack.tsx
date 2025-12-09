import React from 'react';
import { Monitor, Server, Database, Code, Layers, Zap, Shield, Globe } from 'lucide-react';

const TechnologyStack: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h1>
        <p className="text-lg text-gray-600 mb-6">
          Modern, scalable technologies chosen for performance, maintainability, and developer experience in the BIDUA ERP system.
        </p>
      </div>

      {/* Stack Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Full-Stack Technology Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Monitor className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">Frontend</h3>
            <p className="text-blue-600 font-medium">React + TypeScript</p>
            <p className="text-sm text-gray-600 mt-2">Modern, component-based UI with type safety</p>
          </div>
          <div className="text-center">
            <Server className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">Backend</h3>
            <p className="text-green-600 font-medium">FastAPI + Python</p>
            <p className="text-sm text-gray-600 mt-2">High-performance async API framework</p>
          </div>
          <div className="text-center">
            <Database className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">Database</h3>
            <p className="text-purple-600 font-medium">PostgreSQL</p>
            <p className="text-sm text-gray-600 mt-2">Advanced relational database with JSON support</p>
          </div>
        </div>
      </div>

      {/* Detailed Technology Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Frontend Technologies */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <Monitor className="w-6 h-6 text-blue-600 mr-3" />
            Frontend Technologies
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Code className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-blue-900">React 18.3.1</h3>
              </div>
              <p className="text-sm text-blue-800 mb-3">Modern React with hooks and functional components</p>
              <div className="space-y-2 text-xs text-blue-700">
                <div><strong>Features:</strong> Concurrent rendering, Suspense, Error boundaries</div>
                <div><strong>Hooks Used:</strong> useState, useEffect, useContext, useCallback</div>
                <div><strong>Patterns:</strong> Component composition, Custom hooks, HOCs</div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="font-semibold text-indigo-900">TypeScript 5.5.3</h3>
              </div>
              <p className="text-sm text-indigo-800 mb-3">Type-safe JavaScript for better development experience</p>
              <div className="space-y-2 text-xs text-indigo-700">
                <div><strong>Benefits:</strong> Compile-time error checking, IntelliSense, Refactoring</div>
                <div><strong>Features:</strong> Interface definitions, Generic types, Enum support</div>
                <div><strong>Configuration:</strong> Strict mode enabled, Path mapping</div>
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Layers className="w-6 h-6 text-cyan-600 mr-3" />
                <h3 className="font-semibold text-cyan-900">Tailwind CSS 3.4.1</h3>
              </div>
              <p className="text-sm text-cyan-800 mb-3">Utility-first CSS framework for rapid UI development</p>
              <div className="space-y-2 text-xs text-cyan-700">
                <div><strong>Features:</strong> Responsive design, Dark mode, Custom components</div>
                <div><strong>Utilities:</strong> Flexbox, Grid, Spacing, Colors, Typography</div>
                <div><strong>Customization:</strong> Custom color palette, Extended spacing</div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="font-semibold text-purple-900">Vite 5.4.2</h3>
              </div>
              <p className="text-sm text-purple-800 mb-3">Fast build tool and development server</p>
              <div className="space-y-2 text-xs text-purple-700">
                <div><strong>Benefits:</strong> Hot module replacement, Fast builds, ES modules</div>
                <div><strong>Plugins:</strong> React plugin, TypeScript support</div>
                <div><strong>Optimization:</strong> Tree shaking, Code splitting</div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Globe className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="font-semibold text-emerald-900">React Router DOM 7.9.1</h3>
              </div>
              <p className="text-sm text-emerald-800 mb-3">Client-side routing for single-page application</p>
              <div className="space-y-2 text-xs text-emerald-700">
                <div><strong>Features:</strong> Nested routing, Route guards, Lazy loading</div>
                <div><strong>Components:</strong> BrowserRouter, Routes, Route, Link</div>
                <div><strong>Navigation:</strong> Programmatic navigation, Route parameters</div>
              </div>
            </div>
          </div>
        </div>

        {/* Backend Technologies */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <Server className="w-6 h-6 text-green-600 mr-3" />
            Backend Technologies
          </h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Server className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="font-semibold text-green-900">FastAPI 0.104+</h3>
              </div>
              <p className="text-sm text-green-800 mb-3">Modern, fast web framework for building APIs with Python</p>
              <div className="space-y-2 text-xs text-green-700">
                <div><strong>Features:</strong> Automatic API docs, Type hints, Async support</div>
                <div><strong>Performance:</strong> High performance, comparable to NodeJS and Go</div>
                <div><strong>Standards:</strong> OpenAPI, JSON Schema, OAuth2, JWT</div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Code className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="font-semibold text-emerald-900">Python 3.11+</h3>
              </div>
              <p className="text-sm text-emerald-800 mb-3">Modern Python with latest performance improvements</p>
              <div className="space-y-2 text-xs text-emerald-700">
                <div><strong>Key Libraries:</strong> Pydantic, SQLAlchemy, Alembic, python-jose</div>
                <div><strong>Features:</strong> Type hints, Async/await, Context managers</div>
                <div><strong>Performance:</strong> Improved startup time, Better error messages</div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Database className="w-6 h-6 text-teal-600 mr-3" />
                <h3 className="font-semibold text-teal-900">SQLAlchemy 2.0+</h3>
              </div>
              <p className="text-sm text-teal-800 mb-3">Python SQL toolkit and Object-Relational Mapping</p>
              <div className="space-y-2 text-xs text-teal-700">
                <div><strong>Features:</strong> ORM, Query builder, Connection pooling</div>
                <div><strong>Migrations:</strong> Alembic for database versioning</div>
                <div><strong>Performance:</strong> Lazy loading, Query optimization</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Database className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-blue-900">PostgreSQL 14+</h3>
              </div>
              <p className="text-sm text-blue-800 mb-3">Advanced open-source relational database</p>
              <div className="space-y-2 text-xs text-blue-700">
                <div><strong>Features:</strong> ACID compliance, JSONB support, Full-text search</div>
                <div><strong>Extensions:</strong> UUID generation, PostGIS for geolocation</div>
                <div><strong>Performance:</strong> Advanced indexing, Query optimization</div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="font-semibold text-orange-900">Security Stack</h3>
              </div>
              <p className="text-sm text-orange-800 mb-3">Comprehensive security implementation</p>
              <div className="space-y-2 text-xs text-orange-700">
                <div><strong>Authentication:</strong> JWT tokens, bcrypt password hashing</div>
                <div><strong>Authorization:</strong> Role-based access control (RBAC)</div>
                <div><strong>Security:</strong> CORS, Rate limiting, Input validation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Tools */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Development Tools & Libraries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Frontend Libraries</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>lucide-react:</strong> Icon library</li>
              <li>• <strong>react-router-dom:</strong> Client-side routing</li>
              <li>• <strong>uuid:</strong> Unique identifier generation</li>
              <li>• <strong>@types/*:</strong> TypeScript type definitions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Backend Libraries</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>fastapi:</strong> Web framework</li>
              <li>• <strong>uvicorn:</strong> ASGI server</li>
              <li>• <strong>sqlalchemy:</strong> ORM</li>
              <li>• <strong>alembic:</strong> Database migrations</li>
              <li>• <strong>pydantic:</strong> Data validation</li>
              <li>• <strong>python-jose:</strong> JWT handling</li>
              <li>• <strong>passlib:</strong> Password hashing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Database Tools</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>psycopg2:</strong> PostgreSQL adapter</li>
              <li>• <strong>pgAdmin:</strong> Database administration</li>
              <li>• <strong>pg_dump:</strong> Backup utility</li>
              <li>• <strong>PostGIS:</strong> Geospatial extension</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Development Tools</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>ESLint:</strong> Code linting</li>
              <li>• <strong>Prettier:</strong> Code formatting</li>
              <li>• <strong>Git:</strong> Version control</li>
              <li>• <strong>Docker:</strong> Containerization</li>
              <li>• <strong>VS Code:</strong> IDE</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Architecture Benefits */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Architecture Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Performance
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• React's virtual DOM for efficient updates</li>
              <li>• FastAPI's async capabilities</li>
              <li>• PostgreSQL's query optimization</li>
              <li>• Vite's fast build times</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• TypeScript compile-time checks</li>
              <li>• Pydantic runtime validation</li>
              <li>• PostgreSQL's robust security</li>
              <li>• JWT token-based authentication</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Developer Experience
            </h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Hot reload in development</li>
              <li>• Automatic API documentation</li>
              <li>• Type safety across the stack</li>
              <li>• Modern tooling and IDE support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Version Compatibility */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Version Compatibility Matrix</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Technology</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Minimum Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Node.js</td>
                <td className="px-6 py-4 text-sm text-gray-900">18.0+</td>
                <td className="px-6 py-4 text-sm text-gray-600">16.0</td>
                <td className="px-6 py-4 text-sm text-gray-600">LTS version recommended</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Python</td>
                <td className="px-6 py-4 text-sm text-gray-900">3.11+</td>
                <td className="px-6 py-4 text-sm text-gray-600">3.9</td>
                <td className="px-6 py-4 text-sm text-gray-600">Performance improvements in 3.11+</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">PostgreSQL</td>
                <td className="px-6 py-4 text-sm text-gray-900">14.0+</td>
                <td className="px-6 py-4 text-sm text-gray-600">12.0</td>
                <td className="px-6 py-4 text-sm text-gray-600">JSON improvements in 14+</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">React</td>
                <td className="px-6 py-4 text-sm text-gray-900">18.3.1</td>
                <td className="px-6 py-4 text-sm text-gray-600">18.0</td>
                <td className="px-6 py-4 text-sm text-gray-600">Concurrent features required</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">FastAPI</td>
                <td className="px-6 py-4 text-sm text-gray-900">0.104+</td>
                <td className="px-6 py-4 text-sm text-gray-600">0.100</td>
                <td className="px-6 py-4 text-sm text-gray-600">Latest features and security</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TechnologyStack;