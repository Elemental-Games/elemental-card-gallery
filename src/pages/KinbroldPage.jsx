import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
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
  const [currentSpeaker, setCurrentSpeaker] = useState('iris1');
  const [highlightedRegion, setHighlightedRegion] = useState(null);
  const [displayedDragon, setDisplayedDragon] = useState(null);
  const [dialogueText, setDialogueText] = useState(tourScript[0].dialogue);
  const [tourStep, setTourStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [showDragonDialog, setShowDragonDialog] = useState(false);
  const [selectedDragon, setSelectedDragon] = useState(null);
  const [allowManualControl, setAllowManualControl] = useState(false);
  const transformComponentRef = useRef(null);

  useEffect(() => {
    if (showTour && tourStep < tourScript.length) {
      const currentRegion = tourScript[tourStep].region;
      if (currentRegion && transformComponentRef.current) {
        zoomToRegion(currentRegion);
      }
    }
  }, [tourStep, showTour]);

  const zoomToRegion = (region) => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current;
      zoomToElement(region);
      setTimeout(() => {
        zoomToElement('map', 1, 1000); // Zoom out after 1 second
      }, 2000);
    }
  };

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
    setAllowManualControl(true);
  };

  const handleRegionClick = (region) => {
    if (!allowManualControl) return;
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
    <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden flex flex-col">
      <div className="flex-grow relative">
        <TransformWrapper
          ref={transformComponentRef}
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          minScale={0.5}
          maxScale={3}
          disabled={!allowManualControl}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute top-4 left-4 z-10 space-x-2">
                <Button onClick={() => zoomIn()} disabled={!allowManualControl}>Zoom In</Button>
                <Button onClick={() => zoomOut()} disabled={!allowManualControl}>Zoom Out</Button>
                <Button onClick={() => resetTransform()} disabled={!allowManualControl}>Reset</Button>
              </div>
              <TransformComponent>
                <MapComponent 
                  highlight={highlightedRegion} 
                  onRegionClick={handleRegionClick}
                  showInteractivity={allowManualControl}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
        {showTour && (
          <>
            <SpeakerComponent image={`/tour/${currentSpeaker}.png`} />
            {displayedDragon && <DragonComponent image={`/tour/${displayedDragon}`} />}
            <DialogueBox 
              text={dialogueText} 
              onContinue={advanceTour}
              onSkip={skipTour}
              isLastStep={tourStep === tourScript.length - 1}
            />
            <AnimatePresence>
              {highlightedRegion && !isDragonLand(highlightedRegion) && (
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
      </div>
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

      {/* Kingdom buttons section */}
      <div className="bg-gray-800 bg-opacity-75 p-4 mt-4">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
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
