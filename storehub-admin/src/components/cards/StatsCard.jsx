import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center hover:shadow-md transition-shadow">
      <div className={`p-4 rounded-xl mr-5 ${color || 'bg-gray-100 text-gray-500'}`}>
        {icon || 'Icon'}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-bold tracking-wider uppercase mb-1">{title}</p>
        <p className="text-3xl font-black text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
