import React from 'react';
import { Database, Users, Headphones, TrendingUp, Mail, Phone } from 'lucide-react';

const CRMSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">CRM Database Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete database schema for Customer Relationship Management including leads, 
          customers, support tickets, and sales pipeline management.
        </p>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            leads - Sales Leads and Prospects
          </h3>
          <p className="text-sm text-blue-700 mt-1">Primary table for managing sales leads and tracking their progress through the sales pipeline</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique lead identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Lead's full name</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">email</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Lead's email address</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">phone</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Lead's phone number</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">company</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Lead's company name</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">lead_status</td><td className="px-6 py-4 text-sm">DEFAULT 'warm'</td><td className="px-6 py-4 text-sm">hot, warm, cold</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">stage</td><td className="px-6 py-4 text-sm">lead_stage</td><td className="px-6 py-4 text-sm">DEFAULT 'lead'</td><td className="px-6 py-4 text-sm">lead, qualified, proposal, negotiation, closed-won, closed-lost</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">value</td><td className="px-6 py-4 text-sm">NUMERIC(12,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Estimated deal value in INR</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">source</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">How the lead was acquired</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">assigned_to_employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee assigned to this lead</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">last_contact</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Date of last contact</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">next_follow_up</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Date of next follow-up</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">notes</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Additional notes and comments</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">lead_score</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Lead scoring (0-100)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Record creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Support Tickets Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-green-900 flex items-center">
            <Headphones className="w-5 h-5 mr-2" />
            support_tickets - Customer Support Management
          </h3>
          <p className="text-sm text-green-700 mt-1">Customer support ticket tracking and resolution management</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY, DEFAULT gen_random_uuid()</td><td className="px-6 py-4 text-sm">Unique ticket identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">ticket_number</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">Human-readable ticket number</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">title</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Ticket title/subject</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">description</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Detailed description of the issue</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">customer_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES leads(id)</td><td className="px-6 py-4 text-sm">Link to customer/lead record</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">customer_name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Customer name (denormalized)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">customer_email</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Customer email (denormalized)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">priority</td><td className="px-6 py-4 text-sm">ticket_priority</td><td className="px-6 py-4 text-sm">DEFAULT 'medium'</td><td className="px-6 py-4 text-sm">low, medium, high, urgent</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">ticket_status</td><td className="px-6 py-4 text-sm">DEFAULT 'open'</td><td className="px-6 py-4 text-sm">open, in-progress, resolved, closed</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">assigned_to_employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Assigned support agent</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">category</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Ticket category (Technical, Billing, etc.)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">subcategory</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Ticket subcategory</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">resolution</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Resolution details</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Ticket creation time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">resolved_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Resolution timestamp</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Activities Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-purple-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            lead_activities - Lead Interaction History
          </h3>
          <p className="text-sm text-purple-700 mt-1">Track all interactions and activities related to leads</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Activity identifier</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">lead_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES leads(id)</td><td className="px-6 py-4 text-sm">Associated lead</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES employees(id)</td><td className="px-6 py-4 text-sm">Employee who performed activity</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">activity_type</td><td className="px-6 py-4 text-sm">activity_type</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">call, email, meeting, note, status_change</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">subject</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Activity subject/title</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">description</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Detailed activity description</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">duration_minutes</td><td className="px-6 py-4 text-sm">INTEGER</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Activity duration (for calls/meetings)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">outcome</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Activity outcome</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">scheduled_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Scheduled activity time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">completed_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Activity completion time</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Record creation time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Comments Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-orange-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-orange-900 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            ticket_comments - Support Ticket Communication
          </h3>
          <p className="text-sm text-orange-700 mt-1">Communication thread for support tickets</p>
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
              <tr><td className="px-6 py-4 text-sm font-mono">ticket_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES support_tickets(id)</td><td className="px-6 py-4 text-sm">Associated ticket</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">author_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY REFERENCES users(id)</td><td className="px-6 py-4 text-sm">Comment author</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">content</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Comment content</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">is_internal</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT FALSE</td><td className="px-6 py-4 text-sm">Internal note (not visible to customer)</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">attachments</td><td className="px-6 py-4 text-sm">JSONB</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">File attachments metadata</td></tr>
              <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP WITH TIME ZONE</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Comment creation time</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete CRM Schema SQL */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Complete CRM Schema SQL</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create CRM-related enums
CREATE TYPE lead_status AS ENUM ('hot', 'warm', 'cold');
CREATE TYPE lead_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE ticket_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');
CREATE TYPE activity_type AS ENUM ('call', 'email', 'meeting', 'note', 'status_change');

-- Leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255) NOT NULL,
    status lead_status DEFAULT 'warm',
    stage lead_stage DEFAULT 'lead',
    value NUMERIC(12,2) DEFAULT 0,
    source VARCHAR(100),
    assigned_to_employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    last_contact DATE,
    next_follow_up DATE,
    notes TEXT,
    lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets table
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    customer_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    priority ticket_priority DEFAULT 'medium',
    status ticket_status DEFAULT 'open',
    assigned_to_employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    category VARCHAR(100),
    subcategory VARCHAR(100),
    resolution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead activities table
CREATE TABLE lead_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    activity_type activity_type NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER CHECK (duration_minutes > 0),
    outcome VARCHAR(100),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ticket comments table
CREATE TABLE ticket_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    attachments JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_company ON leads(company);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_stage ON leads(stage);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to_employee_id);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_next_follow_up ON leads(next_follow_up);

CREATE INDEX idx_tickets_number ON support_tickets(ticket_number);
CREATE INDEX idx_tickets_customer ON support_tickets(customer_id);
CREATE INDEX idx_tickets_status ON support_tickets(status);
CREATE INDEX idx_tickets_priority ON support_tickets(priority);
CREATE INDEX idx_tickets_assigned_to ON support_tickets(assigned_to_employee_id);
CREATE INDEX idx_tickets_created_at ON support_tickets(created_at);

CREATE INDEX idx_activities_lead ON lead_activities(lead_id);
CREATE INDEX idx_activities_employee ON lead_activities(employee_id);
CREATE INDEX idx_activities_type ON lead_activities(activity_type);
CREATE INDEX idx_activities_scheduled ON lead_activities(scheduled_at);

CREATE INDEX idx_comments_ticket ON ticket_comments(ticket_id);
CREATE INDEX idx_comments_author ON ticket_comments(author_id);

-- Trigger to auto-generate ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ticket_number := 'TKT' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('ticket_sequence')::TEXT, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE ticket_sequence START 1;
CREATE TRIGGER trigger_generate_ticket_number
    BEFORE INSERT ON support_tickets
    FOR EACH ROW
    EXECUTE FUNCTION generate_ticket_number();`}
        </pre>
      </div>

      {/* CRM Business Logic */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">CRM Business Logic & Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Lead Lifecycle</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Lead Creation (status: warm, stage: lead)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Lead Qualification (stage: qualified)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Proposal Submission (stage: proposal)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Negotiation Phase (stage: negotiation)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Deal Closure (stage: closed-won/closed-lost)</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Support Ticket Workflow</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Ticket Creation (status: open)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Assignment to Agent</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Investigation (status: in-progress)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Resolution Provided</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Ticket Closure (status: resolved/closed)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CRM Analytics & Reporting */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">CRM Analytics & Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Lead Metrics</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Lead conversion rate by source</li>
              <li>• Average deal size</li>
              <li>• Sales cycle length</li>
              <li>• Lead scoring effectiveness</li>
              <li>• Pipeline velocity</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Support Metrics</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Average resolution time</li>
              <li>• First response time</li>
              <li>• Customer satisfaction scores</li>
              <li>• Ticket volume by category</li>
              <li>• Agent performance metrics</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Sales Analytics</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Revenue forecasting</li>
              <li>• Win/loss analysis</li>
              <li>• Sales team performance</li>
              <li>• Customer lifetime value</li>
              <li>• Market segment analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMSchema;