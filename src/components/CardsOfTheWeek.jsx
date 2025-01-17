import React from 'react';
import CardDisplay from './CardDisplay';

const CardsOfTheWeek = () => {
  const fixedCards = [
    {
      id: "cloud-sprinter",
      element: "Air"
    },
    {
      id: "swiftreaver",
      element: "Earth"
    },
    {
      id: "aqua-shade",
      element: "Water"
    },
    {
      id: "flamekeeper",
      element: "Fire"
    }
  ];

  return (
    <div className="border-[6px] border-yellow-500 rounded-xl bg-transparent">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Cards of the Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fixedCards.map((card) => (
            <div key={card.id} className="aspect-[1500/2100] relative">
              <CardDisplay 
                card={card} 
                variant="cardsOfWeek"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsOfTheWeek;