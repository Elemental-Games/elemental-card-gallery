import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = ({ card, index, flippedCards, setFlippedCards }) => {
  const isFlipped = flippedCards[index];

  const handleClick = () => {
    if (!isFlipped) {
      setFlippedCards(prev => {
        const newFlipped = [...prev];
        newFlipped[index] = true;
        return newFlipped;
      });
    }
  };

  return (
    <div 
      className="w-full pb-[160%] perspective-1000 cursor-pointer relative"
      onClick={handleClick}
    >
      <motion.div
        className="absolute inset-0 w-full h-full transition-transform duration-300"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ 
          scale: 1.05, 
          transition: { duration: 0.2 }
        }}
      >
        <motion.div 
          className="absolute inset-0 w-full h-full backface-hidden"
          whileHover={{ 
            rotate: [0, -1, 1, -1, 1, 0],
            transition: { duration: 0.2 }
          }}
        >
          <img
            src="/images/Card_Back.png"
            alt="Card Back"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div 
          className="absolute inset-0 w-full h-full backface-hidden" 
          style={{ transform: 'rotateY(180deg)' }}
        >
          <img
            src={`/images/cards/${card.image}`}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

const CardsOfTheWeek = () => {
  const cards = [
    { id: 'deepseer', name: 'Deepseer', image: 'deepseer.png' },
    { id: 'terra', name: 'Terra', image: 'terra.png' },
    { id: 'cloud-sprinter', name: 'Cloud Sprinter', image: 'cloud-sprinter.png' },
    { id: 'kindro', name: 'Kindro', image: 'kindro.png' }
  ];
  const [flippedCards, setFlippedCards] = useState(new Array(cards.length).fill(false));

  return (
    <div className="py-16 bg-gray-900 border-4 border-yellow-500">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Cards of the Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <Card 
              key={card.id} 
              card={card} 
              index={index}
              flippedCards={flippedCards}
              setFlippedCards={setFlippedCards}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsOfTheWeek;