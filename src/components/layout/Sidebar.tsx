import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Upload, 
  History, 
  FileText, 
  Menu, 
  X,
  Eye
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { name: 'Upload', icon: <Upload size={20} />, path: '/upload' },
    { name: 'History', icon: <History size={20} />, path: '/history' },
    { name: 'Resources', icon: <FileText size={20} />, path: '/resources' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="fixed z-50 bottom-4 right-4 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        className={`bg-white border-r border-gray-200 z-40 
                   ${isCollapsed ? 'w-16' : 'w-64'} 
                   fixed h-full transition-all duration-300 ease-in-out
                   md:relative md:translate-x-0
                   ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        initial={false}
        animate={{ width: isCollapsed ? 64 : 256 }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded">
              <Eye size={16} />
            </div>
            {!isCollapsed && (
              <span className="ml-2 text-lg font-semibold text-gray-800">DR Classify</span>
            )}
          </div>
          <button 
            onClick={toggleSidebar} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none hidden md:block"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-2 py-2 text-sm font-medium rounded-md 
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'}`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <div className={isCollapsed ? 'mx-auto' : ''}>
                  {item.icon}
                </div>
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </NavLink>
            ))}
          </div>
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;