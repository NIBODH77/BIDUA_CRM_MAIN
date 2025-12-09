import React, { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, User, Calendar, Flag } from 'lucide-react';
import TaskDetailModal from '../common/TaskDetailModal';

interface EmployeeTaskViewProps {
  currentUser: any;
  tasks: any[];
  onUpdateTask: (id: string, task: any) => void;
}

const EmployeeTaskView: React.FC<EmployeeTaskViewProps> = ({
  currentUser,
  tasks,
  onUpdateTask
}) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter tasks assigned to current user
  const userTasks = tasks.filter(task => 
    task.assignedTo === currentUser.username || task.assignedTo === 'employee'
  );

  const filteredTasks = statusFilter === 'all' 
    ? userTasks 
    : userTasks.filter(task => task.status === statusFilter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <AlertTriangle className="w-4 h-4" />;
      case 'completed': return <CheckSquare className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Tasks</h2>
        <p className="text-sm md:text-base text-gray-600">Track your assigned tasks and progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">{userTasks.length}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {userTasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Completed</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {userTasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <CheckSquare className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {userTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h3 className="text-base font-semibold text-gray-900">Task Status</h3>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleTaskClick(task)}
            className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 truncate pr-2">
                {task.title}
              </h4>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                <span className="hidden sm:inline">{task.priority}</span>
                <span className="sm:hidden">{task.priority.charAt(0).toUpperCase()}</span>
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2">
              {task.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-gray-900">{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {getStatusIcon(task.status)}
                  <span className="ml-1 hidden sm:inline">{task.status}</span>
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">{task.dueDate}</span>
                  <span className="md:hidden">{task.dueDate.split('-')[2]}/{task.dueDate.split('-')[1]}</span>
                </div>
              </div>

              <div className="flex items-center text-xs text-gray-500">
                <User className="w-3 h-3 mr-1" />
                <span>Assigned by {task.assignedBy}</span>
              </div>

              {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.tags.slice(0, 3).map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {task.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{task.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Modal */}
      {isDetailModalOpen && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          currentUser={currentUser}
          onClose={() => setIsDetailModalOpen(false)}
          onUpdateTask={onUpdateTask}
        />
      )}
    </div>
  );
};

export default EmployeeTaskView;