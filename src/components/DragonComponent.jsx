import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute bottom-32 left-32 w-64 aspect-video flex items-center justify-center">
      <div className="relative w-full h-full p-1 bg-purple-800">
        <div className="w-full h-full p-1 bg-yellow-500">
          <img 
            src={image} 
            alt="Dragon" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DragonComponent;