import React, { useState } from 'react';
import { TaskComment, User } from '../../types';
import {
  MessageSquare,
  Send,
  Clock,
  TrendingUp,
  AlertCircle,
  FileText,
  User as UserIcon,
  Calendar,
  BarChart3,
} from 'lucide-react';

interface TaskCommentsSectionProps {
  taskId: string;
  comments: TaskComment[];
  currentUser: User;
  onAddComment: (taskId: string, comment: Omit<TaskComment, 'id' | 'taskId'>) => void;
}

const TaskCommentsSection: React.FC<TaskCommentsSectionProps> = ({
  taskId,
  comments,
  currentUser,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [commentType, setCommentType] = useState<'comment' | 'work-report'>('comment');
  const [hoursWorked, setHoursWorked] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Omit<TaskComment, 'id' | 'taskId'> = {
      authorId: currentUser.id,
      authorName: currentUser.username,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      type: commentType,
      metadata: commentType === 'work-report' ? {
        hoursWorked: hoursWorked || 0,
      } : undefined,
    };

    onAddComment(taskId, comment);
    setNewComment('');
    setHoursWorked(0);
  };

  const getCommentIcon = (type: string) => {
    switch (type) {
      case 'work-report':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'status-change':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'progress-update':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-slate-600" />;
    }
  };

  const getCommentBg = (type: string) => {
    switch (type) {
      case 'work-report':
        return 'bg-blue-50 border-blue-200';
      case 'status-change':
        return 'bg-orange-50 border-orange-200';
      case 'progress-update':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const formatCommentType = (type: string) => {
    switch (type) {
      case 'work-report':
        return 'Work Report';
      case 'status-change':
        return 'Status Update';
      case 'progress-update':
        return 'Progress Update';
      default:
        return 'Comment';
    }
  };

  const sortedComments = [...comments].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-slate-900 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Task Updates & Reports
        </h4>
        <span className="text-sm text-slate-500">{comments.length} updates</span>
      </div>

      {/* Comments List */}
      <div className="max-h-96 overflow-y-auto space-y-3 border border-slate-200 rounded-lg p-4">
        {sortedComments.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-500">No updates yet. Be the first to add a comment or work report!</p>
          </div>
        ) : (
          sortedComments.map((comment) => (
            <div
              key={comment.id}
              className={`border rounded-lg p-4 ${getCommentBg(comment.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-600 font-semibold text-sm">
                    {comment.authorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-slate-900">{comment.authorName}</span>
                    <div className="flex items-center space-x-1">
                      {getCommentIcon(comment.type)}
                      <span className="text-xs font-medium text-slate-600">
                        {formatCommentType(comment.type)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-slate-700 mb-2">{comment.content}</p>
                  
                  {comment.metadata && (
                    <div className="flex items-center space-x-4 text-xs text-slate-600">
                      {comment.metadata.progressPercentage !== undefined && (
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="w-3 h-3" />
                          <span>Progress: {comment.metadata.progressPercentage}%</span>
                        </div>
                      )}
                      {comment.metadata.hoursWorked !== undefined && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Hours: {comment.metadata.hoursWorked}h</span>
                        </div>
                      )}
                      {comment.metadata.oldValue && comment.metadata.newValue && (
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{comment.metadata.oldValue} → {comment.metadata.newValue}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="border border-slate-200 rounded-lg p-4 bg-white">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-teal-600 font-semibold text-sm">
              {currentUser.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <select
              value={commentType}
              onChange={(e) => setCommentType(e.target.value as 'comment' | 'work-report')}
              className="px-3 py-1 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="comment">💬 Comment</option>
              <option value="work-report">📊 Work Report</option>
            </select>
          </div>
        </div>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            commentType === 'work-report' 
              ? "Describe your work progress, achievements, challenges, and next steps..."
              : "Add a comment or question..."
          }
          rows={commentType === 'work-report' ? 4 : 2}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
        />

        {commentType === 'work-report' && (
          <div className="mt-3 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <label className="text-sm text-slate-600">Hours worked:</label>
              <input
                type="number"
                value={hoursWorked}
                onChange={(e) => setHoursWorked(Number(e.target.value))}
                min="0"
                max="24"
                step="0.5"
                className="w-20 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-slate-500">
            {commentType === 'work-report' 
              ? 'Share detailed progress updates with your team'
              : 'Ask questions or share quick updates'
            }
          </div>
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCommentsSection;