import React from 'react';

const DragonComponent = ({ image, position }) => {
  return (
    <div 
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      <img 
        src={image} 
        alt="Dragon" 
        className="h-48 w-auto object-contain"
      />
    </div>
  );
};

export default DragonComponent;