import React from 'react';

const EarthAnimation = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="crackleFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#4CAF50">
      <animate attributeName="opacity" values="0;1" dur="3s" fill="freeze" />
    </rect>
    <g filter="url(#crackleFilter)">
      {[...Array(50)].map((_, i) => (
        <path
          key={i}
          d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
          fill="#2E7D32"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="8s"
            begin={`${i * 0.2}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="d"
            values={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100};M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
            dur="8s"
            begin={`${i * 0.2}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </g>
  </svg>
);

export default EarthAnimation;