import React from 'react';
import { 
  CheckSquare, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Award,
  AlertTriangle,
  FileText,
  User,
  Target
} from 'lucide-react';

interface EmployeeDashboardProps {
  currentUser: any;
  employees: any[];
  attendance: any[];
  leaveRequests: any[];
  payroll: any[];
  tasks: any[];
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  currentUser,
  employees,
  attendance,
  leaveRequests,
  payroll,
  tasks
}) => {
  // Filter data for current user
  const userAttendance = attendance.filter(att => 
    att.employeeName === currentUser.username || att.employeeId === 'BID004'
  );
  const userLeaves = leaveRequests.filter(leave => 
    leave.employeeName === currentUser.username || leave.employeeId === 'BID004'
  );
  const userPayroll = payroll.filter(pay => 
    pay.employeeName === 'Rahul Verma' || pay.employeeId === 'BID004'
  );
  const userTasks = tasks.filter(task => 
    task.assignedTo === currentUser.username || task.assignedTo === 'employee'
  );

  // Calculate metrics
  const todayAttendance = userAttendance.find(att => att.date === new Date().toISOString().split('T')[0]);
  const pendingLeaves = userLeaves.filter(leave => leave.status === 'pending').length;
  const completedTasks = userTasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = userTasks.filter(task => task.status === 'in-progress').length;
  const latestSalary = userPayroll[0]?.netSalary || 0;

  const quickStats = [
    {
      title: 'Today\'s Hours',
      value: todayAttendance ? `${todayAttendance.totalHours}h` : '0h',
      icon: Clock,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Leaves',
      value: pendingLeaves,
      icon: Calendar,
      color: 'bg-yellow-500'
    },
    {
      title: 'Active Tasks',
      value: inProgressTasks,
      icon: CheckSquare,
      color: 'bg-purple-500'
    },
    {
      title: 'This Month Salary',
      value: `₹${(latestSalary / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'bg-green-500'
    }
  ];

  const secondaryStats = [
    {
      title: 'Tasks Completed',
      value: completedTasks,
      icon: Award,
      color: 'text-green-600'
    },
    {
      title: 'Total Tasks',
      value: userTasks.length,
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'Performance Score',
      value: '4.2/5',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'task', message: 'Completed: Website Content Update', time: '2 hours ago', icon: CheckSquare },
    { id: 2, type: 'attendance', message: 'Clocked in at 09:00 AM', time: '6 hours ago', icon: Clock },
    { id: 3, type: 'task', message: 'Started: Market Research Analysis', time: '1 day ago', icon: AlertTriangle },
    { id: 4, type: 'leave', message: 'Leave request submitted', time: '2 days ago', icon: Calendar }
  ];

  const upcomingDeadlines = userTasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 md:p-6 text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-2">
          Welcome back, {currentUser.username}!
        </h1>
        <p className="text-indigo-100 text-sm md:text-base">
          Here's your personal dashboard with today's overview.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 md:p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {secondaryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-lg md:text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
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

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {upcomingDeadlines.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{task.progress}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-indigo-600 h-1 rounded-full" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Work Hours</p>
              <p className="text-xs text-gray-600">09:00 AM - 06:00 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckSquare className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Tasks Due Today</p>
              <p className="text-xs text-gray-600">{userTasks.filter(t => t.dueDate === new Date().toISOString().split('T')[0]).length} tasks</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <User className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Team Meetings</p>
              <p className="text-xs text-gray-600">2 scheduled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;