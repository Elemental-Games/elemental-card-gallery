import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-64 h-96 perspective">
      <motion.div
        className="w-full h-full relative transform-style-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onHoverStart={() => !isFlipped && setIsFlipped(true)}
      >
        <div className="absolute w-full h-full backface-hidden">
          <img
            src="/card-back.jpg"
            alt="Card Back"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
};

const CardsOfTheWeek = () => {
  const cards = [
    { id: 1, name: 'Fire Dragon', image: '/fire-dragon.jpg' },
    { id: 2, name: 'Water Nymph', image: '/water-nymph.jpg' },
    { id: 3, name: 'Earth Golem', image: '/earth-golem.jpg' },
    { id: 4, name: 'Air Elemental', image: '/air-elemental.jpg' },
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
