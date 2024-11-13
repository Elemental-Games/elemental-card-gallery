import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CardDisplay = ({ card, variant = 'default', className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const containerClasses = {
    default: "w-full aspect-[1500/2100] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative",
    cardsOfWeek: "w-full h-full perspective-1000 cursor-pointer relative",
    artworkShowcase: "w-full h-auto object-contain mx-auto"
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
        src={`${window.location.origin}/images/cards/${card.id}.webp`} 
        alt={card.name} 
        className={`${imageClasses[variant]} ${className}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `${window.location.origin}/images/cards/${card.id}.png`;
        }}
      />
      {variant === 'default' && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
          <h3 className="text-sm font-semibold">{typeof card.name === 'number' ? `Card ${card.name}` : card.name}</h3>
          <p className="text-xs">{card.element} | {card.type} | {card.rarity}</p>
          {card.type === 'Creature' && (
            <p className="text-xs">
              STR: {card.stats?.strength || 'N/A'} | AGI: {card.stats?.agility || 'N/A'}
            </p>
          )}
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
              src={`${window.location.origin}/Card_Back.png`}
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
      <div className={`${containerClasses[variant]} ${className}`}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={`/cards/${card.id}`} className="block">
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