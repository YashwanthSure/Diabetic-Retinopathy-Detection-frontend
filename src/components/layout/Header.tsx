import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/upload':
        return 'Image Upload';
      case '/history':
        return 'Patient History';
      case '/resources':
        return 'Resources';
      default:
        if (location.pathname.startsWith('/results/')) {
          return 'Classification Results';
        }
        return 'Diabetic Retinopathy Classification';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <Bell size={20} />
        </button>
        
        <div className="relative group">
          <button className="flex items-center space-x-2 text-gray-700">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="text-sm font-medium hidden md:block">{user?.name || 'Doctor'}</span>
          </button>
          
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
            <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <button 
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;