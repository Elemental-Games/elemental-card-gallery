import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CardDisplay = ({ card, variant = 'default', className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const containerClasses = {
    default: "w-[150%] aspect-[2/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative",
    cardsOfWeek: "w-full h-full perspective-1000 cursor-pointer relative",
    artworkShowcase: "w-[168px] h-auto object-contain mx-auto"
  };

  const imageClasses = {
    default: "w-full h-full object-cover",
    cardsOfWeek: "absolute inset-0 w-full h-full object-cover",
    artworkShowcase: "w-full h-auto object-contain"
  };

  const handleClick = () => {
    if (variant === 'cardsOfWeek') {
      setIsFlipped(!isFlipped);
    }
  };

  const cardContent = (
    <>
      <img 
        src={`/cards/${card.image}`} 
        alt={card.name} 
        className={imageClasses[variant]}
      />
      {variant === 'default' && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
          <h3 className="text-sm font-semibold">{card.name}</h3>
          <p className="text-xs">{card.element} | {card.type} | {card.rarity}</p>
        </div>
      )}
    </>
  );

  if (variant === 'cardsOfWeek') {
    return (
      <div 
        className={`${containerClasses[variant]} ${className}`}
        onClick={handleClick}
      >
        <motion.div
          className="absolute inset-0 w-full h-full transition-transform duration-300"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div 
            className="absolute inset-0 w-full h-full backface-hidden"
            whileHover={{ 
              rotate: [0, -1, 1, -1, 1, 0],
              transition: { duration: 0.2 }
            }}
          >
            <img
              src="/Card_Back.png"
              alt="Card Back"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div 
            className="absolute inset-0 w-full h-full backface-hidden" 
            style={{ transform: 'rotateY(180deg)' }}
          >
            {cardContent}
          </div>
        </motion.div>
      </div>
    );
  }

  if (variant === 'artworkShowcase') {
    return (
      <div className={containerClasses[variant]}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={`/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
      <motion.div
        className={containerClasses[variant]}
        whileHover={{ scale: 1.05 }}
      >
        {cardContent}
      </motion.div>
    </Link>
  );
};

export default CardDisplay;