import React from 'react';
import { Target, Zap, Database, Monitor, RefreshCw, Settings } from 'lucide-react';

const StateManagement: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">State Management</h1>
        <p className="text-lg text-gray-600 mb-6">
          Advanced React state management patterns, performance optimization, Context API usage, 
          and scalable architecture for complex enterprise applications.
        </p>
      </div>

      {/* State Management Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          State Management Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Local State</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Component-specific data</li>
              <li>• Form inputs and validation</li>
              <li>• UI state (modals, dropdowns)</li>
              <li>• Temporary calculations</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Global State</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• User authentication</li>
              <li>• Application settings</li>
              <li>• Shared data cache</li>
              <li>• Notification system</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Server State</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• API data caching</li>
              <li>• Background sync</li>
              <li>• Optimistic updates</li>
              <li>• Error handling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Context API Implementation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Context API Implementation</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Authentication Context</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          apiService.setToken(token);
          const response = await apiService.getCurrentUser();
          dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        } catch (error) {
          localStorage.removeItem('access_token');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await apiService.login(username, password);
      const { access_token, user } = response.data;
      
      localStorage.setItem('access_token', access_token);
      apiService.setToken(access_token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    apiService.clearToken();
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const hasRole = (role: string): boolean => {
    return state.user?.role === role || state.user?.role === 'admin';
  };

  const hasPermission = (permission: string): boolean => {
    return state.user?.permissions?.includes(permission) || false;
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    clearError,
    hasRole,
    hasPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Performance Optimization */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Optimization</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Memoization Patterns</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// Optimized component with memoization
import React, { memo, useMemo, useCallback } from 'react';

interface EmployeeListProps {
  employees: Employee[];
  onEmployeeSelect: (employee: Employee) => void;
  searchTerm: string;
}

const EmployeeList: React.FC<EmployeeListProps> = memo(({
  employees,
  onEmployeeSelect,
  searchTerm
}) => {
  // Memoize filtered data
  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  // Memoize event handlers
  const handleEmployeeClick = useCallback((employee: Employee) => {
    onEmployeeSelect(employee);
  }, [onEmployeeSelect]);

  // Memoize expensive calculations
  const departmentStats = useMemo(() => {
    return filteredEmployees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredEmployees]);

  return (
    <div className="space-y-4">
      {/* Department stats */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(departmentStats).map(([dept, count]) => (
          <div key={dept} className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-gray-900">{count}</div>
            <div className="text-sm text-gray-600">{dept}</div>
          </div>
        ))}
      </div>

      {/* Employee list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={handleEmployeeClick}
          />
        ))}
      </div>
    </div>
  );
});

// Memoized employee card component
const EmployeeCard: React.FC<{
  employee: Employee;
  onClick: (employee: Employee) => void;
}> = memo(({ employee, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(employee);
  }, [employee, onClick]);

  return (
    <div
      className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
      <p className="text-sm text-gray-600">{employee.designation}</p>
      <p className="text-sm text-gray-500">{employee.department}</p>
    </div>
  );
});

export default EmployeeList;`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateManagement;