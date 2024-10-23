import React from 'react';

const AirAnimation = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-tr from-blue-200/50 to-white/50" />
      <div className="absolute inset-0 animate-spin-slow">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 bg-white/20 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 60}deg) translate(50px) rotate(-${i * 60}deg)`,
              animation: `float 2s infinite ${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AirAnimation;