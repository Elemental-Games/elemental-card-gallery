import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl max-h-2xl">
      <div className="relative w-full h-full">
        <img 
          src={`/${image}.png`} 
          alt="Dragon" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default DragonComponent;