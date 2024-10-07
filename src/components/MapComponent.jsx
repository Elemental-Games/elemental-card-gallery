import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  { id: 'evermere', name: 'Evermere', path: '/path/evermere_path.png' },
  { id: 'zalos', name: 'Zalos', path: '/path/zalos_path.png' },
  { id: 'frozen_ridge', name: 'Frozen Ridge', path: '/path/frozen_ridge_path.png' },
  { id: 'scarto', name: 'Scarto', path: '/path/scarto_path.png' },
  { id: 'shroud_peak', name: 'Shroud Peak', path: '/path/shroud_peak_path.png' },
  { id: 'mount_surya', name: 'Mount Surya', path: '/path/mount_surya_path.png' },
  { id: 'gleaming_grotto', name: 'Gleaming Grotto', path: '/path/gleaming_grotto_path.png' },
  { id: 'grivoss', name: 'Grivoss', path: '/path/grivoss_path.png' },
  { id: 'arid_sands', name: 'Arid Sands', path: '/path/arid_sands_path.png' },
  { id: 'tsunareth', name: 'Tsunareth', path: '/path/tsunareth_path.png' },
  { id: 'noxwood', name: 'Noxwood', path: '/path/noxwood_path.png' },
];

const MapComponent = ({ showInteractivity }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const navigate = useNavigate();

  const handleRegionClick = (regionId) => {
    if (showInteractivity) {
      navigate(`/${regionId}`);
    }
  };

  return (
    <div className="relative w-full" style={{ height: 'auto', paddingBottom: '100%' }}>
      <img 
        src="/kinbrold_map.jpg" 
        alt="Kinbrold Map" 
        className="absolute top-0 left-0 w-full h-full object-cover"
        id="map"
      />
      {regions.map((region) => (
        <div
          key={region.id}
          className="absolute top-0 left-0 w-full h-full"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onMouseEnter={() => setHoveredRegion(region.id)}
          onMouseLeave={() => setHoveredRegion(null)}
          onClick={() => handleRegionClick(region.id)}
        >
          <img
            src={region.path}
            alt={region.name}
            className="w-full h-full object-contain"
            style={{
              opacity: hoveredRegion === region.id ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MapComponent;
