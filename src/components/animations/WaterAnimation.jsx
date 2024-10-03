import React from 'react';

const WaterAnimation = () => {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#0077be" stopOpacity="0.8">
            <animate attributeName="stop-color" values="#0077be;#4ac7ff;#0077be" dur="12s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#4ac7ff" stopOpacity="0">
            <animate attributeName="stop-opacity" values="0;0.5;0" dur="12s" repeatCount="indefinite" />
          </stop>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="#0077be" />
      <g>
        {[...Array(10)].map((_, i) => (
          <path key={i} d="" fill="none" stroke="url(#rippleGradient)" strokeWidth="2">
            <animate
              attributeName="d"
              values={`M0,${100 + i * 10} Q${25 + Math.random() * 50},${95 + i * 10} ${50 + Math.random() * 50},${100 + i * 10} T100,${100 + i * 10};
                       M0,${100 + i * 10} Q${25 + Math.random() * 50},${105 + i * 10} ${50 + Math.random() * 50},${100 + i * 10} T100,${100 + i * 10}`}
              dur="12s"
              repeatCount="indefinite"
              begin={`${i * 1}s`}
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="12s"
              repeatCount="indefinite"
              begin={`${i * 1}s`}
            />
          </path>
        ))}
      </g>
    </svg>
  );
};

export default WaterAnimation;