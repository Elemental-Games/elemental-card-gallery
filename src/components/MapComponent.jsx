import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { name: 'evermere', path: "M177,21 C177,21 220,26 249,41 C278,56 294,84 294,84 C294,84 304,115 299,144 C294,173 276,194 276,194 C276,194 247,216 216,224 C185,232 155,229 155,229 C155,229 125,221 102,200 C79,179 65,150 65,150 C65,150 57,118 62,90 C67,62 84,40 84,40 C84,40 109,22 138,17 C167,12 177,21 177,21 Z", route: '/evermere', fill: "rgba(128, 0, 128, 0.3)" },
  { name: 'grivoss', path: "M0,0 L230,0 C230,0 220,30 210,50 C200,70 180,90 180,90 C180,90 150,110 120,120 C90,130 60,130 60,130 L0,130 L0,0 Z", route: '/grivoss', fill: "rgba(0, 255, 0, 0.3)" },
  { name: 'scarto', path: "M710,0 C710,0 750,10 770,30 C790,50 800,80 800,80 L800,0 L710,0 Z", route: '/scarto', fill: "rgba(255, 192, 203, 0.3)" },
  { name: 'tsunareth', path: "M450,450 C450,450 500,440 540,450 C580,460 610,490 610,490 C610,490 630,520 630,550 C630,580 610,610 610,610 L450,610 L450,450 Z", route: '/tsunareth', fill: "rgba(0, 0, 255, 0.3)" },
  { name: 'zalos', path: "M0,450 C0,450 40,460 70,480 C100,500 120,530 120,530 L120,600 L0,600 L0,450 Z", route: '/zalos', fill: "rgba(192, 192, 192, 0.3)" }
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
      <svg viewBox="0 0 800 600" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
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