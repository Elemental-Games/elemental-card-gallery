import React from 'react';
import { motion } from 'framer-motion';

const ElementalTransition = ({ element, children }) => {
  const getTransitionEffect = () => {
    switch (element) {
      case 'Fire':
        return {
          initial: { opacity: 0, scale: 0.8, rotateY: -90 },
          animate: { opacity: 1, scale: 1, rotateY: 0 },
          exit: { opacity: 0, scale: 1.2, rotateY: 90 },
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          style: {
            background: 'url("/images/fire-embers.gif")',
            backgroundSize: 'cover',
            boxShadow: '0 0 50px rgba(255, 0, 0, 0.5) inset',
          },
        };
      case 'Earth':
        return {
          initial: { opacity: 0, scale: 1.2, rotateX: 90 },
          animate: { opacity: 1, scale: 1, rotateX: 0 },
          exit: { opacity: 0, scale: 0.8, rotateX: -90 },
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          style: {
            background: 'url("/images/earth-texture.jpg")',
            backgroundSize: 'cover',
            boxShadow: '0 0 50px rgba(139, 69, 19, 0.5) inset',
          },
        };
      case 'Air':
        return {
          initial: { opacity: 0, scale: 1.5, rotateZ: 180 },
          animate: { opacity: 1, scale: 1, rotateZ: 0 },
          exit: { opacity: 0, scale: 0.5, rotateZ: -180 },
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          style: {
            background: 'url("/images/air-clouds.gif")',
            backgroundSize: 'cover',
            boxShadow: '0 0 50px rgba(135, 206, 235, 0.5) inset',
          },
        };
      case 'Water':
        return {
          initial: { opacity: 0, scale: 0.5, rotateY: 180 },
          animate: { opacity: 1, scale: 1, rotateY: 0 },
          exit: { opacity: 0, scale: 1.5, rotateY: -180 },
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          style: {
            background: 'url("/images/water-ripples.gif")',
            backgroundSize: 'cover',
            boxShadow: '0 0 50px rgba(0, 0, 255, 0.5) inset',
          },
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 },
          transition: { duration: 0.5 },
          style: { background: '#800080' },
        };
    }
  };

  const transitionEffect = getTransitionEffect();

  return (
    <motion.div
      {...transitionEffect}
      className="fixed inset-0 z-50 flex items-center justify-center perspective-1000"
    >
      <div className="relative w-full h-full">
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