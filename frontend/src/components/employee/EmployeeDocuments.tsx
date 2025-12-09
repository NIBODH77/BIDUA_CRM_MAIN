import React, { useState } from 'react';
import { FileText, Download, Eye, Search, Filter, Calendar, User } from 'lucide-react';

interface EmployeeDocumentsProps {
  currentUser: any;
  documents: any[];
}

const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({
  currentUser,
  documents
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter documents for current user
  const userDocuments = documents.filter(doc => 
    doc.employeeId === 'BID004' || doc.isPublic
  );

  const filteredDocuments = userDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const documentTypes = [...new Set(userDocuments.map(doc => doc.type))];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'offer-letter': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'salary-slip': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'id-card': return <User className="w-5 h-5 text-purple-600" />;
      case 'experience-letter': return <Award className="w-5 h-5 text-orange-600" />;
      case 'policy': return <FileText className="w-5 h-5 text-indigo-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'offer-letter': return 'bg-blue-100 text-blue-800';
      case 'salary-slip': return 'bg-green-100 text-green-800';
      case 'id-card': return 'bg-purple-100 text-purple-800';
      case 'experience-letter': return 'bg-orange-100 text-orange-800';
      case 'policy': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Group documents by type for overview
  const documentOverview = documentTypes.map(type => ({
    type,
    count: userDocuments.filter(doc => doc.type === type).length,
    icon: getTypeIcon(type)
  }));

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Documents</h2>
        <p className="text-sm md:text-base text-gray-600">Access and download your employment documents</p>
      </div>

      {/* Document Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {documentOverview.map((overview, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="flex justify-center mb-2">
              {overview.icon}
            </div>
            <div className="text-lg md:text-xl font-bold text-gray-900">{overview.count}</div>
            <div className="text-xs md:text-sm text-gray-600 capitalize">
              {overview.type.replace('-', ' ')}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            {documentTypes.map(type => (
              <option key={type} value={type} className="capitalize">
                {type.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getTypeIcon(document.type)}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                    {document.title}
                  </h4>
                  <p className="text-xs text-gray-500">{document.fileName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(document.type)}`}>
                {document.type.replace('-', ' ')}
              </span>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{formatFileSize(document.size)}</span>
                <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-gray-500">
                Uploaded by: {document.uploadedBy}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <DollarSign className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Latest Salary Slip</p>
              <p className="text-xs text-gray-500">December 2024</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Offer Letter</p>
              <p className="text-xs text-gray-500">Employment contract</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <User className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Employee ID Card</p>
              <p className="text-xs text-gray-500">Official ID</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocuments;