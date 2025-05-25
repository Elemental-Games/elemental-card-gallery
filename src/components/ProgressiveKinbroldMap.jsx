import { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  getCampaignStatus, 
  trackKingdomClick, 
  trackKingdomUnlock, 
  trackMapInteraction,
  trackTourEvent 
} from '../utils/analytics';

// Kingdom configuration with unlock states
const kingdomConfig = {
  grivoss: {
    name: 'Grivoss',
    element: 'Earth',
    description: 'Kingdom of Earth',
    position: { x: 400, y: 800 },
    color: 'from-green-500 to-green-700',
    week: 1
  },
  zalos: {
    name: 'Zalos',
    element: 'Air', 
    description: 'Kingdom of Air',
    position: { x: 200, y: 200 },
    color: 'from-white to-gray-100',
    week: 2
  },
  evermere: {
    name: 'Evermere',
    element: 'Central',
    description: 'The Central Kingdom',
    position: { x: 800, y: 600 },
    color: 'from-purple-500 to-purple-700',
    week: 3
  },
  scarto: {
    name: 'Scarto',
    element: 'Fire',
    description: 'Kingdom of Fire', 
    position: { x: 1200, y: 400 },
    color: 'from-red-500 to-red-700',
    week: 4
  },
  tsunareth: {
    name: 'Tsunareth',
    element: 'Water',
    description: 'Kingdom of Water',
    position: { x: 800, y: 1200 },
    color: 'from-blue-700 to-blue-900',
    week: 5
  }
};

const subRegions = [
  'frozen_ridge', 'shroud_peak', 'mount_surya', 
  'gleaming_grotto', 'noxwood', 'arid_sands'
];

const ProgressiveKinbroldMap = () => {
  const [campaignStatus, setCampaignStatus] = useState(getCampaignStatus());
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(null);
  const [hoveredKingdom, setHoveredKingdom] = useState(null);
  const transformComponentRef = useRef(null);

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
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [campaignStatus]);

  const isKingdomUnlocked = (kingdom) => {
    return campaignStatus.unlockedKingdoms.includes(kingdom);
  };

  const areSubRegionsUnlocked = () => {
    return campaignStatus.unlockedKingdoms.includes('sub_regions');
  };

  const handleKingdomClick = (kingdom) => {
    const unlocked = isKingdomUnlocked(kingdom);
    trackKingdomClick(kingdom, unlocked);
    
    if (unlocked) {
      // Navigate to kingdom page or show details
      window.location.href = `/kinbrold/${kingdom}`;
    } else {
      // Show locked message
      setHoveredKingdom(kingdom);
      setTimeout(() => setHoveredKingdom(null), 2000);
    }
  };

  const getKingdomStyle = (kingdom) => {
    const config = kingdomConfig[kingdom];
    const isUnlocked = isKingdomUnlocked(kingdom);
    const isAnimating = showUnlockAnimation === kingdom;
    
    return {
      filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0.4)',
      opacity: isUnlocked ? 1 : 0.6,
      cursor: isUnlocked ? 'pointer' : 'not-allowed',
      transition: 'all 0.5s ease-in-out',
      transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
      boxShadow: isUnlocked 
        ? `0 0 20px ${config.color.includes('red') ? '#ef4444' : 
                     config.color.includes('blue') ? '#3b82f6' :
                     config.color.includes('green') ? '#10b981' :
                     config.color.includes('white') ? '#f3f4f6' : '#8b5cf6'}40`
        : 'none'
    };
  };

  const formatUnlockDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Campaign Progress Header - Bigger and Always Top Left */}
      <div className="absolute top-6 left-6 z-20 bg-black/90 backdrop-blur-sm rounded-xl p-6 text-white min-w-[280px]">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-7 h-7 text-yellow-500" />
          <span className="font-bold text-xl">Kinbrold Awakening</span>
        </div>
        <div className="text-lg font-semibold">
          Week {campaignStatus.week} of 6
        </div>
        <div className="text-sm text-gray-300 mt-1">
          {campaignStatus.unlockedKingdoms.length}/5 Kingdoms Unlocked
        </div>
        {campaignStatus.nextUnlock && (
          <div className="text-sm text-yellow-400 mt-2 font-medium">
            Next: {formatUnlockDate(campaignStatus.nextUnlock.unlockDate)}
          </div>
        )}
      </div>

      {/* Unlock Animation */}
      <AnimatePresence>
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
              className="bg-gradient-to-r from-purple-600 to-yellow-500 p-8 rounded-lg text-center text-white"
            >
              <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold mb-2">
                {kingdomConfig[showUnlockAnimation]?.name} Awakens!
              </h2>
              <p className="text-lg">
                The {kingdomConfig[showUnlockAnimation]?.element} Kingdom is now accessible
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Map - Full Width and Improved Panning */}
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={0.8}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.4}
        maxScale={3}
        limitToBounds={false}
        centerOnInit={true}
        wheel={{
          step: 0.1,
        }}
        onZoom={() => trackMapInteraction('zoom')}
        onPanning={() => trackMapInteraction('pan')}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent 
              wrapperStyle={{ 
                width: '100%', 
                height: '100vh',
                overflow: 'hidden'
              }}
              contentStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div className="relative" style={{ width: '100vw', height: '100vh', minWidth: '1200px', minHeight: '800px' }}>
                {/* Background Map Image - Full Width */}
                <img 
                  src="/kinbrold_map.jpg" 
                  alt="World of Kinbrold"
                  className="w-full h-full object-cover"
                  style={{
                    filter: campaignStatus.isComplete ? 'none' : 'brightness(0.7) contrast(1.2)'
                  }}
                />
                
                {/* Kingdom Overlays - Adjusted for new sizing */}
                {Object.entries(kingdomConfig).map(([key, config]) => (
                  <motion.div
                    key={key}
                    className="absolute"
                    style={{
                      left: `${(config.position.x / 2000) * 100}%`,
                      top: `${(config.position.y / 2000) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      ...getKingdomStyle(key)
                    }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleKingdomClick(key)}
                  >
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center relative`}>
                      {!isKingdomUnlocked(key) && (
                        <Lock className="w-6 h-6 md:w-8 md:h-8 text-white absolute" />
                      )}
                      <div className="text-center text-white font-bold">
                        <div className="text-xs md:text-sm">{config.name}</div>
                        <div className="text-xs opacity-80">{config.element}</div>
                      </div>
                    </div>
                    
                    {/* Unlock Timer */}
                    {!isKingdomUnlocked(key) && hoveredKingdom === key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white p-2 rounded text-xs whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Unlocks Week {config.week}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Sub-regions (unlocked in week 6) - Adjusted positioning */}
                {areSubRegionsUnlocked() && subRegions.map((region, index) => (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="absolute w-12 h-12 md:w-16 md:h-16 bg-yellow-500 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      left: `${20 + (index * 12)}%`,
                      bottom: '10%',
                      transform: 'translate(-50%, 0)'
                    }}
                    onClick={() => trackMapInteraction('sub_region_click', { region })}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs text-center p-1">
                      {region.replace('_', ' ')}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TransformComponent>

            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 space-x-2 flex">
              <Button 
                onClick={() => { zoomIn(); trackMapInteraction('zoom_in'); }}
                className="bg-black/80 hover:bg-black/90 backdrop-blur-sm"
              >
                Zoom In
              </Button>
              <Button 
                onClick={() => { zoomOut(); trackMapInteraction('zoom_out'); }}
                className="bg-black/80 hover:bg-black/90 backdrop-blur-sm"
              >
                Zoom Out
              </Button>
              <Button 
                onClick={() => { resetTransform(); trackMapInteraction('reset'); }}
                className="bg-black/80 hover:bg-black/90 backdrop-blur-sm"
              >
                Reset
              </Button>
            </div>

            {/* Tour Button (only available when all unlocked) */}
            {campaignStatus.isComplete && (
              <Button
                className="absolute bottom-6 left-6 bg-purple-600 hover:bg-purple-700 backdrop-blur-sm"
                onClick={() => {
                  trackTourEvent('started');
                  // Trigger tour system
                }}
              >
                Take Grand Tour
              </Button>
            )}
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ProgressiveKinbroldMap; 