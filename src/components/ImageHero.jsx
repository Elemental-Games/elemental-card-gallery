import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import leavesBackground from '../assets/leaves-background.mp4';

const ImageHero = () => {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen">
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            >
              <source src={leavesBackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Welcome to Elemental Masters
          </h1>
          <p className="text-2xl text-white">
            Unleash the power of the elements
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageHero;