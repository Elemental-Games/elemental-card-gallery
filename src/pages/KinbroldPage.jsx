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

  const mapWidth = 2000;
  const mapHeight = 2000;

  const zoomLocations = {
    start: { scale: 1, x: 0, y: 0 },
    evermere: { scale: 2, x: 500, y: 500 },
    zalos: { scale: 2, x: 200, y: 200 },
    tsunareth: { scale: 2, x: 800, y: 800 },
    scarto: { scale: 2, x: 800, y: 200 },
    grivoss: { scale: 2, x: 200, y: 800 },
    frozen_ridge: { scale: 3, x: 300, y: 100 },
    shroud_peak: { scale: 3, x: 900, y: 100 },
    mount_surya: { scale: 3, x: 900, y: 300 },
    gleaming_grotto: { scale: 3, x: 500, y: 700 },
    noxwood: { scale: 3, x: 700, y: 900 },
    arid_sands: { scale: 3, x: 100, y: 900 },
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
      const { zoomToElement } = transformComponentRef.current;
      const { scale, x, y } = zoomLocations[location];
      zoomToElement('map', scale, 1000, 'easeOut');
      setTimeout(() => {
        transformComponentRef.current.setTransform(x, y, scale);
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
              <MapComponent showInteractivity={allowManualControl} width={mapWidth} height={mapHeight} />
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