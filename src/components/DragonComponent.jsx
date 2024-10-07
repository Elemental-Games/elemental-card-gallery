import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 flex items-center justify-center z-30">
      <div className="relative w-full h-full p-2 bg-purple-800 rounded-lg">
        <div className="w-full h-full p-2 bg-yellow-500 rounded-lg">
          <img 
            src={image} 
            alt="Dragon" 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default DragonComponent;