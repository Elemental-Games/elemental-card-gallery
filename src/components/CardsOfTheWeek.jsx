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
        onHoverStart={() => setIsFlipped(true)}
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
    { id: 1, name: 'Fire Dragon', image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1203&q=80', element: 'Fire' },
    { id: 2, name: 'Water Nymph', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', element: 'Water' },
    { id: 3, name: 'Earth Golem', image: 'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', element: 'Earth' },
    { id: 4, name: 'Air Elemental', image: 'https://images.unsplash.com/photo-1534294228306-bd54eb9a7ba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', element: 'Air' },
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
