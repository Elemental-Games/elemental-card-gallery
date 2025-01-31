import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GradientButton = () => {
  return (
    <motion.div
      className="relative inline-block group"
      whileHover={{ scale: 1.05 }}
    >
      {/* Gradient border with rotating colors */}
      <div 
        className="absolute -inset-[5px] rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #4C1D95 45%, #FCD34D 48%, #4C1D95 51%, #4C1D95 100%)',
          backgroundSize: '300% 100%',
          animation: 'moveGradient 4s linear infinite'
        }}
      />
      
      {/* Shadow effect */}
      <div className="absolute inset-0 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
      
      {/* Button */}
      <Link
        to="/join-now"
        className="relative block px-8 py-6 bg-yellow-500 text-purple-900 text-2xl font-bold rounded-full 
          hover:bg-yellow-400 transition-colors duration-300"
      >
        Join the Battle
      </Link>

      <style>
        {`
          @keyframes moveGradient {
            0% {
              background-position: 100% 0%;
            }
            100% {
              background-position: 0% 0%;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default GradientButton;