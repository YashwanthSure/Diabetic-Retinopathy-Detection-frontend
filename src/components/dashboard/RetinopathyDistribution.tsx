import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockData = [
  { name: 'Grade 0', count: 142, color: '#16A34A' },  // Healthy
  { name: 'Grade 1', count: 53, color: '#2563EB' },   // Mild
  { name: 'Grade 2', count: 23, color: '#CA8A04' },   // Moderate
  { name: 'Grade 3', count: 21, color: '#DC2626' },   // Severe
  { name: 'Grade 4', count: 17, color: '#7C2D12' },   // Proliferative
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-gray-600">Count: <span className="font-medium">{data.count}</span></p>
        <p className="text-sm text-gray-600">
          Percentage: <span className="font-medium">
            {Math.round((data.count / mockData.reduce((acc, curr) => acc + curr.count, 0)) * 100)}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const RetinopathyDistribution: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={mockData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" barSize={35} radius={[4, 4, 0, 0]}>
          {mockData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RetinopathyDistribution;