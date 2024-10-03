import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const regions = [
  { id: 'zalos', name: 'Zalos', info: 'A region of ice and frost in the northwest.', coords: { top: '5%', left: '5%', width: '20%', height: '20%' } },
  { id: 'frozen-ridge', name: 'Frozen Ridge', info: 'A vast icy mountain range.', coords: { top: '5%', left: '25%', width: '30%', height: '20%' } },
  { id: 'mount-surya', name: 'Mount Surya', info: 'An active volcano, possibly representing fire element.', coords: { top: '10%', left: '70%', width: '20%', height: '20%' } },
  { id: 'scarto', name: 'Scarto', info: 'A mysterious region in the northeast.', coords: { top: '5%', left: '85%', width: '15%', height: '15%' } },
  { id: 'shroud-peak', name: 'Shroud Peak', info: 'A misty, enigmatic mountain area.', coords: { top: '25%', left: '55%', width: '20%', height: '20%' } },
  { id: 'gleaming-grotto', name: 'Gleaming Grotto', info: 'A magical, crystal-filled cave system.', coords: { top: '40%', left: '80%', width: '15%', height: '15%' } },
  { id: 'crivoss', name: 'Crivoss', info: 'A desert region in the southwest.', coords: { top: '60%', left: '5%', width: '25%', height: '25%' } },
  { id: 'arid-sands', name: 'Arid Sands', info: 'An expansive desert area.', coords: { top: '75%', left: '15%', width: '30%', height: '20%' } },
  { id: 'evermere', name: 'Evermere', info: 'The central, lush green heart of the world.', coords: { top: '40%', left: '30%', width: '40%', height: '30%' } },
  { id: 'tsunareth', name: 'Tsunareth', info: 'A coastal region with dramatic cliffs and waterfalls.', coords: { top: '65%', left: '45%', width: '30%', height: '30%' } },
  { id: 'noxwood', name: 'Noxwood', info: 'A dark, mysterious forest in the south.', coords: { top: '80%', left: '40%', width: '25%', height: '20%' } },
];

const MapRegion = ({ region, onClick }) => (
  <div 
    className="absolute cursor-pointer hover:opacity-75 transition-opacity border-2 border-white rounded-md bg-black bg-opacity-20"
    style={{
      top: region.coords.top,
      left: region.coords.left,
      width: region.coords.width,
      height: region.coords.height,
    }}
    onClick={() => onClick(region)}
  >
    <span className="text-white text-xs font-bold">{region.name}</span>
  </div>
);

const CharacterDialog = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Welcome to the World of Elemental Masters!</DialogTitle>
      </DialogHeader>
      <p>Greetings, traveler! I am Aether, your guide to this magical realm. Before you lies a world of diverse elements and landscapes. From the icy peaks of Zalos to the fiery Mount Surya, from the lush Evermere to the mysterious Noxwood, each region holds its own secrets and powers. Click on the regions to learn more about them. Your journey to become an Elemental Master begins now!</p>
    </DialogContent>
  </Dialog>
);

const InteractiveMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCharacter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const toggleBreakdown = () => {
    setShowBreakdown(!showBreakdown);
  };

  return (
    <div className="relative w-full h-screen">
      <img src="/background.jpeg" alt="Elemental Masters World Map" className="w-full h-full object-cover" />
      {showBreakdown && (
        <img 
          src="/breakdown.png" 
          alt="Region Breakdown" 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
      )}
      {regions.map(region => (
        <MapRegion key={region.id} region={region} onClick={handleRegionClick} />
      ))}
      <button 
        className="absolute top-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75 text-black px-4 py-2 rounded"
        onClick={toggleBreakdown}
      >
        {showBreakdown ? 'Hide Regions' : 'Show Regions'}
      </button>
      <Dialog open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRegion?.name}</DialogTitle>
          </DialogHeader>
          <p>{selectedRegion?.info}</p>
        </DialogContent>
      </Dialog>
      <CharacterDialog isOpen={showCharacter} onClose={() => setShowCharacter(false)} />
    </div>
  );
};

export default InteractiveMap;