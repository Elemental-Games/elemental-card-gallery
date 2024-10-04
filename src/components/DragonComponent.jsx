import React, { useState } from 'react';

const DragonComponent = ({ image }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image: ${image}`);
    setImageError(true);
  };

  return (
    <div className="absolute bottom-32 left-32 w-64 h-64">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg"></div>
        {!imageError ? (
          <img 
            src={image} 
            alt="Dragon" 
            className="w-full h-full object-contain p-2"
            onError={handleImageError}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
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