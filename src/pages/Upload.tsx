import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, X, Info, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      
      // Check if file is an image
      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      setFile(selectedFile);
      
      // Create preview
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.tiff']
    },
    maxFiles: 1
  });

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please upload an image');
      return;
    }
    
    if (!patientId || !patientName) {
      toast.error('Please enter patient information');
      return;
    }
    
    setUploading(true);
    
    // Simulate upload and processing
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to results page
      toast.success('Image uploaded successfully');
      navigate('/results/scan-128');
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Retinal Image</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info size={20} className="text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Please upload a high-quality fundus photograph for optimal classification results.
                Supported formats: JPG, PNG, TIFF.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            {!file ? (
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <input {...getInputProps()} />
                <UploadIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-700 mb-2">
                  {isDragActive ? 'Drop the image here' : 'Drag and drop a retinal image, or click to select'}
                </p>
                <p className="text-gray-500 text-sm">
                  Recommended: Fundus photographs, 45° field of view
                </p>
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{file.name}</h4>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={clearSelection}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-gray-100 flex justify-center">
                  {preview && (
                    <img 
                      src={preview} 
                      alt="Retina scan preview" 
                      className="max-h-64 object-contain"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="patient-id" className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                id="patient-id"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., P-1234"
                required
              />
            </div>
            
            <div>
              <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                id="patient-name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., John Doe"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={uploading || !file}
              className={`py-2 px-6 rounded-lg flex items-center ${
                !file ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Eye className="mr-2" size={18} />
                  Analyze Image
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Guidelines</h3>
        
        <div className="space-y-3 text-sm text-gray-700">
          <p className="flex items-start">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Image should be a clear, focused fundus photograph of the retina</span>
          </p>
          <p className="flex items-start">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>Ensure proper lighting and minimal artifacts</span>
          </p>
          <p className="flex items-start">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>Standard 45-degree field of view is recommended</span>
          </p>
          <p className="flex items-start">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>Images should be in JPEG, PNG, or TIFF format</span>
          </p>
          <p className="flex items-start">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">5</span>
            <span>File size should be below 10MB for optimal processing</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload;