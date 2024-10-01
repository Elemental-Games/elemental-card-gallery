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
          transition: { duration: 3, ease: 'easeInOut' },
        };
      case 'Water':
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 2, opacity: 0 },
          transition: { duration: 3, ease: 'easeInOut' },
        };
      case 'Earth':
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5, ease: 'easeInOut', delay: 2.5 },
        };
      case 'Air':
        return {
          initial: { x: '-100%' },
          animate: { x: '0%' },
          exit: { x: '100%' },
          transition: { duration: 3, ease: 'easeInOut' },
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
          transition={{ duration: 1, delay: 2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ElementalTransition;