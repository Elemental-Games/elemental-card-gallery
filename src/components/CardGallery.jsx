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

const CardGallery = () => {
  // This is a placeholder array of cards. In a real application, you would fetch this data from an API.
  const cards = [
    { id: 1, name: 'Fire Dragon', image: '/fire-dragon.jpg', element: 'Fire', type: 'Creature', rarity: 'Legendary' },
    { id: 2, name: 'Water Nymph', image: '/water-nymph.jpg', element: 'Water', type: 'Creature', rarity: 'Rare' },
    { id: 3, name: 'Earth Golem', image: '/earth-golem.jpg', element: 'Earth', type: 'Creature', rarity: 'Uncommon' },
    { id: 4, name: 'Air Elemental', image: '/air-elemental.jpg', element: 'Air', type: 'Creature', rarity: 'Epic' },
    // Add more cards here...
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGallery;