import { useState } from 'react';
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

const KeyFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <>
      {/* Features grid - full width layout */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <motion.div
          className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
            shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
            border border-purple-500/30 hover:border-purple-500/50"
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedFeature(features[0])}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start h-full">
            <div className="bg-purple-800/50 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4">
              {features[0].icon}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">Interactive Card Technology</h3>
              <p className="text-sm text-purple-300">Click to learn more</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
            shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
            border border-purple-500/30 hover:border-purple-500/50"
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedFeature(features[1])}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start h-full">
            <div className="bg-purple-800/50 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4">
              {features[1].icon}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">Rich World</h3>
              <p className="text-sm text-purple-300">Click to learn more</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
            shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
            border border-purple-500/30 hover:border-purple-500/50"
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedFeature(features[2])}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start h-full">
            <div className="bg-purple-800/50 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4">
              {features[2].icon}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">Diverse Creatures</h3>
              <p className="text-sm text-purple-300">Click to learn more</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
            shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
            border border-purple-500/30 hover:border-purple-500/50"
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedFeature(features[3])}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start h-full">
            <div className="bg-purple-800/50 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4">
              {features[3].icon}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">Unique Battle Mechanics</h3>
              <p className="text-sm text-purple-300">Click to learn more</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
            shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
            border border-purple-500/30 hover:border-purple-500/50"
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedFeature(features[4])}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start h-full">
            <div className="bg-purple-800/50 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4">
              {features[4].icon}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-white mb-2">Quick Yet Strategic</h3>
              <p className="text-sm text-purple-300">Click to learn more</p>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-purple-950 p-6 rounded-lg max-w-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center mb-4">
                <div className="bg-purple-800/50 p-3 rounded-lg mr-4">
                  {selectedFeature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{selectedFeature.title}</h3>
              </div>
              <p className="text-gray-300">{selectedFeature.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyFeatures;