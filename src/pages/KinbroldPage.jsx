import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const regions = [
  { name: 'Scarto', element: 'Fire', description: 'The volcanic landscapes of the Fire Kingdom' },
  { name: 'Tsunareth', element: 'Water', description: 'The vast underwater realm of the Water Kingdom' },
  { name: 'Zalos', element: 'Air', description: 'The floating islands of the Air Kingdom' },
  { name: 'Grivoss', element: 'Earth', description: 'The lush forests and mountains of the Earth Kingdom' },
  { name: 'Evermere', element: 'Neutral', description: 'The central region for those without elemental control' },
];

const minorAreas = [
  { name: 'Noxwood', dragon: 'Poison', description: 'Home of the Poison Dragon, between Tsunareth and Grivoss' },
  { name: 'Gleaming Grotto', dragon: 'Crystal', description: 'Lair of the Crystal Dragon, east of Evermere' },
  { name: 'Mount Surya', dragon: 'Lava', description: 'Dwelling of the Lava Dragon, attached to Scarto' },
  { name: 'Shroud Peak', dragon: 'Lightning', description: 'Nest of the Lightning Dragon, west of Mount Surya' },
  { name: 'Frozen Ridge', dragon: 'Frost', description: 'Territory of the Frost Dragon, north of Zalos' },
  { name: 'Arid Sands', dragon: 'Sand', description: 'Domain of the Sand Dragon, south of Grivoss' },
];

const KinbroldPage = () => {
  const [selectedArea, setSelectedArea] = useState(null);
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
          <Link
            key={region.name}
            to={`/kinbrold/${region.name.toLowerCase()}`}
            className="absolute cursor-pointer"
            style={{
              top: `${20 + index * 15}%`,
              left: `${20 + index * 15}%`,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="bg-white text-black rounded-full p-2"
            >
              {region.name[0]}
            </motion.div>
          </Link>
        ))}

        {minorAreas.map((area, index) => (
          <motion.div
            key={area.name}
            className="absolute cursor-pointer"
            style={{
              top: `${10 + index * 12}%`,
              left: `${60 + index * 5}%`,
            }}
            whileHover={{ scale: 1.2 }}
            onHoverStart={() => setSelectedArea(area)}
            onHoverEnd={() => setSelectedArea(null)}
          >
            <div className="bg-gray-300 text-black rounded-full p-1 text-xs">
              {area.dragon[0]}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArea && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-8 p-6 bg-white bg-opacity-20 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">{selectedArea.name}</h2>
            <p>{selectedArea.description}</p>
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
            <p>Click on the regions to explore, and hover over the minor areas to learn more!</p>
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