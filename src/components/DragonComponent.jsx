import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute bottom-32 left-32 w-64 h-64 flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-purple-900 rounded-lg"></div>
        <div className="absolute inset-1 bg-yellow-500 rounded-lg"></div>
        <img 
          src={image} 
          alt="Dragon" 
          className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-contain z-10"
        />
      </div>
    </div>
  );
};

export default DragonComponent;