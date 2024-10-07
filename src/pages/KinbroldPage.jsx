import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Button } from '@/components/ui/button';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';

const KinbroldPage = () => {
  const [currentSpeaker, setCurrentSpeaker] = useState('iris1');
  const [displayedDragon, setDisplayedDragon] = useState(null);
  const [dialogueText, setDialogueText] = useState(tourScript[0].dialogue);
  const [tourStep, setTourStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [allowManualControl, setAllowManualControl] = useState(false);
  const transformComponentRef = useRef(null);

  useEffect(() => {
    if (showTour && tourStep < tourScript.length) {
      const currentRegion = tourScript[tourStep].region;
      if (currentRegion && transformComponentRef.current) {
        zoomToRegion(currentRegion);
      }
      setCurrentSpeaker(tourScript[tourStep].speaker);
      setDisplayedDragon(tourScript[tourStep].dragon ? dragonInfo[tourScript[tourStep].dragon] : null);
      setDialogueText(tourScript[tourStep].dialogue);
    }
  }, [tourStep, showTour]);

  useEffect(() => {
    // Center the map on load
    if (transformComponentRef.current) {
      const { centerView } = transformComponentRef.current;
      centerView(1, 0);
    }
  }, []);

  const zoomToRegion = (region) => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current;
      const element = document.getElementById(region);
      if (element) {
        zoomToElement(element, 2, 1000);
      }
    }
  };

  const advanceTour = () => {
    if (tourStep < tourScript.length - 1) {
      setTourStep(prevStep => prevStep + 1);
    } else {
      endTour();
    }
  };

  const endTour = () => {
    setShowTour(false);
    setCurrentSpeaker(null);
    setDisplayedDragon(null);
    setAllowManualControl(true);
    if (transformComponentRef.current) {
      const { resetTransform } = transformComponentRef.current;
      resetTransform(1000);
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
        limitToBounds={false}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent 
              wrapperClass="!w-full !h-full" 
              contentClass="!w-full !h-auto"
            >
              <MapComponent showInteractivity={allowManualControl} />
            </TransformComponent>
            {allowManualControl && (
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button onClick={() => zoomIn()}>Zoom In</Button>
                <Button onClick={() => zoomOut()}>Zoom Out</Button>
                <Button onClick={() => resetTransform()}>Reset</Button>
              </div>
            )}
          </>
        )}
      </TransformWrapper>
      
      {showTour && (
        <>
          <SpeakerComponent image={`/tour/${currentSpeaker}.png`} />
          {displayedDragon && (
            <DragonComponent 
              image={displayedDragon.image}
              name={displayedDragon.name}
              description={displayedDragon.description}
            />
          )}
          <DialogueBox 
            text={dialogueText} 
            onContinue={advanceTour}
            onSkip={endTour}
            isLastStep={tourStep === tourScript.length - 1}
          />
        </>
      )}
    </div>
  );
};

export default KinbroldPage;