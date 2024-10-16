import React from 'react';
import CardDisplay from './CardDisplay';

const CardsOfTheWeek = () => {
  const cards = [
    { id: 'deepseer', name: 'Deepseer', image: 'deepseer.png' },
    { id: 'terra', name: 'Terra', image: 'terra.png' },
    { id: 'cloud-sprinter', name: 'Cloud Sprinter', image: 'cloud-sprinter.png' },
    { id: 'kindro', name: 'Kindro', image: 'kindro.png' }
  ];

  return (
    <div className="py-16 bg-gray-900 border-4 border-yellow-500">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Cards of the Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="aspect-[2/3] relative overflow-hidden">
              <CardDisplay 
                card={card} 
                variant="cardsOfWeek"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsOfTheWeek;