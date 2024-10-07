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
  const [selectedRegion, setSelectedRegion] = useState(null);
  const navigate = useNavigate();

  const handleRegionClick = (region) => {
    if (showInteractivity) {
      setSelectedRegion(region.name);
      console.log(`Clicked on ${region.name}`);
      setTimeout(() => {
        navigate(region.route);
      }, 1000); // Navigate after 1 second
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
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          style={{
            mixBlendMode: 'darken', // This makes the magenta background transparent
            opacity: showInteractivity ? 0.5 : 0, // Only show hover effect if interactive
            transition: 'opacity 0.3s ease',
          }}
          onClick={() => handleRegionClick(region)}
          onMouseEnter={() => showInteractivity && setSelectedRegion(region.name)}
          onMouseLeave={() => showInteractivity && setSelectedRegion(null)}
        />
      ))}
      {selectedRegion && showInteractivity && (
        <Alert className="absolute top-4 left-4 bg-white bg-opacity-75">
          You selected: {selectedRegion}
        </Alert>
      )}
    </div>
  );
};

export default MapComponent;