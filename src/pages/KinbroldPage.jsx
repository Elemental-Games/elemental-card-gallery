import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
  const transformComponentRef = useRef(null);
  const navigate = useNavigate();

  const resetToCenter = () => {
    if (transformComponentRef.current) {
      const { resetTransform } = transformComponentRef.current;
      resetTransform(1000);
      setTimeout(() => {
        const mapElement = document.getElementById('map');
        if (mapElement) {
          const { zoomToElement } = transformComponentRef.current;
          zoomToElement(mapElement, 1, 1000, 'center');
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (transformComponentRef.current) {
      resetToCenter();
    }
  }, []);

  useEffect(() => {
    if (showTour && tourStep < tourScript.length) {
      const currentRegion = tourScript[tourStep].region;
      if (currentRegion && transformComponentRef.current) {
        zoomToRegion(currentRegion);
      }
      setCurrentSpeaker(tourScript[tourStep].speaker);
      setDisplayedDragon(tourScript[tourStep].dragon ? dragonInfo[tourScript[tourStep].dragon].image : null);
      setDialogueText(tourScript[tourStep].dialogue);
    }
  }, [tourStep, showTour]);

  const zoomToRegion = (region) => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current;
      const element = document.getElementById(region);
      if (element) {
        zoomToElement(element, 2.5, 1000);
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
      const regionPages = { zalos: '/zalos', scarto: '/scarto', grivoss: '/grivoss', tsunareth: '/tsunareth' };
      if (regionPages[region]) {
        navigate(regionPages[region]);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={1}
        minScale={1}
        maxScale={5}
        disabled={!allowManualControl}
        limitToBounds={true}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            <TransformComponent 
              wrapperClass="!w-full !h-full" 
              contentClass="!w-full !h-auto"
            >
              <MapComponent 
                onRegionClick={handleRegionClick}
                showInteractivity={allowManualControl}
              />
            </TransformComponent>
            {allowManualControl && (
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button onClick={() => zoomIn()}>Zoom In</Button>
                <Button onClick={() => zoomOut()}>Zoom Out</Button>
                <Button onClick={resetToCenter}>Reset</Button>
              </div>
            )}
          </>
        )}
      </TransformWrapper>
      
      {showTour && (
        <>
          <SpeakerComponent image={`/tour/${currentSpeaker}.png`} />
          {displayedDragon && <DragonComponent image={displayedDragon} />}
          <DialogueBox 
            text={dialogueText} 
            onContinue={advanceTour}
            onSkip={endTour}
            isLastStep={tourStep === tourScript.length - 1}
          />
        </>
      )}
      <Dialog open={showDragonDialog} onOpenChange={() => setShowDragonDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDragon?.name}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-64">
            {selectedDragon && <DragonComponent image={selectedDragon.image} />}
          </div>
          <p>{selectedDragon?.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KinbroldPage;
