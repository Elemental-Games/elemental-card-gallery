import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { name: 'evermere', path: "M450,50 C450,50 550,62.5 625,100 C700,137.5 750,212.5 750,212.5 C750,212.5 775,287.5 762.5,362.5 C750,437.5 700,500 700,500 C700,500 625,562.5 550,587.5 C475,612.5 387.5,600 387.5,600 C387.5,600 312.5,575 250,525 C187.5,475 150,387.5 150,387.5 C150,387.5 125,300 137.5,225 C150,150 200,87.5 200,87.5 C200,87.5 262.5,37.5 337.5,25 C412.5,12.5 450,50 450,50 Z", route: '/evermere', fill: "rgba(128, 0, 128, 0.3)" },
  { name: 'grivoss', path: "M0,0 L600,0 C600,0 587.5,50 562.5,100 C537.5,150 500,187.5 500,187.5 C500,187.5 450,225 387.5,250 C325,275 250,287.5 250,287.5 L0,287.5 L0,0 Z", route: '/grivoss', fill: "rgba(0, 255, 0, 0.3)" },
  { name: 'scarto', path: "M1750,0 C1750,0 1800,12.5 1837.5,37.5 C1875,62.5 1900,100 1900,100 C1900,100 1925,137.5 1937.5,175 C1950,212.5 1950,250 1950,250 L2000,250 L2000,0 L1750,0 Z", route: '/scarto', fill: "rgba(255, 192, 203, 0.3)" },
  { name: 'tsunareth', path: "M1125,1000 C1125,1000 1175,987.5 1225,1000 C1275,1012.5 1312.5,1037.5 1312.5,1037.5 C1312.5,1037.5 1350,1075 1375,1125 C1400,1175 1412.5,1237.5 1412.5,1237.5 C1412.5,1237.5 1412.5,1300 1400,1350 C1387.5,1400 1362.5,1437.5 1362.5,1437.5 L1125,1437.5 L1125,1000 Z", route: '/tsunareth', fill: "rgba(0, 0, 255, 0.3)" },
  { name: 'zalos', path: "M0,1250 C0,1250 50,1237.5 100,1250 C150,1262.5 187.5,1287.5 187.5,1287.5 C187.5,1287.5 225,1325 250,1375 C275,1425 287.5,1487.5 287.5,1487.5 L287.5,1500 L0,1500 L0,1250 Z", route: '/zalos', fill: "rgba(192, 192, 192, 0.3)" }
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
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 2000 2000" preserveAspectRatio="xMidYMid slice">
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