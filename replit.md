# BIDUA ERP System

## Overview

BIDUA is a comprehensive Enterprise Resource Planning (ERP) system combining CRM (Customer Relationship Management) and HRMS (Human Resource Management System) functionality. The application features a React/TypeScript frontend with a FastAPI Python backend, designed for managing leads, support tickets, employees, attendance, leave requests, and various business operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **State Management**: React useState/useEffect hooks with prop drilling
- **Port**: 5000

The frontend is organized into modular components:
- `components/auth/` - Authentication (login forms)
- `components/crm/` - CRM module (leads, tickets, companies, deals, activities)
- `components/hrms/` - HRMS module (employees, attendance, leave)
- `components/dashboard/` - Dashboard views
- `components/common/` - Shared components (notifications, modals)
- `data/mockData.ts` - Static mock data for development
- `types/index.ts` - TypeScript type definitions

### Backend Architecture
- **Framework**: FastAPI with async/await support
- **ORM**: SQLAlchemy with async sessions
- **Database**: PostgreSQL (via asyncpg driver)
- **Migrations**: Alembic
- **Authentication**: JWT tokens with python-jose, password hashing with passlib/bcrypt
- **Validation**: Pydantic v2 with model_config
- **Package Manager**: uv
- **Port**: 8000

The backend follows a layered architecture:
- `app/api/v1/endpoints/` - Route handlers for each resource
- `app/crud/` - Database operations (CRUD classes)
- `app/models/` - SQLAlchemy ORM models
- `app/schemas/` - Pydantic schemas for request/response validation
- `app/core/` - Configuration, database connection, authentication utilities

### API Structure
RESTful API with versioned endpoints at `/api/v1/`:
- `/auth` - Authentication (login, token management)
- `/users` - User management
- `/products` - Product catalog
- `/companies` - Company management
- `/orders` - Sales orders
- `/employees` - Employee management
- `/crm/leads` - CRM lead management
- `/crm/tickets` - Support ticket management
- `/support/teams` - Support team management
- `/attendance-leave` - Attendance and leave tracking
- `/lead-chats` - Lead communication threads

### Database Design
PostgreSQL with the following key entities:
- Users, Roles, Permissions (RBAC)
- Employees, Attendance Records, Leave Requests
- Leads, Lead Activities, Support Tickets
- Companies, Products, Sales Orders
- Chat Threads, Chat Messages

Role-based access control with user roles: admin, manager, employee, sales_executive, documentation.

### Authentication Flow
- JWT-based authentication with access tokens
- HTTPBearer security scheme
- Role-based permission decorators for endpoint protection
- Session middleware for state management

## External Dependencies

### Frontend Dependencies
- **@supabase/supabase-js**: Supabase client (available but primary backend is FastAPI)
- **react-router-dom**: Client-side routing
- **lucide-react**: Icon library
- **uuid**: Unique ID generation

### Backend Dependencies
- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **sqlalchemy**: ORM with async support
- **asyncpg**: PostgreSQL async driver
- **alembic**: Database migrations
- **pydantic-settings**: Configuration management
- **python-jose**: JWT token handling
- **passlib/bcrypt**: Password hashing
- **redis**: Caching (configured but optional)
- **slowapi**: Rate limiting

### Database
- **PostgreSQL**: Primary database (connection string in settings.py)
- Database URL format: `postgresql+asyncpg://user:password@host:port/database`

### Development Tools
- **ESLint**: Code linting with TypeScript and React hooks plugins
- **TypeScript**: Static type checking
- **Vite**: Fast development server with HMR