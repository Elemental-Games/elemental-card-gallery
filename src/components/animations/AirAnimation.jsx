import React from 'react';

const AirAnimation = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
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
    <path d="M0,0 Q50,0 100,100 T200,100" fill="url(#airGradient)">
      <animate
        attributeName="d"
        values="
          M0,0 Q50,0 100,100 T200,100;
          M0,100 Q50,50 100,0 T200,50;
          M0,50 Q50,100 100,50 T200,0;
          M0,0 Q50,0 100,100 T200,100
        "
        dur="10s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1"
        dur="3s"
        fill="freeze"
      />
    </path>
  </svg>
);

export default AirAnimation;