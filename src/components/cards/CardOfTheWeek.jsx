import { useState } from 'react';
import { motion } from 'framer-motion';
import { getOptimizedCardImage, handleImageError } from '@/utils/imageUtils';

const CardOfTheWeek = ({ card, onLearnMore }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Generate optimized image path
  const optimizedImagePath = getOptimizedCardImage(card.image, 'large');

  return (
    <div className="perspective space-y-3">
      <motion.div
        className="relative w-full aspect-[1500/2100] cursor-pointer shadow-md hover:shadow-lg"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 500, damping: 30 }}
        onClick={handleClick}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card (Card Back) */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <motion.img 
            src="/Card_Back.png"
            alt="Card Back" 
            className="w-full h-full object-contain rounded-lg"
            whileHover={{ 
              rotate: [0, -1, 1, -1, 1, 0],
              transition: { duration: 0.2 }
            }}
          />
        </motion.div>

        {/* Back of card (Actual Card) */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <img 
            src={optimizedImagePath} 
            alt={card.name} 
            className="w-full h-full object-contain rounded-lg"
            onError={handleImageError}
          />
        </div>
      </motion.div>

      {/* Info section */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-purple-900/30 p-3 rounded-lg border border-purple-500/30"
        >
          <h3 className="text-base sm:text-lg font-semibold text-yellow-500 mb-2 text-center">{card.name}</h3>
          {card.element && card.type && (
            <p className="text-center text-purple-200 text-sm mb-2">{card.element} • {card.type}</p>
          )}
          <button 
            className="block w-full text-center px-3 py-2 bg-purple-700 hover:bg-purple-600 
              rounded-lg transition-colors text-white text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore && onLearnMore(card);
            }}
          >
            Learn More
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CardOfTheWeek; 