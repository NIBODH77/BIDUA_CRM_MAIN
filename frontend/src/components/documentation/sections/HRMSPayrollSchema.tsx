import React from 'react';
import { Database, DollarSign, FileText, Calculator, TrendingUp } from 'lucide-react';

const HRMSPayrollSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Payroll Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive payroll management schema including salary processing, detailed breakdowns, 
          and salary slip generation.
        </p>
      </div>

      {/* Payroll Records Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            payroll_records - Monthly Payroll Processing
          </h3>
          <p className="text-sm text-green-700 mt-1">Main payroll table for monthly salary processing and tracking</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique payroll record identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">NOT NULL, FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee for whom payroll is generated</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">month</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Month of payroll (e.g., December)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">year</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Year of payroll</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">basic_salary</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Basic salary for the month</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">allowances</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Total allowances</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">deductions</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Total deductions</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">overtime</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Overtime pay</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">bonus</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Performance or festival bonus</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">gross_salary</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Calculated gross salary</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">net_salary</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Final net salary paid</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">payroll_status</td><td className="px-6 py-4 text-sm">DEFAULT 'draft'</td><td className="px-6 py-4 text-sm">draft, processed, paid</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">pay_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Date of payment</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">processed_by</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES users(id)</td><td className="px-6 py-4 text-sm">User who processed payroll</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Record creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Slips Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            salary_slips - Detailed Payroll Breakdown
          </h3>
          <p className="text-sm text-blue-700 mt-1">Detailed salary slip with component-wise breakdown for transparency</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Salary slip identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">payroll_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">NOT NULL, UNIQUE, FOREIGN KEY</td><td className="px-6 py-4 text-sm">Link to main payroll record</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">NOT NULL, FOREIGN KEY</td><td className="px-6 py-4 text-sm">Employee for whom slip is generated</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">month</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Month of salary slip</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">year</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Year of salary slip</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">basic_salary</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Basic salary component</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">hra</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">House Rent Allowance</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">transport</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Transport Allowance</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">medical</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Medical Allowance</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">other_allowances</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Other allowances</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">pf</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Provident Fund deduction</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">esi</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Employee State Insurance</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">tax</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Income tax deduction</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">other_deductions</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Other deductions</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">overtime</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL, DEFAULT 0</td><td className="px-6 py-4 text-sm">Overtime pay</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">gross_salary</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Calculated gross salary</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">net_salary</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Final net salary</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">generated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Slip generation timestamp</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payroll Components Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-purple-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            payroll_components - Salary Component Master
          </h3>
          <p className="text-sm text-purple-700 mt-1">Master table for defining salary components (allowances and deductions)</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Component identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">name</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL, UNIQUE</td><td className="px-6 py-4 text-sm">Component name (HRA, PF, etc.)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">type</td><td className="px-6 py-4 text-sm">component_type</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">allowance, deduction</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">calculation_type</td><td className="px-6 py-4 text-sm">calculation_type</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">fixed, percentage, formula</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">value</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Fixed amount or percentage</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">formula</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Calculation formula</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_taxable</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT FALSE</td><td className="px-6 py-4 text-sm">Whether component is taxable</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_active</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">Component status</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Salary Components Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-orange-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-orange-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            employee_salary_components - Individual Component Mapping
          </h3>
          <p className="text-sm text-orange-700 mt-1">Maps salary components to individual employees with custom values</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Mapping identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee reference</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">component_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES payroll_components(id)</td><td className="px-6 py-4 text-sm">Component reference</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">custom_value</td><td className="px-6 py-4 text-sm">NUMERIC(10,2)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Employee-specific value override</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">effective_from</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Effective start date</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">effective_to</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Effective end date</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_active</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">Component status for employee</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete SQL Schema */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Complete Payroll Schema SQL</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create payroll-related enums
CREATE TYPE payroll_status AS ENUM ('draft', 'processed', 'paid', 'cancelled');
CREATE TYPE component_type AS ENUM ('allowance', 'deduction');
CREATE TYPE calculation_type AS ENUM ('fixed', 'percentage', 'formula');

-- Payroll components master table
CREATE TABLE payroll_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    type component_type NOT NULL,
    calculation_type calculation_type NOT NULL,
    value NUMERIC(10,2),
    formula TEXT,
    is_taxable BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee salary components mapping
CREATE TABLE employee_salary_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    component_id UUID NOT NULL REFERENCES payroll_components(id) ON DELETE CASCADE,
    custom_value NUMERIC(10,2),
    effective_from DATE NOT NULL,
    effective_to DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, component_id, effective_from)
);

-- Payroll records table
CREATE TABLE payroll_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    basic_salary NUMERIC(10,2) NOT NULL,
    allowances NUMERIC(10,2) NOT NULL DEFAULT 0,
    deductions NUMERIC(10,2) NOT NULL DEFAULT 0,
    overtime NUMERIC(10,2) NOT NULL DEFAULT 0,
    bonus NUMERIC(10,2) DEFAULT 0,
    gross_salary NUMERIC(10,2) NOT NULL,
    net_salary NUMERIC(10,2) NOT NULL,
    status payroll_status DEFAULT 'draft',
    pay_date DATE,
    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, month, year)
);

-- Detailed salary slips table
CREATE TABLE salary_slips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payroll_id UUID NOT NULL UNIQUE REFERENCES payroll_records(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    basic_salary NUMERIC(10,2) NOT NULL,
    hra NUMERIC(10,2) NOT NULL DEFAULT 0,
    transport NUMERIC(10,2) NOT NULL DEFAULT 0,
    medical NUMERIC(10,2) NOT NULL DEFAULT 0,
    other_allowances NUMERIC(10,2) NOT NULL DEFAULT 0,
    pf NUMERIC(10,2) NOT NULL DEFAULT 0,
    esi NUMERIC(10,2) NOT NULL DEFAULT 0,
    tax NUMERIC(10,2) NOT NULL DEFAULT 0,
    other_deductions NUMERIC(10,2) NOT NULL DEFAULT 0,
    overtime NUMERIC(10,2) NOT NULL DEFAULT 0,
    gross_salary NUMERIC(10,2) NOT NULL,
    net_salary NUMERIC(10,2) NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_payroll_employee_month ON payroll_records(employee_id, month, year);
CREATE INDEX idx_payroll_status ON payroll_records(status);
CREATE INDEX idx_payroll_pay_date ON payroll_records(pay_date);
CREATE INDEX idx_salary_slips_employee ON salary_slips(employee_id);
CREATE INDEX idx_employee_components_active ON employee_salary_components(employee_id, is_active);

-- Insert default payroll components
INSERT INTO payroll_components (name, type, calculation_type, value, is_taxable) VALUES
('Basic Salary', 'allowance', 'fixed', 0, TRUE),
('HRA', 'allowance', 'percentage', 40, TRUE),
('Transport Allowance', 'allowance', 'fixed', 1600, FALSE),
('Medical Allowance', 'allowance', 'fixed', 1250, FALSE),
('Provident Fund', 'deduction', 'percentage', 12, FALSE),
('ESI', 'deduction', 'percentage', 0.75, FALSE),
('Professional Tax', 'deduction', 'fixed', 200, FALSE);`}
        </pre>
      </div>

      {/* Payroll Calculation Logic */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payroll Calculation Logic</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Calculation Steps</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Fetch employee base salary</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Calculate allowances (HRA, Transport, etc.)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Add overtime and bonus payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Calculate gross salary</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Apply deductions (PF, ESI, Tax)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                <span>Calculate final net salary</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Calculation Formulas</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-900">Gross Salary</h4>
                <code className="text-xs text-green-800">Basic + HRA + Transport + Medical + Other Allowances + Overtime + Bonus</code>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900">HRA Calculation</h4>
                <code className="text-xs text-blue-800">Basic Salary × 40% (or city-specific rate)</code>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <h4 className="font-semibold text-red-900">PF Deduction</h4>
                <code className="text-xs text-red-800">Basic Salary × 12% (employee contribution)</code>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-900">Net Salary</h4>
                <code className="text-xs text-purple-800">Gross Salary - Total Deductions</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Processing Workflow */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payroll Processing Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-yellow-100 p-4 rounded-lg mb-2">
              <FileText className="w-8 h-8 text-yellow-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">1. Draft Creation</h4>
            <p className="text-xs text-gray-600">Generate draft payroll records</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-2">
              <Calculator className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">2. Calculation</h4>
            <p className="text-xs text-gray-600">Apply formulas and calculate amounts</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-lg mb-2">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">3. Processing</h4>
            <p className="text-xs text-gray-600">Review and approve payroll</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-lg mb-2">
              <DollarSign className="w-8 h-8 text-purple-600 mx-auto" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">4. Payment</h4>
            <p className="text-xs text-gray-600">Execute salary payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRMSPayrollSchema;