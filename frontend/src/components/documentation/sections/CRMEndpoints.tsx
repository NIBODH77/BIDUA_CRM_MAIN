import React from 'react';
import { Users, TrendingUp, Headphones, Mail, Phone, Building } from 'lucide-react';

const CRMEndpoints: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">CRM Endpoints</h1>
        <p className="text-lg text-gray-600 mb-6">
          Advanced FastAPI CRM system with lead management, sales pipeline tracking, 
          customer support, analytics capabilities, and marketing automation integration.
        </p>
      </div>

      {/* CRM Endpoints Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          CRM Endpoints Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Lead Management</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• CRUD operations for leads</li>
              <li>• Lead scoring and qualification</li>
              <li>• Pipeline stage management</li>
              <li>• Activity tracking</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Customer Support</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Support ticket management</li>
              <li>• Priority and status tracking</li>
              <li>• Agent assignment</li>
              <li>• Resolution workflows</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Analytics & Reports</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Sales pipeline analytics</li>
              <li>• Conversion rate tracking</li>
              <li>• Performance metrics</li>
              <li>• Custom reports</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lead Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Management Endpoints</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">GET /api/leads - List Leads</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GET /api/leads?page=1&limit=20&status=hot&stage=negotiation&assigned_to=emp123
Authorization: Bearer <token>

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20)
- status: Filter by lead status (hot, warm, cold)
- stage: Filter by pipeline stage
- assigned_to: Filter by assigned employee ID
- source: Filter by lead source
- value_min: Minimum deal value
- value_max: Maximum deal value
- created_after: Filter by creation date
- search: Search in name, company, email

Response (200 OK):
{
  "leads": [
    {
      "id": "lead-uuid-123",
      "name": "Rajesh Kumar",
      "email": "rajesh@techcorp.com",
      "phone": "+91 98765 43210",
      "company": "TechCorp Solutions",
      "status": "hot",
      "stage": "negotiation",
      "value": 500000,
      "source": "Website",
      "assigned_to": {
        "id": "emp-uuid-456",
        "name": "Priya Sharma",
        "email": "priya@bidua.com"
      },
      "last_contact": "2025-01-10",
      "next_follow_up": "2025-01-15",
      "lead_score": 85,
      "created_at": "2024-12-15T10:00:00Z",
      "updated_at": "2025-01-10T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">POST /api/leads - Create Lead</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/leads
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Anita Desai",
  "email": "anita@beautyworld.com",
  "phone": "+91 87654 32109",
  "company": "Beauty World Retail",
  "status": "warm",
  "stage": "lead",
  "value": 250000,
  "source": "Referral",
  "assigned_to_employee_id": "emp-uuid-456",
  "notes": "Interested in bulk skincare products",
  "custom_fields": {
    "industry": "Retail",
    "company_size": "50-100",
    "budget_timeline": "Q1 2025"
  }
}

Response (201 Created):
{
  "id": "lead-uuid-789",
  "name": "Anita Desai",
  "email": "anita@beautyworld.com",
  "company": "Beauty World Retail",
  "status": "warm",
  "stage": "lead",
  "value": 250000,
  "lead_score": 65,
  "created_at": "2025-01-15T10:30:00Z"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Support Ticket Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Ticket Endpoints</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">POST /api/support-tickets - Create Support Ticket</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/support-tickets
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Product Quality Issue - Face Cream",
  "description": "Customer reported skin irritation after using premium face cream",
  "customer_id": "lead-uuid-123",
  "priority": "high",
  "category": "Quality",
  "subcategory": "Product Defect",
  "assigned_to_employee_id": "emp-uuid-789",
  "attachments": [
    {
      "filename": "customer_complaint.pdf",
      "file_url": "/uploads/complaints/customer_complaint.pdf",
      "file_size": 245760
    }
  ]
}

Response (201 Created):
{
  "id": "ticket-uuid-456",
  "ticket_number": "TKT20250115001",
  "title": "Product Quality Issue - Face Cream",
  "status": "open",
  "priority": "high",
  "created_at": "2025-01-15T10:30:00Z",
  "estimated_resolution": "2025-01-17T10:30:00Z"
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">PUT /api/support-tickets/&#123;ticket_id&#125;/status - Update Ticket Status</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`PUT /api/support-tickets/ticket-uuid-456/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "resolved",
  "resolution": "Replaced product and provided refund. Updated quality control process.",
  "internal_notes": "QC team notified about batch issue",
  "customer_satisfaction_rating": 4
}

Response (200 OK):
{
  "id": "ticket-uuid-456",
  "status": "resolved",
  "resolved_at": "2025-01-16T15:45:00Z",
  "resolution_time_hours": 29.25,
  "customer_notified": true
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Analytics Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CRM Analytics Endpoints</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">GET /api/crm/analytics/pipeline - Sales Pipeline Analytics</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GET /api/crm/analytics/pipeline?period=Q1_2025&department=Sales
Authorization: Bearer <token>

Response (200 OK):
{
  "pipeline_summary": {
    "total_leads": 150,
    "total_value": 15000000,
    "average_deal_size": 100000,
    "conversion_rate": 23.5,
    "average_sales_cycle_days": 45
  },
  "stage_breakdown": [
    {
      "stage": "lead",
      "count": 45,
      "value": 4500000,
      "percentage": 30
    },
    {
      "stage": "qualified",
      "count": 35,
      "value": 3500000,
      "percentage": 23.3
    },
    {
      "stage": "proposal",
      "count": 25,
      "value": 2500000,
      "percentage": 16.7
    },
    {
      "stage": "negotiation",
      "count": 20,
      "value": 2000000,
      "percentage": 13.3
    },
    {
      "stage": "closed-won",
      "count": 15,
      "value": 1500000,
      "percentage": 10
    },
    {
      "stage": "closed-lost",
      "count": 10,
      "value": 1000000,
      "percentage": 6.7
    }
  ],
  "trends": {
    "leads_created_this_month": 25,
    "deals_closed_this_month": 8,
    "revenue_this_month": 800000,
    "month_over_month_growth": 12.5
  }
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">GET /api/crm/analytics/performance - Sales Team Performance</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`GET /api/crm/analytics/performance?period=monthly&employee_id=emp-uuid-456
Authorization: Bearer <token>

Response (200 OK):
{
  "team_performance": [
    {
      "employee": {
        "id": "emp-uuid-456",
        "name": "Priya Sharma",
        "designation": "Sales Manager"
      },
      "metrics": {
        "leads_assigned": 25,
        "leads_converted": 8,
        "conversion_rate": 32.0,
        "total_revenue": 800000,
        "average_deal_size": 100000,
        "activities_logged": 45,
        "response_time_hours": 2.5
      },
      "targets": {
        "monthly_revenue_target": 1000000,
        "target_achievement": 80.0,
        "leads_target": 30,
        "conversion_target": 25.0
      }
    }
  ],
  "department_summary": {
    "total_revenue": 2500000,
    "total_leads": 100,
    "team_conversion_rate": 28.5,
    "target_achievement": 85.2
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMEndpoints;