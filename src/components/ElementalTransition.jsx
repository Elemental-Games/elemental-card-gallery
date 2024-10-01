import React from 'react';
import { motion } from 'framer-motion';

const ElementalTransition = ({ element, children }) => {
  const getTransitionEffect = () => {
    switch (element) {
      case 'Fire':
        return (
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ff6600" stopOpacity="1">
                  <animate attributeName="stop-color" values="#ff6600;#ff9933;#ff6600" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#ff0000" stopOpacity="0">
                  <animate attributeName="stop-opacity" values="0;0.5;0" dur="4s" repeatCount="indefinite" />
                </stop>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#fireGradient)">
              <animate attributeName="opacity" values="0;1" dur="3s" fill="freeze" />
            </rect>
            <g>
              {[...Array(100)].map((_, i) => (
                <circle key={i} r="2" fill="#ff6600">
                  <animate
                    attributeName="cx"
                    values={`${Math.random() * 100}%;${Math.random() * 100}%`}
                    dur={`${4 + Math.random() * 4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.05}s`}
                  />
                  <animate
                    attributeName="cy"
                    values={`${100 + Math.random() * 10}%;-10%`}
                    dur={`${4 + Math.random() * 4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.05}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur={`${4 + Math.random() * 4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.05}s`}
                  />
                </circle>
              ))}
            </g>
          </svg>
        );
      case 'Water':
        return (
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#0077be" stopOpacity="0.8">
                  <animate attributeName="stop-color" values="#0077be;#4ac7ff;#0077be" dur="6s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#4ac7ff" stopOpacity="0">
                  <animate attributeName="stop-opacity" values="0;0.5;0" dur="6s" repeatCount="indefinite" />
                </stop>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="#0077be">
              <animate attributeName="opacity" values="0;1" dur="3s" fill="freeze" />
            </rect>
            <g>
              {[...Array(10)].map((_, i) => (
                <circle key={i} cx="50%" cy="50%" r="0" fill="none" stroke="url(#rippleGradient)" strokeWidth="2">
                  <animate
                    attributeName="r"
                    values="0;100%"
                    dur={`${6 + i * 1}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.5}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur={`${6 + i * 1}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.5}s`}
                  />
                </circle>
              ))}
            </g>
          </svg>
        );
      case 'Earth':
        return (
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
      case 'Air':
        return (
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
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {getTransitionEffect()}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ElementalTransition;