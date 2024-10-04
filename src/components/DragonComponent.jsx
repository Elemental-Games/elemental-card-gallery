import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute bottom-32 left-32 w-96 h-54">
      <div className="relative w-full h-full">
        {/* Purple outer border */}
        <div className="absolute inset-0 bg-purple-900 rounded-lg"></div>
        {/* Yellow inner border */}
        <div className="absolute inset-1 bg-yellow-500 rounded-lg"></div>
        {/* Image container */}
        <div className="absolute inset-2 overflow-hidden rounded-lg">
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