import React from 'react';
import { useNavigate } from 'react-router-dom';

const MapComponent = ({ highlight, onRegionClick, showInteractivity }) => {
  const navigate = useNavigate();

  const handleRegionClick = (region) => {
    if (showInteractivity) {
      if (['zalos', 'grivoss', 'scarto', 'tsunareth', 'evermere'].includes(region)) {
        navigate(`/${region}`);
      } else {
        onRegionClick(region);
      }
    }
  };

  return (
    <div className="absolute inset-0">
      <img 
        src="/IMG_3978.jpeg" 
        alt="Kinbrold Map" 
        className="w-full h-full object-cover"
        useMap="#kinbrold-map"
      />
      {highlight && (
        <img 
          src={`/${highlight}_highlight.png`} 
          alt={`${highlight} highlight`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <map name="kinbrold-map">
        <area shape="poly" coords="..." alt="Zalos" onClick={() => handleRegionClick('zalos')} />
        <area shape="poly" coords="..." alt="Grivoss" onClick={() => handleRegionClick('grivoss')} />
        <area shape="poly" coords="..." alt="Scarto" onClick={() => handleRegionClick('scarto')} />
        <area shape="poly" coords="..." alt="Tsunareth" onClick={() => handleRegionClick('tsunareth')} />
        <area shape="poly" coords="..." alt="Evermere" onClick={() => handleRegionClick('evermere')} />
        <area shape="poly" coords="..." alt="Frozen Ridge" onClick={() => handleRegionClick('frozen_ridge')} />
        <area shape="poly" coords="..." alt="Shroud Peak" onClick={() => handleRegionClick('shroud_peak')} />
        <area shape="poly" coords="..." alt="Mount Surya" onClick={() => handleRegionClick('mount_surya')} />
        <area shape="poly" coords="..." alt="Gleaming Grotto" onClick={() => handleRegionClick('gleaming_grotto')} />
        <area shape="poly" coords="..." alt="Noxwood" onClick={() => handleRegionClick('noxwood')} />
        <area shape="poly" coords="..." alt="Arid Sands" onClick={() => handleRegionClick('arid_sands')} />
      </map>
    </div>
  );
};

export default MapComponent;