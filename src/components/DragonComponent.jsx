import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute bottom-32 left-32 w-64 h-64 flex items-center justify-center">
      <div className="w-full h-full relative">
        <img 
          src={image} 
          alt="Dragon" 
          className="max-w-full max-h-full object-contain z-10 relative"
        />
        <div className="absolute inset-0 border-4 border-yellow-500 rounded-full z-0"></div>
      </div>
    </div>
  );
};

export default DragonComponent;