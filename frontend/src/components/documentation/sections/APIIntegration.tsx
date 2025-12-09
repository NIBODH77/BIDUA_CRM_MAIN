import React from 'react';
import { Globe, Zap, Shield, Database, Code, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const APIIntegration: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">API Integration</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive guide for integrating React frontend with FastAPI backend, including error handling, 
          caching, real-time updates, authentication management, and performance optimization strategies.
        </p>
      </div>

      {/* Integration Architecture */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          API Integration Architecture
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Service Layer</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Centralized API communication</li>
              <li>• Request/response transformation</li>
              <li>• Error handling and retry logic</li>
              <li>• Authentication token management</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">State Management</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• React hooks for data fetching</li>
              <li>• Loading and error states</li>
              <li>• Optimistic updates</li>
              <li>• Cache invalidation</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Real-time Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• WebSocket connections</li>
              <li>• Server-sent events</li>
              <li>• Live notifications</li>
              <li>• Data synchronization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API Service Layer */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          API Service Layer Implementation
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Core API Service</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any[];
  timestamp: string;
  request_id: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  setTokens(accessToken: string, refreshToken?: string) {
    this.token = accessToken;
    localStorage.setItem('access_token', accessToken);
    
    if (refreshToken) {
      this.refreshToken = refreshToken;
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(\`\${this.baseURL}/api/auth/refresh\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: this.refreshToken }),
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    this.setTokens(data.access_token, data.refresh_token);
    return data.access_token;
  }

  private async processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = \`\${this.baseURL}/api\${endpoint}\`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = \`Bearer \${this.token}\`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle token refresh for 401 errors
      if (response.status === 401 && this.refreshToken && !this.isRefreshing) {
        if (this.isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then(() => {
            return this.request<T>(endpoint, options);
          });
        }

        this.isRefreshing = true;

        try {
          const newToken = await this.refreshAccessToken();
          this.processQueue(null, newToken);
          
          // Retry original request with new token
          headers.Authorization = \`Bearer \${newToken}\`;
          const retryResponse = await fetch(url, { ...options, headers });
          const retryData = await retryResponse.json();
          
          if (!retryResponse.ok) {
            throw new Error(retryData.error?.message || 'API request failed');
          }
          
          return { data: retryData, status: retryResponse.status };
        } catch (refreshError) {
          this.processQueue(refreshError, null);
          this.clearTokens();
          window.location.href = '/login';
          throw refreshError;
        } finally {
          this.isRefreshing = false;
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || data.detail || 'API request failed');
      }

      return {
        data,
        status: response.status,
        message: data.message,
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(username: string, password: string) {
    return this.request<{access_token: string, refresh_token: string, user: any}>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  // Employee methods
  async getEmployees(params?: {
    page?: number;
    limit?: number;
    department?: string;
    status?: string;
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    return this.request<{employees: any[], pagination: any}>(\`/employees\${queryString ? '?' + queryString : ''}\`);
  }

  async createEmployee(employee: any) {
    return this.request<any>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }

  async updateEmployee(id: string, employee: any) {
    return this.request<any>(\`/employees/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  }

  // Lead methods
  async getLeads(params?: any) {
    const searchParams = new URLSearchParams(params);
    return this.request<{leads: any[], pagination: any}>(\`/leads?\${searchParams.toString()}\`);
  }

  async createLead(lead: any) {
    return this.request<any>('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
  }

  async updateLead(id: string, lead: any) {
    return this.request<any>(\`/leads/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(lead),
    });
  }

  // Attendance methods
  async markAttendance(attendance: any) {
    return this.request<any>('/attendance/clock-in', {
      method: 'POST',
      body: JSON.stringify(attendance),
    });
  }

  async getAttendance(params?: {
    employee_id?: string;
    date_from?: string;
    date_to?: string;
    status?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value);
        }
      });
    }
    
    return this.request<{attendance: any[], summary: any}>(\`/attendance/records?\${searchParams.toString()}\`);
  }

  // Task methods
  async getTasks(params?: any) {
    const searchParams = new URLSearchParams(params);
    return this.request<{tasks: any[], pagination: any}>(\`/tasks?\${searchParams.toString()}\`);
  }

  async createTask(task: any) {
    return this.request<any>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: string, task: any) {
    return this.request<any>(\`/tasks/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
  }

  // File upload method
  async uploadFile(file: File, metadata: any) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(metadata).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = \`Bearer \${this.token}\`;
    }

    const response = await fetch(\`\${this.baseURL}/api/files/upload\`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'File upload failed');
    }

    return response.json();
  }
}

export const apiService = new ApiService();`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Authentication Hook</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/hooks/useAuth.ts
import { useState, useEffect, createContext, useContext } from 'react';
import { apiService } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await apiService.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          apiService.clearTokens();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.login(username, password);
      const { access_token, refresh_token, user: userData } = response.data;
      
      apiService.setTokens(access_token, refresh_token);
      setUser(userData);
      
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiService.logout().catch(console.error);
    setUser(null);
    setError(null);
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role || user?.role === 'admin';
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.includes(permission) || user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      error, 
      isAuthenticated: !!user,
      hasRole,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Data Fetching Patterns */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Fetching Patterns</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Custom Data Fetching Hook</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/hooks/useApi.ts
import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

interface UseApiOptions {
  immediate?: boolean;
  dependencies?: any[];
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useApi = <T>(
  apiCall: () => Promise<any>,
  options: UseApiOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall();
      setData(response.data);
      options.onSuccess?.(response.data);
      
      return response.data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [apiCall, options]);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, options.dependencies || []);

  const refetch = useCallback(() => execute(), [execute]);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
  };
};

// Specialized hooks for different data types
export const useEmployees = (filters?: any) => {
  return useApi(
    () => apiService.getEmployees(filters),
    { dependencies: [filters] }
  );
};

export const useLeads = (filters?: any) => {
  return useApi(
    () => apiService.getLeads(filters),
    { dependencies: [filters] }
  );
};

export const useAttendance = (params?: any) => {
  return useApi(
    () => apiService.getAttendance(params),
    { dependencies: [params] }
  );
};

// Mutation hook for data updates
export const useMutation = <T, P>(
  mutationFn: (params: P) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (params: P) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await mutationFn(params);
      options?.onSuccess?.(result);
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Mutation failed');
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [mutationFn, options]);

  return {
    mutate,
    loading,
    error,
  };
};`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Component Integration Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Example: Employee Management Component with API Integration
import React, { useState } from 'react';
import { useEmployees, useMutation } from '../hooks/useApi';
import { apiService } from '../services/api';
import { Employee } from '../types';

const EmployeeManagement: React.FC = () => {
  const [filters, setFilters] = useState({ department: '', status: 'active' });
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Fetch employees with automatic loading states
  const { 
    data: employeesData, 
    loading: employeesLoading, 
    error: employeesError,
    refetch: refetchEmployees 
  } = useEmployees(filters);

  // Create employee mutation
  const createEmployeeMutation = useMutation(
    (employeeData: Omit<Employee, 'id'>) => apiService.createEmployee(employeeData),
    {
      onSuccess: (newEmployee) => {
        console.log('Employee created:', newEmployee);
        refetchEmployees(); // Refresh the list
        setSelectedEmployee(null);
      },
      onError: (error) => {
        console.error('Failed to create employee:', error);
      }
    }
  );

  // Update employee mutation
  const updateEmployeeMutation = useMutation(
    ({ id, data }: { id: string; data: Partial<Employee> }) => 
      apiService.updateEmployee(id, data),
    {
      onSuccess: () => {
        refetchEmployees();
        setSelectedEmployee(null);
      }
    }
  );

  const handleCreateEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    try {
      await createEmployeeMutation.mutate(employeeData);
    } catch (error) {
      // Error is already handled by the mutation
    }
  };

  const handleUpdateEmployee = async (id: string, employeeData: Partial<Employee>) => {
    try {
      await updateEmployeeMutation.mutate({ id, data: employeeData });
    } catch (error) {
      // Error is already handled by the mutation
    }
  };

  if (employeesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2">Loading employees...</span>
      </div>
    );
  }

  if (employeesError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800">Error loading employees: {employeesError.message}</span>
        </div>
        <button 
          onClick={refetchEmployees}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.department}
            onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button
            onClick={() => handleCreateEmployee({})}
            disabled={createEmployeeMutation.loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {createEmployeeMutation.loading ? 'Creating...' : 'Add Employee'}
          </button>
        </div>
      </div>

      {/* Employee list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employeesData?.employees?.map((employee: Employee) => (
          <div key={employee.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-600">{employee.designation}</p>
            <p className="text-sm text-gray-500">{employee.department}</p>
            
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setSelectedEmployee(employee)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleUpdateEmployee(employee.id, { status: 'inactive' })}
                disabled={updateEmployeeMutation.loading}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
              >
                Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Error Handling Strategies */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Advanced Error Handling
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Error Boundary for API Failures</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/components/common/ApiErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

class ApiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
    
    // Log to monitoring service
    console.error('API Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
          <p className="text-red-700 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center space-x-2 mx-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ApiErrorBoundary;`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Retry Logic with Exponential Backoff</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/utils/retryLogic.ts
interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  retryCondition?: (error: any) => boolean;
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    retryCondition = (error) => error.status >= 500 || error.code === 'NETWORK_ERROR'
  } = options;

  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on the last attempt or if retry condition fails
      if (attempt === maxAttempts || !retryCondition(error)) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        baseDelay * Math.pow(backoffFactor, attempt - 1),
        maxDelay
      );

      console.warn(\`API call failed (attempt \${attempt}/\${maxAttempts}), retrying in \${delay}ms...\`, error);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

// Enhanced API service with retry logic
class EnhancedApiService extends ApiService {
  async requestWithRetry<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    return withRetry(
      () => this.request<T>(endpoint, options),
      {
        maxAttempts: 3,
        retryCondition: (error) => {
          // Retry on network errors and 5xx server errors
          return error.message.includes('fetch') || 
                 error.message.includes('network') ||
                 (error.status >= 500 && error.status < 600);
        }
      }
    );
  }

  // Override methods to use retry logic
  async getEmployees(params?: any) {
    const searchParams = new URLSearchParams(params);
    return this.requestWithRetry<{employees: any[], pagination: any}>(
      \`/employees?\${searchParams.toString()}\`
    );
  }

  async createEmployee(employee: any) {
    return this.requestWithRetry<any>('/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }
}

export const enhancedApiService = new EnhancedApiService();`}
            </pre>
          </div>
        </div>
      </div>

      {/* Caching Strategies */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Caching Strategies
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Client-Side Caching Implementation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/services/cache.ts
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  invalidate(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    // Remove entries matching pattern
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry !== undefined && Date.now() <= entry.expiry;
  }
}

export const apiCache = new ApiCache();

// Enhanced API service with caching
class CachedApiService extends ApiService {
  private generateCacheKey(endpoint: string, options?: RequestInit): string {
    const method = options?.method || 'GET';
    const body = options?.body || '';
    return \`\${method}:\${endpoint}:\${body}\`;
  }

  async requestWithCache<T>(
    endpoint: string, 
    options: RequestInit = {},
    cacheOptions?: { ttl?: number; skipCache?: boolean }
  ): Promise<ApiResponse<T>> {
    const method = options.method || 'GET';
    
    // Only cache GET requests by default
    if (method === 'GET' && !cacheOptions?.skipCache) {
      const cacheKey = this.generateCacheKey(endpoint, options);
      const cachedData = apiCache.get<ApiResponse<T>>(cacheKey);
      
      if (cachedData) {
        console.log('Cache hit for:', endpoint);
        return cachedData;
      }
    }

    // Make API request
    const response = await this.request<T>(endpoint, options);

    // Cache successful GET responses
    if (method === 'GET' && response.status < 400) {
      const cacheKey = this.generateCacheKey(endpoint, options);
      apiCache.set(cacheKey, response, cacheOptions?.ttl);
    }

    // Invalidate related cache entries for mutations
    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      const resourcePattern = endpoint.split('/')[1]; // Extract resource name
      apiCache.invalidate(resourcePattern);
    }

    return response;
  }

  // Override methods to use caching
  async getEmployees(params?: any) {
    const searchParams = new URLSearchParams(params);
    return this.requestWithCache<{employees: any[], pagination: any}>(
      \`/employees?\${searchParams.toString()}\`,
      {},
      { ttl: 2 * 60 * 1000 } // Cache for 2 minutes
    );
  }

  async getLeads(params?: any) {
    const searchParams = new URLSearchParams(params);
    return this.requestWithCache<{leads: any[], pagination: any}>(
      \`/leads?\${searchParams.toString()}\`,
      {},
      { ttl: 1 * 60 * 1000 } // Cache for 1 minute (more dynamic data)
    );
  }
}

export const cachedApiService = new CachedApiService();`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Cache Invalidation Hook</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/hooks/useCache.ts
import { useCallback } from 'react';
import { apiCache } from '../services/cache';

export const useCache = () => {
  const invalidateCache = useCallback((pattern?: string) => {
    apiCache.invalidate(pattern);
  }, []);

  const clearAllCache = useCallback(() => {
    apiCache.invalidate();
  }, []);

  const getCacheStats = useCallback(() => {
    // Implementation would depend on cache internals
    return {
      size: apiCache.size || 0,
      hitRate: 0.85, // Mock data
      missRate: 0.15
    };
  }, []);

  return {
    invalidateCache,
    clearAllCache,
    getCacheStats
  };
};

// Usage in components
const EmployeeList: React.FC = () => {
  const { invalidateCache } = useCache();
  const { data, loading, error, refetch } = useEmployees();

  const handleEmployeeUpdate = async (id: string, data: any) => {
    try {
      await apiService.updateEmployee(id, data);
      // Invalidate employee-related cache
      invalidateCache('employees');
      refetch();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // ... rest of component
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Real-time Updates */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <RefreshCw className="w-5 h-5 mr-2" />
          Real-time Updates & WebSockets
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">WebSocket Service</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/services/websocket.ts
interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: string;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners = new Map<string, Set<(data: any) => void>>();

  connect(token: string) {
    const wsUrl = \`ws://localhost:8000/ws?token=\${token}\`;
    
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect(token);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private attemptReconnect(token: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      setTimeout(() => {
        console.log(\`Attempting to reconnect (attempt \${this.reconnectAttempts})...\`);
        this.connect(token);
      }, delay);
    }
  }

  private handleMessage(message: WebSocketMessage) {
    const listeners = this.listeners.get(message.type);
    if (listeners) {
      listeners.forEach(listener => listener(message.payload));
    }
  }

  subscribe(messageType: string, callback: (data: any) => void) {
    if (!this.listeners.has(messageType)) {
      this.listeners.set(messageType, new Set());
    }
    this.listeners.get(messageType)!.add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(messageType);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.listeners.delete(messageType);
        }
      }
    };
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type,
        payload,
        timestamp: new Date().toISOString()
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }
}

export const webSocketService = new WebSocketService();

// React hook for WebSocket integration
export const useWebSocket = (messageType: string, callback: (data: any) => void) => {
  useEffect(() => {
    const unsubscribe = webSocketService.subscribe(messageType, callback);
    return unsubscribe;
  }, [messageType, callback]);
};`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Real-time Data Hook</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/hooks/useRealTimeData.ts
import { useState, useEffect, useCallback } from 'react';
import { useWebSocket } from '../services/websocket';
import { apiCache } from '../services/cache';

export const useRealTimeData = <T>(
  initialFetch: () => Promise<T>,
  updateChannel: string,
  options?: {
    enableRealTime?: boolean;
    cacheKey?: string;
  }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Handle real-time updates
  const handleUpdate = useCallback((updateData: any) => {
    setData(currentData => {
      if (!currentData) return currentData;
      
      // Apply update based on update type
      switch (updateData.action) {
        case 'create':
          return Array.isArray(currentData) 
            ? [...currentData, updateData.item]
            : currentData;
        
        case 'update':
          return Array.isArray(currentData)
            ? currentData.map(item => 
                item.id === updateData.item.id ? { ...item, ...updateData.item } : item
              )
            : { ...currentData, ...updateData.item };
        
        case 'delete':
          return Array.isArray(currentData)
            ? currentData.filter(item => item.id !== updateData.item.id)
            : currentData;
        
        default:
          return currentData;
      }
    });

    // Invalidate cache
    if (options?.cacheKey) {
      apiCache.invalidate(options.cacheKey);
    }
  }, [options?.cacheKey]);

  // Subscribe to real-time updates
  useWebSocket(updateChannel, handleUpdate);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await initialFetch();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Fetch failed'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = useCallback(async () => {
    try {
      setError(null);
      const result = await initialFetch();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Refetch failed'));
    }
  }, [initialFetch]);

  return {
    data,
    loading,
    error,
    refetch
  };
};

// Usage example
const LiveEmployeeList: React.FC = () => {
  const { data: employees, loading, error } = useRealTimeData(
    () => apiService.getEmployees(),
    'employees_updates',
    { 
      enableRealTime: true,
      cacheKey: 'employees'
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {employees?.employees?.map(employee => (
        <div key={employee.id}>
          {employee.name} - {employee.status}
        </div>
      ))}
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Offline Support */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Offline Support & Data Synchronization</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Offline Storage Service</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/services/offline.ts
interface OfflineAction {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  resource: string;
  data: any;
  timestamp: number;
}

class OfflineService {
  private dbName = 'bidua_erp_offline';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('employees')) {
          db.createObjectStore('employees', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('leads')) {
          db.createObjectStore('leads', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('pending_actions')) {
          const store = db.createObjectStore('pending_actions', { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp');
        }
      };
    });
  }

  async storeData(storeName: string, data: any[]): Promise<void> {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    // Clear existing data
    await store.clear();
    
    // Store new data
    for (const item of data) {
      await store.add(item);
    }
  }

  async getData(storeName: string): Promise<any[]> {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async queueAction(action: Omit<OfflineAction, 'id' | 'timestamp'>): Promise<void> {
    if (!this.db) await this.init();
    
    const offlineAction: OfflineAction = {
      ...action,
      id: \`offline_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`,
      timestamp: Date.now()
    };

    const transaction = this.db!.transaction(['pending_actions'], 'readwrite');
    const store = transaction.objectStore('pending_actions');
    await store.add(offlineAction);
  }

  async syncPendingActions(): Promise<void> {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction(['pending_actions'], 'readwrite');
    const store = transaction.objectStore('pending_actions');
    
    const actions: OfflineAction[] = await new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    for (const action of actions) {
      try {
        await this.executeAction(action);
        await store.delete(action.id);
      } catch (error) {
        console.error('Failed to sync action:', action, error);
      }
    }
  }

  private async executeAction(action: OfflineAction): Promise<void> {
    switch (action.type) {
      case 'CREATE':
        await apiService.request(\`/\${action.resource}\`, {
          method: 'POST',
          body: JSON.stringify(action.data)
        });
        break;
      
      case 'UPDATE':
        await apiService.request(\`/\${action.resource}/\${action.data.id}\`, {
          method: 'PUT',
          body: JSON.stringify(action.data)
        });
        break;
      
      case 'DELETE':
        await apiService.request(\`/\${action.resource}/\${action.data.id}\`, {
          method: 'DELETE'
        });
        break;
    }
  }
}

export const offlineService = new OfflineService();

// Hook for offline-aware operations
export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingActions();
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncPendingActions = async () => {
    if (!isOnline || syncInProgress) return;
    
    try {
      setSyncInProgress(true);
      await offlineService.syncPendingActions();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncInProgress(false);
    }
  };

  return {
    isOnline,
    syncInProgress,
    syncPendingActions
  };
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Performance Optimization */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Performance Optimization
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request Batching</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/services/batchRequests.ts
interface BatchRequest {
  id: string;
  endpoint: string;
  method: string;
  data?: any;
  resolve: (data: any) => void;
  reject: (error: any) => void;
}

class RequestBatcher {
  private queue: BatchRequest[] = [];
  private batchTimeout: NodeJS.Timeout | null = null;
  private batchDelay = 50; // 50ms delay
  private maxBatchSize = 10;

  async addRequest<T>(
    endpoint: string,
    method: string = 'GET',
    data?: any
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const request: BatchRequest = {
        id: \`req_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`,
        endpoint,
        method,
        data,
        resolve,
        reject
      };

      this.queue.push(request);

      // Process batch if queue is full
      if (this.queue.length >= this.maxBatchSize) {
        this.processBatch();
      } else {
        // Set timeout for batch processing
        if (this.batchTimeout) {
          clearTimeout(this.batchTimeout);
        }
        
        this.batchTimeout = setTimeout(() => {
          this.processBatch();
        }, this.batchDelay);
      }
    });
  }

  private async processBatch() {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];
    
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }

    // Group requests by endpoint and method
    const groupedRequests = batch.reduce((groups, request) => {
      const key = \`\${request.method}:\${request.endpoint}\`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(request);
      return groups;
    }, {} as Record<string, BatchRequest[]>);

    // Process each group
    await Promise.all(
      Object.values(groupedRequests).map(group => this.processGroup(group))
    );
  }

  private async processGroup(requests: BatchRequest[]) {
    if (requests.length === 1) {
      // Single request - process normally
      const request = requests[0];
      try {
        const response = await apiService.request(request.endpoint, {
          method: request.method,
          body: request.data ? JSON.stringify(request.data) : undefined
        });
        request.resolve(response.data);
      } catch (error) {
        request.reject(error);
      }
    } else {
      // Multiple requests - use batch endpoint if available
      try {
        const batchData = {
          requests: requests.map(req => ({
            id: req.id,
            endpoint: req.endpoint,
            method: req.method,
            data: req.data
          }))
        };

        const response = await apiService.request('/batch', {
          method: 'POST',
          body: JSON.stringify(batchData)
        });

        // Distribute responses back to individual requests
        response.data.responses.forEach((resp: any) => {
          const request = requests.find(req => req.id === resp.id);
          if (request) {
            if (resp.error) {
              request.reject(new Error(resp.error));
            } else {
              request.resolve(resp.data);
            }
          }
        });
      } catch (error) {
        // If batch fails, process individually
        await Promise.all(
          requests.map(async (request) => {
            try {
              const response = await apiService.request(request.endpoint, {
                method: request.method,
                body: request.data ? JSON.stringify(request.data) : undefined
              });
              request.resolve(response.data);
            } catch (err) {
              request.reject(err);
            }
          })
        );
      }
    }
  }
}

export const requestBatcher = new RequestBatcher();`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Optimistic Updates</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/hooks/useOptimisticUpdate.ts
import { useState, useCallback } from 'react';

export const useOptimisticUpdate = <T>(
  initialData: T[],
  updateFn: (id: string, data: Partial<T>) => Promise<T>
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [optimisticUpdates, setOptimisticUpdates] = useState<Map<string, T>>(new Map());

  const optimisticUpdate = useCallback(async (
    id: string, 
    updates: Partial<T>,
    optimisticData?: Partial<T>
  ) => {
    // Apply optimistic update immediately
    if (optimisticData) {
      setOptimisticUpdates(prev => new Map(prev).set(id, optimisticData as T));
      setData(prev => prev.map(item => 
        (item as any).id === id ? { ...item, ...optimisticData } : item
      ));
    }

    try {
      // Perform actual update
      const updatedItem = await updateFn(id, updates);
      
      // Remove optimistic update and apply real data
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      
      setData(prev => prev.map(item => 
        (item as any).id === id ? updatedItem : item
      ));
      
      return updatedItem;
    } catch (error) {
      // Revert optimistic update on failure
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      
      setData(initialData); // Revert to original data
      throw error;
    }
  }, [initialData, updateFn]);

  return {
    data,
    optimisticUpdate,
    hasOptimisticUpdates: optimisticUpdates.size > 0
  };
};

// Usage in component
const EmployeeStatusToggle: React.FC<{ employee: Employee }> = ({ employee }) => {
  const { optimisticUpdate } = useOptimisticUpdate(
    [employee],
    (id, data) => apiService.updateEmployee(id, data)
  );

  const handleStatusToggle = async () => {
    const newStatus = employee.status === 'active' ? 'inactive' : 'active';
    
    try {
      await optimisticUpdate(
        employee.id,
        { status: newStatus },
        { ...employee, status: newStatus } // Optimistic data
      );
    } catch (error) {
      console.error('Failed to update employee status:', error);
    }
  };

  return (
    <button
      onClick={handleStatusToggle}
      className={\`px-3 py-1 rounded text-sm \${
        employee.status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }\`}
    >
      {employee.status}
    </button>
  );
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Testing API Integration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Testing API Integration
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">API Mocking for Tests</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/test/mocks/apiMocks.ts
import { vi } from 'vitest';

export const createMockApiService = () => ({
  login: vi.fn(),
  logout: vi.fn(),
  getCurrentUser: vi.fn(),
  getEmployees: vi.fn(),
  createEmployee: vi.fn(),
  updateEmployee: vi.fn(),
  getLeads: vi.fn(),
  createLead: vi.fn(),
  updateLead: vi.fn(),
  markAttendance: vi.fn(),
  getAttendance: vi.fn(),
});

// Mock successful responses
export const mockApiResponses = {
  login: {
    data: {
      access_token: 'mock-token',
      refresh_token: 'mock-refresh-token',
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@bidua.com',
        role: 'employee',
        department: 'IT'
      }
    }
  },
  employees: {
    data: {
      employees: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@bidua.com',
          department: 'IT',
          status: 'active'
        }
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        pages: 1
      }
    }
  }
};

// Test setup
beforeEach(() => {
  vi.clearAllMocks();
});`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Integration Test Example</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/components/__tests__/EmployeeManagement.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import EmployeeManagement from '../hrms/EmployeeManagement';
import { apiService } from '../../services/api';
import { mockApiResponses } from '../../test/mocks/apiMocks';

// Mock the API service
vi.mock('../../services/api', () => ({
  apiService: {
    getEmployees: vi.fn(),
    createEmployee: vi.fn(),
    updateEmployee: vi.fn(),
  }
}));

describe('EmployeeManagement Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (apiService.getEmployees as any).mockResolvedValue(mockApiResponses.employees);
  });

  it('should load and display employees', async () => {
    render(<EmployeeManagement />);

    // Should show loading state initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for employees to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Verify API was called
    expect(apiService.getEmployees).toHaveBeenCalledWith({
      department: '',
      status: 'active'
    });
  });

  it('should handle employee creation', async () => {
    const newEmployee = {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@bidua.com',
      department: 'Sales',
      status: 'active'
    };

    (apiService.createEmployee as any).mockResolvedValue({ data: newEmployee });

    render(<EmployeeManagement />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Click add employee button
    fireEvent.click(screen.getByText(/add employee/i));

    // Fill form (assuming form is rendered)
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane Smith' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jane@bidua.com' }
    });

    // Submit form
    fireEvent.click(screen.getByText(/save/i));

    // Wait for API call and UI update
    await waitFor(() => {
      expect(apiService.createEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Jane Smith',
          email: 'jane@bidua.com'
        })
      );
    });
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Failed to load employees';
    (apiService.getEmployees as any).mockRejectedValue(new Error(errorMessage));

    render(<EmployeeManagement />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByText(/retry/i)).toBeInTheDocument();
    });
  });
});`}
            </pre>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Integration Best Practices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Security Best Practices</h4>
            <div className="space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <h5 className="font-semibold text-red-900 text-sm">Token Management</h5>
                <ul className="text-xs text-red-800 space-y-1">
                  <li>• Store tokens securely (httpOnly cookies preferred)</li>
                  <li>• Implement automatic token refresh</li>
                  <li>• Clear tokens on logout</li>
                  <li>• Handle token expiration gracefully</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h5 className="font-semibold text-yellow-900 text-sm">Request Security</h5>
                <ul className="text-xs text-yellow-800 space-y-1">
                  <li>• Validate all input data</li>
                  <li>• Sanitize user inputs</li>
                  <li>• Use HTTPS in production</li>
                  <li>• Implement CSRF protection</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Performance Best Practices</h4>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-semibold text-green-900 text-sm">Data Loading</h5>
                <ul className="text-xs text-green-800 space-y-1">
                  <li>• Implement pagination for large datasets</li>
                  <li>• Use lazy loading for non-critical data</li>
                  <li>• Cache frequently accessed data</li>
                  <li>• Debounce search inputs</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-900 text-sm">User Experience</h5>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Show loading states for all async operations</li>
                  <li>• Provide meaningful error messages</li>
                  <li>• Implement optimistic updates</li>
                  <li>• Add retry mechanisms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Checklist */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Integration Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Development Phase</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Set up API service layer</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Implement authentication hooks</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Add error handling and retry logic</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Implement caching strategies</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Add loading and error states</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Production Phase</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Configure production API endpoints</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Set up monitoring and logging</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Implement rate limiting</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Add performance monitoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Test error scenarios</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIIntegration;