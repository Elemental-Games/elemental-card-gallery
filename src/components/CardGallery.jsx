import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = ({ card }) => {
  return (
    <Link to={`/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        className="w-full rounded-lg overflow-hidden shadow-lg"
        style={{ paddingBottom: '140%' }} // This creates a 2.5:3.5 aspect ratio
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative h-full">
          <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
            <h3 className="text-sm font-semibold">{card.name}</h3>
            <p className="text-xs">{card.element} | {card.type} | {card.rarity}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const CardGallery = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGallery;