import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const regions = [
  { id: 'zalos', name: 'Zalos', info: 'A region of ice and frost in the northwest.' },
  { id: 'frozen-ridge', name: 'Frozen Ridge', info: 'A vast icy mountain range.' },
  { id: 'mount-surya', name: 'Mount Surya', info: 'An active volcano, possibly representing fire element.' },
  { id: 'scarto', name: 'Scarto', info: 'A mysterious region in the northeast.' },
  { id: 'shroud-peak', name: 'Shroud Peak', info: 'A misty, enigmatic mountain area.' },
  { id: 'gleaming-grotto', name: 'Gleaming Grotto', info: 'A magical, crystal-filled cave system.' },
  { id: 'crivoss', name: 'Crivoss', info: 'A desert region in the southwest.' },
  { id: 'arid-sands', name: 'Arid Sands', info: 'An expansive desert area.' },
  { id: 'evermere', name: 'Evermere', info: 'The central, lush green heart of the world.' },
  { id: 'tsunareth', name: 'Tsunareth', info: 'A coastal region with dramatic cliffs and waterfalls.' },
  { id: 'noxwood', name: 'Noxwood', info: 'A dark, mysterious forest in the south.' },
];

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
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);

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
    if (showBreakdown && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = '/breakdown.jpg';
      img.onload = () => {
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [showBreakdown, scale]);

  const handleMapClick = (event) => {
    if (!showBreakdown || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale;
    const y = (event.clientY - rect.top) / scale;
    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    
    // Here you would map the color to a region
    // This is a placeholder logic, you'll need to implement the actual color-to-region mapping
    const clickedRegion = regions.find((region, index) => index === pixel[0] % regions.length);
    
    if (clickedRegion) {
      setSelectedRegion(clickedRegion);
    }
  };

  const toggleBreakdown = () => {
    setShowBreakdown(!showBreakdown);
  };

  return (
    <div className="relative w-full" ref={mapRef}>
      <img 
        src="/IMG_3978.jpeg" 
        alt="Elemental Masters World Map" 
        className="w-full h-auto"
        style={{ maxWidth: '3024px', maxHeight: '4032px' }}
      />
      <canvas
        ref={canvasRef}
        onClick={handleMapClick}
        className={`absolute top-0 left-0 w-full h-full ${showBreakdown ? 'opacity-50' : 'opacity-0'} cursor-pointer`}
        style={{ maxWidth: '3024px', maxHeight: '4032px' }}
      />
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