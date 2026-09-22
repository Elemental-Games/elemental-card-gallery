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

import { MMO_IMAGES } from '@/config/site';

const InteractiveKinbroldMap = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Map Display - Non-interactive */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-4 shadow-2xl"
           style={{
             boxShadow: '0 0 60px rgba(139, 92, 246, 0.3), 0 0 120px rgba(59, 130, 246, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.05)'
           }}>
        {/* Current Kingdom Image Display */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <img
            src={MMO_IMAGES.kinbroldMap}
            alt="Map of Kinbrold"
            className="w-full h-full object-cover transition-all duration-1000"
            style={{
              filter: 'brightness(1.05) contrast(1.08) drop-shadow(0 0 20px rgba(255,255,255,0.2))',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveKinbroldMap; 