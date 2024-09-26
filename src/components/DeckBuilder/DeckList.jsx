import React from 'react';
import { useDrop } from 'react-dnd';
import { Card } from '../ui/card';

const DeckList = ({ deck, onRemoveCard }) => {
  const [, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item) => onRemoveCard(item.index),
  }));

  return (
    <div ref={drop} className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Deck ({deck.length} cards)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {deck.map((card, index) => (
          <Card key={`${card.id}-${index}`} className="p-2 cursor-move">
            <img src={card.image} alt={card.name} className="w-full h-auto" />
            <p className="text-center mt-2">{card.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeckList;