import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  return (
    <motion.div
      className="w-64 h-96 cursor-pointer perspective"
      onClick={handleFlip}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <img
            src="/card-back.jpg"
            alt="Card Back"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const CardsOfTheWeek = () => {
  const cards = [
    { id: 1, name: 'Fire Dragon', image: '/fire-dragon.jpg', element: 'Fire' },
    { id: 2, name: 'Water Nymph', image: '/water-nymph.jpg', element: 'Water' },
    { id: 3, name: 'Earth Golem', image: '/earth-golem.jpg', element: 'Earth' },
    { id: 4, name: 'Air Elemental', image: '/air-elemental.jpg', element: 'Air' },
  ];

  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Cards of the Week</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsOfTheWeek;