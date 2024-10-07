import React, { useState } from 'react';

const regions = [
  { id: 'zalos', name: 'Zalos', path: 'M50,50 L350,50 L300,200 Z', color: 'blue' },
  { id: 'frozen_ridge', name: 'Frozen Ridge', path: 'M200,50 L400,50 L350,200 L200,150 Z', color: 'lightblue' },
  { id: 'scarto', name: 'Scarto', path: 'M800,50 L950,50 L900,200 L750,150 Z', color: 'red' },
  { id: 'shroud_peak', name: 'Shroud Peak', path: 'M700,200 L800,250 L750,350 L650,300 Z', color: 'purple' },
  { id: 'mount_surya', name: 'Mount Surya', path: 'M600,100 L700,150 L650,250 L550,200 Z', color: 'orange' },
  { id: 'gleaming_grotto', name: 'Gleaming Grotto', path: 'M850,700 L900,750 L875,800 L825,775 Z', color: 'cyan' },
  { id: 'grivoss', name: 'Grivoss', path: 'M400,300 L500,350 L450,450 L350,400 Z', color: 'green' },
  { id: 'arid_sands', name: 'Arid Sands', path: 'M200,800 L400,850 L350,950 L200,900 Z', color: 'yellow' },
  { id: 'evermere', name: 'Evermere', path: 'M500,300 L700,300 L600,500 L400,500 Z', color: 'green' },
  { id: 'tsunareth', name: 'Tsunareth', path: 'M550,700 L750,750 L700,850 L500,800 Z', color: 'lightblue' },
  { id: 'noxwood', name: 'Noxwood', path: 'M800,800 L950,850 L900,950 L750,900 Z', color: 'darkgreen' },
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
        src="/kinbrold_map.jpg" 
        alt="Kinbrold Map" 
        className="w-full h-full object-contain"
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