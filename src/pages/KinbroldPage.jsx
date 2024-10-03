import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';
import { motion, AnimatePresence } from 'framer-motion';
import ElementalIcon from '../components/ElementalIcon';

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

  const isMainKingdom = (region) => {
    return ['zalos', 'scarto', 'grivoss', 'tsunareth'].includes(region);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden">
      <MapComponent 
        highlight={highlightedRegion} 
        onRegionClick={handleRegionClick}
        showInteractivity={!showTour}
      />
      {showTour && (
        <>
          <SpeakerComponent image={`/tour/${currentSpeaker}`} />
          {displayedDragon && <DragonComponent image={`/tour/${displayedDragon}`} />}
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
                  {isMainKingdom(highlightedRegion) ? (
                    <ElementalIcon 
                      element={highlightedRegion}
                      className="w-16 h-16 object-contain drop-shadow-lg"
                    />
                  ) : (
                    <img 
                      src={`/icons/${highlightedRegion.charAt(0).toUpperCase() + highlightedRegion.slice(1)}.png`}
                      alt={`${highlightedRegion} icon`}
                      className="w-16 h-16 object-contain drop-shadow-lg"
                    />
                  )}
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

      {/* New section for kingdom buttons */}
      <div className="bg-gray-800 bg-opacity-75 p-4 mt-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <Link to="/zalos">
            <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
              Zalos
            </Button>
          </Link>
          <Link to="/scarto">
            <Button variant="outline" className="bg-red-500 hover:bg-red-600 text-white">
              Scarto
            </Button>
          </Link>
          <Link to="/grivoss">
            <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
              Grivoss
            </Button>
          </Link>
          <Link to="/tsunareth">
            <Button variant="outline" className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Tsunareth
            </Button>
          </Link>
          <Link to="/evermere">
            <Button variant="outline" className="bg-purple-500 hover:bg-purple-600 text-white">
              Evermere
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KinbroldPage;