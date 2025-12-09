
// API Service Layer for Backend Integration
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:8000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('currentUser');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API Service
export const apiService = {
  // Authentication
  login: (username: string, password: string) =>
    apiClient.post('/auth/login', { username, password }),
  
  logout: () => apiClient.post('/auth/logout'),
  
  getCurrentUser: () => apiClient.get('/auth/me'),

  // Employees
  getEmployees: (params?: any) => apiClient.get('/employees', { params }),
  
  getEmployee: (id: string) => apiClient.get(`/employees/${id}`),
  
  createEmployee: (data: any) => apiClient.post('/employees', data),
  
  updateEmployee: (id: string, data: any) => apiClient.put(`/employees/${id}`, data),
  
  deleteEmployee: (id: string) => apiClient.delete(`/employees/${id}`),

  // CRM - Leads
  getLeads: (params?: any) => apiClient.get('/crm/leads', { params }),
  
  getLead: (id: string) => apiClient.get(`/crm/leads/${id}`),
  
  createLead: (data: any) => apiClient.post('/crm/leads', data),
  
  updateLead: (id: string, data: any) => apiClient.put(`/crm/leads/${id}`, data),
  
  deleteLead: (id: string) => apiClient.delete(`/crm/leads/${id}`),

  // CRM - Support Tickets
  getTickets: (params?: any) => apiClient.get('/crm/tickets', { params }),
  
  createTicket: (data: any) => apiClient.post('/crm/tickets', data),
  
  updateTicket: (id: string, data: any) => apiClient.put(`/crm/tickets/${id}`, data),

  // HRMS - Attendance
  getAttendance: (params?: any) => apiClient.get('/hrms/attendance', { params }),
  
  clockIn: (data: any) => apiClient.post('/hrms/attendance/clock-in', data),
  
  clockOut: (data: any) => apiClient.post('/hrms/attendance/clock-out', data),

  // HRMS - Leaves
  getLeaves: (params?: any) => apiClient.get('/hrms/leaves', { params }),
  
  createLeave: (data: any) => apiClient.post('/hrms/leaves', data),
  
  updateLeave: (id: string, data: any) => apiClient.put(`/hrms/leaves/${id}`, data),

  // HRMS - Tasks
  getTasks: (params?: any) => apiClient.get('/hrms/tasks', { params }),
  
  createTask: (data: any) => apiClient.post('/hrms/tasks', data),
  
  updateTask: (id: string, data: any) => apiClient.put(`/hrms/tasks/${id}`, data),

  // HRMS - Payroll
  getPayroll: (employeeId: string, params?: any) => 
    apiClient.get(`/hrms/payroll/${employeeId}`, { params }),

  // Employee Portal
  getMyTasks: () => apiClient.get('/employee/tasks'),
  
  getMyLeaves: () => apiClient.get('/employee/leaves'),
  
  getMyAttendance: () => apiClient.get('/employee/attendance'),
  
  getMyPayslips: () => apiClient.get('/employee/payslips'),
  
  getMyDocuments: () => apiClient.get('/employee/documents'),
};

export default apiService;
