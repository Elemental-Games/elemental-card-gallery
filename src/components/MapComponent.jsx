import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MapComponent = ({ showInteractivity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateMapDimensions = () => {
      if (mapRef.current) {
        setMapDimensions({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight,
        });
      }
    };

    updateMapDimensions();
    window.addEventListener('resize', updateMapDimensions);
    return () => window.removeEventListener('resize', updateMapDimensions);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleClick = (event) => {
    if (showInteractivity && !isDragging) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Check if the click is within the Evermere region
      if (isPointInEvermere(x, y)) {
        navigate('/evermere');
      }
    }
  };

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (isPointInEvermere(x, y)) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isPointInEvermere = (x, y) => {
    // These values are approximate and may need adjustment
    const evermereCenter = { x: mapDimensions.width * 0.5, y: mapDimensions.height * 0.5 };
    const evermereRadius = Math.min(mapDimensions.width, mapDimensions.height) * 0.15;

    const distance = Math.sqrt(
      Math.pow(x - evermereCenter.x, 2) + Math.pow(y - evermereCenter.y, 2)
    );

    return distance <= evermereRadius;
  };

  return (
    <div 
      ref={mapRef}
      className="relative w-full h-full"
      style={{ cursor: showInteractivity ? 'pointer' : 'default' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src="/kinbrold_map.jpg" 
        alt="Kinbrold Map" 
        className="w-full h-full object-cover"
        id="map"
      />
      <img
        src="/path/evermere_path.png"
        alt="Evermere"
        className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default MapComponent;