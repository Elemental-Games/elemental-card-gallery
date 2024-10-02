import React, { useState } from 'react';
import { motion } from 'framer-motion';

const regions = [
  { name: 'Evermere', element: 'Neutral', top: '40%', left: '50%', width: '20%', height: '20%' },
  { name: 'Scarto', element: 'Fire', top: '20%', left: '70%', width: '25%', height: '30%' },
  { name: 'Grivoss', element: 'Earth', top: '60%', left: '20%', width: '30%', height: '35%' },
  { name: 'Zalos', element: 'Air', top: '5%', left: '10%', width: '35%', height: '30%' },
  { name: 'Tsunareth', element: 'Water', top: '70%', left: '50%', width: '30%', height: '25%' },
];

const KinbroldPage = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img 
        src="/kinbrold_map.jpg" 
        alt="Map of Kinbrold" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {regions.map((region) => (
        <motion.div
          key={region.name}
          className="absolute cursor-pointer"
          style={{
            top: region.top,
            left: region.left,
            width: region.width,
            height: region.height,
          }}
          onHoverStart={() => setHoveredRegion(region)}
          onHoverEnd={() => setHoveredRegion(null)}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-full h-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
        </motion.div>
      ))}

      {hoveredRegion && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold">{hoveredRegion.name}</h2>
          <p>Element: {hoveredRegion.element}</p>
        </div>
      )}
    </div>
  );
};

export default KinbroldPage;