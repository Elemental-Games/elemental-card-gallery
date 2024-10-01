import React from 'react';

const EarthAnimation = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="earthPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#8B4513" />
        <circle cx="10" cy="10" r="8" fill="#A0522D" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#earthPattern)">
      <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
    </rect>
    <g>
      {[...Array(10)].map((_, i) => (
        <path
          key={i}
          d={`M${Math.random() * 100} ${Math.random() * 100} Q${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100}`}
          stroke="#228B22"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="d"
            values={`M${Math.random() * 100} ${Math.random() * 100} Q${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100};M${Math.random() * 100} ${Math.random() * 100} Q${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100}`}
            dur={`${20 + Math.random() * 10}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </g>
  </svg>
);

export default EarthAnimation;