import React from 'react';
import { motion } from 'framer-motion';
import FireAnimation from './animations/FireAnimation';
import WaterAnimation from './animations/WaterAnimation';
import EarthAnimation from './animations/EarthAnimation';
import AirAnimation from './animations/AirAnimation';

const ElementalTransition = ({ element, children }) => {
  const getTransitionEffect = () => {
    switch (element) {
      case 'Fire':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 5, ease: 'easeInOut' },
        };
      case 'Water':
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 2, opacity: 0 },
          transition: { duration: 5, ease: 'easeInOut' },
        };
      case 'Earth':
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5, ease: 'easeInOut', delay: 4.5 },
        };
      case 'Air':
        return {
          initial: { x: '-100%' },
          animate: { x: '0%' },
          exit: { x: '100%' },
          transition: { duration: 5, ease: 'easeInOut' },
        };
      case 'Neutral':
        return {
          initial: { rotate: 0, scale: 0 },
          animate: { rotate: 360, scale: 1 },
          exit: { rotate: 720, scale: 0 },
          transition: { duration: 5, ease: 'easeInOut' },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 1 },
        };
    }
  };

  const getElementalAnimation = () => {
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
              <linearGradient id="neutralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8A2BE2">
                  <animate attributeName="stop-color" values="#8A2BE2;#9400D3;#8A2BE2" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#9400D3">
                  <animate attributeName="stop-color" values="#9400D3;#8A2BE2;#9400D3" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#neutralGradient)">
              <animate attributeName="opacity" values="0;1" dur="3s" fill="freeze" />
            </rect>
            <g>
              {[...Array(20)].map((_, i) => (
                <circle
                  key={i}
                  cx={`${50 + 30 * Math.cos(i * Math.PI / 10)}%`}
                  cy={`${50 + 30 * Math.sin(i * Math.PI / 10)}%`}
                  r="5"
                  fill="#FFFFFF"
                >
                  <animate
                    attributeName="r"
                    values="5;10;5"
                    dur={`${3 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur={`${3 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  const transitionEffect = getTransitionEffect();

  return (
    <motion.div
      {...transitionEffect}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="relative w-full h-full">
        {getElementalAnimation()}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ElementalTransition;