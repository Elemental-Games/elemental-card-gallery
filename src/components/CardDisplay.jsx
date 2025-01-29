import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CardDisplay = ({ card, variant = 'default', className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

  const containerClasses = {
    'default': 'relative w-full aspect-[2.5/3.5] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300',
    'cardsOfWeek': 'relative w-[200px] sm:w-[250px] lg:w-[300px] aspect-[2.5/3.5] rounded-lg overflow-hidden cursor-pointer mx-auto',
    'artworkShowcase': 'relative w-full max-w-[400px] aspect-[2.5/3.5] rounded-lg overflow-hidden mx-auto',
    'gallery': 'relative w-[150px] sm:w-[200px] lg:w-[250px] aspect-[2.5/3.5] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300',
    'deckBuilder': 'relative w-[150px] sm:w-[180px] lg:w-[200px] aspect-[2.5/3.5] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300'
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

  const handleImageError = (e) => {
    e.target.onerror = null;
    setImageError(true);
  };

  if (imageError) {
    return (
      <Alert variant="destructive" className="w-full h-full flex items-center justify-center">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load card image</AlertDescription>
      </Alert>
    );
  }

  const cardContent = (
    <>
      <img 
        src={`/images/cards/${card.id}.webp`}
        alt={card.name} 
        className={`${imageClasses[variant]} ${className}`}
        onError={handleImageError}
      />
      {variant === 'default' && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
          <h3 className="text-sm font-semibold">{card.name}</h3>
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
              src="/Card_Back.png"
              alt="Card Back"
              className="w-full h-full object-cover"
              onError={handleImageError}
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