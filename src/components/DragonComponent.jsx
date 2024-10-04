import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute bottom-32 left-32 w-64 h-64 flex items-center justify-center">
      <div className="relative w-full h-full">
        <img 
          src={image} 
          alt="Dragon" 
          className="w-full h-full object-contain z-10 border-4 border-yellow-500 bg-darkPurple"
        />
      </div>
    </div>
  );
};

export default DragonComponent;