import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
              <source src="/leaves-background.mp4" type="video/mp4" />
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
            Master the elements and become a legend
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
