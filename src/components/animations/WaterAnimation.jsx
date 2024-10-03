import React, { useState, useEffect } from 'react';

const WaterAnimation = () => {
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
        <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#0077be" stopOpacity="0.8">
            <animate attributeName="stop-color" values="#0077be;#4ac7ff;#0077be" dur={transitionComplete ? "12s" : "6s"} repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#4ac7ff" stopOpacity="0">
            <animate attributeName="stop-opacity" values="0;0.5;0" dur={transitionComplete ? "12s" : "6s"} repeatCount="indefinite" />
          </stop>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="#0077be" />
      <g>
        {[...Array(20)].map((_, i) => (
          <circle key={i} cx="50%" cy="50%" r="0" fill="none" stroke="url(#rippleGradient)" strokeWidth="2">
            <animate
              attributeName="r"
              values="0;100%"
              dur={`${transitionComplete ? 24 + i * 4 : 12 + i * 2}s`}
              repeatCount="indefinite"
              begin={`${i * 1}s`}
            />
            <animate
              attributeName="opacity"
              values="1;0"
              dur={`${transitionComplete ? 24 + i * 4 : 12 + i * 2}s`}
              repeatCount="indefinite"
              begin={`${i * 1}s`}
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

export default WaterAnimation;