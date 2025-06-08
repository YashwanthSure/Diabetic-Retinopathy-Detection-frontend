import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GradeIndicatorProps {
  grade: number;
  confidence: number;
}

const GradeIndicator: React.FC<GradeIndicatorProps> = ({ grade, confidence }) => {
  const getGradeInfo = (grade: number) => {
    switch (grade) {
      case 0:
        return {
          label: 'No Diabetic Retinopathy',
          description: 'No abnormalities detected in the retina.',
          icon: <CheckCircle size={24} />,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 1:
        return {
          label: 'Mild NPDR',
          description: 'Presence of microaneurysms only.',
          icon: <AlertCircle size={24} />,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 2:
        return {
          label: 'Moderate NPDR',
          description: 'Microaneurysms and some other abnormalities.',
          icon: <AlertCircle size={24} />,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 3:
        return {
          label: 'Severe NPDR',
          description: 'More extensive damage to the retina.',
          icon: <AlertTriangle size={24} />,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 4:
        return {
          label: 'Proliferative DR',
          description: 'Advanced disease with abnormal blood vessel growth.',
          icon: <AlertTriangle size={24} />,
          color: 'text-red-800',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-300'
        };
      default:
        return {
          label: 'Unknown',
          description: 'Classification not available',
          icon: <AlertCircle size={24} />,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const info = getGradeInfo(grade);

  return (
    <motion.div 
      className={`rounded-lg p-4 ${info.bgColor} border ${info.borderColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start">
        <div className={`mr-3 ${info.color}`}>
          {info.icon}
        </div>
        <div>
          <h3 className={`text-lg font-semibold mb-1 ${info.color}`}>
            Grade {grade}: {info.label}
          </h3>
          <p className="text-gray-700 text-sm mb-2">
            {info.description}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-gray-700 text-sm mr-2">Confidence:</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[200px]">
              <div 
                className={`h-2.5 rounded-full ${confidence > 90 ? 'bg-green-600' : confidence > 75 ? 'bg-blue-600' : 'bg-yellow-500'}`}
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <span className="text-gray-700 text-sm font-medium">{confidence.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GradeIndicator;