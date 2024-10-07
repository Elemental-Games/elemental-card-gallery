import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { name: 'evermere', path: "M530,60 Q650,60 750,130 Q850,200 870,320 Q890,440 850,540 Q810,640 700,690 Q590,740 480,690 Q370,640 320,540 Q270,440 290,320 Q310,200 410,130 Q510,60 530,60 Z", route: '/evermere', fill: "rgba(128, 0, 128, 0.3)" },
  { name: 'grivoss', path: "M0,0 L600,0 Q580,50 540,100 Q500,150 440,180 Q380,210 300,230 Q220,250 0,290 L0,0 Z", route: '/grivoss', fill: "rgba(0, 255, 0, 0.3)" },
  { name: 'scarto', path: "M1750,0 Q1810,10 1850,40 Q1890,70 1920,120 Q1950,170 1970,230 L2000,230 L2000,0 L1750,0 Z", route: '/scarto', fill: "rgba(255, 192, 203, 0.3)" },
  { name: 'tsunareth', path: "M800,1350 Q780,1430 820,1500 Q860,1570 930,1610 Q1000,1650 1080,1650 Q1160,1650 1230,1610 L1230,1350 L800,1350 Z", route: '/tsunareth', fill: "rgba(0, 0, 255, 0.3)" },
  { name: 'zalos', path: "M0,1250 Q80,1230 150,1270 Q220,1310 260,1380 Q300,1450 300,1530 L0,1530 L0,1250 Z", route: '/zalos', fill: "rgba(192, 192, 192, 0.3)" }
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
      <svg viewBox="0 0 2000 2000" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {regions.map((region) => (
          <path
            key={region.name}
            d={region.path}
            fill={hoveredRegion === region.name ? region.fill : 'transparent'}
            stroke={hoveredRegion === region.name ? 'white' : 'transparent'}
            strokeWidth="2"
            style={{ cursor: showInteractivity ? 'pointer' : 'default' }}
            onClick={() => handleRegionClick(region.route)}
            onMouseEnter={() => setHoveredRegion(region.name)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
        ))}
      </svg>
    </div>
  );
};

export default MapComponent;