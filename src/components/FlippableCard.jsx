import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FlippableCard = ({ frontImage, backImage, initiallyFlipped = true }) => {
  const [isFlipped, setIsFlipped] = useState(initiallyFlipped);

  return (
    <motion.div
      className="relative w-[300px] h-[420px] cursor-pointer mx-auto"
      onClick={() => setIsFlipped(!isFlipped)}
      animate={{
        rotate: [0, -1, 1, -1, 0],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 2.5,
      }}
    >
      <div className="absolute inset-0 bg-purple-500/20 blur-[50px] rounded-full" />
      <motion.div
        className="absolute w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={frontImage}
          alt="Card Front"
          className="absolute w-full h-full rounded-lg backface-hidden shadow-lg"
        />
        <img
          src={backImage}
          alt="Card Back"
          className="absolute w-full h-full rounded-lg backface-hidden shadow-lg"
          style={{ transform: 'rotateY(180deg)' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FlippableCard; 