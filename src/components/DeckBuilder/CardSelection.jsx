import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';

const CardSelection = ({ cards, count, onSelect, stepType, canAddCard }) => {
  const [selectedCards, setSelectedCards] = useState({});

  const toggleCard = (card) => {
    setSelectedCards(prev => {
      const currentCount = prev[card.id] || 0;
      if (currentCount === 0 && Object.values(prev).reduce((a, b) => a + b, 0) >= count) {
        return prev;
      }
      return {
        ...prev,
        [card.id]: currentCount > 0 ? 0 : 1
      };
    });
  };

  const adjustQuantity = (card, amount) => {
    setSelectedCards(prev => {
      const currentCount = prev[card.id] || 0;
      const newCount = Math.max(0, Math.min(3, currentCount + amount));
      if (newCount === 0) {
        const { [card.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [card.id]: newCount };
    });
  };

  const isCardLimited = (card) => {
    const limitedCards = ["Ancient Sigil", "Ancient Winds", "Ancient Roots", "Ancient Ember", "Ancient Tide"];
    return limitedCards.includes(card.name);
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
            className={`p-2 cursor-pointer ${selectedCards[card.id] ? 'border-2 border-blue-500' : ''} ${!canAddCard(card) ? 'opacity-50' : ''}`}
            onClick={() => toggleCard(card)}
          >
            <img src={card.image} alt={card.name} className="w-full h-auto" />
            <p className="text-center mt-2">{card.name}</p>
            {selectedCards[card.id] > 0 && (
              <div className="flex justify-center items-center mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    adjustQuantity(card, -1);
                  }}
                  disabled={selectedCards[card.id] === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{selectedCards[card.id]}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    adjustQuantity(card, 1);
                  }}
                  disabled={selectedCards[card.id] === 3 || (isCardLimited(card) && selectedCards[card.id] === 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      <Button
        onClick={() => onSelect(Object.entries(selectedCards).flatMap(([id, count]) => Array(count).fill(cards.find(card => card.id === id))))}
        disabled={Object.values(selectedCards).reduce((a, b) => a + b, 0) !== count}
      >
        Continue
      </Button>
    </div>
  );
};

export default CardSelection;