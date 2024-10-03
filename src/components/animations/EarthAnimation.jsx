import React from 'react';

const EarthAnimation = () => {
  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="crackleFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#4CAF50" />
      <g filter="url(#crackleFilter)">
        {[...Array(20)].map((_, i) => (
          <rect
            key={i}
            x={`${i * 5}%`}
            y="100%"
            width="5%"
            height="0%"
            fill="#2E7D32"
          >
            <animate
              attributeName="height"
              values="0%;20%"
              dur={`${16 + Math.random() * 8}s`}
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${16 + Math.random() * 8}s`}
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
    </svg>
  );
};

export default EarthAnimation;