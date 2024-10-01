import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = ({ card }) => {
  return (
    <Link to={`/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        className="w-full pb-[140%] rounded-lg overflow-hidden shadow-lg relative"
        whileHover={{ scale: 1.05 }}
      >
        <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
          <h3 className="text-sm font-semibold">{card.name}</h3>
          <p className="text-xs">{card.element} | {card.type} | {card.rarity}</p>
        </div>
      </motion.div>
    </Link>
  );
};

const CardGallery = ({ cards }) => {
  console.log('Cards in CardGallery:', cards); // Add this line for debugging

  if (!cards || cards.length === 0) {
    return <div>No cards available.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGallery;