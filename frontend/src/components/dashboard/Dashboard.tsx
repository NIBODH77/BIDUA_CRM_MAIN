import React from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  Target,
  Award,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardProps {
  currentUser: any;
  leads: any[];
  employees: any[];
  tasks: any[];
  attendance: any[];
  leaveRequests: any[];
}

const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  leads,
  employees,
  tasks,
  attendance,
  leaveRequests
}) => {
  // Calculate metrics
  const totalLeads = leads.length;
  const hotLeads = leads.filter(lead => lead.status === 'hot').length;
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingLeaves = leaveRequests.filter(leave => leave.status === 'pending').length;
  const todayAttendance = attendance.filter(att => att.date === new Date().toISOString().split('T')[0]).length;

  const keyMetrics = [
    {
      title: 'Total Leads',
      value: totalLeads,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Hot Leads',
      value: hotLeads,
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      change: '+2%',
      trend: 'up',
      icon: UserPlus,
      color: 'bg-purple-500'
    },
    {
      title: 'Tasks Completed',
      value: `${completedTasks}/${totalTasks}`,
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-emerald-500'
    }
  ];

  const secondaryMetrics = [
    {
      title: 'Today\'s Attendance',
      value: todayAttendance,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Leaves',
      value: pendingLeaves,
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      title: 'Revenue Target',
      value: '₹2.5M',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Performance Score',
      value: '94%',
      icon: Award,
      color: 'text-purple-600'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'lead', message: 'New lead added: Rajesh Kumar', time: '2 hours ago', icon: Users },
    { id: 2, type: 'task', message: 'Task completed: Market Research', time: '4 hours ago', icon: CheckCircle },
    { id: 3, type: 'employee', message: 'New employee onboarded', time: '1 day ago', icon: UserPlus },
    { id: 4, type: 'leave', message: 'Leave request approved', time: '2 days ago', icon: Calendar }
  ];

  const quickActions = [
    { title: 'Add New Lead', description: 'Create a new sales lead', icon: Users, action: 'crm' },
    { title: 'Mark Attendance', description: 'Clock in/out for today', icon: Clock, action: 'attendance' },
    { title: 'Create Task', description: 'Assign a new task', icon: CheckCircle, action: 'tasks' },
    { title: 'Apply Leave', description: 'Submit leave request', icon: Calendar, action: 'leave' }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 md:p-6 text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-2">
          Welcome back, {currentUser.username}!
        </h1>
        <p className="text-indigo-100 text-sm md:text-base">
          Here's what's happening in your organization today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                    )}
                    <span className={`text-xs md:text-sm font-medium ml-1 ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-2 md:p-3 rounded-lg ${metric.color}`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {secondaryMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${metric.color}`} />
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-lg md:text-xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Recent Activities</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3 md:space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                >
                  <Icon className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;