import React from 'react';

const DragonComponent = ({ image, name, description }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl aspect-video flex items-center justify-center z-10">
      <div className="relative w-full h-full p-2 bg-purple-800 rounded-lg shadow-lg">
        <div className="w-full h-full p-2 bg-yellow-500 rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 rounded-b-lg">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DragonComponent;