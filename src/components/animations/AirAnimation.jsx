import React from 'react';

const AirAnimation = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="airGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.8">
          <animate attributeName="stop-color" values="#87CEEB;#E0F6FF;#87CEEB" dur="6s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#E0F6FF" stopOpacity="0.4">
          <animate attributeName="stop-color" values="#E0F6FF;#87CEEB;#E0F6FF" dur="6s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#airGradient)" />
    <g>
      {[...Array(15)].map((_, i) => (
        <path
          key={i}
          d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            values={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100};M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
            dur={`${15 + Math.random() * 10}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.7;0.3"
            dur={`${5 + Math.random() * 5}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </g>
  </svg>
);

export default AirAnimation;