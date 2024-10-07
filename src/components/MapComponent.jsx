import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/alert';

const regions = [
  { name: 'Evermere', image: '/path/evermere_path.png', route: '/evermere' },
  { name: 'Grivoss', image: '/path/grivoss_path.png', route: '/grivoss' },
  { name: 'Scarto', image: '/path/scarto_path.png', route: '/scarto' },
  { name: 'Tsunareth', image: '/path/tsunareth_path.png', route: '/tsunareth' },
  { name: 'Zalos', image: '/path/zalos_path.png', route: '/zalos' },
];

const MapComponent = ({ showInteractivity }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const navigate = useNavigate();

  const handleRegionClick = (region) => {
    if (showInteractivity) {
      navigate(region.route);
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
        <img
          key={region.name}
          src={region.image}
          alt={region.name}
          className="absolute top-0 left-0 w-full h-full cursor-pointer transition-opacity duration-300"
          style={{
            mixBlendMode: 'darken',
            opacity: hoveredRegion === region.name ? 0.7 : 0,
            pointerEvents: showInteractivity ? 'auto' : 'none',
          }}
          onClick={() => handleRegionClick(region)}
          onMouseEnter={() => showInteractivity && setHoveredRegion(region.name)}
          onMouseLeave={() => showInteractivity && setHoveredRegion(null)}
        />
      ))}
      {hoveredRegion && showInteractivity && (
        <Alert className="absolute top-4 left-4 bg-white bg-opacity-75">
          {hoveredRegion}
        </Alert>
      )}
    </div>
  );
};

export default MapComponent;