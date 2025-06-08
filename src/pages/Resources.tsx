import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Users, 
  ExternalLink,
  Download
} from 'lucide-react';

const ResourceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  color: string;
}> = ({ title, description, icon, link, color }) => {
  return (
    <motion.div
      className="bg-white p-5 rounded-lg shadow-sm border-t-4"
      style={{ borderTopColor: color }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start">
        <div className="mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 text-sm hover:underline flex items-center"
            >
              Access resource <ExternalLink size={14} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Resources: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Educational Resources</h2>
        <p className="text-gray-600 mb-6">
          Access educational materials about diabetic retinopathy, from clinical guidelines to patient education.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <h3 className="text-md font-semibold text-blue-800 mb-1">Diabetic Retinopathy Classification Scale</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li><span className="font-medium">Grade 0:</span> No apparent retinopathy</li>
              <li><span className="font-medium">Grade 1:</span> Mild NPDR - microaneurysms only</li>
              <li><span className="font-medium">Grade 2:</span> Moderate NPDR - more than microaneurysms but less than severe NPDR</li>
              <li><span className="font-medium">Grade 3:</span> Severe NPDR - extensive intraretinal hemorrhages and other findings</li>
              <li><span className="font-medium">Grade 4:</span> Proliferative DR - neovascularization or vitreous/preretinal hemorrhage</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <h3 className="text-md font-semibold text-green-800 mb-1">Model Information</h3>
            <p className="text-sm text-green-700 mb-2">
              Our classification model is based on the ConvNeXt-Base architecture pre-trained on ImageNet and fine-tuned on the IDRiD dataset.
            </p>
            <p className="text-sm text-green-700">
              The model achieves 92% accuracy on our validation set with a weighted F1-score of 0.89 across all classes.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResourceCard
            title="Clinical Guidelines"
            description="International Clinical Diabetic Retinopathy Disease Severity Scale and management guidelines."
            icon={<BookOpen size={24} className="text-blue-600" />}
            link="https://www.aao.org/preferred-practice-pattern/diabetic-retinopathy-ppp"
            color="#2563EB"
          />
          
          <ResourceCard
            title="Research Papers"
            description="Latest research on deep learning for diabetic retinopathy classification."
            icon={<FileText size={24} className="text-purple-600" />}
            link="https://www.nature.com/articles/s41746-019-0172-3"
            color="#7C3AED"
          />
          
          <ResourceCard
            title="Training Videos"
            description="Educational videos on interpreting retinal images and classification outputs."
            icon={<Video size={24} className="text-red-600" />}
            link="https://www.youtube.com/c/EyecareProfessionals"
            color="#DC2626"
          />
          
          <ResourceCard
            title="Patient Education"
            description="Resources to help explain diabetic retinopathy to patients in clear, simple terms."
            icon={<Users size={24} className="text-green-600" />}
            link="https://www.diabetes.org/diabetes/complications/diabetes-and-vision-loss"
            color="#059669"
          />
          
          <ResourceCard
            title="Dataset Information"
            description="Details about the IDRiD dataset used for training the classification model."
            icon={<FileText size={24} className="text-amber-600" />}
            link="https://ieee-dataport.org/open-access/indian-diabetic-retinopathy-image-dataset-idrid"
            color="#D97706"
          />
          
          <ResourceCard
            title="Model Documentation"
            description="Technical documentation for the ConvNeXt-B model and implementation details."
            icon={<FileText size={24} className="text-gray-600" />}
            link="#"
            color="#4B5563"
          />
        </div>
      </motion.div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Downloadable Resources</h3>
        
        <div className="space-y-3">
          <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center">
            <div className="flex items-center">
              <FileText size={20} className="text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Diabetic Retinopathy Management Protocol</p>
                <p className="text-sm text-gray-500">PDF • 2.4MB • Updated May 2025</p>
              </div>
            </div>
            <Download size={18} className="text-gray-500" />
          </a>
          
          <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center">
            <div className="flex items-center">
              <FileText size={20} className="text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Patient Handout: Understanding Your DR Diagnosis</p>
                <p className="text-sm text-gray-500">PDF • 1.1MB • Updated April 2025</p>
              </div>
            </div>
            <Download size={18} className="text-gray-500" />
          </a>
          
          <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center">
            <div className="flex items-center">
              <FileText size={20} className="text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Retinal Imaging Best Practices Guide</p>
                <p className="text-sm text-gray-500">PDF • 3.7MB • Updated March 2025</p>
              </div>
            </div>
            <Download size={18} className="text-gray-500" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;