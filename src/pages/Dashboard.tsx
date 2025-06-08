import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Eye as EyeIcon, 
  ChevronRight, 
  BarChart3,
  Upload,
  History,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricCard from '../components/dashboard/MetricCard';
import RecentScans from '../components/dashboard/RecentScans';
import RetinopathyDistribution from '../components/dashboard/RetinopathyDistribution';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Welcome back, {user?.name || 'Doctor'}
        </h2>
        <p className="text-gray-600">
          Here's an overview of diabetic retinopathy classifications and patient scans.
        </p>
      </motion.div>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Scans"
          value="256"
          icon={<EyeIcon size={20} className="text-blue-600" />}
          change="+12% from last month"
          positive={true}
        />
        <MetricCard 
          title="Healthy (Grade 0)"
          value="142"
          icon={<CheckCircle size={20} className="text-green-600" />}
          change="55.5% of total"
        />
        <MetricCard 
          title="Severe Cases (Grade 3-4)"
          value="38"
          icon={<AlertTriangle size={20} className="text-red-600" />}
          change="+4 new cases"
          positive={false}
        />
        <MetricCard 
          title="Pending Reviews"
          value="8"
          icon={<BarChart3 size={20} className="text-amber-600" />}
          change="Needs attention"
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Retinopathy Grade Distribution</h3>
            <div className="text-sm text-gray-500">Last 30 days</div>
          </div>
          <RetinopathyDistribution />
        </motion.div>
        
        {/* Quick actions */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/upload" className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <Upload size={16} />
                </div>
                <span className="ml-3 font-medium text-blue-800">Upload New Scan</span>
              </div>
              <ChevronRight size={16} className="text-blue-600" />
            </Link>
            
            <Link to="/history" className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <History size={16} />
                </div>
                <span className="ml-3 font-medium text-green-800">View Patient History</span>
              </div>
              <ChevronRight size={16} className="text-green-600" />
            </Link>
            
            <Link to="/resources" className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                  <FileText size={16} />
                </div>
                <span className="ml-3 font-medium text-purple-800">Educational Resources</span>
              </div>
              <ChevronRight size={16} className="text-purple-600" />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Recent scans */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Scans</h3>
          <Link to="/history" className="text-sm text-blue-600 hover:underline flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <RecentScans />
      </motion.div>
    </div>
  );
};

export default Dashboard;