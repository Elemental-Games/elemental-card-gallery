import React, { useState, useEffect, useRef } from 'react';
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
    <div className="relative w-full h-full" ref={mapRef}>
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