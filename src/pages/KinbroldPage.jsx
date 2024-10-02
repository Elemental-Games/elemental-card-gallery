import React, { useState } from 'react';
import { motion } from 'framer-motion';

const regions = [
  { name: 'Evermere', element: 'Neutral', url: 'https://elementalgames.gg/evermere', top: '50%', left: '50%' },
  { name: 'Scarto', element: 'Fire', url: 'https://elementalgames.gg/scarto', top: '20%', left: '80%' },
  { name: 'Grivoss', element: 'Earth', url: 'https://elementalgames.gg/grivoss', top: '70%', left: '20%' },
  { name: 'Zalos', element: 'Air', url: 'https://elementalgames.gg/zalos', top: '10%', left: '10%' },
  { name: 'Tsunareth', element: 'Water', url: 'https://elementalgames.gg/tsunareth', top: '80%', left: '50%' },
];

const minorAreas = [
  { name: 'Noxwood', dragon: 'Poison', top: '85%', left: '40%' },
  { name: 'Gleaming Grotto', dragon: 'Crystal', top: '40%', left: '75%' },
  { name: 'Mount Surya', dragon: 'Lava', top: '30%', left: '70%' },
  { name: 'Shroud Peak', dragon: 'Lightning', top: '25%', left: '60%' },
  { name: 'Frozen Ridge', dragon: 'Frost', top: '5%', left: '30%' },
  { name: 'Arid Sands', dragon: 'Sand', top: '75%', left: '10%' },
];

const KinbroldPage = () => {
  const [selectedArea, setSelectedArea] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Kinbrold</h1>
      
      <div className="relative w-full max-w-4xl mx-auto">
        <img 
          src="/kinbrold_map.jpg" 
          alt="Map of Kinbrold" 
          className="w-full rounded-lg shadow-lg"
        />
        
        {regions.map((region) => (
          <motion.a
            key={region.name}
            href={region.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute cursor-pointer"
            style={{
              top: region.top,
              left: region.left,
            }}
            whileHover={{ scale: 1.2 }}
          >
            <div className="bg-white text-black rounded-full p-2 shadow-md">
              {region.name[0]}
            </div>
          </motion.a>
        ))}

        {minorAreas.map((area) => (
          <motion.div
            key={area.name}
            className="absolute cursor-pointer"
            style={{
              top: area.top,
              left: area.left,
            }}
            whileHover={{ scale: 1.2 }}
            onHoverStart={() => setSelectedArea(area)}
            onHoverEnd={() => setSelectedArea(null)}
          >
            <div className="bg-gray-300 text-black rounded-full p-1 text-xs shadow-md">
              {area.dragon[0]}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedArea && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="mt-8 p-6 bg-white bg-opacity-20 rounded-lg max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedArea.name}</h2>
          <p>Home of the {selectedArea.dragon} Dragon</p>
        </motion.div>
      )}
    </div>
  );
};

export default KinbroldPage;