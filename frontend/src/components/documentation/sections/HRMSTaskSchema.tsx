import React from 'react';
import { Database, CheckSquare, Users, MessageSquare, Clock, Target } from 'lucide-react';

const HRMSTaskSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Task Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Advanced task management database schema with collaboration features, project tracking, 
          time management, and performance analytics integration.
        </p>
      </div>

      {/* Tasks Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <CheckSquare className="w-5 h-5 mr-2" />
            tasks - Task Management and Tracking
          </h3>
          <p className="text-sm text-blue-700 mt-1">Primary table for task assignment, tracking, and collaboration</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique task identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">title</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Task title</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">description</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Detailed task description</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">assigned_to_employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Assigned employee</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">assigned_by_employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Task creator/assigner</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">project_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES projects(id)</td><td className="px-6 py-4 text-sm">Associated project</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">customer_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES leads(id)</td><td className="px-6 py-4 text-sm">Related customer/lead</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">priority</td><td className="px-6 py-4 text-sm">task_priority</td><td className="px-6 py-4 text-sm">DEFAULT 'medium'</td><td className="px-6 py-4 text-sm">low, medium, high, urgent</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">task_status</td><td className="px-6 py-4 text-sm">DEFAULT 'pending'</td><td className="px-6 py-4 text-sm">pending, in-progress, completed, cancelled</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">progress</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">DEFAULT 0, CHECK (progress &gt;= 0 AND progress &lt;= 100)</td><td className="px-6 py-4 text-sm">Completion percentage</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">estimated_hours</td><td className="px-6 py-4 text-sm">NUMERIC(6,2)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Estimated effort in hours</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">actual_hours</td><td className="px-6 py-4 text-sm">NUMERIC(6,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Actual time spent</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">start_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Task start date</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">due_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Task due date</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">completed_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Completion timestamp</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">tags</td><td className="px-6 py-4 text-sm">TEXT[]</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Task tags for categorization</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Comments Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            task_comments - Task Collaboration and Updates
          </h3>
          <p className="text-sm text-green-700 mt-1">Communication thread for task updates, work reports, and collaboration</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Comment identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">task_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES tasks(id)</td><td className="px-6 py-4 text-sm">Associated task</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">author_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Comment author</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">content</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Comment content</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">comment_type</td><td className="px-6 py-4 text-sm">comment_type</td><td className="px-6 py-4 text-sm">DEFAULT 'comment'</td><td className="px-6 py-4 text-sm">comment, work-report, status-change</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">metadata</td><td className="px-6 py-4 text-sm">JSONB</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Additional data (hours, progress, etc.)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">attachments</td><td className="px-6 py-4 text-sm">JSONB</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">File attachments metadata</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Comment creation time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Dependencies */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Task Dependencies & Project Management</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    manager_id UUID REFERENCES employees(id),
    start_date DATE,
    end_date DATE,
    status project_status DEFAULT 'active',
    budget NUMERIC(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task dependencies table
CREATE TABLE task_dependencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    depends_on_task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    dependency_type dependency_type DEFAULT 'finish-to-start',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(task_id, depends_on_task_id),
    CHECK (task_id != depends_on_task_id)
);

-- Time tracking table
CREATE TABLE task_time_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    description TEXT,
    billable BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task templates table
CREATE TABLE task_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_hours NUMERIC(6,2),
    default_priority task_priority DEFAULT 'medium',
    checklist JSONB,
    tags TEXT[],
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
        </pre>
      </div>
    </div>
  );
};

export default HRMSTaskSchema;