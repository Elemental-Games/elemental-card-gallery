import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl max-h-2xl">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg"></div>
        <img 
          src={image} 
          alt="Dragon" 
          className="w-full h-full object-contain p-4"
        />
      </div>
    </div>
  );
};

export default DragonComponent;