import React from 'react';

const AirAnimation = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="airGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.8">
          <animate attributeName="stop-color" values="#87CEEB;#E0F6FF;#87CEEB" dur="8s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#E0F6FF" stopOpacity="0.4">
          <animate attributeName="stop-color" values="#E0F6FF;#87CEEB;#E0F6FF" dur="8s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#airGradient)">
      <animate attributeName="opacity" values="0;1" dur="3s" fill="freeze" />
    </rect>
    <g>
      {[...Array(10)].map((_, i) => (
        <path
          key={i}
          d={`M${-50 + i * 20},${50 + Math.sin(i) * 20} Q${25 + i * 20},${25 + Math.cos(i) * 25} ${100 + i * 20},${50 + Math.sin(i) * 20}`}
          stroke="#FFFFFF"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            values={`M${-50 + i * 20},${50 + Math.sin(i) * 20} Q${25 + i * 20},${25 + Math.cos(i) * 25} ${100 + i * 20},${50 + Math.sin(i) * 20};
                     M${-30 + i * 20},${60 + Math.cos(i) * 20} Q${45 + i * 20},${35 + Math.sin(i) * 25} ${120 + i * 20},${60 + Math.cos(i) * 20}`}
            dur="8s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-100,0;100,0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
      ))}
    </g>
  </svg>
);

export default AirAnimation;