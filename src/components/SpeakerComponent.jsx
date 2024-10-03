import React from 'react';

const SpeakerComponent = ({ image }) => {
  return (
    <div className="absolute bottom-0 left-0 z-10">
      <img 
        src={image} 
        alt="Speaker" 
        className="h-[40vh] w-auto object-contain md:h-[66vh]"
      />
    </div>
  );
};

export default SpeakerComponent;