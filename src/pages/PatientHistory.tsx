import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Calendar, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const mockPatientScans = [
  {
    id: 'scan-123',
    patientId: 'P-5692',
    patientName: 'Robert Johnson',
    date: '2025-05-21T14:23:00',
    age: 62,
    gender: 'Male',
    grade: 0,
    change: 'stable'
  },
  {
    id: 'scan-100',
    patientId: 'P-5692',
    patientName: 'Robert Johnson',
    date: '2025-02-15T10:30:00',
    age: 62,
    gender: 'Male',
    grade: 0,
    change: 'stable'
  },
  {
    id: 'scan-124',
    patientId: 'P-4821',
    patientName: 'Maria Garcia',
    date: '2025-05-21T11:05:00',
    age: 57,
    gender: 'Female',
    grade: 3,
    change: 'worsened'
  },
  {
    id: 'scan-101',
    patientId: 'P-4821',
    patientName: 'Maria Garcia',
    date: '2025-02-20T13:45:00',
    age: 57,
    gender: 'Female',
    grade: 2,
    change: 'stable'
  },
  {
    id: 'scan-125',
    patientId: 'P-3219',
    patientName: 'David Lee',
    date: '2025-05-20T16:48:00',
    age: 45,
    gender: 'Male',
    grade: 1,
    change: 'improved'
  },
  {
    id: 'scan-102',
    patientId: 'P-3219',
    patientName: 'David Lee',
    date: '2025-01-10T09:15:00',
    age: 45,
    gender: 'Male',
    grade: 2,
    change: 'stable'
  },
  {
    id: 'scan-126',
    patientId: 'P-7103',
    patientName: 'Emily Wilson',
    date: '2025-05-20T10:12:00',
    age: 69,
    gender: 'Female',
    grade: 2,
    change: 'stable'
  },
  {
    id: 'scan-103',
    patientId: 'P-7103',
    patientName: 'Emily Wilson',
    date: '2025-03-05T14:20:00',
    age: 69,
    gender: 'Female',
    grade: 2,
    change: 'new'
  },
  {
    id: 'scan-127',
    patientId: 'P-6287',
    patientName: 'Samantha Brown',
    date: '2025-05-19T15:30:00',
    age: 54,
    gender: 'Female',
    grade: 4,
    change: 'worsened'
  },
  {
    id: 'scan-104',
    patientId: 'P-6287',
    patientName: 'Samantha Brown',
    date: '2025-04-12T11:40:00',
    age: 54,
    gender: 'Female',
    grade: 3,
    change: 'worsened'
  }
];

const PatientHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScans, setFilteredScans] = useState(mockPatientScans);
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const togglePatientExpansion = (patientId: string) => {
    if (expandedPatient === patientId) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(patientId);
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredScans(mockPatientScans);
    } else {
      const filtered = mockPatientScans.filter(scan => 
        scan.patientName.toLowerCase().includes(term.toLowerCase()) ||
        scan.patientId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredScans(filtered);
    }
  };
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  
  // Group scans by patient
  const groupedScans = filteredScans.reduce((groups: any, scan) => {
    const patientId = scan.patientId;
    if (!groups[patientId]) {
      groups[patientId] = [];
    }
    groups[patientId].push(scan);
    return groups;
  }, {});
  
  // Get unique patients and their latest scan
  const patients = Object.keys(groupedScans).map(patientId => {
    const patientScans = groupedScans[patientId];
    // Sort by date
    patientScans.sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return patientScans[0]; // Return the most recent scan
  });
  
  // Sort patients by name
  patients.sort((a, b) => {
    const compareValue = a.patientName.localeCompare(b.patientName);
    return sortDirection === 'asc' ? compareValue : -compareValue;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const getGradeLabel = (grade: number) => {
    switch (grade) {
      case 0: return { label: 'No DR', color: 'bg-green-100 text-green-800' };
      case 1: return { label: 'Mild', color: 'bg-blue-100 text-blue-800' };
      case 2: return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' };
      case 3: return { label: 'Severe', color: 'bg-red-100 text-red-800' };
      case 4: return { label: 'Proliferative', color: 'bg-red-200 text-red-900' };
      default: return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const getChangeIndicator = (change: string) => {
    switch (change) {
      case 'improved':
        return { label: 'Improved', color: 'text-green-600', icon: '↑' };
      case 'worsened':
        return { label: 'Worsened', color: 'text-red-600', icon: '↓' };
      case 'stable':
        return { label: 'Stable', color: 'text-blue-600', icon: '→' };
      case 'new':
        return { label: 'New', color: 'text-purple-600', icon: '•' };
      default:
        return { label: 'Unknown', color: 'text-gray-600', icon: '•' };
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Patient History</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search patients..."
            />
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Calendar size={16} className="mr-2 text-gray-600" />
              <span className="text-sm text-gray-700">Date</span>
            </button>
            
            <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={16} className="mr-2 text-gray-600" />
              <span className="text-sm text-gray-700">Filters</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={toggleSortDirection}
                >
                  <div className="flex items-center">
                    Patient
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transform transition-transform ${
                        sortDirection === 'desc' ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age/Gender
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Latest Scan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.length > 0 ? (
                patients.map(patient => {
                  const gradeInfo = getGradeLabel(patient.grade);
                  const changeInfo = getChangeIndicator(patient.change);
                  const patientScans = groupedScans[patient.patientId];
                  
                  return (
                    <React.Fragment key={patient.patientId}>
                      <tr 
                        className={`hover:bg-gray-50 ${expandedPatient === patient.patientId ? 'bg-gray-50' : ''}`}
                        onClick={() => togglePatientExpansion(patient.patientId)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <ChevronDown 
                              size={16} 
                              className={`mr-2 transform transition-transform ${
                                expandedPatient === patient.patientId ? 'rotate-180' : ''
                              }`} 
                            />
                            {patient.patientName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{patient.patientId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.age} / {patient.gender}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(patient.date)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${gradeInfo.color}`}>
                            {gradeInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center text-sm ${changeInfo.color}`}>
                            <span className="mr-1 font-bold">{changeInfo.icon}</span>
                            {changeInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/results/${patient.id}`} className="text-blue-600 hover:text-blue-900">
                            View
                          </Link>
                        </td>
                      </tr>
                      
                      {/* Expanded view */}
                      {expandedPatient === patient.patientId && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 bg-gray-50">
                            <div className="text-sm text-gray-800">
                              <h4 className="font-medium mb-2">Scan History</h4>
                              <div className="space-y-3">
                                {patientScans.map((scan: any, index: number) => (
                                  <div key={scan.id} className="border-l-2 border-blue-400 pl-3 py-1">
                                    <div className="flex justify-between">
                                      <div>
                                        <span className="font-medium">{formatDate(scan.date)}</span>
                                        <span className="mx-2">•</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getGradeLabel(scan.grade).color}`}>
                                          Grade {scan.grade}
                                        </span>
                                      </div>
                                      <Link to={`/results/${scan.id}`} className="text-blue-600 hover:text-blue-900 text-sm">
                                        <FileText size={16} className="inline mr-1" />
                                        Details
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    <p className="text-lg">No patients match your search criteria</p>
                    <p className="mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientHistory;