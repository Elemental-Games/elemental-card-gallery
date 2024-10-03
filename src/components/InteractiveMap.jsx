import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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

const CharacterDialog = ({ isOpen, onClose, onNext, dialogText, currentStep }) => (
  <div className={`absolute bottom-4 left-4 z-50 ${isOpen ? 'block' : 'hidden'}`}>
    <div className="relative">
      <img src="/balon1.jpeg" alt="Balon" className="w-32 h-32 rounded-full" />
      <div className="absolute top-0 left-full ml-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <div className="relative">
          <p className="mb-4">{dialogText[currentStep]}</p>
          {currentStep < dialogText.length - 1 ? (
            <Button onClick={onNext} className="mt-2">Next</Button>
          ) : (
            <p className="mt-2 text-sm text-gray-500">Click to continue</p>
          )}
          <div className="absolute bottom-1/2 left-0 transform -translate-x-full rotate-45 w-4 h-4 bg-white"></div>
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

  const dialogText = [
    "Welcome to the World of Elemental Masters!",
    "I am Balon, your guide to this magical realm.",
    "Before you lies a world of diverse elements and landscapes.",
    "From the icy peaks of Zalos to the fiery Mount Surya, from the lush Evermere to the mysterious Noxwood, each region holds its own secrets and powers.",
    "Click on the regions to learn more about them.",
    "Your journey to become an Elemental Master begins now!"
  ];

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

  const processBreakdownImage = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Check if the pixel is black (border) or white (outside the circles)
      if ((r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255)) {
        // Make it the same gray color as the background
        data[i] = 128;
        data[i + 1] = 128;
        data[i + 2] = 128;
      }
      // All other colors remain unchanged
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  };

  useEffect(() => {
    if (showBreakdown && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = '/breakdown.jpg';
      img.onload = () => {
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const processedCanvas = processBreakdownImage(img);
        ctx.drawImage(processedCanvas, 0, 0, canvas.width, canvas.height);
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

  const handleNextStep = () => {
    if (currentStep < dialogText.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      setShowCharacter(false);
    }
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
      <CharacterDialog 
        isOpen={showCharacter} 
        onClose={() => setShowCharacter(false)}
        onNext={handleNextStep}
        dialogText={dialogText}
        currentStep={currentStep}
      />
    </div>
  );
};

export default InteractiveMap;