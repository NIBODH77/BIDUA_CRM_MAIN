import React from 'react';
import { Database, GitBranch, Users, UserCheck, FileText, MapPin } from 'lucide-react';

const DatabaseRelationships: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Relationships & ERD</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete Entity Relationship Diagram and table relationships for the BIDUA ERP PostgreSQL database.
        </p>
      </div>

      {/* ERD Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Entity Relationship Diagram</h2>
        
        {/* Core Entities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Authentication Cluster */}
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3 text-center">Authentication Core</h4>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded border text-center">
                <strong className="text-sm">users</strong>
                <div className="text-xs text-gray-600">id, username, email, role</div>
              </div>
              <div className="text-center">↓ (1:1)</div>
              <div className="bg-white p-2 rounded border text-center">
                <strong className="text-sm">employees</strong>
                <div className="text-xs text-gray-600">employee_id, name, department</div>
              </div>
            </div>
          </div>

          {/* CRM Flow */}
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-3 text-center">CRM Flow</h4>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded border text-center">
                <strong className="text-sm">leads</strong>
                <div className="text-xs text-gray-600">name, company, status, stage</div>
              </div>
              <div className="text-center">↓ (1:M)</div>
              <div className="bg-white p-2 rounded border text-center">
                <strong className="text-sm">support_tickets</strong>
                <div className="text-xs text-gray-600">title, priority, status</div>
              </div>
              <div className="text-center">↓ (1:M)</div>
              <div className="bg-white p-2 rounded border text-center">
                <strong className="text-sm">ticket_comments</strong>
                <div className="text-xs text-gray-600">content, author</div>
              </div>
            </div>
          </div>

          {/* HRMS Flow */}
          <div className="bg-purple-100 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-3 text-center">HRMS Flow</h4>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded border text-center">
                <strong className="text-sm">employees</strong>
                <div className="text-xs text-gray-600">Central hub</div>
              </div>
              <div className="text-center">↓ (1:M)</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-white p-1 rounded border text-center">
                  <strong className="text-xs">attendance</strong>
                </div>
                <div className="bg-white p-1 rounded border text-center">
                  <strong className="text-xs">leaves</strong>
                </div>
                <div className="bg-white p-1 rounded border text-center">
                  <strong className="text-xs">payroll</strong>
                </div>
                <div className="bg-white p-1 rounded border text-center">
                  <strong className="text-xs">tasks</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Relationship Types */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Relationship Types & Constraints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">One-to-One Relationships</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 text-sm">users ↔ employees</h4>
                <p className="text-xs text-blue-800">Each user can have one employee record</p>
                <code className="text-xs text-blue-700">users.id ← employees.user_id (UNIQUE)</code>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 text-sm">employees ↔ bank_accounts</h4>
                <p className="text-xs text-green-800">Each employee has one bank account</p>
                <code className="text-xs text-green-700">employees.id ← bank_accounts.employee_id (UNIQUE)</code>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-900 text-sm">payroll_records ↔ salary_slips</h4>
                <p className="text-xs text-purple-800">Each payroll record has one detailed slip</p>
                <code className="text-xs text-purple-700">payroll_records.id ← salary_slips.payroll_id (UNIQUE)</code>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">One-to-Many Relationships</h3>
            <div className="space-y-3">
              <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-900 text-sm">employees → attendance_records</h4>
                <p className="text-xs text-orange-800">One employee, many attendance records</p>
                <code className="text-xs text-orange-700">employees.id ← attendance_records.employee_id</code>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-semibold text-teal-900 text-sm">employees → leave_requests</h4>
                <p className="text-xs text-teal-800">One employee, many leave requests</p>
                <code className="text-xs text-teal-700">employees.id ← leave_requests.employee_id</code>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-900 text-sm">employees → tasks (assigned)</h4>
                <p className="text-xs text-indigo-800">One employee assigned to many tasks</p>
                <code className="text-xs text-indigo-700">employees.id ← tasks.assigned_to_employee_id</code>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg border-l-4 border-pink-500">
                <h4 className="font-semibold text-pink-900 text-sm">leads → support_tickets</h4>
                <p className="text-xs text-pink-800">One customer, many support tickets</p>
                <code className="text-xs text-pink-700">leads.id ← support_tickets.customer_id</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Self-Referencing Relationships */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Self-Referencing Relationships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-3">Employee Hierarchy</h3>
            <p className="text-sm text-yellow-800 mb-3">
              The employees table has a self-referencing foreign key for organizational hierarchy.
            </p>
            <div className="bg-white p-3 rounded border border-yellow-200">
              <code className="text-sm text-gray-800">employees.manager_id → employees.id</code>
              <p className="text-xs text-gray-600 mt-1">Allows building organizational charts and reporting structures</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">Category Hierarchy</h3>
            <p className="text-sm text-blue-800 mb-3">
              Product categories can have parent-child relationships for nested categorization.
            </p>
            <div className="bg-white p-3 rounded border border-blue-200">
              <code className="text-sm text-gray-800">categories.parent_id → categories.id</code>
              <p className="text-xs text-gray-600 mt-1">Enables multi-level product categorization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Many-to-Many Relationships */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Many-to-Many Relationships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Role-Permission System</h3>
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-red-900 text-sm">users ↔ roles</h4>
                <p className="text-xs text-red-800">Junction table: user_role</p>
                <code className="text-xs text-red-700">users.id ↔ user_role ↔ roles.id</code>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="font-semibold text-orange-900 text-sm">roles ↔ permissions</h4>
                <p className="text-xs text-orange-800">Junction table: role_permission</p>
                <code className="text-xs text-orange-700">roles.id ↔ role_permission ↔ permissions.id</code>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Task Tagging System</h3>
            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-900 text-sm">tasks ↔ tags</h4>
                <p className="text-xs text-purple-800">Junction table: task_tags</p>
                <code className="text-xs text-purple-700">tasks.id ↔ task_tags ↔ tag_name</code>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <h4 className="font-semibold text-indigo-900 text-sm">Performance Reviews</h4>
                <p className="text-xs text-indigo-800">Separate tables for goals, achievements, improvements</p>
                <code className="text-xs text-indigo-700">performance_reviews.id → multiple related tables</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Relationship Mapping */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Complete Relationship Mapping</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent Table</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Child Table</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Relationship Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foreign Key</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-blue-600">users</td>
                <td className="px-6 py-4 text-sm font-mono">employees</td>
                <td className="px-6 py-4 text-sm">One-to-One</td>
                <td className="px-6 py-4 text-sm font-mono">user_id</td>
                <td className="px-6 py-4 text-sm">UNIQUE, ON DELETE SET NULL</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-blue-600">users</td>
                <td className="px-6 py-4 text-sm font-mono">user_sessions</td>
                <td className="px-6 py-4 text-sm">One-to-Many</td>
                <td className="px-6 py-4 text-sm font-mono">user_id</td>
                <td className="px-6 py-4 text-sm">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-purple-600">employees</td>
                <td className="px-6 py-4 text-sm font-mono">employees</td>
                <td className="px-6 py-4 text-sm">Self-Reference</td>
                <td className="px-6 py-4 text-sm font-mono">manager_id</td>
                <td className="px-6 py-4 text-sm">ON DELETE SET NULL</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-purple-600">employees</td>
                <td className="px-6 py-4 text-sm font-mono">bank_accounts</td>
                <td className="px-6 py-4 text-sm">One-to-One</td>
                <td className="px-6 py-4 text-sm font-mono">employee_id</td>
                <td className="px-6 py-4 text-sm">UNIQUE, ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-purple-600">employees</td>
                <td className="px-6 py-4 text-sm font-mono">attendance_records</td>
                <td className="px-6 py-4 text-sm">One-to-Many</td>
                <td className="px-6 py-4 text-sm font-mono">employee_id</td>
                <td className="px-6 py-4 text-sm">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-purple-600">employees</td>
                <td className="px-6 py-4 text-sm font-mono">leave_requests</td>
                <td className="px-6 py-4 text-sm">One-to-Many</td>
                <td className="px-6 py-4 text-sm font-mono">employee_id</td>
                <td className="px-6 py-4 text-sm">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-purple-600">employees</td>
                <td className="px-6 py-4 text-sm font-mono">payroll_records</td>
                <td className="px-6 py-4 text-sm">One-to-Many</td>
                <td className="px-6 py-4 text-sm font-mono">employee_id</td>
                <td className="px-6 py-4 text-sm">ON DELETE CASCADE</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-purple-600">employees</td>
                <td className="px-6 py-4 text-sm font-mono">tasks</td>
                <td className="px-6 py-4 text-sm">One-to-Many</td>
                <td className="px-6 py-4 text-sm font-mono">assigned_to_employee_id</td>
                <td className="px-6 py-4 text-sm">ON DELETE SET NULL</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-green-600">leads</td>
                <td className="px-6 py-4 text-sm font-mono">support_tickets</td>
                <td className="px-6 py-4 text-sm">One-to-Many</td>
                <td className="px-6 py-4 text-sm font-mono">customer_id</td>
                <td className="px-6 py-4 text-sm">ON DELETE SET NULL</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-mono text-green-600">leads</td>
                <td className="px-6 py-4 text-sm font-mono">lead_activities</td>
                <td className="px-6 py-4 text-sm">One-to-Many</td>
                <td className="px-6 py-4 text-sm font-mono">lead_id</td>
                <td className="px-6 py-4 text-sm">ON DELETE CASCADE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Database Design Patterns */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Database Design Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Audit Trail Pattern</h3>
            <p className="text-sm text-blue-800 mb-3">Every table includes audit fields</p>
            <div className="bg-white p-3 rounded border border-blue-200">
              <code className="text-xs text-gray-800">
                created_at TIMESTAMP DEFAULT NOW()<br/>
                updated_at TIMESTAMP DEFAULT NOW()
              </code>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Soft Delete Pattern</h3>
            <p className="text-sm text-green-800 mb-3">Logical deletion for data integrity</p>
            <div className="bg-white p-3 rounded border border-green-200">
              <code className="text-xs text-gray-800">
                is_active BOOLEAN DEFAULT TRUE<br/>
                deleted_at TIMESTAMP NULL
              </code>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">JSONB Storage Pattern</h3>
            <p className="text-sm text-purple-800 mb-3">Flexible data storage for complex objects</p>
            <div className="bg-white p-3 rounded border border-purple-200">
              <code className="text-xs text-gray-800">
                personal_details JSONB<br/>
                bank_account JSONB<br/>
                metadata JSONB
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Visual ERD Representation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Visual Entity Relationship Diagram</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-6">
            <GitBranch className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">BIDUA ERP Database Schema</h3>
            <p className="text-sm text-gray-600">Simplified visual representation of key relationships</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Core Authentication */}
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3 text-center">Authentication Core</h4>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded border text-center">
                  <strong className="text-sm">users</strong>
                  <div className="text-xs text-gray-600">id, username, email, role</div>
                </div>
                <div className="text-center">↓ (1:1)</div>
                <div className="bg-white p-2 rounded border text-center">
                  <strong className="text-sm">employees</strong>
                  <div className="text-xs text-gray-600">employee_id, name, department</div>
                </div>
              </div>
            </div>

            {/* CRM Flow */}
            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3 text-center">CRM Flow</h4>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded border text-center">
                  <strong className="text-sm">leads</strong>
                  <div className="text-xs text-gray-600">name, company, status, stage</div>
                </div>
                <div className="text-center">↓ (1:M)</div>
                <div className="bg-white p-2 rounded border text-center">
                  <strong className="text-sm">support_tickets</strong>
                  <div className="text-xs text-gray-600">title, priority, status</div>
                </div>
                <div className="text-center">↓ (1:M)</div>
                <div className="bg-white p-2 rounded border text-center">
                  <strong className="text-sm">ticket_comments</strong>
                  <div className="text-xs text-gray-600">content, author</div>
                </div>
              </div>
            </div>

            {/* HRMS Flow */}
            <div className="bg-purple-100 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-3 text-center">HRMS Flow</h4>
              <div className="space-y-2">
                <div className="bg-white p-2 rounded border text-center">
                  <strong className="text-sm">employees</strong>
                  <div className="text-xs text-gray-600">Central hub</div>
                </div>
                <div className="text-center">↓ (1:M)</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-white p-1 rounded border text-center">
                    <strong className="text-xs">attendance</strong>
                  </div>
                  <div className="bg-white p-1 rounded border text-center">
                    <strong className="text-xs">leaves</strong>
                  </div>
                  <div className="bg-white p-1 rounded border text-center">
                    <strong className="text-xs">payroll</strong>
                  </div>
                  <div className="bg-white p-1 rounded border text-center">
                    <strong className="text-xs">tasks</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseRelationships;