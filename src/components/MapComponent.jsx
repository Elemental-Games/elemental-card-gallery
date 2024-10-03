import React, { useState } from 'react';

const regions = [
  { id: 'zalos', name: 'Zalos', path: 'M50,50 L350,50 L300,200 Z', color: 'blue' },
  { id: 'frozen_ridge', name: 'Frozen Ridge', path: 'M200,50 L400,50 L350,200 L200,150 Z', color: 'lightblue' },
  { id: 'scarto', name: 'Scarto', path: 'M800,50 L950,50 L900,200 L750,150 Z', color: 'red' },
  { id: 'shroud_peak', name: 'Shroud Peak', path: 'M400,100 L500,50 L550,200 L450,250 Z', color: 'purple' },
  { id: 'mount_surya', name: 'Mount Surya', path: 'M600,100 L700,150 L650,250 L550,200 Z', color: 'orange' },
  { id: 'gleaming_grotto', name: 'Gleaming Grotto', path: 'M750,100 L850,50 L900,200 L800,250 Z', color: 'cyan' },
  { id: 'grivoss', name: 'Grivoss', path: 'M50,300 L200,250 L250,400 L100,450 Z', color: 'green' },
  { id: 'arid_sands', name: 'Arid Sands', path: 'M100,500 L250,450 L300,600 L150,650 Z', color: 'yellow' },
  { id: 'evermere', name: 'Evermere', path: 'M400,300 L600,300 L550,500 L350,500 Z', color: 'green' },
  { id: 'tsunareth', name: 'Tsunareth', path: 'M550,700 L750,750 L700,850 L500,800 Z', color: 'lightblue' },
  { id: 'noxwood', name: 'Noxwood', path: 'M300,700 L450,650 L500,800 L350,850 Z', color: 'darkgreen' },
];

const MapComponent = ({ onRegionClick, showInteractivity }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const handleRegionClick = (region) => {
    if (showInteractivity) {
      onRegionClick(region.id);
    }
  };

  return (
    <div className="relative w-full h-full">
      <img 
        src="/IMG_3978.jpeg" 
        alt="Kinbrold Map" 
        className="w-full h-full object-cover"
        id="map"
      />
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1000 1000"
        style={{ pointerEvents: 'none' }}
      >
        {regions.map((region) => (
          <path
            key={region.id}
            id={region.id}
            d={region.path}
            fill={region.color}
            fillOpacity={hoveredRegion === region.id ? 0.3 : 0}
            stroke={region.color}
            strokeWidth="2"
            strokeOpacity={hoveredRegion === region.id ? 1 : 0}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => handleRegionClick(region)}
          />
        ))}
      </svg>
    </div>
  );
};

export default MapComponent;