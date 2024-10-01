import React from 'react';
import { motion } from 'framer-motion';
import FireAnimation from './animations/FireAnimation';
import WaterAnimation from './animations/WaterAnimation';
import AirAnimation from './animations/AirAnimation';
import EarthAnimation from './animations/EarthAnimation';

const ElementalTransition = ({ element, children }) => {
  const getTransitionEffect = () => {
    switch (element) {
      case 'Fire':
        return <FireAnimation />;
      case 'Water':
        return <WaterAnimation />;
      case 'Earth':
        return <EarthAnimation />;
      case 'Air':
        return <AirAnimation />;
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