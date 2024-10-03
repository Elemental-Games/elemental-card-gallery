import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { id: 'zalos', name: 'Zalos', path: 'M50,50 L200,50 L150,200 Z', color: 'blue' },
  { id: 'frozen-ridge', name: 'Frozen Ridge', path: 'M200,50 L400,50 L350,200 L200,150 Z', color: 'lightblue' },
  { id: 'scarto', name: 'Scarto', path: 'M800,50 L950,50 L900,200 L750,150 Z', color: 'red' },
  { id: 'shroud-peak', name: 'Shroud Peak', path: 'M700,200 L800,250 L750,350 L650,300 Z', color: 'purple' },
  { id: 'gleaming-grotto', name: 'Gleaming Grotto', path: 'M850,700 L900,750 L875,800 L825,775 Z', color: 'cyan' },
  { id: 'grivoss', name: 'Grivoss', path: 'M50,750 L200,800 L150,950 L50,900 Z', color: 'orange' },
  { id: 'arid-sands', name: 'Arid Sands', path: 'M200,800 L400,850 L350,950 L200,900 Z', color: 'yellow' },
  { id: 'evermere', name: 'Evermere', path: 'M300,300 L700,300 L600,700 L400,700 Z', color: 'green' },
  { id: 'tsunareth', name: 'Tsunareth', path: 'M400,800 L700,850 L650,950 L350,950 Z', color: 'lightblue' },
  { id: 'noxwood', name: 'Noxwood', path: 'M800,800 L950,850 L900,950 L750,900 Z', color: 'darkgreen' },
];

const MapComponent = ({ highlight, onRegionClick, showInteractivity }) => {
  const navigate = useNavigate();
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const handleRegionClick = (region) => {
    if (showInteractivity) {
      if (['zalos', 'grivoss', 'scarto', 'tsunareth', 'evermere'].includes(region.id)) {
        navigate(`/${region.id}`);
      } else {
        onRegionClick(region.id);
      }
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
      {highlight && (
        <img 
          src={`/${highlight}_highlight.png`} 
          alt={`${highlight} highlight`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
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