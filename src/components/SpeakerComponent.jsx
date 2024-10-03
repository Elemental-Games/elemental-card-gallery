import React from 'react';

const SpeakerComponent = ({ image, position }) => {
  return (
    <div 
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <img 
        src={image} 
        alt="Speaker" 
        className="h-32 w-auto object-contain"
      />
    </div>
  );
};

export default SpeakerComponent;