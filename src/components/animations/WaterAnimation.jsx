import React from 'react';

const WaterAnimation = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0077be" stopOpacity="0.8">
          <animate attributeName="stop-color" values="#0077be;#4ac7ff;#0077be" dur="4s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#4ac7ff" stopOpacity="0.4">
          <animate attributeName="stop-color" values="#4ac7ff;#0077be;#4ac7ff" dur="4s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#waterGradient)" />
    <g>
      {[...Array(20)].map((_, i) => (
        <circle key={i} r="3" fill="#ffffff" opacity="0.5">
          <animate
            attributeName="cx"
            values={`${Math.random() * 100}%;${Math.random() * 100}%`}
            dur={`${10 + Math.random() * 20}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            values={`${Math.random() * 100}%;${Math.random() * 100}%`}
            dur={`${10 + Math.random() * 20}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="2;4;2"
            dur={`${3 + Math.random() * 3}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
  </svg>
);

export default WaterAnimation;