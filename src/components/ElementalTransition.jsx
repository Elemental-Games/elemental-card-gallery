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
            <rect width="100%" height="100%" fill="#0077be" opacity="0">
              <animate attributeName="opacity" values="0;0.5;1" dur="2s" fill="freeze" />
            </rect>
            <g>
              {[...Array(20)].map((_, i) => (
                <circle key={i} cx="50%" cy="50%" r="0" fill="none" stroke="url(#rippleGradient)" strokeWidth="2">
                  <animate
                    attributeName="r"
                    values="0;100%"
                    dur={`${4 + i * 0.5}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.2}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur={`${4 + i * 0.5}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.2}s`}
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
              <filter id="displacementFilter">
                <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
                <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="50" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="#8B4513">
              <animate attributeName="opacity" values="1;0" dur="3s" fill="freeze" />
            </rect>
            <g filter="url(#displacementFilter)">
              {[...Array(50)].map((_, i) => (
                <path
                  key={i}
                  d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
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
            <rect width="100%" height="100%" fill="url(#airGradient)">
              <animate attributeName="opacity" values="0;1" dur="2s" fill="freeze" />
            </rect>
            {[...Array(100)].map((_, i) => (
              <path
                key={i}
                d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.5;0"
                  dur={`${3 + Math.random() * 2}s`}
                  begin={`${i * 0.1}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="d"
                  values={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100};M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
                  dur={`${3 + Math.random() * 2}s`}
                  begin={`${i * 0.1}s`}
                  repeatCount="indefinite"
                />
              </path>
            ))}
          </svg>
        );
      case 'Neutral':
        return (
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="neutralGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#8A2BE2" stopOpacity="1">
                  <animate attributeName="stop-color" values="#8A2BE2;#9370DB;#8A2BE2" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#9370DB" stopOpacity="0.4">
                  <animate attributeName="stop-color" values="#9370DB;#8A2BE2;#9370DB" dur="8s" repeatCount="indefinite" />
                </stop>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#neutralGradient)">
              <animate attributeName="opacity" values="0;1" dur="2s" fill="freeze" />
            </rect>
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r="0"
                fill="#FFFFFF"
                opacity="0"
              >
                <animate
                  attributeName="r"
                  values="0;20;0"
                  dur={`${5 + Math.random() * 5}s`}
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.5;0"
                  dur={`${5 + Math.random() * 5}s`}
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
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