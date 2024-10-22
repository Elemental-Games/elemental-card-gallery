import React from 'react';
import { motion } from 'framer-motion';

const RippleEffect = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 2, 3],
        opacity: [0.8, 0.5, 0],
      }}
      transition={{ duration: 1, times: [0, 0.5, 1] }}
    >
      <div className="w-full h-full rounded-full bg-blue-400/50" />
    </motion.div>
  );
};

export default RippleEffect;