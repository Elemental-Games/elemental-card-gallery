import React from 'react';

const EarthAnimation = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="displacementFilter">
        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="50" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#4CAF50">
      <animate attributeName="opacity" values="0;1" dur="2s" fill="freeze" />
    </rect>
    <g filter="url(#displacementFilter)">
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
            dur="4s"
            begin={`${i * 0.1}s`}
            repeatCount="1"
          />
          <animate
            attributeName="d"
            values={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100};M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
            dur="4s"
            begin={`${i * 0.1}s`}
            repeatCount="1"
          />
        </path>
      ))}
    </g>
  </svg>
);

export default EarthAnimation;