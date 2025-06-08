import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Share2, ArrowLeft, Printer } from 'lucide-react';
import GradeIndicator from '../components/results/GradeIndicator';

// Mock data - would normally come from API
const mockScanData = {
  id: 'scan-128',
  patientId: 'P-5692',
  patientName: 'Robert Johnson',
  patientAge: 62,
  patientGender: 'Male',
  date: '2025-05-22T10:15:00',
  scanType: 'Fundus Photography',
  eye: 'Right',
  grade: 2,
  confidence: 93.7,
  notes: '',
  imageUrl: 'https://images.pexels.com/photos/5726796/pexels-photo-5726796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};

const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [scanData, setScanData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      // Use the mock data (in real app would fetch based on ID)
      setScanData(mockScanData);
      setNotes(mockScanData.notes);
      setLoading(false);
    }, 1000);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleSaveNotes = () => {
    // Simulate saving notes to API
    setScanData({ ...scanData, notes });
    // Show success message
    alert('Notes saved successfully');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!scanData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900">Scan not found</h3>
        <p className="mt-2 text-gray-600">The scan you're looking for could not be found.</p>
        <Link to="/dashboard" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" /> Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Image */}
        <motion.div 
          className="lg:w-1/2 bg-white p-5 rounded-lg shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Retinal Image</h3>
            <div className="flex space-x-2">
              <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Download size={18} />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Share2 size={18} />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Printer size={18} />
              </button>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden bg-black flex items-center justify-center">
            <img 
              src={scanData.imageUrl} 
              alt="Retinal scan" 
              className="max-w-full max-h-[500px] object-contain"
            />
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="text-xs bg-gray-100 px-2 py-1 rounded">
              <span className="font-medium">Type:</span> {scanData.scanType}
            </div>
            <div className="text-xs bg-gray-100 px-2 py-1 rounded">
              <span className="font-medium">Eye:</span> {scanData.eye}
            </div>
            <div className="text-xs bg-gray-100 px-2 py-1 rounded">
              <span className="font-medium">Date:</span> {formatDate(scanData.date)}
            </div>
          </div>
        </motion.div>
        
        {/* Right column - Results */}
        <motion.div 
          className="lg:w-1/2 space-y-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Patient info */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-800 font-medium">{scanData.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID</p>
                <p className="text-gray-800 font-medium">{scanData.patientId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="text-gray-800 font-medium">{scanData.patientAge}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-gray-800 font-medium">{scanData.patientGender}</p>
              </div>
            </div>
          </div>
          
          {/* Classification result */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Classification Result</h3>
            <GradeIndicator grade={scanData.grade} confidence={scanData.confidence} />
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Actions</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {scanData.grade === 0 && (
                  <>
                    <li>Routine screening in 12 months</li>
                    <li>Encourage good glycemic control</li>
                  </>
                )}
                {scanData.grade === 1 && (
                  <>
                    <li>Follow-up screening in 6-12 months</li>
                    <li>Optimize diabetes management</li>
                    <li>Monitor for progression</li>
                  </>
                )}
                {scanData.grade === 2 && (
                  <>
                    <li>Refer to ophthalmologist within 3 months</li>
                    <li>Tight glycemic and blood pressure control</li>
                    <li>Follow-up retinal assessment in 4-6 months</li>
                  </>
                )}
                {scanData.grade >= 3 && (
                  <>
                    <li>Urgent referral to ophthalmologist (within 1 month)</li>
                    <li>Consider laser photocoagulation treatment</li>
                    <li>Strict control of diabetes and hypertension</li>
                    <li>Close monitoring required</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          {/* Doctor's notes */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Doctor's Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add clinical notes here..."
            />
            <div className="mt-3 flex justify-end">
              <button 
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Save Notes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;