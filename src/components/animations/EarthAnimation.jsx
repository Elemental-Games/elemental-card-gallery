import React from 'react';

const EarthAnimation = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="crackPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0 90 Q 50 10 100 90" fill="none" stroke="#5D4037" strokeWidth="2">
          <animate attributeName="d" values="M0 90 Q 50 10 100 90;M0 10 Q 50 90 100 10;M0 90 Q 50 10 100 90" dur="6s" repeatCount="indefinite" />
        </path>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="#8B4513">
      <animate attributeName="opacity" values="0;1" dur="3s" fill="freeze" />
    </rect>
    <g>
      {[...Array(50)].map((_, i) => (
        <rect
          key={i}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          width="50"
          height="50"
          fill="#8B4513"
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
            attributeName="y"
            values={`${Math.random() * 100}%;110%`}
            dur="4s"
            begin={`${i * 0.1}s`}
            repeatCount="1"
            fill="freeze"
          />
        </rect>
      ))}
    </g>
  </svg>
);

export default EarthAnimation;