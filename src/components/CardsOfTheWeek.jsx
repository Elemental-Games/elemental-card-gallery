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

  const cardLink = `/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div 
      className="w-full pb-[140%] perspective-1000 cursor-pointer relative"
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
            src="/storage/Card_Back.png"
            alt="Card Back"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <Link 
          to={cardLink}
          className="absolute inset-0 w-full h-full backface-hidden" 
          style={{ transform: 'rotateY(180deg)' }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </motion.div>
    </div>
  );
};

const CardsOfTheWeek = () => {
  const cards = [
    { id: 1, name: 'Deepseer', image: '/storage/images/cards/deepseer.png' },
    { id: 2, name: 'Kindro', image: '/storage/images/cards/kindro.png' },
    { id: 3, name: 'Cloud Sprinter', image: '/storage/images/cards/cloud-sprinter.png' },
    { id: 4, name: 'Terra the Earth Titan', image: '/storage/images/cards/terra-the-earth-titan.png' },
  ];

  const [flippedCards, setFlippedCards] = useState(new Array(cards.length).fill(false));

  return (
    <div className="py-16 bg-gray-900 border-4 border-yellow-500">
      <div className="container mx-auto">
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