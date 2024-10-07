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

  const zoomLocations = {
    evermere: { x: -1500, y: -1000, scale: 2, color: 'purple' },
    zalos: { x: -750, y: -500, scale: 2, color: 'cyan' },
    scarto: { x: -2250, y: -500, scale: 2, color: 'red' },
    tsunareth: { x: -1500, y: -1500, scale: 2, color: 'blue' },
    grivoss: { x: -750, y: -1000, scale: 2, color: 'lime' },
    frozen_ridge: { x: -1000, y: -750, scale: 2 },
    shroud_peak: { x: -2000, y: -750, scale: 2 },
    mount_surya: { x: -2000, y: -1250, scale: 2 },
    gleaming_grotto: { x: -1250, y: -1250, scale: 2 },
    noxwood: { x: -1750, y: -1500, scale: 2 },
    arid_sands: { x: -500, y: -1250, scale: 2 },
  };

  useEffect(() => {
    if (showTour && tourStep < tourScript.length) {
      const currentRegion = tourScript[tourStep].region;
      if (currentRegion) {
        zoomToRegion(currentRegion);
      }
      setCurrentSpeaker(tourScript[tourStep].speaker);
      setDisplayedDragon(tourScript[tourStep].dragon ? dragonInfo[tourScript[tourStep].dragon] : null);
      setDialogueText(tourScript[tourStep].dialogue);
    }
  }, [tourStep, showTour]);

  const zoomToRegion = (region) => {
    if (transformComponentRef.current && zoomLocations[region]) {
      const { setTransform } = transformComponentRef.current;
      const { x, y, scale } = zoomLocations[region];
      setTransform(x, y, scale, 1000);
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
      resetTransform();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        disabled={!allowManualControl}
      >
        <TransformComponent>
          <MapComponent showInteractivity={allowManualControl} />
          <img 
            src="/tour/zooms.png" 
            alt="Region Circles" 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
        </TransformComponent>
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

      {allowManualControl && (
        <div className="absolute bottom-4 right-4 space-x-2">
          <Button onClick={() => transformComponentRef.current?.zoomIn()}>Zoom In</Button>
          <Button onClick={() => transformComponentRef.current?.zoomOut()}>Zoom Out</Button>
          <Button onClick={() => transformComponentRef.current?.resetTransform()}>Reset</Button>
        </div>
      )}
    </div>
  );
};

export default KinbroldPage;
