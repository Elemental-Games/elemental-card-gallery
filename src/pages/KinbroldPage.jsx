import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const tourScript = [
  {
    speaker: 'elly1',
    region: null,
    dragon: null,
    dialogue: "Welcome to the world of Kinbrold! Let me take you on a tour of our elemental world.",
  },
  {
    speaker: 'elly1',
    region: 'evermere',
    dragon: null,
    dialogue: "This is Evermere, where all non-elemental humans reside and the core of the card crafters live. Many Elemental Masters have come from Evermere, embarking on journeys to collect essence and key items to craft the most refined decks.",
  },
  {
    speaker: 'elly1',
    region: 'zalos',
    dragon: null,
    dialogue: "Next, we have Zalos, the Air Kingdom.",
  },
  {
    speaker: 'galea1',
    region: 'zalos',
    dragon: null,
    dialogue: "We of the Air Kingdom pride ourselves on our speed and agility. Our winds carry the whispers of ancient knowledge.",
  },
  {
    speaker: 'elly1',
    region: 'tsunareth',
    dragon: null,
    dialogue: "Here we have Tsunareth, the Water Kingdom.",
  },
  {
    speaker: 'mek1',
    region: 'tsunareth',
    dragon: null,
    dialogue: "The Water Kingdom flows with healing energies. Our adaptability is our strength, ever-changing like the tides.",
  },
  {
    speaker: 'elly1',
    region: 'scarto',
    dragon: null,
    dialogue: "Now, behold Scarto, the Fire Kingdom.",
  },
  {
    speaker: 'osao1',
    region: 'scarto',
    dragon: null,
    dialogue: "The Fire Kingdom burns with passion and strength. Our flames forge the mightiest of warriors and the most powerful of spells.",
  },
  {
    speaker: 'elly1',
    region: 'grivoss',
    dragon: null,
    dialogue: "Lastly, we have Grivoss, the Earth Kingdom.",
  },
  {
    speaker: 'balon1',
    region: 'grivoss',
    dragon: null,
    dialogue: "The Earth Kingdom stands firm in its defense of the land. Our resolve is unshakeable, our foundations strong.",
  },
  {
    speaker: 'elly1',
    region: 'frozen_ridge',
    dragon: 'frost_dragon1',
    dialogue: "In the Frozen Ridge dwells the majestic Frost Dragon.",
  },
  {
    speaker: 'elly1',
    region: 'shroud_peak',
    dragon: 'lightning_dragon1',
    dialogue: "Shroud Peak crackles with the energy of the Lightning Dragon.",
  },
  {
    speaker: 'elly1',
    region: 'mount_surya',
    dragon: 'lava_dragon1',
    dialogue: "The fiery Mount Surya is home to the fearsome Lava Dragon.",
  },
  {
    speaker: 'elly1',
    region: 'gleaming_grotto',
    dragon: 'crystal_dragon1',
    dialogue: "Within the Gleaming Grotto resides the mystical Crystal Dragon.",
  },
  {
    speaker: 'elly1',
    region: 'noxwood',
    dragon: 'poison_dragon1',
    dialogue: "The shadowy Noxwood is the domain of the cunning Poison Dragon.",
  },
  {
    speaker: 'elly1',
    region: 'arid_sands',
    dragon: 'sand_dragon1',
    dialogue: "Across the Arid Sands roams the ancient Sand Dragon.",
  },
  {
    speaker: 'elly1',
    region: null,
    dragon: null,
    dialogue: "Click on any region to learn more and begin your Elemental journey!",
  },
];

const dragonInfo = {
  frost_dragon1: {
    name: "Eldritch | The Frost Dragon",
    description: "A majestic dragon of ice and frost, dwelling in the Frozen Ridge.",
    image: "/dragons/frost_dragon.png"
  },
  lightning_dragon1: {
    name: "Veton | The Lightning Dragon",
    description: "A powerful dragon of storms and lightning, residing atop Shroud Peak.",
    image: "/dragons/lightning_dragon.png"
  },
  lava_dragon1: {
    name: "Zoryn | The Lava Dragon",
    description: "A fierce dragon of molten rock and fire, making its home in Mount Surya.",
    image: "/dragons/lava_dragon.png"
  },
  crystal_dragon1: {
    name: "Diamoria | The Crystal Dragon",
    description: "A mystical dragon of shimmering crystals, hidden within the Gleaming Grotto.",
    image: "/dragons/crystal_dragon.png"
  },
  poison_dragon1: {
    name: "Noxilus | The Poison Dragon",
    description: "A cunning dragon of toxins and venom, lurking in the shadows of Noxwood.",
    image: "/dragons/poison_dragon.png"
  },
  sand_dragon1: {
    name: "Aridus | The Sand Dragon",
    description: "An ancient dragon of shifting sands, roaming the vast Arid Sands.",
    image: "/dragons/sand_dragon.png"
  }
};

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
    }
  };

  const skipTour = () => {
    setShowTour(false);
  };

  const handleRegionClick = (region) => {
    const dragon = Object.keys(dragonInfo).find(key => dragonInfo[key].name.toLowerCase().includes(region));
    if (dragon) {
      setSelectedDragon(dragonInfo[dragon]);
      setShowDragonDialog(true);
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