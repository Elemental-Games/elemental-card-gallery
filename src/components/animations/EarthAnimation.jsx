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
      {[...Array(10)].map((_, i) => (
        <rect key={i} width="100%" height="100%" fill="url(#crackPattern)" opacity="0">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="6s"
            begin={`${i * 0.5}s`}
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;5,5;0,0"
            dur="0.5s"
            begin={`${i * 0.5}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </g>
  </svg>
);

export default EarthAnimation;