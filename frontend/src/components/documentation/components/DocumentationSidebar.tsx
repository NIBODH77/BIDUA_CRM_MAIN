import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, Search, ChevronRight, ChevronDown } from 'lucide-react';
import { navigationItems, NavigationItem } from '../utils/navigationUtils';

interface DocumentationSidebarProps {
  activeSection: string;
  searchTerm: string;
  expandedSections: string[];
  onSectionChange: (sectionId: string) => void;
  onSearchChange: (term: string) => void;
  onToggleSection: (sectionId: string) => void;
}

const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({
  activeSection,
  searchTerm,
  expandedSections,
  onSectionChange,
  onSearchChange,
  onToggleSection
}) => {
  const filteredNavItems = navigationItems.map(section => ({
    ...section,
    children: section.children?.filter(child => 
      child.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (section.children && section.children.length > 0)
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">BIDUA ERP</h1>
              <p className="text-sm text-gray-500">Development Docs</p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {filteredNavItems.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            
            return (
              <div key={section.id}>
                <button
                  onClick={() => onToggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span>{section.title}</span>
                  </div>
                  {section.children && (
                    isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {section.children && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {section.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => onSectionChange(child.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          activeSection === child.id
                            ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-500'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {child.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>© 2025 BIDUA ERP</p>
          <p>Development Documentation v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentationSidebar;