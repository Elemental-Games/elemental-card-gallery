import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const features = [
  {
    title: 'Interactive Card Technology',
    description: 'Every card has a unique QR code, unlocking a wealth of information, lore, strategies, and more.',
    icon: '/svgs/magnifying-glass-solid.svg'
  },
  {
    title: 'Rich World',
    description: 'Explore the world and five Kingdoms of Kinbrold - consisting of 4 Elemental Kingdoms, a Kingdom for those without elemental control, and 6 regions connecting all 5 major Kingdoms.',
    icon: '/svgs/earth-americas-solid.svg'
  },
  {
    title: 'Diverse Creatures',
    description: 'Command Air, Water, Fire, and Earth creatures, including exotic combinational types like Lava, Poison, Sand, Frost, Lightning, and Crystal elements in the form of Dragons.',
    icon: '/svgs/dragon.svg'
  },
  {
    title: 'Unique Battle Mechanics',
    description: 'Each creature has a Strength and an Agility which determine their damage dealt, health, and how fast they can attack, block, or dodge respectively. Protecting you from your opponent are three shields, each with an increasingly powerful effect when broken.',
    icon: '/svgs/swords.svg'
  },
  {
    title: 'Quick Yet Strategic',
    description: 'Easy to learn but challenging to master, with games lasting around 20 minutes and a simple gameplay mechanic.',
    icon: '/svgs/clock-regular.svg'
  }
];

const FeatureCard = ({ feature }) => (
  <Dialog>
    <DialogTrigger asChild>
      <motion.div
        className="bg-purple-800 p-6 rounded-lg shadow-lg cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center mb-4">
          <img 
            src={feature.icon} 
            alt={feature.title} 
            className="w-8 h-8 mr-4 invert" // invert to make SVGs white
          />
          <h3 className="text-xl font-semibold">{feature.title}</h3>
        </div>
        <p className="text-sm text-gray-300">
          Click to learn more
        </p>
      </motion.div>
    </DialogTrigger>
    <DialogContent className="bg-purple-900 text-white w-[95vw] max-w-[800px] h-auto max-h-[90vh] p-8 sm:p-10">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl sm:text-3xl mb-6">
          <img 
            src={feature.icon} 
            alt={feature.title} 
            className="w-8 h-8 sm:w-10 sm:h-10 invert"
          />
          {feature.title}
        </DialogTitle>
      </DialogHeader>
      <p className="mt-6 text-lg sm:text-xl leading-relaxed">
        {feature.description}
      </p>
    </DialogContent>
  </Dialog>
);

const KeyFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          feature={feature}
        />
      ))}
    </div>
  );
};

export default KeyFeatures;