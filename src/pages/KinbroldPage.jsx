import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';

const KinbroldPage = () => {
  const [currentSpeaker, setCurrentSpeaker] = useState('iris1');
  const [displayedDragon, setDisplayedDragon] = useState(null);
  const [dialogueText, setDialogueText] = useState(tourScript[0].dialogue);
  const [tourStep, setTourStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [showDragonDialog, setShowDragonDialog] = useState(false);
  const [selectedDragon, setSelectedDragon] = useState(null);
  const [allowManualControl, setAllowManualControl] = useState(false);
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
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
      const { zoomToElement, setTransform } = transformComponentRef.current;
      const element = document.getElementById(region);
      if (element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let scale = 2.5;
        let x, y;

        switch (region) {
          case 'grivoss':
            x = -rect.left;
            y = -rect.top + window.innerHeight / 4;
            break;
          case 'shroud_peak':
            x = -centerX + window.innerWidth / 2;
            y = -centerY + window.innerHeight / 2;
            break;
          case 'gleaming_grotto':
            x = -rect.right + window.innerWidth * 0.75;
            y = -rect.top + window.innerHeight * 0.25;
            break;
          case 'noxwood':
            x = -rect.left + window.innerWidth * 0.25;
            y = -rect.bottom + window.innerHeight * 0.75;
            break;
          case 'arid_sands':
            x = -rect.left;
            y = -rect.bottom + window.innerHeight * 0.75;
            break;
          default:
            x = -centerX + window.innerWidth / 2;
            y = -centerY + window.innerHeight / 2;
        }

        setTransform(x, y, scale, 1000);
        setCharacterPosition({ x: centerX, y: centerY });
      }
    }
  };

  const advanceTour = () => {
    if (tourStep < tourScript.length - 1) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      setCurrentSpeaker(tourScript[nextStep].speaker);
      setDisplayedDragon(tourScript[nextStep].dragon);
      setDialogueText(tourScript[nextStep].dialogue);

      if (transformComponentRef.current) {
        const { resetTransform } = transformComponentRef.current;
        resetTransform(1000);
        setTimeout(() => {
          zoomToRegion(tourScript[nextStep].region);
        }, 1000);
      }
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
      window.location.href = `https://elementalgames.gg/${region}`;
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.5}
        maxScale={3}
        disabled={!allowManualControl}
      >
        <TransformComponent>
          <MapComponent 
            onRegionClick={handleRegionClick}
            showInteractivity={allowManualControl}
          />
          {showTour && (
            <>
              <SpeakerComponent 
                image={`/tour/${currentSpeaker}.png`} 
                position={characterPosition}
              />
              {displayedDragon && (
                <DragonComponent 
                  image={`/tour/${displayedDragon}`} 
                  position={characterPosition}
                />
              )}
            </>
          )}
        </TransformComponent>
      </TransformWrapper>
      {showTour && (
        <DialogueBox 
          text={dialogueText} 
          onContinue={advanceTour}
          onSkip={skipTour}
          isLastStep={tourStep === tourScript.length - 1}
        />
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