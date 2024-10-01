import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const regions = [
  { name: 'Aethoria', description: 'The floating islands of the Air Kingdom' },
  { name: 'Aquamar', description: 'The vast underwater realm of the Water Kingdom' },
  { name: 'Infernum', description: 'The volcanic landscapes of the Fire Kingdom' },
  { name: 'Terramor', description: 'The lush forests and mountains of the Earth Kingdom' },
  { name: 'Neutralia', description: 'The central region for those without elemental control' },
];

const KinbroldPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Kinbrold</h1>
      
      <div className="relative">
        {/* Placeholder for the map image */}
        <img 
          src="/path-to-your-map-image.jpg" 
          alt="Map of Kinbrold" 
          className="w-full rounded-lg shadow-lg"
        />
        
        {regions.map((region, index) => (
          <motion.div
            key={region.name}
            className="absolute cursor-pointer"
            style={{
              top: `${20 + index * 15}%`,
              left: `${20 + index * 15}%`,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedRegion(region)}
          >
            <div className="bg-white text-black rounded-full p-2">
              {region.name[0]}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-8 p-6 bg-white bg-opacity-20 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">{selectedRegion.name}</h2>
            <p>{selectedRegion.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 bg-white text-black p-4 rounded-lg shadow-lg"
          >
            <p>Hover over the regions to explore, and click to learn more!</p>
            <button 
              onClick={() => setShowGuide(false)}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Got it!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KinbroldPage;