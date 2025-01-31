import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrbitingButton = () => {
  return (
    <motion.div
      className="relative inline-block group"
      whileHover={{ scale: 1.05 }}
    >
      {/* Container with purple border */}
      <div className="absolute -inset-[3px] rounded-full bg-purple-900">
        {/* Orbiting light */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4"
            style={{
              top: -2,
              transformOrigin: '50% calc(50% + 31px)', // Half of button height + border
            }}
            animate={{ 
              rotate: 360
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full rounded-full bg-yellow-300 blur-[2px]" />
          </motion.div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-yellow-500 rounded-full blur-xl animate-pulse opacity-75" />
      
      {/* Button */}
      <Link
        to="/join-now"
        className="relative block px-8 py-4 bg-yellow-500 text-purple-900 font-bold rounded-full 
          hover:bg-yellow-400 transition-colors duration-300"
      >
        Join the Battle
      </Link>
    </motion.div>
  );
};

export default OrbitingButton; 