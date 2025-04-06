
import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  value, 
  label,
  bgColor = "bg-green-800"
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex">
      <div className={`${bgColor} text-white p-4 flex items-center justify-center`}>
        {icon}
      </div>
      <div className="p-4 flex-1">
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
