import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';
import DragonComponent from './DragonComponent';

const regions = [
  { id: 'zalos', name: 'Zalos', info: 'The Air Kingdom, known for its floating islands and wind-swept spires.' },
  { id: 'scarto', name: 'Scarto', info: 'The Fire Kingdom, a land of volcanoes and intense heat.' },
  { id: 'grivoss', name: 'Grivoss', info: 'The Earth Kingdom, with towering mountains and dense forests.' },
  { id: 'tsunareth', name: 'Tsunareth', info: 'The Water Kingdom, a realm of vast oceans and underwater cities.' },
  { id: 'evermere', name: 'Evermere', info: 'The central region, home to non-elemental humans and card crafters.' },
  { id: 'frozen-ridge', name: 'Frozen Ridge', info: 'A vast icy mountain range, home to the Frost Dragon.' },
  { id: 'mount-surya', name: 'Mount Surya', info: 'An active volcano, domain of the Lava Dragon.' },
  { id: 'shroud-peak', name: 'Shroud Peak', info: 'A misty, enigmatic mountain area where the Lightning Dragon resides.' },
  { id: 'gleaming-grotto', name: 'Gleaming Grotto', info: 'A magical, crystal-filled cave system, lair of the Crystal Dragon.' },
  { id: 'arid-sands', name: 'Arid Sands', info: 'An expansive desert area, territory of the Sand Dragon.' },
  { id: 'noxwood', name: 'Noxwood', info: 'A dark, mysterious forest, home to the Poison Dragon.' },
];

const CharacterDialog = ({ isOpen, onClose, onNext, dialogText, currentStep, speaker }) => (
  <div className={`absolute bottom-0 left-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
    <div className="relative">
      <img 
        src={`/tour/${speaker}.png`}
        alt={speaker}
        className="w-auto h-[65vh]" 
        style={{ maxWidth: '50%', objectFit: 'contain' }}
      />
      <div className="absolute top-0 left-full ml-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <div className="relative">
          <p className="mb-4">{dialogText}</p>
          <Button onClick={onNext} className="mt-2">Next</Button>
        </div>
      </div>
    </div>
  </div>
);

const InteractiveMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [zoomRegion, setZoomRegion] = useState(null);
  const [showDragon, setShowDragon] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowCharacter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        const containerWidth = mapRef.current.offsetWidth;
        const imageWidth = 3024; // Original width of IMG_3978.jpeg
        setScale(containerWidth / imageWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentRegion = tourScript[currentStep].region;
    setZoomRegion(currentRegion);
    
    const dragonKey = tourScript[currentStep].dragon;
    setShowDragon(dragonKey ? dragonInfo[dragonKey] : null);
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < tourScript.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      setShowCharacter(false);
      setZoomRegion(null);
      setShowDragon(null);
    }
  };

  const getRegionStyle = (regionId) => {
    if (zoomRegion === regionId) {
      return { transform: 'scale(1.5)', transition: 'transform 0.5s' };
    }
    return {};
  };

  return (
    <div className="relative w-full h-screen" ref={mapRef}>
      <img 
        src="/IMG_3978.jpeg" 
        alt="Elemental Masters World Map" 
        className="w-full h-full object-cover"
      />
      {regions.map((region) => (
        <div
          key={region.id}
          className={`absolute ${region.id}`}
          style={getRegionStyle(region.id)}
        >
          {/* Add region-specific styling here */}
        </div>
      ))}
      <CharacterDialog 
        isOpen={showCharacter} 
        onClose={() => setShowCharacter(false)}
        onNext={handleNextStep}
        dialogText={tourScript[currentStep].dialogue}
        currentStep={currentStep}
        speaker={tourScript[currentStep].speaker}
      />
      {showDragon && (
        <DragonComponent image={showDragon.image} />
      )}
    </div>
  );
};

export default InteractiveMap;