import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapComponent = ({ showInteractivity }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleRegionClick = () => {
    if (showInteractivity) {
      navigate('/evermere');
    }
  };

  return (
    <div className="relative w-full" style={{ height: 'auto', paddingBottom: '100%' }}>
      <img 
        src="/kinbrold_map.jpg" 
        alt="Kinbrold Map" 
        className="absolute top-0 left-0 w-full h-full object-cover"
        id="map"
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleRegionClick}
      >
        <img
          src="/path/evermere_path.png"
          alt="Evermere"
          className="w-full h-full object-contain"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      </div>
    </div>
  );
};

export default MapComponent;