/*
 * Interactive Kinbrold Map Component
 * 
 * MARKETING CAMPAIGN USAGE:
 * To lock/unlock regions for your 6-week campaign, simply edit the UNLOCKED_REGIONS object below:
 * - Set to `true` to unlock a region (clickable, shows region image on hover)
 * - Set to `false` to lock a region (shows lock icon, displays unlock week)
 * 
 * Example progression:
 * Week 1: Only grivoss: true
 * Week 2: grivoss: true, zalos: true
 * Week 3: grivoss: true, zalos: true, evermere: true
 * etc.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  getCampaignStatus, 
  trackKingdomClick, 
  trackKingdomUnlock
} from '../utils/analytics';

// MARKETING CAMPAIGN CONFIGURATION
// Set regions to true to unlock them, false to lock them
const UNLOCKED_REGIONS = {
  // Main Kingdoms - All locked for now
  grivoss: false,
  zalos: false, 
  evermere: false,
  scarto: false,
  tsunareth: false,
  
  // Sub-regions - All locked for now
  'frozen-ridge': false,
  'shroud-peak': false,
  'mount-surya': false,
  'gleaming-grotto': false,
  'arid-sands': false,
  noxwood: false
};

// Region configuration
const regionConfig = {
  // Main Kingdoms
  grivoss: {
    name: 'Grivoss',
    element: 'Earth',
    description: 'Kingdom of Earth',
    color: 'from-green-500 to-green-700',
    week: 1,
    image: '/kinbrold/Grivoss.png',
    path: '/kinbrold/grivoss',
    type: 'kingdom'
  },
  zalos: {
    name: 'Zalos',
    element: 'Air', 
    description: 'Kingdom of Air',
    color: 'from-white to-gray-100',
    week: 2,
    image: '/kinbrold/Zalos.png',
    path: '/kinbrold/zalos',
    type: 'kingdom'
  },
  evermere: {
    name: 'Evermere',
    element: 'Central',
    description: 'The Central Kingdom',
    color: 'from-purple-500 to-purple-700',
    week: 3,
    image: '/kinbrold/Evermere.png',
    path: '/kinbrold/evermere',
    type: 'kingdom'
  },
  scarto: {
    name: 'Scarto',
    element: 'Fire',
    description: 'Kingdom of Fire', 
    color: 'from-red-500 to-red-700',
    week: 4,
    image: '/kinbrold/Scarto.png',
    path: '/kinbrold/scarto',
    type: 'kingdom'
  },
  tsunareth: {
    name: 'Tsunareth',
    element: 'Water',
    description: 'Kingdom of Water',
    color: 'from-blue-700 to-blue-900',
    week: 5,
    image: '/kinbrold/Tsunareth.png',
    path: '/kinbrold/tsunareth',
    type: 'kingdom'
  },
  
  // Sub-regions with Dragons
  'frozen-ridge': {
    name: 'Frozen Ridge',
    element: 'Ice',
    description: 'Frozen Peaks',
    color: 'from-cyan-400 to-blue-600',
    week: 6,
    image: '/kinbrold/frozen ridge.png',
    type: 'subregion',
    dragon: {
      name: 'Glacius the Eternal',
      element: 'Ice',
      description: 'Ancient dragon of the frozen peaks, master of ice and snow.',
      image: '/dragons/glacius.png' // You'll need to add dragon images
    }
  },
  'shroud-peak': {
    name: 'Shroud Peak',
    element: 'Shadow',
    description: 'Mysterious Heights',
    color: 'from-purple-600 to-gray-800',
    week: 6,
    image: '/kinbrold/shroud peak.png',
    type: 'subregion',
    dragon: {
      name: 'Umbra the Veiled',
      element: 'Shadow',
      description: 'Mysterious dragon shrouded in eternal mist and shadow.',
      image: '/dragons/umbra.png'
    }
  },
  'mount-surya': {
    name: 'Mount Surya',
    element: 'Fire',
    description: 'Volcanic Peak',
    color: 'from-orange-500 to-red-700',
    week: 6,
    image: '/kinbrold/mount surya.png',
    type: 'subregion',
    dragon: {
      name: 'Pyrion the Blazing',
      element: 'Fire',
      description: 'Volcanic dragon whose flames never cease, guardian of the molten peaks.',
      image: '/dragons/pyrion.png'
    }
  },
  'gleaming-grotto': {
    name: 'Gleaming Grotto',
    element: 'Crystal',
    description: 'Crystal Caves',
    color: 'from-purple-400 to-pink-600',
    week: 6,
    image: '/kinbrold/gleaming grotto.png',
    type: 'subregion',
    dragon: {
      name: 'Crystallux the Radiant',
      element: 'Crystal',
      description: 'Dragon of pure crystal, reflecting light in magnificent patterns.',
      image: '/dragons/crystallux.png'
    }
  },
  'arid-sands': {
    name: 'Arid Sands',
    element: 'Desert',
    description: 'Endless Dunes',
    color: 'from-yellow-600 to-orange-700',
    week: 6,
    image: '/kinbrold/arid sands.png',
    type: 'subregion',
    dragon: {
      name: 'Sandros the Eternal',
      element: 'Desert',
      description: 'Ancient dragon of the endless dunes, master of sand and wind.',
      image: '/dragons/sandros.png'
    }
  },
  noxwood: {
    name: 'Noxwood',
    element: 'Dark',
    description: 'Shadowed Forest',
    color: 'from-purple-800 to-black',
    week: 6,
    image: '/kinbrold/noxwood.png',
    type: 'subregion',
    dragon: {
      name: 'Noxara the Corrupted',
      element: 'Dark',
      description: 'Dragon of the corrupted forest, wielding dark magic and poison.',
      image: '/dragons/noxara.png'
    }
  }
};

const InteractiveKinbroldMap = () => {
  const navigate = useNavigate();
  const [campaignStatus, setCampaignStatus] = useState(getCampaignStatus());
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(null);
  // Interactive features temporarily disabled
  // const [hoveredRegion, setHoveredRegion] = useState(null);
  // const [debugMode, setDebugMode] = useState(false);
  // const [showDragonPopup, setShowDragonPopup] = useState(null);

  // Check for new unlocks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const newStatus = getCampaignStatus();
      const newUnlocks = newStatus.unlockedKingdoms.filter(
        kingdom => !campaignStatus.unlockedKingdoms.includes(kingdom)
      );
      
      if (newUnlocks.length > 0) {
        setCampaignStatus(newStatus);
        newUnlocks.forEach(kingdom => {
          trackKingdomUnlock(kingdom);
          setShowUnlockAnimation(kingdom);
          setTimeout(() => setShowUnlockAnimation(null), 3000);
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [campaignStatus]);

  const isRegionUnlocked = (regionKey) => {
    // Use the marketing campaign configuration
    return UNLOCKED_REGIONS[regionKey] || false;
    // Later we can integrate with: return campaignStatus.unlockedKingdoms.includes(regionKey);
  };

  // Interactive features temporarily disabled
  /*
  const handleRegionClick = (regionKey) => {
    const region = regionConfig[regionKey];
    const unlocked = isRegionUnlocked(regionKey);
    
    trackKingdomClick(regionKey, unlocked);
    
    if (unlocked) {
      if (region.type === 'kingdom') {
        // Navigate to kingdom page after a short delay
        setTimeout(() => {
          navigate(region.path);
        }, 200);
      } else if (region.type === 'subregion') {
        // Show dragon popup for sub-regions
        // setShowDragonPopup(regionKey);
      }
    } else {
      // setHoveredRegion(regionKey);
      setTimeout(() => setShowUnlockAnimation(null), 2000);
    }
  };
  */

  const formatUnlockDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Campaign Progress Header */}
      <div className="absolute top-4 left-4 z-20 bg-black/90 backdrop-blur-sm rounded-lg p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span className="font-bold">Kinbrold Awakening</span>
        </div>
        <div className="text-sm font-semibold">
          Week {campaignStatus.week} of 6
        </div>
        <div className="text-xs text-gray-300">
          {campaignStatus.unlockedKingdoms.length}/5 Kingdoms Unlocked
        </div>
        {campaignStatus.nextUnlock && (
          <div className="text-xs text-yellow-400 mt-1">
            Next: {formatUnlockDate(campaignStatus.nextUnlock.unlockDate)}
          </div>
        )}
        {/* Debug indicator */}
        {/* {hoveredRegion && (
          <div className="text-xs text-cyan-400 mt-1 border-t border-gray-600 pt-1">
            Detecting: {regionConfig[hoveredRegion]?.name}
          </div>
        )} */}
        {/* Interactive features temporarily disabled */}
      </div>

      {/* Unlock Animation */}
      {showUnlockAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-purple-600 to-yellow-500 p-6 rounded-lg text-center text-white"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-3 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">
              {regionConfig[showUnlockAnimation]?.name} Awakens!
            </h2>
            <p className="text-sm">
              The {regionConfig[showUnlockAnimation]?.element} Region is now accessible
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Interactive Map with Glow Effect */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-4 shadow-2xl"
           style={{
             boxShadow: '0 0 60px rgba(139, 92, 246, 0.3), 0 0 120px rgba(59, 130, 246, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.05)'
           }}>
        {/* Background World Map with Region Overlays */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <img 
            src="/kinbrold/kinbrold grayscale.png" 
            alt="World of Kinbrold"
            className="w-full h-full object-contain"
            style={{
              filter: 'brightness(0.8) contrast(1.1)'
            }}
          />
          
          {/* Temporarily disabled interactive features */}
          {/* 
          {hoveredRegion && (
            <img 
              src={regionConfig[hoveredRegion].image}
              alt={regionConfig[hoveredRegion].name}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                filter: isRegionUnlocked(hoveredRegion) 
                  ? 'brightness(1.1) contrast(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.5))' 
                  : 'grayscale(100%) brightness(0.6)'
              }}
            />
          )}

          {debugMode && (
            // Debug overlays temporarily disabled
          )}

          <div 
            className="absolute inset-0 cursor-pointer"
            onMouseMove={(e) => {
              // Interactive detection temporarily disabled
            }}
            onMouseLeave={() => setShowUnlockAnimation(null)}
            onClick={() => {
              // Interactive click handling temporarily disabled
            }}
          />

          {showDragonPopup && (
            // Dragon popup temporarily disabled
          )}
          */}
        </div>
      </div>
    </div>
  );
};

export default InteractiveKinbroldMap; 