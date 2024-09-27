import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const DeckEditor = ({ deck, setDeck, allCards }) => {
  const [deckName, setDeckName] = useState('New Deck');

  const [, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item) => addCardToDeck(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addCardToDeck = (cardId) => {
    const cardToAdd = allCards.find(card => card.id === cardId);
    if (deck.length >= 40) {
      toast.error('Maximum deck size reached (40 cards)');
      return;
    }
    const ancientCards = ['Ancient Sigil', 'Ancient Winds', 'Ancient Ember', 'Ancient Tide', 'Ancient Roots'];
    if (ancientCards.includes(cardToAdd.name) && deck.some(c => c.name === cardToAdd.name)) {
      toast.error(`Only one copy of ${cardToAdd.name} is allowed per deck`);
      return;
    }
    setDeck([...deck, cardToAdd]);
  };

  const removeCardFromDeck = (index) => {
    const newDeck = [...deck];
    newDeck.splice(index, 1);
    setDeck(newDeck);
  };

  const saveDeck = () => {
    // Here you would typically save the deck to a backend or local storage
    console.log('Saving deck:', { name: deckName, cards: deck });
    toast.success('Deck saved successfully!');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Deck Editor</h2>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Deck Name"
          className="mr-4"
        />
        <Button onClick={saveDeck}>Save Deck</Button>
      </div>
      <div ref={drop} className="min-h-[200px] border-2 border-dashed border-gray-300 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Your Deck ({deck.length} / 40 cards)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {deck.map((card, index) => (
            <Card key={`${card.id}-${index}`} className="p-2 cursor-move relative group">
              <img src={card.image} alt={card.name} className="w-full h-auto" />
              <p className="text-center mt-2">{card.name}</p>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeCardFromDeck(index)}
              >
                X
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckEditor;