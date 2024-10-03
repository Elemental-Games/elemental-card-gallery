import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';

const KinbroldPage = () => {
  const [currentSpeaker, setCurrentSpeaker] = useState('elly1');
  const [highlightedRegion, setHighlightedRegion] = useState(null);
  const [displayedDragon, setDisplayedDragon] = useState(null);
  const [dialogueText, setDialogueText] = useState(tourScript[0].dialogue);
  const [tourStep, setTourStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [showDragonDialog, setShowDragonDialog] = useState(false);
  const [selectedDragon, setSelectedDragon] = useState(null);

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
  };

  const handleRegionClick = (region) => {
    const dragon = Object.keys(dragonInfo).find(key => dragonInfo[key].name.toLowerCase().includes(region));
    if (dragon) {
      setSelectedDragon(dragonInfo[dragon]);
      setShowDragonDialog(true);
    } else {
      // Navigate to kingdom page
      window.location.href = `https://elementalgames.gg/${region}`;
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900">
      <MapComponent 
        highlight={highlightedRegion} 
        onRegionClick={handleRegionClick}
        showInteractivity={!showTour}
      />
      {showTour && (
        <>
          <SpeakerComponent image={currentSpeaker} />
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
          <img src={selectedDragon?.image} alt={selectedDragon?.name} className="w-full h-64 object-cover" />
          <p>{selectedDragon?.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KinbroldPage;