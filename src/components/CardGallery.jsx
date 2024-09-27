import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = ({ card }) => {
  const isShield = card.type === 'Shield';
  const aspectRatio = isShield ? 'aspect-[3.5/2.5]' : 'aspect-[2.5/3.5]';
  const cardSize = isShield ? 'w-[350px] h-[250px]' : 'w-[250px] h-[350px]';

  return (
    <Link to={`/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        className={`${cardSize} rounded-lg overflow-hidden shadow-lg`}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`${aspectRatio} relative`}>
          <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
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