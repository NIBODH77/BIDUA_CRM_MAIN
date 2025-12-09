import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { User } from './types';
import {
  mockUsers,
  staticPassword,
  mockLeads,
  mockEmployees,
  mockTasks,
  mockAttendance,
  mockLeaveRequests,
  mockSupportTickets,
  mockPayroll,
  mockPerformance,
  mockDocuments,
  mockCompanies,
  mockDeals,
  mockActivities,
  mockCampaigns,
  mockProducts
} from './data/mockData';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CRMModule from './components/crm/CRMModule';
import HRMSModule from './components/hrms/HRMSModule';
import ReportsModule from './components/reports/ReportsModule';
import SettingsModule from './components/settings/SettingsModule';
import EmployeePortal from './components/employee/EmployeePortal';
import DocumentationPortal from './components/documentation/DocumentationPortal';
import { Menu, X } from 'lucide-react';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [activeDocumentationSection, setActiveDocumentationSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize state with mock data
  const [leads, setLeads] = useState(mockLeads);
  const [employees, setEmployees] = useState(mockEmployees);
  const [tasks, setTasks] = useState(mockTasks);
  const [attendance, setAttendance] = useState(mockAttendance);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [supportTickets, setSupportTickets] = useState(mockSupportTickets);
  const [payroll, setPayroll] = useState(mockPayroll);
  const [performance, setPerformance] = useState(mockPerformance);
  const [documents, setDocuments] = useState(mockDocuments);
  const [companies, setCompanies] = useState(mockCompanies);
  const [deals, setDeals] = useState(mockDeals);
  const [activities, setActivities] = useState(mockActivities);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      
      // Set default module based on role
      if (user.role === 'employee') {
        setActiveModule('employee-portal');
      } else if (user.role === 'documentation') {
        setActiveModule('documentation-portal');
      } else {
        setActiveModule('dashboard');
      }
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = mockUsers.find(u => u.username === username);
    if (user && password === staticPassword) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Set default module based on role
      if (user.role === 'employee') {
        setActiveModule('employee-portal');
      } else if (user.role === 'documentation') {
        setActiveModule('documentation-portal');
      } else {
        setActiveModule('dashboard');
      }
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveModule('dashboard');
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Data manipulation functions
  const handleAddLead = (lead: any) => {
    setLeads([...leads, { ...lead, id: Date.now().toString() }]);
  };

  const handleUpdateLead = (id: string, updatedLead: any) => {
    setLeads(leads.map(lead => lead.id === id ? { ...lead, ...updatedLead } : lead));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const handleAddEmployee = (employee: any) => {
    setEmployees([...employees, { ...employee, id: Date.now().toString() }]);
  };

  const handleUpdateEmployee = (id: string, updatedEmployee: any) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedEmployee } : emp));
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleAddTask = (task: any) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const handleUpdateTask = (id: string, updatedTask: any) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddTicket = (ticket: any) => {
    setSupportTickets([...supportTickets, { ...ticket, id: Date.now().toString() }]);
  };

  const handleUpdateTicket = (id: string, updatedTicket: any) => {
    setSupportTickets(supportTickets.map(ticket => ticket.id === id ? { ...ticket, ...updatedTicket } : ticket));
  };

  const handleDeleteTicket = (id: string) => {
    setSupportTickets(supportTickets.filter(ticket => ticket.id !== id));
  };

  const handleAddAttendance = (attendanceRecord: any) => {
    setAttendance([...attendance, { ...attendanceRecord, id: Date.now().toString() }]);
  };

  const handleUpdateAttendance = (id: string, updatedAttendance: any) => {
    setAttendance(attendance.map(att => att.id === id ? { ...att, ...updatedAttendance } : att));
  };

  const handleAddLeaveRequest = (leave: any) => {
    setLeaveRequests([...leaveRequests, { ...leave, id: Date.now().toString() }]);
  };

  const handleUpdateLeaveRequest = (id: string, updatedLeave: any) => {
    setLeaveRequests(leaveRequests.map(leave => leave.id === id ? { ...leave, ...updatedLeave } : leave));
  };

  if (!currentUser) {
    return (
      <Router>
        <LoginForm onLogin={handleLogin} />
      </Router>
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <Dashboard 
            currentUser={currentUser} 
            leads={leads}
            employees={employees}
            tasks={tasks}
            attendance={attendance}
            leaveRequests={leaveRequests}
          />
        );
      case 'crm':
        return (
          <CRMModule
            currentUser={currentUser}
            leads={leads}
            supportTickets={supportTickets}
            companies={companies}
            deals={deals}
            activities={activities}
            campaigns={campaigns}
            products={products}
            onAddLead={handleAddLead}
            onUpdateLead={handleUpdateLead}
            onDeleteLead={handleDeleteLead}
            onAddTicket={handleAddTicket}
            onUpdateTicket={handleUpdateTicket}
            onDeleteTicket={handleDeleteTicket}
          />
        );
      case 'hrms':
        return (
          <HRMSModule 
            currentUser={currentUser}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
            payroll={payroll}
            performance={performance}
            tasks={tasks}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onAddAttendance={handleAddAttendance}
            onUpdateAttendance={handleUpdateAttendance}
            onAddLeaveRequest={handleAddLeaveRequest}
            onUpdateLeaveRequest={handleUpdateLeaveRequest}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'reports':
        return (
          <ReportsModule 
            currentUser={currentUser}
            leads={leads}
            employees={employees}
            tasks={tasks}
            attendance={attendance}
            payroll={payroll}
          />
        );
      case 'settings':
        return <SettingsModule />;
      case 'employee-portal':
        return (
          <EmployeePortal 
            currentUser={currentUser}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
            payroll={payroll}
            tasks={tasks}
            documents={documents}
            onAddLeaveRequest={handleAddLeaveRequest}
            onUpdateTask={handleUpdateTask}
            onLogout={handleLogout}
          />
        );
      case 'documentation-portal':
        return (
          <DocumentationPortal 
            currentUser={currentUser}
            activeSection="overview"
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <Dashboard 
            currentUser={currentUser} 
            leads={leads}
            employees={employees}
            tasks={tasks}
            attendance={attendance}
            leaveRequests={leaveRequests}
          />
        );
    }
  };

  return (
    <Router>
      {!currentUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : activeModule === 'documentation-portal' ? (
        <DocumentationPortal 
          currentUser={currentUser}
          activeSection={activeDocumentationSection}
          onSectionChange={setActiveDocumentationSection}
          onLogout={handleLogout}
        />
      ) : (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
          {/* Mobile Header */}
          <div className="md:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="text-lg font-bold text-indigo-600">BIDUA ERP</h1>
            </div>
            <div className="text-sm text-gray-600">
              {currentUser.username}
            </div>
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
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 fixed md:relative z-50 md:z-auto
            w-full md:w-72 h-screen top-14 md:top-0
            transition-transform duration-300 ease-in-out
          `}>
            <Sidebar
              currentUser={currentUser}
              activeModule={activeModule}
              activeDocumentationSection={activeDocumentationSection}
              onModuleChange={(module) => {
                setActiveModule(module);
                setIsSidebarOpen(false);
              }}
              onDocumentationSectionChange={setActiveDocumentationSection}
              onLogout={handleLogout}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 overflow-auto mt-14 md:mt-0">
            {renderModule()}
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;