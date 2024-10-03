import React from 'react';

const SpeakerComponent = ({ image }) => {
  return (
    <div className="absolute bottom-0 left-0">
      <img 
        src={`/${image}.png`} 
        alt="Speaker" 
        className="h-[65vh] w-auto object-contain"
      />
    </div>
  );
};

export default SpeakerComponent;