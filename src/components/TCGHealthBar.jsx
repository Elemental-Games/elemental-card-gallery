import React from "react";

export default function HealthBar({ health, maxHealth, isPlayer }) {
  const percentage = Math.max(0, (health / maxHealth) * 100);
  
  // Determine color based on health
  let barColor = "from-green-500 to-emerald-600";
  if (percentage < 50) barColor = "from-yellow-500 to-orange-600";
  if (percentage < 25) barColor = "from-red-500 to-red-700";

  return (
    <div className="flex items-center gap-2">
      <span className="font-bold text-sm text-white">
        {health}/{maxHealth}
      </span>
      <div className="w-24 h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barColor} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
