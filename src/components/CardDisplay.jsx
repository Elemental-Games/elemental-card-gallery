import React from 'react';
import { Link } from 'react-router-dom';

const CardDisplay = ({ card }) => {
  return (
    <Link to={`/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
          <h3 className="text-lg font-semibold">{card.name}</h3>
          <p className="text-sm">{card.element} | {card.type} | {card.rarity}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardDisplay;