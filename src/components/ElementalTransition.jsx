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
          initial: { opacity: 0, scale: 0.8, rotateY: -90 },
          animate: { opacity: 1, scale: 1, rotateY: 0 },
          exit: { opacity: 0, scale: 1.2, rotateY: 90 },
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        };
      case 'Earth':
        return {
          initial: { opacity: 0, scale: 1.2, rotateX: 90 },
          animate: { opacity: 1, scale: 1, rotateX: 0 },
          exit: { opacity: 0, scale: 0.8, rotateX: -90 },
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        };
      case 'Air':
        return {
          initial: { opacity: 0, scale: 1.5, rotateZ: 180 },
          animate: { opacity: 1, scale: 1, rotateZ: 0 },
          exit: { opacity: 0, scale: 0.5, rotateZ: -180 },
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        };
      case 'Water':
        return {
          initial: { opacity: 0, scale: 0.5, rotateY: 180 },
          animate: { opacity: 1, scale: 1, rotateY: 0 },
          exit: { opacity: 0, scale: 1.5, rotateY: -180 },
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 },
          transition: { duration: 0.5 },
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
      className="fixed inset-0 z-50 flex items-center justify-center perspective-1000"
    >
      <div className="relative w-full h-full">
        {getElementalAnimation()}
        <motion.div
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          exit={{ opacity: 0, z: 100 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ElementalTransition;