import React, { useState } from 'react';
import { Attendance, Employee, User } from '../../types';
import { X, Clock, MapPin } from 'lucide-react';

interface AttendanceFormProps {
  employees: Employee[];
  user: User;
  onSubmit: (attendance: Omit<Attendance, 'id'>) => void;
  onCancel: () => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ 
  employees, 
  user, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    employeeId: user.role === 'employee' ? user.username : '',
    employeeName: user.role === 'employee' ? user.username : '',
    date: new Date().toISOString().split('T')[0],
    clockIn: new Date().toTimeString().slice(0, 5),
    clockOut: '',
    totalHours: 0,
    status: 'present' as const,
    location: 'Office',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total hours if clock out is provided
    let totalHours = 0;
    if (formData.clockOut) {
      const [inHour, inMin] = formData.clockIn.split(':').map(Number);
      const [outHour, outMin] = formData.clockOut.split(':').map(Number);
      const inMinutes = inHour * 60 + inMin;
      const outMinutes = outHour * 60 + outMin;
      totalHours = (outMinutes - inMinutes) / 60;
    }
    
    onSubmit({
      ...formData,
      totalHours: Math.max(0, totalHours),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmployee = employees.find(emp => emp.employeeId === e.target.value);
    if (selectedEmployee) {
      setFormData(prev => ({
        ...prev,
        employeeId: selectedEmployee.employeeId,
        employeeName: selectedEmployee.name,
      }));
    }
  };

  const handleClockIn = () => {
    const now = new Date();
    setFormData(prev => ({
      ...prev,
      clockIn: now.toTimeString().slice(0, 5),
      date: now.toISOString().split('T')[0],
    }));
  };

  const handleClockOut = () => {
    const now = new Date();
    setFormData(prev => ({
      ...prev,
      clockOut: now.toTimeString().slice(0, 5),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Mark Attendance</h3>
          <button
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {user.role !== 'employee' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Employee *
              </label>
              <select
                value={formData.employeeId}
                onChange={handleEmployeeChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select employee</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.employeeId}>
                    {employee.name} - {employee.employeeId}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="half-day">Half Day</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Clock In Time *
              </label>
              <div className="flex space-x-2">
                <input
                  type="time"
                  name="clockIn"
                  value={formData.clockIn}
                  onChange={handleChange}
                  required
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleClockIn}
                  className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-1"
                >
                  <Clock className="w-4 h-4" />
                  <span>Now</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Clock Out Time
              </label>
              <div className="flex space-x-2">
                <input
                  type="time"
                  name="clockOut"
                  value={formData.clockOut}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleClockOut}
                  className="px-3 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-1"
                >
                  <Clock className="w-4 h-4" />
                  <span>Now</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Location *
            </label>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
                <option value="Client Site">Client Site</option>
                <option value="Field Work">Field Work</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Mark Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceForm;