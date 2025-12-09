import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Clock, 
  Calendar, 
  DollarSign, 
  FileText, 
  CheckSquare,
  Building2,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import EmployeeDashboard from './EmployeeDashboard';
import EmployeeAttendance from './EmployeeAttendance';
import EmployeeLeaves from './EmployeeLeaves';
import EmployeeSalary from './EmployeeSalary';
import EmployeeDocuments from './EmployeeDocuments';
import EmployeeTaskView from './EmployeeTaskView';

interface EmployeePortalProps {
  currentUser: any;
  employees: any[];
  attendance: any[];
  leaveRequests: any[];
  payroll: any[];
  tasks: any[];
  documents: any[];
  onAddLeaveRequest: (leave: any) => void;
  onUpdateTask: (id: string, task: any) => void;
  onLogout: () => void;
}

const EmployeePortal: React.FC<EmployeePortalProps> = ({
  currentUser,
  employees,
  attendance,
  leaveRequests,
  payroll,
  tasks,
  documents,
  onAddLeaveRequest,
  onUpdateTask,
  onLogout
}) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const views = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, component: EmployeeDashboard },
    { id: 'attendance', name: 'Attendance', icon: Clock, component: EmployeeAttendance },
    { id: 'leaves', name: 'Leaves', icon: Calendar, component: EmployeeLeaves },
    { id: 'salary', name: 'Salary', icon: DollarSign, component: EmployeeSalary },
    { id: 'documents', name: 'Documents', icon: FileText, component: EmployeeDocuments },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare, component: EmployeeTaskView },
  ];

  const renderActiveView = () => {
    const activeViewConfig = views.find(view => view.id === activeView);
    if (!activeViewConfig) return null;

    const Component = activeViewConfig.component;

    switch (activeView) {
      case 'dashboard':
        return (
          <Component
            currentUser={currentUser}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
            payroll={payroll}
            tasks={tasks}
          />
        );
      case 'attendance':
        return (
          <Component
            currentUser={currentUser}
            attendance={attendance}
          />
        );
      case 'leaves':
        return (
          <Component
            currentUser={currentUser}
            leaveRequests={leaveRequests}
            onAddLeaveRequest={onAddLeaveRequest}
          />
        );
      case 'salary':
        return (
          <Component
            currentUser={currentUser}
            payroll={payroll}
          />
        );
      case 'documents':
        return (
          <Component
            currentUser={currentUser}
            documents={documents}
          />
        );
      case 'tasks':
        return (
          <Component
            currentUser={currentUser}
            tasks={tasks}
            onUpdateTask={onUpdateTask}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">BIDUA</h1>
            <p className="text-xs text-gray-500">Employee Portal</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center space-x-3 p-6 border-b border-gray-200">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BIDUA</h1>
              <p className="text-sm text-gray-500">Employee Portal</p>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 md:p-6 border-b border-gray-200 mt-16 md:mt-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold text-sm">
                  {currentUser.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser.username}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {currentUser.role} • {currentUser.department}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 md:p-6 space-y-2">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => {
                    setActiveView(view.id);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeView === view.id
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{view.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 md:p-6 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default EmployeePortal;