import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';
import { motion, AnimatePresence } from 'framer-motion';

const KinbroldPage = () => {
  const [currentSpeaker, setCurrentSpeaker] = useState('elly1');
  const [highlightedRegion, setHighlightedRegion] = useState(null);
  const [displayedDragon, setDisplayedDragon] = useState(null);
  const [dialogueText, setDialogueText] = useState(tourScript[0].dialogue);
  const [tourStep, setTourStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [showDragonDialog, setShowDragonDialog] = useState(false);
  const [selectedDragon, setSelectedDragon] = useState(null);

  const advanceTour = () => {
    if (tourStep < tourScript.length - 1) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      setCurrentSpeaker(tourScript[nextStep].speaker);
      setHighlightedRegion(tourScript[nextStep].region);
      setDisplayedDragon(tourScript[nextStep].dragon);
      setDialogueText(tourScript[nextStep].dialogue);
    } else {
      endTour();
    }
  };

  const skipTour = () => {
    endTour();
  };

  const endTour = () => {
    setShowTour(false);
    setCurrentSpeaker(null);
    setHighlightedRegion(null);
    setDisplayedDragon(null);
  };

  const handleRegionClick = (region) => {
    const dragon = Object.keys(dragonInfo).find(key => dragonInfo[key].name.toLowerCase().includes(region));
    if (dragon) {
      setSelectedDragon(dragonInfo[dragon]);
      setShowDragonDialog(true);
    } else {
      // Navigate to kingdom page
      window.location.href = `https://elementalgames.gg/${region}`;
    }
  };

  const isDragonLand = (region) => {
    return Object.keys(dragonInfo).some(key => dragonInfo[key].name.toLowerCase().includes(region));
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <MapComponent 
        highlight={highlightedRegion} 
        onRegionClick={handleRegionClick}
        showInteractivity={!showTour}
      />
      {showTour && (
        <>
          <SpeakerComponent image={currentSpeaker} />
          {displayedDragon && <DragonComponent image={displayedDragon} />}
          <DialogueBox 
            text={dialogueText} 
            onContinue={advanceTour}
            onSkip={skipTour}
            isLastStep={tourStep === tourScript.length - 1}
          />
          <AnimatePresence>
            {highlightedRegion && highlightedRegion !== 'evermere' && !isDragonLand(highlightedRegion) && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
              >
                <div className="bg-purple-900 border-4 border-yellow-400 rounded-lg p-4 pb-2 shadow-lg flex items-center justify-center">
                  <img 
                    src={`/icons/${highlightedRegion.charAt(0).toUpperCase() + highlightedRegion.slice(1)}.png`}
                    alt={`${highlightedRegion} icon`}
                    className="w-16 h-16 object-contain drop-shadow-lg"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      <Dialog open={showDragonDialog} onOpenChange={() => setShowDragonDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDragon?.name}</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <img src={selectedDragon?.image} alt={selectedDragon?.name} className="w-full h-64 object-cover" />
          </div>
          <p>{selectedDragon?.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KinbroldPage;