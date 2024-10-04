import React from 'react';

const DragonComponent = ({ image }) => {
  return (
    <div className="absolute bottom-32 left-32 w-64 h-64 flex items-center justify-center">
      <img 
        src={image} 
        alt="Dragon" 
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default DragonComponent;