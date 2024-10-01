import React, { useState } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Interactive Card Technology',
    description: 'Every card has a unique QR code, unlocking a wealth of information, lore, strategies, and more.',
    icon: '🔍'
  },
  {
    title: 'Rich World',
    description: 'Explore the world and five Kingdoms of Kinbrold - consisting of 4 Elemental Kingdoms, a Kingdom for those without elemental control, and 6 regions connecting all 5 major Kingdoms.',
    icon: '🌍'
  },
  {
    title: 'Diverse Creatures',
    description: 'Command Air, Water, Fire, and Earth creatures, including exotic combinational types like Lava, Poison, Sand, Frost, Lightning, and Crystal elements in the form of Dragons.',
    icon: '🐉'
  },
  {
    title: 'Unique Battle Mechanics',
    description: 'Each creature has a Strength and an Agility which determine their damage dealt, health, and how fast they can attack, block, or dodge respectively. Protecting you from your opponent are three shields, each with an increasingly powerful effect when broken.',
    icon: '⚔️'
  },
  {
    title: 'Elemental Essence',
    description: 'Each creature generates its own elemental essence which is viewed as a currency, used for summoning powerful creatures and using additional creature abilities.',
    icon: '💎'
  },
  {
    title: 'Quick Yet Strategic',
    description: 'Easy to learn but challenging to master, with games lasting around 20 minutes and a simple gameplay mechanic.',
    icon: '⏱️'
  }
];

const FeatureCard = ({ feature, isExpanded, onClick }) => (
  <motion.div
    className={`bg-purple-800 p-6 rounded-lg shadow-lg cursor-pointer ${isExpanded ? 'col-span-2' : ''}`}
    onClick={onClick}
    layout
    transition={{ duration: 0.5, type: 'spring' }}
  >
    <div className="flex items-center mb-4">
      <span className="text-4xl mr-4">{feature.icon}</span>
      <h3 className="text-xl font-semibold">{feature.title}</h3>
    </div>
    {isExpanded && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {feature.description}
      </motion.p>
    )}
  </motion.div>
);

const KeyFeatures = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          feature={feature}
          isExpanded={expandedIndex === index}
          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default KeyFeatures;