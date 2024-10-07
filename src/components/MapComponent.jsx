import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const regions = [
  { name: 'Evermere', route: '/evermere' },
  { name: 'Grivoss', route: '/grivoss' },
  { name: 'Scarto', route: '/scarto' },
  { name: 'Tsunareth', route: '/tsunareth' },
  { name: 'Zalos', route: '/zalos' },
];

const MapComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-full">
        <img 
          src="/kinbrold_map.jpg" 
          alt="Kinbrold Map" 
          className="w-full h-full object-cover"
          id="map"
        />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {regions.map((region) => (
          <Button
            key={region.name}
            onClick={() => navigate(region.route)}
            className="px-4 py-2"
          >
            {region.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;