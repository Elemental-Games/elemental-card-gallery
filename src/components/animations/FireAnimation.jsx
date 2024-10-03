import React from 'react';

const FireAnimation = () => {
  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity="1">
            <animate attributeName="stop-color" values="#ff6600;#ff9933;#ff6600" dur="8s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#ff0000" stopOpacity="0">
            <animate attributeName="stop-opacity" values="0;0.5;0" dur="8s" repeatCount="indefinite" />
          </stop>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#fireGradient)" />
      <g>
        {[...Array(50)].map((_, i) => (
          <circle key={i} r="2" fill="#ff6600">
            <animate
              attributeName="cx"
              values={`${Math.random() * 100}%;${Math.random() * 100}%`}
              dur={`${8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
            <animate
              attributeName="cy"
              values={`120%;70%`}
              dur={`${8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

export default FireAnimation;