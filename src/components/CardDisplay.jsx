import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CardDisplay = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Calculate the height based on the 2.5:3.5 ratio
  const cardWidth = 200; // You can adjust this base width as needed
  const cardHeight = (cardWidth / 2.5) * 3.5;

  return (
    <Link to={`/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
      <motion.div
        className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative cursor-pointer"
        style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute w-full h-full backface-hidden">
            <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
              <h3 className="text-sm font-semibold">{card.name}</h3>
              <p className="text-xs">{card.element} | {card.type} | {card.rarity}</p>
            </div>
          </div>
          <div className="absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
            <div className="bg-gray-800 text-white p-4 h-full">
              <h3 className="text-sm font-semibold mb-1">{card.name}</h3>
              <p className="text-xs mb-1">{card.element} | {card.type} | {card.rarity}</p>
              <p className="text-xs mb-1">Strength: {card.strength}</p>
              <p className="text-xs mb-1">Agility: {card.agility}</p>
              <p className="text-xs">{card.description}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default CardDisplay;