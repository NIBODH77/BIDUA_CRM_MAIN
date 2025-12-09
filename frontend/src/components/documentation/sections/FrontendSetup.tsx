import React from 'react';
import { Monitor, Code, Zap, Package, Settings, GitBranch } from 'lucide-react';

const FrontendSetup: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Frontend Setup (React + TypeScript)</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete guide to set up the React frontend with TypeScript, Tailwind CSS, and integration with FastAPI backend.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Prerequisites
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Required Software</h4>
            <ul className="text-blue-800 space-y-2">
              <li>• <strong>Node.js 18+</strong> - JavaScript runtime</li>
              <li>• <strong>npm 9+</strong> - Package manager</li>
              <li>• <strong>Git</strong> - Version control</li>
              <li>• <strong>VS Code</strong> - Recommended IDE</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">VS Code Extensions</h4>
            <ul className="text-blue-800 space-y-2">
              <li>• ES7+ React/Redux/React-Native snippets</li>
              <li>• TypeScript Importer</li>
              <li>• Tailwind CSS IntelliSense</li>
              <li>• Prettier - Code formatter</li>
              <li>• ESLint</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Project Initialization */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          1. Project Initialization
        </h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Create new React project with Vite and TypeScript
npm create vite@latest bidua-erp-frontend -- --template react-ts

# Navigate to project directory
cd bidua-erp-frontend

# Install base dependencies
npm install

# Install additional required packages
npm install react-router-dom@latest lucide-react@latest uuid@latest
npm install @types/uuid@latest

# Install development dependencies
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npm install -D @types/node eslint-plugin-react-hooks@latest

# Initialize Tailwind CSS
npx tailwindcss init -p`}
        </pre>
      </div>

      {/* Project Structure */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GitBranch className="w-5 h-5 mr-2" />
          2. Project Structure
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Directory Structure</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── layout/
│   │   └── Sidebar.tsx
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   ├── crm/
│   │   ├── CRMModule.tsx
│   │   ├── LeadsManagement.tsx
│   │   ├── SalesPipeline.tsx
│   │   ├── CustomerSupport.tsx
│   │   └── CRMAnalytics.tsx
│   ├── hrms/
│   │   ├── HRMSModule.tsx
│   │   ├── EmployeeManagement.tsx
│   │   ├── AttendanceManagement.tsx
│   │   ├── LeaveManagement.tsx
│   │   ├── PayrollManagement.tsx
│   │   ├── PerformanceManagement.tsx
│   │   └── TaskManagement.tsx
│   ├── employee/
│   │   ├── EmployeePortal.tsx
│   │   ├── EmployeeDashboard.tsx
│   │   ├── EmployeeAttendance.tsx
│   │   ├── EmployeeLeaves.tsx
│   │   ├── EmployeeSalary.tsx
│   │   ├── EmployeeDocuments.tsx
│   │   └── EmployeeTaskView.tsx
│   ├── reports/
│   │   └── ReportsModule.tsx
│   ├── settings/
│   │   └── SettingsModule.tsx
│   ├── documentation/
│   │   ├── DocumentationPortal.tsx
│   │   ├── sections/
│   │   ├── components/
│   │   └── utils/
│   └── common/
│       ├── Modal.tsx
│       ├── LoadingSpinner.tsx
│       ├── NotificationToast.tsx
│       └── TaskDetailModal.tsx`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Supporting Files</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`src/
├── types/
│   └── index.ts          # TypeScript interfaces
├── data/
│   └── mockData.ts       # Development mock data
├── services/
│   ├── api.ts           # API service layer
│   ├── auth.ts          # Authentication service
│   └── storage.ts       # Local storage utilities
├── hooks/
│   ├── useAuth.ts       # Authentication hook
│   ├── useApi.ts        # API interaction hook
│   └── useLocalStorage.ts
├── utils/
│   ├── constants.ts     # Application constants
│   ├── helpers.ts       # Utility functions
│   ├── formatters.ts    # Data formatting
│   └── validators.ts    # Form validation
├── styles/
│   └── globals.css      # Global styles
├── assets/
│   ├── images/
│   └── icons/
├── App.tsx              # Main application
├── main.tsx            # Application entry point
└── vite-env.d.ts       # Vite type definitions`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Files */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          3. Configuration Files
        </h3>
        
        <div className="space-y-6">
          {/* Tailwind Config */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Tailwind CSS Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
};`}
            </pre>
          </div>

          {/* TypeScript Config */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">TypeScript Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/types/*": ["./src/types/*"],
      "@/services/*": ["./src/services/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`}
            </pre>
          </div>

          {/* Vite Config */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Vite Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/services': path.resolve(__dirname, './src/services'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});`}
            </pre>
          </div>
        </div>
      </div>

      {/* Environment Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibent text-gray-900 mb-4">4. Environment Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Development Environment</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# .env.development
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=BIDUA ERP
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
VITE_DEBUG=true

# Optional: Mock data flag
VITE_USE_MOCK_DATA=false`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Production Environment</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# .env.production
VITE_API_BASE_URL=https://api.bidua.com
VITE_APP_NAME=BIDUA ERP
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
VITE_DEBUG=false

# Security settings
VITE_SECURE_COOKIES=true
VITE_ENABLE_ANALYTICS=true`}
            </pre>
          </div>
        </div>
      </div>

      {/* Component Integration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">5. Component Integration with FastAPI</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Data Fetching Pattern</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Example: Employee Management Component
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Employee } from '../types';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await apiService.getEmployees();
        setEmployees(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    try {
      const response = await apiService.createEmployee(employeeData);
      setEmployees(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create employee');
    }
  };

  const handleUpdateEmployee = async (id: string, employeeData: Partial<Employee>) => {
    try {
      const response = await apiService.updateEmployee(id, employeeData);
      setEmployees(prev => prev.map(emp => 
        emp.id === id ? { ...emp, ...response.data } : emp
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employee');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Form Handling with Validation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Example: Employee Form Component
import React, { useState } from 'react';
import { Employee } from '../types';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: Omit<Employee, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    department: employee?.department || '',
    designation: employee?.designation || '',
    salary: employee?.salary || 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (formData.salary <= 0) newErrors.salary = 'Salary must be greater than 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields with error handling */}
    </form>
  );
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Development Workflow */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">6. Development Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Development Commands</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Install new dependency
npm install package-name

# Install dev dependency
npm install -D package-name`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Package.json Scripts</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "format": "prettier --write src/**/*.{ts,tsx}",
    "analyze": "npx vite-bundle-analyzer"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendSetup;