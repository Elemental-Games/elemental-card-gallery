import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card }) => {
  return (
    <motion.div
      className="w-64 h-96 rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
        <h3 className="text-lg font-semibold">{card.name}</h3>
        <p className="text-sm">{card.element} | {card.type} | {card.rarity}</p>
      </div>
    </motion.div>
  );
};

const CardGallery = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGallery;
