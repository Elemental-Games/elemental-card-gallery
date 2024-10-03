import React from 'react';

const MapComponent = ({ highlight }) => {
  return (
    <div className="absolute inset-0">
      <img 
        src="/IMG_3978.jpeg" 
        alt="Kinbrold Map" 
        className="w-full h-full object-cover"
      />
      {highlight && (
        <img 
          src={`/${highlight}_highlight.png`} 
          alt={`${highlight} highlight`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default MapComponent;