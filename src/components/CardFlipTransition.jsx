import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CardFlipTransition = ({ children }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setIsFlipping(true);
    const timer = setTimeout(() => setIsFlipping(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="perspective-1000">
      <motion.div
        initial={{ rotateY: 90 }}
        animate={{ rotateY: isFlipping ? [90, 0] : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CardFlipTransition;