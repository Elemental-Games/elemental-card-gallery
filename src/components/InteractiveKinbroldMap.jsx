/*
 * Interactive Kinbrold Map Component
 * 
 * KINGDOM UNLOCK SCHEDULE:
 * June 23rd - Grivoss (Kingdom of Earth)
 * June 30th - Zalos (Kingdom of Air)
 * July 7th - Evermere (The Central Kingdom)
 * July 14th - Scarto (Kingdom of Fire)
 * July 21st - Tsunareth (Kingdom of Water)
 * July 28th - Full Map Unlocked
 */

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// Kingdom unlock schedule with dates
const KINGDOM_SCHEDULE = [
  {
    id: 'grivoss',
    name: 'Grivoss',
    element: 'Earth',
    description: 'Kingdom of Earth',
    color: 'from-green-500 to-green-700',
    path: '/kinbrold/grivoss',
    unlockDate: new Date('2025-06-23T00:00:00'),
    image: '/images/cards/new-marketing/grivoss-only.webp'
  },
  {
    id: 'zalos',
    name: 'Zalos',
    element: 'Air',
    description: 'Kingdom of Air',
    color: 'from-white to-gray-100',
    path: '/kinbrold/zalos',
    unlockDate: new Date('2025-06-30T00:00:00'),
    image: '/images/cards/new-marketing/zalos-u.webp'
  },
  {
    id: 'evermere',
    name: 'Evermere',
    element: 'Central',
    description: 'The Central Kingdom',
    color: 'from-purple-500 to-purple-700',
    path: '/kinbrold/evermere',
    unlockDate: new Date('2025-07-07T00:00:00'),
    image: '/images/cards/new-marketing/evermere-u.webp'
  },
  {
    id: 'scarto',
    name: 'Scarto',
    element: 'Fire',
    description: 'Kingdom of Fire',
    color: 'from-red-500 to-red-700',
    path: '/kinbrold/scarto',
    unlockDate: new Date('2025-07-14T00:00:00'),
    image: '/images/cards/new-marketing/scarto-u.webp'
  },
  {
    id: 'tsunareth',
    name: 'Tsunareth',
    element: 'Water',
    description: 'Kingdom of Water',
    color: 'from-blue-700 to-blue-900',
    path: '/kinbrold/tsunareth',
    unlockDate: new Date('2025-07-21T00:00:00'),
    image: '/images/cards/new-marketing/tsunareth-u.webp'
  },
  {
    id: 'full',
    name: 'Full Map',
    element: 'Complete',
    description: 'All Kingdoms Revealed',
    color: 'from-yellow-400 to-purple-600',
    path: null,
    unlockDate: new Date('2025-07-28T00:00:00'),
    image: '/images/cards/new-marketing/full-u.webp'
  }
];

const InteractiveKinbroldMap = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute to check for new unlocks
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Get the current unlocked kingdoms based on date
  const getUnlockedKingdoms = () => {
    return KINGDOM_SCHEDULE.filter(kingdom => currentTime >= kingdom.unlockDate);
  };

  // Get the currently displayed kingdom image
  const getCurrentDisplayImage = () => {
    const unlockedKingdoms = getUnlockedKingdoms();
    if (unlockedKingdoms.length === 0) {
      return '/kinbrold/kinbrold grayscale.png'; // Show grayscale if nothing unlocked
    }
    
    // Show the latest unlocked kingdom image
    const latestKingdom = unlockedKingdoms[unlockedKingdoms.length - 1];
    return latestKingdom.image;
  };

  // Get next unlock information
  const getNextUnlock = () => {
    const lockedKingdoms = KINGDOM_SCHEDULE.filter(kingdom => currentTime < kingdom.unlockDate);
    return lockedKingdoms.length > 0 ? lockedKingdoms[0] : null;
  };

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Get time until next unlock
  const getTimeUntilNext = (nextUnlock) => {
    if (!nextUnlock) return null;
    
    const timeDiff = nextUnlock.unlockDate - currentTime;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      return 'Soon';
    }
  };

  const unlockedKingdoms = getUnlockedKingdoms();
  const nextUnlock = getNextUnlock();
  const currentImage = getCurrentDisplayImage();

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Campaign Progress Header */}
      <div className="absolute top-4 left-4 z-20 bg-black/90 backdrop-blur-sm rounded-lg p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span className="font-bold">Kingdom Awakening</span>
        </div>
        <div className="text-sm font-semibold">
          {unlockedKingdoms.length}/5 Kingdoms Revealed
        </div>
        {nextUnlock && (
          <div className="text-xs text-yellow-400 mt-1">
            Next: {nextUnlock.name} - {formatDate(nextUnlock.unlockDate)}
            {getTimeUntilNext(nextUnlock) && (
              <div className="text-xs text-gray-300">
                Unlocks in {getTimeUntilNext(nextUnlock)}
              </div>
            )}
          </div>
        )}
        {unlockedKingdoms.length === 5 && (
          <div className="text-xs text-green-400 mt-1">
            🎉 All Kingdoms Awakened!
          </div>
        )}
      </div>



      {/* Map Display - Non-interactive */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-4 shadow-2xl"
           style={{
             boxShadow: '0 0 60px rgba(139, 92, 246, 0.3), 0 0 120px rgba(59, 130, 246, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.05)'
           }}>
        {/* Current Kingdom Image Display */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <img 
            src={currentImage}
            alt="World of Kinbrold"
            className="w-full h-full object-contain transition-all duration-1000"
            style={{
              filter: unlockedKingdoms.length > 0 
                ? 'brightness(1.1) contrast(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.3))' 
                : 'brightness(0.8) contrast(1.1)'
            }}
          />
          
          {/* Overlay showing current kingdom info */}
          {unlockedKingdoms.length > 0 && (
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white">
              <div className="text-sm font-semibold">
                Currently Showing: {unlockedKingdoms[unlockedKingdoms.length - 1].name}
              </div>
              <div className="text-xs text-gray-300">
                {unlockedKingdoms[unlockedKingdoms.length - 1].description}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveKinbroldMap; 