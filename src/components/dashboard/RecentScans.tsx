import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, AlertCircle, Eye } from 'lucide-react';

const mockRecentScans = [
  {
    id: 'scan-123',
    patientId: 'P-5692',
    patientName: 'Robert Johnson',
    date: '2025-05-21T14:23:00',
    grade: 0,
    confidence: 98.2,
  },
  {
    id: 'scan-124',
    patientId: 'P-4821',
    patientName: 'Maria Garcia',
    date: '2025-05-21T11:05:00',
    grade: 3,
    confidence: 93.7,
  },
  {
    id: 'scan-125',
    patientId: 'P-3219',
    patientName: 'David Lee',
    date: '2025-05-20T16:48:00',
    grade: 1,
    confidence: 95.1,
  },
  {
    id: 'scan-126',
    patientId: 'P-7103',
    patientName: 'Emily Wilson',
    date: '2025-05-20T10:12:00',
    grade: 2,
    confidence: 89.5,
  },
  {
    id: 'scan-127',
    patientId: 'P-6287',
    patientName: 'Samantha Brown',
    date: '2025-05-19T15:30:00',
    grade: 4,
    confidence: 96.3,
  }
];

const RecentScans: React.FC = () => {
  const getGradeInfo = (grade: number) => {
    switch (grade) {
      case 0:
        return { 
          label: 'No DR', 
          icon: <CheckCircle size={16} className="text-green-600" />,
          color: 'bg-green-50 text-green-800' 
        };
      case 1:
        return { 
          label: 'Mild', 
          icon: <Eye size={16} className="text-blue-600" />,
          color: 'bg-blue-50 text-blue-800' 
        };
      case 2:
        return { 
          label: 'Moderate', 
          icon: <AlertCircle size={16} className="text-yellow-600" />,
          color: 'bg-yellow-50 text-yellow-800' 
        };
      case 3:
        return { 
          label: 'Severe', 
          icon: <AlertTriangle size={16} className="text-red-600" />,
          color: 'bg-red-50 text-red-800' 
        };
      case 4:
        return { 
          label: 'Proliferative', 
          icon: <AlertTriangle size={16} className="text-red-900" />,
          color: 'bg-red-100 text-red-900' 
        };
      default:
        return { 
          label: 'Unknown', 
          icon: <Eye size={16} className="text-gray-600" />,
          color: 'bg-gray-50 text-gray-800' 
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Classification
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Confidence
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockRecentScans.map((scan) => {
            const gradeInfo = getGradeInfo(scan.grade);
            
            return (
              <tr key={scan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {scan.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {scan.patientId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(scan.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${gradeInfo.color}`}>
                    <span className="mr-1">{gradeInfo.icon}</span> Grade {scan.grade} - {gradeInfo.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {scan.confidence.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/results/${scan.id}`} className="text-blue-600 hover:text-blue-900">
                    View details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentScans;