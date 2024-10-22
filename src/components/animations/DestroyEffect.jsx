import React from 'react';
import { motion } from 'framer-motion';

const DestroyEffect = ({ isDestroying, children }) => {
  if (!isDestroying) return children;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        scale: 0,
        rotateZ: 10,
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default DestroyEffect;