import React from 'react';
import { Database, BarChart3, Target, Award, TrendingUp, Star } from 'lucide-react';

const HRMSPerformanceSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Performance Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive performance evaluation database schema with KPI tracking, 360-degree feedback, 
          goal management, and career development planning.
        </p>
      </div>

      {/* Performance Reviews Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            performance_reviews - Employee Performance Evaluations
          </h3>
          <p className="text-sm text-blue-700 mt-1">Primary table for managing periodic performance reviews and evaluations</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique review identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">NOT NULL, FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee being reviewed</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">reviewer_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">NOT NULL, FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Reviewing manager</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">review_period</td><td className="px-6 py-4 text-sm">VARCHAR(50)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Review period (Q1 2025, Annual 2024)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">review_type</td><td className="px-6 py-4 text-sm">review_type</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">annual, quarterly, probation, promotion</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">overall_rating</td><td className="px-6 py-4 text-sm">NUMERIC(3,2)</td><td className="px-6 py-4 text-sm">CHECK (overall_rating &gt;= 1 AND overall_rating &lt;= 5)</td><td className="px-6 py-4 text-sm">Overall performance rating (1-5)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">manager_feedback</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Manager's detailed feedback</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_self_review</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Employee's self-assessment</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">review_status</td><td className="px-6 py-4 text-sm">DEFAULT 'draft'</td><td className="px-6 py-4 text-sm">draft, in-progress, completed, approved</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">review_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Date of review</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">next_review_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Scheduled next review date</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* KPIs Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            performance_kpis - Key Performance Indicators
          </h3>
          <p className="text-sm text-green-700 mt-1">Track specific KPIs and metrics for each performance review</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">KPI record identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">review_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES performance_reviews(id)</td><td className="px-6 py-4 text-sm">Associated review</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">kpi_name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">KPI name (Sales Target, Quality Score)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">target_value</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Target value to achieve</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">achieved_value</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Actual achieved value</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">unit</td><td className="px-6 py-4 text-sm">VARCHAR(50)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Unit of measurement (%, count, INR)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">weight</td><td className="px-6 py-4 text-sm">NUMERIC(5,2)</td><td className="px-6 py-4 text-sm">DEFAULT 1.0</td><td className="px-6 py-4 text-sm">KPI weight in overall rating</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">rating</td><td className="px-6 py-4 text-sm">NUMERIC(3,2)</td><td className="px-6 py-4 text-sm">CHECK (rating &gt;= 1 AND rating &lt;= 5)</td><td className="px-6 py-4 text-sm">Individual KPI rating</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Performance Schema */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Complete Performance Management Schema</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create performance-related enums
CREATE TYPE review_type AS ENUM ('annual', 'quarterly', 'probation', 'promotion', 'pip');
CREATE TYPE review_status AS ENUM ('draft', 'in-progress', 'completed', 'approved');
CREATE TYPE goal_status AS ENUM ('not-started', 'in-progress', 'completed', 'cancelled');

-- Performance goals table
CREATE TABLE performance_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    review_id UUID REFERENCES performance_reviews(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_date DATE,
    status goal_status DEFAULT 'not-started',
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance achievements table
CREATE TABLE performance_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID NOT NULL REFERENCES performance_reviews(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    impact_level achievement_impact DEFAULT 'medium',
    date_achieved DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Development areas table
CREATE TABLE development_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID NOT NULL REFERENCES performance_reviews(id) ON DELETE CASCADE,
    area VARCHAR(255) NOT NULL,
    description TEXT,
    improvement_plan TEXT,
    target_date DATE,
    status goal_status DEFAULT 'not-started',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 360-degree feedback table
CREATE TABLE feedback_360 (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID NOT NULL REFERENCES performance_reviews(id) ON DELETE CASCADE,
    feedback_provider_id UUID NOT NULL REFERENCES employees(id),
    feedback_type feedback_type NOT NULL,
    rating NUMERIC(3,2) CHECK (rating &gt;= 1 AND rating &lt;= 5),
    comments TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_performance_reviews_employee ON performance_reviews(employee_id);
CREATE INDEX idx_performance_reviews_period ON performance_reviews(review_period);
CREATE INDEX idx_performance_kpis_review ON performance_kpis(review_id);
CREATE INDEX idx_performance_goals_employee ON performance_goals(employee_id);
CREATE INDEX idx_feedback_360_review ON feedback_360(review_id);`}
        </pre>
      </div>
    </div>
  );
};

export default HRMSPerformanceSchema;