import { useState } from 'react';
import { motion } from 'framer-motion';

const RulesTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'setup', label: 'Setup' },
    { id: 'card-types', label: 'Card Types' },
    { id: 'turn-structure', label: 'Turn Structure' },
    { id: 'battle', label: 'Battle' },
    { id: 'shields', label: 'Shields' },
    { id: 'elements', label: 'Elements' },
    { id: 'keywords', label: 'Keywords' }
  ];

  return (
    <div className="relative mb-8">
      <div className="flex flex-wrap md:flex-nowrap overflow-x-auto scrollbar-hide space-x-2 border-b border-purple-500/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 relative transition-colors whitespace-nowrap flex-shrink-0
              ${activeTab === tab.id 
                ? 'text-yellow-500' 
                : 'text-white/70 hover:text-white'
              }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RulesTabs; 