import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const DeckEditor = ({ mainDeck, sideDeck, setMainDeck, setSideDeck, allCards, canAddCard }) => {
  const [deckName, setDeckName] = useState('New Deck');

  const removeCardFromDeck = (index, isMainDeck) => {
    if (isMainDeck) {
      const newDeck = [...mainDeck];
      newDeck.splice(index, 1);
      setMainDeck(newDeck);
    } else {
      const newDeck = [...sideDeck];
      newDeck.splice(index, 1);
      setSideDeck(newDeck);
    }
  };

  const addCardToDeck = (card, isMainDeck) => {
    if (canAddCard(card)) {
      if (isMainDeck) {
        setMainDeck([...mainDeck, card]);
      } else {
        setSideDeck([...sideDeck, card]);
      }
    } else {
      toast.error(`You can't add more copies of ${card.name}`);
    }
  };

  const saveDeck = () => {
    console.log('Saving deck:', { name: deckName, mainDeck, sideDeck });
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
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Main Deck ({mainDeck.length} cards)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mainDeck.map((card, index) => (
            <Card key={`${card.id}-${index}`} className="p-2 cursor-move relative group">
              <img src={card.image} alt={card.name} className="w-full h-auto" />
              <p className="text-center mt-2">{card.name}</p>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeCardFromDeck(index, true)}
              >
                X
              </Button>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Side Deck (Shields)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sideDeck.map((card, index) => (
            <Card key={`${card.id}-${index}`} className="p-2 cursor-move relative group">
              <img src={card.image} alt={card.name} className="w-full h-auto" />
              <p className="text-center mt-2">{card.name}</p>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeCardFromDeck(index, false)}
              >
                X
              </Button>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">All Cards</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allCards.map((card) => (
            <Card 
              key={card.id} 
              className={`p-2 cursor-pointer ${!canAddCard(card) ? 'opacity-50' : ''}`}
              onClick={() => addCardToDeck(card, true)}
            >
              <img src={card.image} alt={card.name} className="w-full h-auto" />
              <p className="text-center mt-2">{card.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckEditor;