import React, { useState, useEffect } from 'react';

const DragonComponent = ({ image }) => {
  const [imageError, setImageError] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9); // Default aspect ratio

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageAspectRatio(img.width / img.height);
    };
    img.onerror = handleImageError;
    img.src = image;
  }, [image]);

  const handleImageError = () => {
    console.error(`Failed to load image: ${image}`);
    setImageError(true);
  };

  return (
    <div className="absolute bottom-32 left-32 w-64 h-36"> {/* Adjusted height for 16:9 aspect ratio */}
      <div 
        className="relative w-full h-full"
        style={{ aspectRatio: imageAspectRatio }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg"></div>
        {!imageError ? (
          <img 
            src={image} 
            alt="Dragon" 
            className="w-full h-full object-contain"
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