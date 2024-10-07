import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const handleRegionClick = (route) => {
    if (showInteractivity) {
      navigate(route);
    }
  };

  return (
    <div className="relative w-full h-full">
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
          onClick={() => handleRegionClick(region.route)}
        >
          <img
            src={region.path}
            alt={region.name}
            className="w-full h-full object-contain"
            style={{
              opacity: hoveredRegion === region.name ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MapComponent;