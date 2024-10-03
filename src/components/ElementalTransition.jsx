import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FireAnimation from './animations/FireAnimation';
import WaterAnimation from './animations/WaterAnimation';
import AirAnimation from './animations/AirAnimation';
import EarthAnimation from './animations/EarthAnimation';

const ElementalTransition = ({ element, children }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getTransitionEffect = () => {
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

  return (
    <div className="relative min-h-screen">
      {getTransitionEffect()}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElementalTransition;