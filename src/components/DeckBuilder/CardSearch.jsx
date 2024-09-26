import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const DraggableCard = ({ card, onAddCard }) => {
  const [, drag] = useDrag(() => ({
    type: 'card',
    item: { id: card.id, name: card.name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onAddCard(card);
      }
    },
  }));

  return (
    <Card ref={drag} className="p-2 cursor-move">
      <img src={card.image} alt={card.name} className="w-full h-auto" />
      <p className="text-center mt-2">{card.name}</p>
      <Button onClick={() => onAddCard(card)} className="w-full mt-2">Add to Deck</Button>
    </Card>
  );
};

const CardSearch = ({ cards, onAddCard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState(cards);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredCards(
      cards.filter(card => 
        card.name.toLowerCase().includes(term) ||
        card.element.toLowerCase().includes(term) ||
        card.type.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCards.map(card => (
          <DraggableCard key={card.id} card={card} onAddCard={onAddCard} />
        ))}
      </div>
    </div>
  );
};

export default CardSearch;