import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MapComponent = ({ showInteractivity }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const regions = [
    { id: 'evermere', path: '/path/evermere_path.png' },
    { id: 'zalos', path: '/path/zalos_path.png' },
    { id: 'scarto', path: '/path/scarto_path.png' },
    { id: 'grivoss', path: '/path/grivoss_path.png' },
    { id: 'tsunareth', path: '/path/tsunareth_path.png' },
  ];

  useEffect(() => {
    const updateMapDimensions = () => {
      if (mapRef.current) {
        setMapDimensions({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight,
        });
      }
    };

    updateMapDimensions();
    window.addEventListener('resize', updateMapDimensions);
    return () => window.removeEventListener('resize', updateMapDimensions);
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const { offsetWidth, offsetHeight } = mapRef.current;
      mapRef.current.scrollLeft = (mapRef.current.scrollWidth - offsetWidth) / 2;
      mapRef.current.scrollTop = (mapRef.current.scrollHeight - offsetHeight) / 2;
    }
  }, []);

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleClick = (event) => {
    if (showInteractivity && !isDragging) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const clickedRegion = getRegionAtPoint(x, y);
      if (clickedRegion) {
        navigate(`/${clickedRegion}`);
      }
    }
  };

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const region = getRegionAtPoint(x, y);
    setHoveredRegion(region);
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  const getRegionAtPoint = (x, y) => {
    // Implement logic to determine which region the point is in
    // This is a placeholder and should be replaced with actual logic
    return 'evermere';
  };

  return (
    <div 
      ref={mapRef}
      className="relative w-full h-full overflow-hidden"
      style={{ cursor: showInteractivity ? 'pointer' : 'default' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src="/kinbrold_map.jpg" 
          alt="Kinbrold Map" 
          className="w-full h-auto"
          id="map"
        />
        {regions.map((region) => (
          <img
            key={region.id}
            src={region.path}
            alt={region.id}
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
            style={{
              opacity: hoveredRegion === region.id ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MapComponent;