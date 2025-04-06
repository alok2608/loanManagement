
import React from "react";

interface RecoveryCardProps {
  title: string;
  description: string;
  percentage: number;
  color: string;
}

const RecoveryCard: React.FC<RecoveryCardProps> = ({
  title,
  description,
  percentage,
  color,
}) => {
  return (
    <div className={`rounded-lg shadow-sm p-4 mb-6 ${color}`}>
      <h3 className="text-md font-medium mb-2">{title}</h3>
      <p className="text-sm mb-2">{description}</p>
      <div className="flex items-end">
        <span className="text-3xl font-bold">{percentage}%</span>
        <div className="ml-auto">
          <svg width="50" height="40" viewBox="0 0 50 40">
            <rect x="0" y="15" width="8" height="25" fill="rgba(255,255,255,0.5)" />
            <rect x="12" y="5" width="8" height="35" fill="rgba(255,255,255,0.5)" />
            <rect x="24" y="0" width="8" height="40" fill="rgba(255,255,255,0.5)" />
            <rect x="36" y="10" width="8" height="30" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RecoveryCard;
