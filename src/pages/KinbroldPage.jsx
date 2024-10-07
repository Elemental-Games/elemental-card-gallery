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
  const mapContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const setInitialZoom = () => {
      if (transformComponentRef.current && mapContainerRef.current) {
        const { setTransform } = transformComponentRef.current;
        const containerWidth = mapContainerRef.current.offsetWidth;
        const containerHeight = mapContainerRef.current.offsetHeight;
        const imageWidth = 1000; // Assuming the original image width is 1000px
        const imageHeight = 1000; // Assuming the original image height is 1000px
        const scale = containerWidth / imageWidth;
        const yOffset = (containerHeight - imageHeight * scale) / 2;
        setTransform(0, yOffset, scale);
      }
    };

    setInitialZoom();
    window.addEventListener('resize', setInitialZoom);
    return () => window.removeEventListener('resize', setInitialZoom);
  }, []);

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
      switch (region) {
        case 'zalos':
          navigate('/zalos');
          break;
        case 'scarto':
          navigate('/scarto');
          break;
        case 'grivoss':
          navigate('/grivoss');
          break;
        case 'tsunareth':
          navigate('/tsunareth');
          break;
        default:
          // Handle other regions or do nothing
          break;
      }
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-purple-950"
      ref={mapContainerRef}
    >
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={1}
        minScale={1}
        maxScale={5}
        limitToBounds={false}
        disabled={!allowManualControl}
        panning={{velocityDisabled: true}}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
              <div className="w-full h-full flex items-center justify-center">
                <MapComponent 
                  onRegionClick={handleRegionClick}
                  showInteractivity={allowManualControl}
                />
              </div>
            </TransformComponent>
            {allowManualControl && (
              <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
                <Button onClick={() => zoomIn()}>Zoom In</Button>
                <Button onClick={() => zoomOut()}>Zoom Out</Button>
                <Button onClick={() => {
                  const containerWidth = mapContainerRef.current.offsetWidth;
                  const containerHeight = mapContainerRef.current.offsetHeight;
                  const imageWidth = 1000;
                  const imageHeight = 1000;
                  const scale = containerWidth / imageWidth;
                  const yOffset = (containerHeight - imageHeight * scale) / 2;
                  resetTransform();
                  setTimeout(() => transformComponentRef.current.setTransform(0, yOffset, scale), 50);
                }}>Reset</Button>
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
            onSkip={skipTour}
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
