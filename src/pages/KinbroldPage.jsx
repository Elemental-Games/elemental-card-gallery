import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Button } from '@/components/ui/button';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';
import { ScrollArea } from "@/components/ui/scroll-area";

const KinbroldPage = () => {
  const navigate = useNavigate();
  const [currentSpeaker, setCurrentSpeaker] = useState('iris1');
  const [displayedDragon, setDisplayedDragon] = useState(null);
  const [dialogueText, setDialogueText] = useState(tourScript[0].dialogue);
  const [tourStep, setTourStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [allowManualControl, setAllowManualControl] = useState(false);
  const transformComponentRef = useRef(null);

  const kingdoms = [
    { 
      name: 'Evermere',
      path: '/kinbrold/evermere',
      color: 'bg-purple-800 hover:bg-purple-900',
      description: 'The Central Kingdom'
    },
    { 
      name: 'Grivoss',
      path: '/kinbrold/grivoss',
      color: 'bg-green-500 hover:bg-green-600',
      description: 'The Earth Kingdom'
    },
    { 
      name: 'Scarto',
      path: '/kinbrold/scarto',
      color: 'bg-red-500 hover:bg-red-600',
      description: 'The Fire Kingdom'
    },
    { 
      name: 'Tsunareth',
      path: '/kinbrold/tsunareth',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'The Water Kingdom'
    },
    { 
      name: 'Zalos',
      path: '/kinbrold/zalos',
      color: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      description: 'The Air Kingdom'
    }
  ];

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
    <div className="relative w-full min-h-screen overflow-hidden">
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

      <section className="w-full bg-background/95 backdrop-blur-sm p-8 mt-8">
        <h2 className="text-3xl font-bold text-center mb-8">Explore the Kingdoms of Kinbrold</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {kingdoms.map((kingdom) => (
            <Button
              key={kingdom.name}
              onClick={() => navigate(kingdom.path)}
              className={`${kingdom.color} w-full h-24 font-bold flex flex-col items-center justify-center transition-colors`}
            >
              <span className="text-lg">{kingdom.name}</span>
              <span className="text-sm opacity-80">{kingdom.description}</span>
            </Button>
          ))}
        </div>
      </section>

      <section className="w-full bg-background/95 backdrop-blur-sm p-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-heading text-center mb-12">The History of Kinbrold</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollArea className="h-[600px] rounded-md border p-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-heading mb-4">The Dawn of Kinbrold</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    In the beginning, Kinbrold was a realm untamed, where ancient dragons soared freely across unified lands. These weren't mere beasts, but manifestations of elemental power in their purest form. The skies thundered with the wings of Air dragons, the seas churned with Water wyrms, the mountains trembled with Earth drakes, and valleys blazed with Fire serpents.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-heading mb-3">The Legendary Dragons</h4>
                  <div className="space-y-2">
                    {Object.values(dragonInfo).map((dragon) => (
                      <div key={dragon.name} className="p-4 rounded-lg bg-accent/50">
                        <h5 className="font-heading text-lg">{dragon.name}</h5>
                        <p className="text-sm text-muted-foreground">{dragon.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <ScrollArea className="h-[600px] rounded-md border p-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-heading mb-4">The Rise of Civilization</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Among the dragons dwelled humans, some born with remarkable gifts—the ability to harness elemental powers. These first Elementals built Evermere, a sanctuary where all could gather regardless of their elemental affinity. It was here that a discovery would change Kinbrold forever.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-heading mb-4">The Birth of Elemental Masters</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When creatures fell in battle, they left behind not just their physical forms, but the very essence of their elemental power. The craftsmen of Evermere discovered they could combine these remains with elemental essence to forge powerful cards, birthing the game of Elemental Masters.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    What began as a means of training and competition soon became the foundation of Kinbrold's society. The game grew beyond sport, becoming currency, status, and a way of life.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-heading mb-4">The Age of Kingdoms</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Four great Elementalists arose, each mastering their respective elements:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-accent/50">
                        <h5 className="font-heading">Galea of the Air</h5>
                        <p className="text-sm text-muted-foreground">Founding Zalos in the windswept heights</p>
                      </div>
                      <div className="p-4 rounded-lg bg-accent/50">
                        <h5 className="font-heading">Mek of the Water</h5>
                        <p className="text-sm text-muted-foreground">Establishing Tsunareth by the eternal tides</p>
                      </div>
                      <div className="p-4 rounded-lg bg-accent/50">
                        <h5 className="font-heading">Osao of the Fire</h5>
                        <p className="text-sm text-muted-foreground">Raising Scarto from volcanic depths</p>
                      </div>
                      <div className="p-4 rounded-lg bg-accent/50">
                        <h5 className="font-heading">Balon of the Earth</h5>
                        <p className="text-sm text-muted-foreground">Growing Grivoss from the fertile soil</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      While the kingdoms grew powerful and distinct, Evermere remained the heart of Kinbrold, where those without elemental powers made their home. Here, the master craftsmen continue their ancient art of card creation, while hunters and harvesters gather the precious resources needed for their work.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KinbroldPage;
