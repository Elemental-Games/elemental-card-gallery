import React from 'react';
import { motion } from 'framer-motion';

const ExploreItem = ({ title, emoji }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-40 h-40 bg-purple-700 bg-opacity-50 rounded-lg shadow-lg cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-4xl mb-2">{emoji}</span>
      <h3 className="text-lg font-semibold text-center">{title}</h3>
    </motion.div>
  );
};

export default ExploreItem;