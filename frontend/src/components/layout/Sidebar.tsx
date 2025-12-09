import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  FileText, 
  Settings, 
  LogOut,
  Building2,
  Menu,
  X,
  BookOpen,
  Search,
  Home,
  Layers,
  Code,
  Database,
  GitBranch,
  Server,
  Globe,
  Shield,
  Zap,
  Smartphone,
  Target,
  AlertTriangle
} from 'lucide-react';
import { documentationSections } from '../../data/mockData';

interface SidebarProps {
  currentUser: any;
  activeModule: string;
  activeDocumentationSection?: string;
  onModuleChange: (module: string) => void;
  onDocumentationSectionChange?: (section: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentUser, 
  activeModule, 
  activeDocumentationSection,
  onModuleChange, 
  onDocumentationSectionChange,
  onLogout,
}) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'crm', name: 'CRM', icon: Users },
    { id: 'hrms', name: 'HRMS', icon: UserCheck },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = (() => {
    if (currentUser.role === 'documentation') {
      // Documentation role sees no menu items - only documentation sections
      return [];
    } else if (currentUser.role === 'employee') {
      return [{ id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard }];
    } else {
      // Admin and Manager roles see all menu items
      return menuItems;
    }
  })();

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Home,
      Layers,
      Code,
      Settings,
      Database,
      GitBranch,
      Server,
      Globe,
      Shield,
      Zap,
      Smartphone,
      Target,
      AlertTriangle
    };
    return iconMap[iconName] || Home;
  };
  return (
    <div className="w-72 bg-white border-r border-gray-200 h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
          <div className="bg-indigo-600 p-3 rounded-xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">BIDUA</h1>
            <p className="text-sm text-gray-500">
              {activeModule === 'documentation-portal' ? 'Documentation' : 'ERP System'}
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-sm">
                {currentUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.username}
              </p>
              <p className="text-xs text-gray-500 capitalize truncate">
                {currentUser.role} • {currentUser.department}
              </p>
            </div>
          </div>
        </div>

        {/* Search (only for documentation) */}
        {activeModule === 'documentation-portal' && (
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {activeModule === 'documentation-portal' ? (
            // Documentation sections only
            <div className="space-y-6">
              {documentationSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const IconComponent = getIconComponent(item.icon);
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onDocumentationSectionChange?.(item.id);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm ${
                            activeDocumentationSection === item.id
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="font-medium">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Regular menu items for other roles
            <div className="space-y-2">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onModuleChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeModule === item.id
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              
            </div>
          )}
          
          {/* Logout button for all roles */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;