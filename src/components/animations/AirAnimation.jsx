import React from 'react';

const AirAnimation = () => {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="airGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.8">
            <animate attributeName="stop-color" values="#87CEEB;#E0F6FF;#87CEEB" dur="16s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#E0F6FF" stopOpacity="0.4">
            <animate attributeName="stop-color" values="#E0F6FF;#87CEEB;#E0F6FF" dur="16s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#airGradient)" />
      <g>
        {[...Array(50)].map((_, i) => (
          <circle key={i} r="1" fill="#FFFFFF">
            <animate
              attributeName="cx"
              values={`${Math.random() * 100}%;${Math.random() * 100}%`}
              dur={`${16 + Math.random() * 16}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
            <animate
              attributeName="cy"
              values={`100%;-10%`}
              dur={`${16 + Math.random() * 16}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${16 + Math.random() * 16}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

export default AirAnimation;