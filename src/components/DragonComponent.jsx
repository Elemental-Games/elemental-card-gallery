import React, { useState } from 'react';

const DragonComponent = ({ image }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image: ${image}`);
    setImageError(true);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl max-h-2xl">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg"></div>
        {!imageError ? (
          <img 
            src={image} 
            alt="Dragon" 
            className="w-full h-full object-contain p-4"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-red-500">
            Failed to load dragon image
          </div>
        )}
      </div>
    </div>
  );
};

export default DragonComponent;