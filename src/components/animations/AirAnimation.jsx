import React, { useState, useEffect } from 'react';

const AirAnimation = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
    }, 6500); // 1.5s initial delay + 5s display time
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'opacity 1s', opacity }}>
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
      <rect width="100%" height="100%" fill="url(#airGradient)" />
      <g>
        {[...Array(200)].map((_, i) => (
          <circle key={i} r="1" fill="#FFFFFF">
            <animate
              attributeName="cx"
              values={`-5%;${100 + Math.random() * 10}%`}
              dur={`${8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.05}s`}
            />
            <animate
              attributeName="cy"
              values={`${Math.random() * 100}%;${Math.random() * 100}%`}
              dur={`${8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.05}s`}
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${8 + Math.random() * 8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.05}s`}
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

export default AirAnimation;