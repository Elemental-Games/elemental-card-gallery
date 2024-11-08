import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MapComponent from './MapComponent';
import SpeakerComponent from './SpeakerComponent';
import DragonComponent from './DragonComponent';
import DialogueBox from './DialogueBox';
import { Button } from '@/components/ui/button';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';

const KinbroldMap = () => {
  const [currentSpeaker, setCurrentSpeaker] = useState('iris1');
  const [displayedDragon, setDisplayedDragon] = useState(null);
  const [dialogueText, setDialogueText] = useState(tourScript[0].dialogue);
  const [tourStep, setTourStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [allowManualControl, setAllowManualControl] = useState(false);
  const transformComponentRef = useRef(null);

  const zoomLocations = {
    start: { scale: 1, x: 0, y: 0 },
    evermere: { scale: 2, x: -800, y: -600 }, // Adjusted higher
    zalos: { scale: 2, x: -200, y: -200 }, // Top left
    tsunareth: { scale: 2, x: -800, y: -1200 }, // Bottom middle
    scarto: { scale: 2, x: -1200, y: -400 }, // Mid/upper right
    grivoss: { scale: 2, x: -400, y: -800 }, // Mid left
    frozen_ridge: { scale: 3, x: -300, y: -300 },
    shroud_peak: { scale: 3, x: -1700, y: -300 },
    mount_surya: { scale: 3, x: -1700, y: -700 },
    gleaming_grotto: { scale: 3, x: -1000, y: -1300 },
    noxwood: { scale: 3, x: -1300, y: -1700 },
    arid_sands: { scale: 3, x: -300, y: -1700 },
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
      const { zoomToElement, setTransform } = transformComponentRef.current;

      zoomToElement('map', scale, 1000, 'easeOut');
      setTimeout(() => {
        setTransform(x, y, scale);
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
    <div className="relative w-full h-screen">
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
            <TransformComponent wrapperStyle={{ width: '100%', height: '100vh' }}>
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
        <div className="absolute inset-0">
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
        </div>
      )}
    </div>
  );
};

export default KinbroldMap;
