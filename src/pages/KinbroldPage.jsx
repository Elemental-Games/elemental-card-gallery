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
    start: { scale: 1, x: '50%', y: '50%' },
    evermere: { scale: 2, x: '50%', y: '50%' },
    zalos: { scale: 2, x: '25%', y: '25%' },
    tsunareth: { scale: 2, x: '75%', y: '75%' },
    scarto: { scale: 2, x: '75%', y: '25%' },
    grivoss: { scale: 2, x: '25%', y: '75%' },
    frozen_ridge: { scale: 3, x: '15%', y: '15%' },
    shroud_peak: { scale: 3, x: '85%', y: '15%' },
    mount_surya: { scale: 3, x: '85%', y: '35%' },
    gleaming_grotto: { scale: 3, x: '50%', y: '65%' },
    noxwood: { scale: 3, x: '65%', y: '85%' },
    arid_sands: { scale: 3, x: '15%', y: '85%' },
  };

  useEffect(() => {
    if (showTour && tourStep < tourScript.length) {
      const currentScript = tourScript[tourStep];
      setCurrentSpeaker(currentScript.speaker);
      setDisplayedDragon(currentScript.dragon ? dragonInfo[currentScript.dragon] : null);
      setDialogueText(currentScript.dialogue);

      if (currentScript.zoom) {
        zoomToLocation(currentScript.zoom);
      }
    }
  }, [tourStep, showTour]);

  const zoomToLocation = (location) => {
    if (transformComponentRef.current && zoomLocations[location]) {
      const { scale, x, y } = zoomLocations[location];
      const { zoomToElement, centerOnElement } = transformComponentRef.current;

      zoomToElement('map', scale, 1000, 'easeOut');
      setTimeout(() => {
        centerOnElement('map', scale, 0, 'easeOut', {
          x: x,
          y: y,
        });
      }, 100);
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
        minScale={0.5}
        maxScale={4}
        limitToBounds={false}
        disabled={!allowManualControl}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
              <MapComponent showInteractivity={allowManualControl} width={2000} height={2000} />
            </TransformComponent>
            {allowManualControl && (
              <div className="absolute bottom-4 right-4 space-x-2">
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