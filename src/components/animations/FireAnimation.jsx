import React, { useState, useEffect } from 'react';

const FireAnimation = () => {
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionComplete(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity="1">
            <animate attributeName="stop-color" values="#ff6600;#ff9933;#ff6600" dur={transitionComplete ? "8s" : "4s"} repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#ff0000" stopOpacity="0">
            <animate attributeName="stop-opacity" values="0;0.5;0" dur={transitionComplete ? "8s" : "4s"} repeatCount="indefinite" />
          </stop>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#fireGradient)" />
      <g>
        {[...Array(200)].map((_, i) => (
          <circle key={i} r="2" fill="#ff6600">
            <animate
              attributeName="cx"
              values={`${Math.random() * 100}%;${Math.random() * 100}%`}
              dur={`${transitionComplete ? 16 + Math.random() * 16 : 8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.05}s`}
            />
            <animate
              attributeName="cy"
              values={`${100 + Math.random() * 10}%;-10%`}
              dur={`${transitionComplete ? 16 + Math.random() * 16 : 8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.05}s`}
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${transitionComplete ? 16 + Math.random() * 16 : 8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.05}s`}
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

export default FireAnimation;