import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/alert';

const regions = [
  { name: 'Evermere', image: '/path/evermere_path.png', route: '/kinbrold/evermere', coords: { x: 800, y: 600 } },
  { name: 'Grivoss', image: '/path/grivoss_path.png', route: '/kinbrold/grivoss', coords: { x: 400, y: 800 } },
  { name: 'Scarto', image: '/path/scarto_path.png', route: '/kinbrold/scarto', coords: { x: 1200, y: 400 } },
  { name: 'Tsunareth', image: '/path/tsunareth_path.png', route: '/kinbrold/tsunareth', coords: { x: 800, y: 1200 } },
  { name: 'Zalos', image: '/path/zalos_path.png', route: '/kinbrold/zalos', coords: { x: 200, y: 200 } },
];

const MapComponent = ({ showInteractivity, width, height }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const navigate = useNavigate();
  const mapRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = () => setIsPanning(true);
    const handleMouseUp = () => setIsPanning(false);

    if (showInteractivity) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [showInteractivity]);

  const handleRegionClick = (event, region) => {
    if (showInteractivity && !isPanning) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = event.target;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      const rect = mapRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      
      // Check if the clicked pixel is not transparent
      if (pixel[3] !== 0) {
        navigate(region.route);
      }
    }
  };

  return (
    <div className="relative" ref={mapRef} style={{ width: `${width}px`, height: `${height}px` }}>
      <img 
        src="/kinbrold_map.jpg" 
        alt="Kinbrold Map" 
        className="w-full h-full object-cover"
        id="map"
      />
      <img 
        src="/tour/zooms.png" 
        alt="Region Circles" 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0"
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
          onClick={(e) => handleRegionClick(e, region)}
          onMouseEnter={() => showInteractivity && setHoveredRegion(region.name)}
          onMouseLeave={() => showInteractivity && setHoveredRegion(null)}
        />
      ))}
      {hoveredRegion && showInteractivity && !isPanning && (
        <Alert className="absolute top-4 left-4 bg-white bg-opacity-75">
          {hoveredRegion}
        </Alert>
      )}
    </div>
  );
};

export default MapComponent;
