import React, { useState } from 'react';
import { User, Employee } from '../../types';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Edit,
  Save,
  X,
  CreditCard,
  Shield,
} from 'lucide-react';

interface EmployeeProfileProps {
  user: User;
  employee: Employee;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({
  user,
  employee,
  updateEmployee,
  addNotification,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: employee.phone,
    address: employee.address,
    emergencyContact: employee.emergencyContact,
    personalDetails: employee.personalDetails || {
      dateOfBirth: '',
      gender: 'male' as const,
      maritalStatus: 'single' as const,
      nationality: 'Indian',
      bloodGroup: '',
    },
    bankAccount: employee.bankAccount || {
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      accountHolderName: employee.name,
    },
  });

  const handleSave = () => {
    updateEmployee(employee.id, {
      phone: formData.phone,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      personalDetails: formData.personalDetails,
      bankAccount: formData.bankAccount,
    });
    setIsEditing(false);
    addNotification?.('Profile updated successfully', 'success');
  };

  const handleCancel = () => {
    setFormData({
      phone: employee.phone,
      address: employee.address,
      emergencyContact: employee.emergencyContact,
      personalDetails: employee.personalDetails || {
        dateOfBirth: '',
        gender: 'male' as const,
        maritalStatus: 'single' as const,
        nationality: 'Indian',
        bloodGroup: '',
      },
      bankAccount: employee.bankAccount || {
        accountNumber: '',
        bankName: '',
        ifscCode: '',
        accountHolderName: employee.name,
      },
    });
    setIsEditing(false);
  };

  const handleChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
          <p className="text-slate-600">Manage your personal information and settings</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{employee.name}</h3>
            <p className="text-teal-100 text-lg">{employee.designation}</p>
            <p className="text-teal-200">{employee.department} • {employee.employeeId}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Joined {new Date(employee.joiningDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span className="text-sm capitalize">{employee.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <UserIcon className="w-5 h-5 mr-2" />
            Basic Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={employee.name}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  value={employee.employeeId}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={employee.email}
                disabled
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                disabled={!isEditing}
                rows={3}
                className={`w-full px-3 py-2 border border-slate-300 rounded-lg resize-none ${
                  isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
              <input
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Personal Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.personalDetails.dateOfBirth}
                onChange={(e) => handleChange('personalDetails', 'dateOfBirth', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                }`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.personalDetails.gender}
                  onChange={(e) => handleChange('personalDetails', 'gender', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                    isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Marital Status</label>
                <select
                  value={formData.personalDetails.maritalStatus}
                  onChange={(e) => handleChange('personalDetails', 'maritalStatus', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                    isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
                <input
                  type="text"
                  value={formData.personalDetails.nationality}
                  onChange={(e) => handleChange('personalDetails', 'nationality', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                    isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
                <input
                  type="text"
                  value={formData.personalDetails.bloodGroup}
                  onChange={(e) => handleChange('personalDetails', 'bloodGroup', e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., A+, B-, O+"
                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                    isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Job Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={employee.department}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={employee.designation}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Joining Date</label>
                <input
                  type="date"
                  value={employee.joiningDate}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Manager</label>
                <input
                  type="text"
                  value={employee.manager || 'Not assigned'}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bank Account Details */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Bank Account Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Holder Name</label>
              <input
                type="text"
                value={formData.bankAccount.accountHolderName}
                onChange={(e) => handleChange('bankAccount', 'accountHolderName', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={formData.bankAccount.bankName}
                onChange={(e) => handleChange('bankAccount', 'bankName', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                  isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                }`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={formData.bankAccount.accountNumber}
                  onChange={(e) => handleChange('bankAccount', 'accountNumber', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                    isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={formData.bankAccount.ifscCode}
                  onChange={(e) => handleChange('bankAccount', 'ifscCode', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg ${
                    isEditing ? 'focus:ring-2 focus:ring-teal-500 focus:border-transparent' : 'bg-slate-50 text-slate-500'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Data Security</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your personal information is securely stored and encrypted. Only you and authorized HR personnel can access this data.
              For any changes to official information (name, employee ID, department), please contact HR department.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;