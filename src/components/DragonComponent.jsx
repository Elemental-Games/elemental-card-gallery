import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img 
        src={`/${image}.png`} 
        alt="Dragon" 
        className="max-h-[50vh] w-auto object-contain"
      />
    </div>
  );
};

export default DragonComponent;