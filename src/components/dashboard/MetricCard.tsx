import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  change,
  positive
}) => {
  return (
    <motion.div
      className="bg-white p-5 rounded-lg shadow-sm"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="flex items-end">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        {change && (
          <span className={`ml-2 text-xs ${positive ? 'text-green-600' : 'text-gray-600'}`}>
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default MetricCard;