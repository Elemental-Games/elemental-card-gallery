import React from 'react';
import { motion } from 'framer-motion';

const ElementalTransition = ({ element, children }) => {
  const getTransitionEffect = () => {
    switch (element) {
      case 'Fire':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5 },
          style: {
            background: 'linear-gradient(45deg, #ff0000, #ff8c00)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          },
        };
      case 'Earth':
        return {
          initial: { y: '100%' },
          animate: { y: 0 },
          exit: { y: '-100%' },
          transition: { duration: 0.5, ease: 'easeInOut' },
          style: { background: '#8B4513' },
        };
      case 'Air':
        return {
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 2 },
          transition: { duration: 0.5 },
          style: { background: '#87CEEB' },
        };
      case 'Water':
        return {
          initial: { scale: 1.5, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.5, opacity: 0 },
          transition: { duration: 0.5 },
          style: { background: '#1E90FF' },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5 },
          style: { background: '#800080' },
        };
    }
  };

  const transitionEffect = getTransitionEffect();

  return (
    <motion.div
      {...transitionEffect}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};

export default ElementalTransition;