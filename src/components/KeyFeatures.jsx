import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const features = [
  {
    title: 'Interactive Card Technology',
    description: 'Every card has a unique QR code, unlocking a wealth of information, lore, strategies, and more.',
    icon: <img src="/svgs/magnifying-glass-solid.svg" alt="Search" className="w-8 h-8 invert" />
  },
  {
    title: 'Rich World',
    description: 'Explore the world and five Kingdoms of Kinbrold - consisting of 4 Elemental Kingdoms, a Kingdom for those without elemental control, and 6 regions connecting all 5 major Kingdoms.',
    icon: <img src="/svgs/earth-americas-solid.svg" alt="Globe" className="w-8 h-8 invert" />
  },
  {
    title: 'Diverse Creatures',
    description: 'Command Air, Water, Fire, and Earth creatures, including exotic combinational types like Lava, Poison, Sand, Frost, Lightning, and Crystal elements in the form of Dragons.',
    icon: <img src="/svgs/dragon.svg" alt="Dragon" className="w-8 h-8 invert" />
  },
  {
    title: 'Unique Battle Mechanics',
    description: 'Each creature has a Strength and an Agility which determine their damage dealt, health, and how fast they can attack, block, or dodge respectively. Protecting you from your opponent are three shields, each with an increasingly powerful effect when broken.',
    icon: <img src="/svgs/swords.svg" alt="Swords" className="w-8 h-8 invert" />
  },
  {
    title: 'Quick Yet Strategic',
    description: 'Easy to learn but challenging to master, with games lasting around 20 minutes and a simple gameplay mechanic.',
    icon: <img src="/svgs/clock-regular.svg" alt="Clock" className="w-8 h-8 invert" />
  }
];

const FeatureModal = ({ feature, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-x-4 top-[50%] translate-y-[-50%] max-w-2xl mx-auto z-50 bg-purple-800 rounded-xl shadow-2xl p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-white"
          >
            <X size={24} />
          </button>
          <div className="flex items-center mb-6">
            <div className="mr-6 p-2 bg-purple-700/50 rounded-lg">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold">{feature.title}</h3>
          </div>
          <p className="text-lg leading-relaxed text-gray-100">{feature.description}</p>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const FeatureCard = ({ feature, onClick }) => (
  <motion.div
    className="bg-purple-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg cursor-pointer 
               hover:bg-purple-700/50 transition-colors duration-300"
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center mb-4">
      <div className="mr-4 p-2 bg-purple-700/50 rounded-lg">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold">{feature.title}</h3>
    </div>
    <p className="text-sm text-gray-300">Click to learn more</p>
  </motion.div>
);

const KeyFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            onClick={() => setSelectedFeature(feature)}
          />
        ))}
      </div>
      <FeatureModal
        feature={selectedFeature || {}}
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </>
  );
};

export default KeyFeatures;