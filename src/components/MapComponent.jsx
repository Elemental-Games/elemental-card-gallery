import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { name: 'evermere', path: '/path/evermere_path.png', route: '/evermere' },
  { name: 'scarto', path: '/path/scarto_path.png', route: '/scarto' },
  { name: 'tsunareth', path: '/path/tsunareth_path.png', route: '/tsunareth' },
  { name: 'grivoss', path: '/path/grivoss_path.png', route: '/grivoss' },
  { name: 'zalos', path: '/path/zalos_path.png', route: '/zalos' }
];

const MapComponent = ({ showInteractivity }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [isPanning, setIsPanning] = useState(false);
  const [regionBounds, setRegionBounds] = useState({});
  const navigate = useNavigate();
  const mapRef = useRef(null);

  useEffect(() => {
    const loadRegionBounds = async () => {
      const bounds = {};
      for (const region of regions) {
        bounds[region.name] = await getImageBounds(region.path);
      }
      setRegionBounds(bounds);
    };
    loadRegionBounds();
  }, []);

  const getImageBounds = (imagePath) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const bounds = getBoundsFromImageData(imageData);
        resolve(bounds);
      };
      img.src = imagePath;
    });
  };

  const getBoundsFromImageData = (imageData) => {
    let minX = imageData.width, minY = imageData.height, maxX = 0, maxY = 0;
    const data = imageData.data;
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const alpha = data[(y * imageData.width + x) * 4 + 3];
        if (alpha > 0) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
    return { minX, minY, maxX, maxY };
  };

  const handleRegionClick = (region, event) => {
    if (showInteractivity && !isPanning) {
      const bounds = regionBounds[region.name];
      if (bounds) {
        const rect = mapRef.current.getBoundingClientRect();
        const scaleX = rect.width / 2000; // Assuming the original image is 2000x2000
        const scaleY = rect.height / 2000;
        const x = (event.clientX - rect.left) / scaleX;
        const y = (event.clientY - rect.top) / scaleY;
        if (x >= bounds.minX && x <= bounds.maxX && y >= bounds.minY && y <= bounds.maxY) {
          navigate(region.route);
        }
      }
    }
  };

  const handleMouseDown = () => {
    setIsPanning(false);
  };

  const handleMouseMove = () => {
    setIsPanning(true);
  };

  const handleMouseUp = () => {
    setTimeout(() => setIsPanning(false), 10);
  };

  return (
    <div 
      className="relative w-full h-full"
      ref={mapRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img 
        src="/kinbrold_map.jpg" 
        alt="Kinbrold Map" 
        className="w-full h-full object-cover"
        id="map"
      />
      {regions.map((region) => (
        <div
          key={region.name}
          className="absolute top-0 left-0 w-full h-full"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onMouseEnter={() => setHoveredRegion(region.name)}
          onMouseLeave={() => setHoveredRegion(null)}
          onClick={(e) => handleRegionClick(region, e)}
        >
          <img
            src={region.path}
            alt={region.name}
            className="w-full h-full object-contain"
            style={{
              opacity: hoveredRegion === region.name ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              pointerEvents: 'none',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MapComponent;