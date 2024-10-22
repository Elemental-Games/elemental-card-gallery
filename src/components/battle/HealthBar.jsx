import React from 'react';

const HealthBar = ({ health, maxHealth, label }) => {
  const getHealthColor = (health, maxHealth = 500) => {
    const percentage = (health / maxHealth) * 100;
    if (percentage > 66) return 'bg-gradient-to-r from-green-500 to-green-400';
    if (percentage > 33) return 'bg-gradient-to-r from-yellow-500 to-yellow-400';
    return 'bg-gradient-to-r from-red-500 to-red-400';
  };

  return (
    <div className="w-full mb-4 px-2">
      <div className="flex justify-between mb-1 tracking-wide">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm">{health}/{maxHealth}</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getHealthColor(health, maxHealth)} transition-all duration-300`}
          style={{ width: `${(health / maxHealth) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default HealthBar;