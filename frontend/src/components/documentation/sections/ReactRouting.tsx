import React from 'react';
import { GitBranch, Shield, Zap, Monitor, Lock, Route } from 'lucide-react';

const ReactRouting: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">React Routing</h1>
        <p className="text-lg text-gray-600 mb-6">
          Advanced client-side routing implementation with React Router, including protected routes, 
          role-based access, navigation guards, and performance optimization strategies.
        </p>
      </div>

      {/* Routing Architecture */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <GitBranch className="w-5 h-5 mr-2" />
          Routing Architecture
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Route Structure</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Nested routing for modules</li>
              <li>• Dynamic route parameters</li>
              <li>• Query string handling</li>
              <li>• Route-based code splitting</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Protected Routes</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Authentication guards</li>
              <li>• Role-based access control</li>
              <li>• Permission validation</li>
              <li>• Redirect handling</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Lazy loading components</li>
              <li>• Route preloading</li>
              <li>• Bundle optimization</li>
              <li>• Navigation caching</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Route Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Configuration</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Main Router Setup</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/router/AppRouter.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy load components for code splitting
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const CRMModule = React.lazy(() => import('../modules/CRM/CRMModule'));
const HRMSModule = React.lazy(() => import('../modules/HRMS/HRMSModule'));
const EmployeePortal = React.lazy(() => import('../modules/Employee/EmployeePortal'));
const DocumentationPortal = React.lazy(() => import('../modules/Documentation/DocumentationPortal'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute roles={['admin', 'manager', 'employee']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/crm/*" element={
              <ProtectedRoute roles={['admin', 'manager']} permissions={['crm.access']}>
                <CRMModule />
              </ProtectedRoute>
            } />
            
            <Route path="/hrms/*" element={
              <ProtectedRoute roles={['admin', 'manager']} permissions={['hrms.access']}>
                <HRMSModule />
              </ProtectedRoute>
            } />
            
            <Route path="/employee/*" element={
              <ProtectedRoute roles={['employee']}>
                <EmployeePortal />
              </ProtectedRoute>
            } />
            
            <Route path="/docs/*" element={
              <ProtectedRoute roles={['documentation', 'admin']}>
                <DocumentationPortal />
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Protected Route Component</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/router/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
  permissions?: string[];
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
  permissions = [],
  fallbackPath = '/login'
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to login with return URL
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check permission-based access
  if (permissions.length > 0) {
    const hasPermission = permissions.some(permission => 
      user.permissions?.includes(permission)
    );
    
    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;`}
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation Hooks */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation Hooks & Utilities</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Custom Navigation Hook</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/hooks/useNavigation.ts
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user } = useAuth();

  const navigateWithAuth = (path: string, options?: any) => {
    // Check if user has access to the route
    if (requiresAuth(path) && !user) {
      navigate('/login', { state: { from: path } });
      return;
    }
    
    navigate(path, options);
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  const goToModule = (module: string) => {
    const moduleRoutes = {
      dashboard: '/dashboard',
      crm: '/crm',
      hrms: '/hrms',
      employee: '/employee',
      docs: '/docs'
    };
    
    const path = moduleRoutes[module] || '/dashboard';
    navigateWithAuth(path);
  };

  const buildUrl = (path: string, params?: Record<string, string>) => {
    let url = path;
    
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += \`?\${searchParams.toString()}\`;
    }
    
    return url;
  };

  return {
    navigate: navigateWithAuth,
    location,
    params,
    goBack,
    goToModule,
    buildUrl,
    currentPath: location.pathname,
    isActive: (path: string) => location.pathname.startsWith(path)
  };
};

const requiresAuth = (path: string): boolean => {
  const publicPaths = ['/login', '/forgot-password', '/reset-password'];
  return !publicPaths.includes(path);
};`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Route Guards Implementation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/router/RouteGuard.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../utils/toast';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermissions?: string[];
  onAccessDenied?: () => void;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredRole,
  requiredPermissions = [],
  onAccessDenied
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Check role requirement
    if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
      toast.error('Access denied: Insufficient role permissions');
      onAccessDenied?.() || navigate('/dashboard');
      return;
    }

    // Check permission requirements
    if (requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission =>
        user.permissions?.includes(permission)
      );

      if (!hasAllPermissions) {
        toast.error('Access denied: Missing required permissions');
        onAccessDenied?.() || navigate('/dashboard');
        return;
      }
    }

    // Log route access for audit
    logRouteAccess(user.id, location.pathname);
  }, [user, location.pathname, requiredRole, requiredPermissions]);

  return <>{children}</>;
};

const logRouteAccess = async (userId: string, path: string) => {
  try {
    await fetch('/api/audit/route-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        route: path,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.warn('Failed to log route access:', error);
  }
};

export default RouteGuard;`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactRouting;