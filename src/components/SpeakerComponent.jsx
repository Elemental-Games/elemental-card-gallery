import React from 'react';

const SpeakerComponent = ({ image }) => {
  return (
    <div className="absolute bottom-0 left-0 z-10 w-1/3 max-w-[200px] md:w-auto md:max-w-none">
      <img 
        src={image} 
        alt="Speaker" 
        className="w-full h-auto object-contain md:h-[59.4vh] md:w-auto" // Reduced from 66vh to 59.4vh (10% smaller)
      />
    </div>
  );
};

export default SpeakerComponent;