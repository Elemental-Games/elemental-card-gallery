import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { name: 'evermere', path: '/path/evermere_path.png', route: '/evermere' },
  { name: 'scarto', path: '/path/scarto_path.png', route: '/scarto' },
  { name: 'tsunareth', path: '/path/tsunareth_path.png', route: '/tsunareth' },
  { name: 'grivoss', path: '/path/grivoss_path.png', route: '/grivoss' },
  { name: 'zalos', path: '/path/zalos_path.png', route: '/zalos' }
];

const MapComponent = ({ showInteractivity }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const handleRegionClick = (route, event) => {
    if (showInteractivity && !isPanning) {
      navigate(route);
    }
  };

  const handleMouseDown = () => {
    setIsPanning(false);
  };

  const handleMouseMove = () => {
    setIsPanning(true);
  };

  const handleMouseUp = () => {
    setTimeout(() => setIsPanning(false), 10);
  };

  return (
    <div 
      className="relative w-full h-full"
      ref={mapRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img 
        src="/kinbrold_map.jpg" 
        alt="Kinbrold Map" 
        className="w-full h-full object-cover"
        id="map"
      />
      {regions.map((region) => (
        <div
          key={region.name}
          className="absolute top-0 left-0 w-full h-full"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onMouseEnter={() => setHoveredRegion(region.name)}
          onMouseLeave={() => setHoveredRegion(null)}
          onClick={(e) => handleRegionClick(region.route, e)}
        >
          <img
            src={region.path}
            alt={region.name}
            className="w-full h-full object-contain"
            style={{
              opacity: hoveredRegion === region.name ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              pointerEvents: 'none',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MapComponent;