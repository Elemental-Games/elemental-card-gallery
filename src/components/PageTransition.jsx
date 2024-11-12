import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, type }) => {
  const variants = {
    evermere: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
      transition: { duration: 0.5 }
    },
    zalos: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 },
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    tsunareth: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 1.5, ease: "easeInOut" }
    },
    grivoss: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 }
    },
    scarto: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div
      initial={variants[type].initial}
      animate={variants[type].animate}
      exit={variants[type].exit}
      transition={variants[type].transition}
      className="relative"
    >
      {type === 'tsunareth' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="ripple-effect" />
        </div>
      )}
      {type === 'grivoss' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="blocks-effect" />
        </div>
      )}
      {type === 'scarto' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="embers-effect" />
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default PageTransition;