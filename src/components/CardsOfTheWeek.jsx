import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Card = ({ card, index, flippedCards, setFlippedCards }) => {
  const isFlipped = flippedCards[index];

  const handleHover = () => {
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
      className="w-64 perspective"
      onMouseEnter={handleHover}
    >
      <motion.div
        className="w-full relative transform-style-3d cursor-pointer"
        style={{ 
          paddingBottom: '140%', // Maintains 2.5:3.5 aspect ratio
          width: '100%',
          height: '0',
        }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <div className="absolute inset-0 backface-hidden">
          <img
            src={`${import.meta.env.VITE_S3_BUCKET_URL}/Card_Back.png`}
            alt="Card Back"
            className="w-full h-full object-cover rounded-lg"
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover rounded-lg"
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

const CardsOfTheWeek = () => {
  const cards = [
    { id: 1, name: 'Deepseer', image: `${import.meta.env.VITE_S3_BUCKET_URL}/cards/deepseer.png` },
    { id: 2, name: 'Kindro', image: `${import.meta.env.VITE_S3_BUCKET_URL}/cards/kindro.png` },
    { id: 3, name: 'Storm Ghost', image: `${import.meta.env.VITE_S3_BUCKET_URL}/cards/storm-ghost.png` },
    { id: 4, name: 'Terra the Earth Titan', image: `${import.meta.env.VITE_S3_BUCKET_URL}/cards/terra-the-earth-titan.png` },
  ];

  const [flippedCards, setFlippedCards] = useState(new Array(cards.length).fill(false));

  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Cards of the Week</h2>
        <div className="flex flex-wrap justify-center gap-8">
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