import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card }) => {
  return (
    <div className="w-64 h-96 perspective">
      <motion.div
        className="w-full h-full relative transform-style-3d cursor-pointer"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <img
            src="/cards/card-back.png"
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
    { id: 1, name: 'Cloud Warden', image: '/cards/air/cloud-warden.png' },
    { id: 2, name: 'Ancient Roots', image: '/cards/earth/ancient-roots.png' },
    { id: 3, name: 'Flame Ravager', image: '/cards/fire/flame-ravager.png' },
    { id: 4, name: 'Aqua Shade', image: '/cards/water/aqua-shade.png' },
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
