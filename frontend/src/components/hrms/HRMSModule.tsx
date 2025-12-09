import React, { useState } from 'react';
import { Users, Clock, Calendar, DollarSign, BarChart3, CheckSquare } from 'lucide-react';
import EmployeeManagement from './EmployeeManagement';
import AttendanceManagement from './AttendanceManagement';
import LeaveManagement from './LeaveManagement';
import PayrollManagement from './PayrollManagement';
import PerformanceManagement from './PerformanceManagement';
import TaskManagement from './TaskManagement';

interface HRMSModuleProps {
  currentUser: any;
  employees: any[];
  attendance: any[];
  leaveRequests: any[];
  payroll: any[];
  performance: any[];
  tasks: any[];
  onAddEmployee: (employee: any) => void;
  onUpdateEmployee: (id: string, employee: any) => void;
  onDeleteEmployee: (id: string) => void;
  onAddAttendance: (attendance: any) => void;
  onUpdateAttendance: (id: string, attendance: any) => void;
  onAddLeaveRequest: (leave: any) => void;
  onUpdateLeaveRequest: (id: string, leave: any) => void;
  onAddTask: (task: any) => void;
  onUpdateTask: (id: string, task: any) => void;
  onDeleteTask: (id: string) => void;
}

const HRMSModule: React.FC<HRMSModuleProps> = ({
  currentUser,
  employees,
  attendance,
  leaveRequests,
  payroll,
  performance,
  tasks,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
  onAddAttendance,
  onUpdateAttendance,
  onAddLeaveRequest,
  onUpdateLeaveRequest,
  onAddTask,
  onUpdateTask,
  onDeleteTask
}) => {
  const [activeView, setActiveView] = useState('employees');

  const views = [
    { id: 'employees', name: 'Employees', icon: Users, component: EmployeeManagement },
    { id: 'attendance', name: 'Attendance', icon: Clock, component: AttendanceManagement },
    { id: 'leaves', name: 'Leaves', icon: Calendar, component: LeaveManagement },
    { id: 'payroll', name: 'Payroll', icon: DollarSign, component: PayrollManagement },
    { id: 'performance', name: 'Performance', icon: BarChart3, component: PerformanceManagement },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare, component: TaskManagement },
  ];

  const renderActiveView = () => {
    const activeViewConfig = views.find(view => view.id === activeView);
    if (!activeViewConfig) return null;

    const Component = activeViewConfig.component;

    switch (activeView) {
      case 'employees':
        return (
          <Component
            currentUser={currentUser}
            employees={employees}
            onAddEmployee={onAddEmployee}
            onUpdateEmployee={onUpdateEmployee}
            onDeleteEmployee={onDeleteEmployee}
          />
        );
      case 'attendance':
        return (
          <Component
            currentUser={currentUser}
            attendance={attendance}
            employees={employees}
            onAddAttendance={onAddAttendance}
            onUpdateAttendance={onUpdateAttendance}
          />
        );
      case 'leaves':
        return (
          <Component
            currentUser={currentUser}
            leaveRequests={leaveRequests}
            employees={employees}
            onAddLeaveRequest={onAddLeaveRequest}
            onUpdateLeaveRequest={onUpdateLeaveRequest}
          />
        );
      case 'payroll':
        return (
          <Component
            currentUser={currentUser}
            payroll={payroll}
            employees={employees}
          />
        );
      case 'performance':
        return (
          <Component
            currentUser={currentUser}
            performance={performance}
            employees={employees}
          />
        );
      case 'tasks':
        return (
          <Component
            currentUser={currentUser}
            tasks={tasks}
            employees={employees}
            onAddTask={onAddTask}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 md:space-x-8 overflow-x-auto">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-1 md:space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeView === view.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{view.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active View Content */}
      <div className="min-h-0 flex-1">
        {renderActiveView()}
      </div>
    </div>
  );
};

export default HRMSModule;