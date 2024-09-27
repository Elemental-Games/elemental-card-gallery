import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card }) => {
  return (
    <motion.div
      className="w-48 h-72 rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <img src={card.image} alt={card.name} className="w-full h-full object-contain" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
        <h3 className="text-sm font-semibold">{card.name}</h3>
        <p className="text-xs">{card.element} | {card.type} | {card.rarity}</p>
      </div>
    </motion.div>
  );
};

const CardGallery = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGallery;