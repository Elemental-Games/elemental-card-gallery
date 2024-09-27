import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const CardSelection = ({ cards, count, onSelect, stepType }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const toggleCard = (card) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter(c => c !== card));
    } else if (selectedCards.length < count) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        Select {count} {stepType} card{count > 1 ? 's' : ''}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
        {cards.map(card => (
          <Card
            key={card.id}
            className={`p-2 cursor-pointer ${selectedCards.includes(card) ? 'border-2 border-blue-500' : ''}`}
            onClick={() => toggleCard(card)}
          >
            <img src={card.image} alt={card.name} className="w-full h-auto" />
            <p className="text-center mt-2">{card.name}</p>
          </Card>
        ))}
      </div>
      <Button
        onClick={() => onSelect(selectedCards)}
        disabled={selectedCards.length !== count}
      >
        Continue
      </Button>
    </div>
  );
};

export default CardSelection;