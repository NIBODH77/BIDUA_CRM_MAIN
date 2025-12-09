import React from 'react';
import { Customer, Employee, Task } from '../types';
import {
  Users,
  UserCheck,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
} from 'lucide-react';

interface DashboardProps {
  customers: Customer[];
  employees: Employee[];
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ customers, employees, tasks }) => {
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalValue = customers.reduce((sum, c) => sum + c.value, 0);
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const urgentTasks = tasks.filter(t => t.priority === 'urgent').length;

  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const topCustomers = customers
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
        <div className="text-sm text-slate-600">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Customers</p>
              <p className="text-3xl font-bold text-slate-900">{customers.length}</p>
              <p className="text-sm text-emerald-600 mt-1">
                {activeCustomers} active
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Employees</p>
              <p className="text-3xl font-bold text-slate-900">{employees.length}</p>
              <p className="text-sm text-emerald-600 mt-1">
                {employees.filter(e => e.status === 'active').length} active
              </p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-slate-900">{pendingTasks}</p>
              <p className="text-sm text-amber-600 mt-1">
                {urgentTasks} urgent
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <CheckSquare className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Pipeline</p>
              <p className="text-3xl font-bold text-slate-900">
                ${totalValue.toLocaleString()}
              </p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Recent Tasks</h3>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{task.title}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Assigned to {task.assignedTo}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {task.priority === 'urgent' && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : task.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Top Customers</h3>
            <DollarSign className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div>
                  <p className="font-medium text-slate-900 text-sm">{customer.name}</p>
                  <p className="text-xs text-slate-600 mt-1">{customer.company}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 text-sm">
                    ${customer.value.toLocaleString()}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : customer.status === 'potential'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;