import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Plus, Minus } from 'lucide-react';

const DeckEditor = ({ mainDeck, sideDeck, setMainDeck, setSideDeck, allCards, canAddCard }) => {
  const [deckName, setDeckName] = useState('New Deck');

  const adjustCardQuantity = (card, amount, isMainDeck) => {
    const updateDeck = (deck, setDeck) => {
      const index = deck.findIndex(c => c.id === card.id);
      if (index === -1 && amount > 0) {
        setDeck([...deck, card]);
      } else if (index !== -1) {
        const newDeck = [...deck];
        if (amount < 0 && newDeck[index].quantity === 1) {
          newDeck.splice(index, 1);
        } else {
          newDeck[index] = { ...newDeck[index], quantity: (newDeck[index].quantity || 1) + amount };
        }
        setDeck(newDeck);
      }
    };

    if (isMainDeck) {
      updateDeck(mainDeck, setMainDeck);
    } else {
      updateDeck(sideDeck, setSideDeck);
    }
  };

  const isCardLimited = (card) => {
    const limitedCards = ["Ancient Sigil", "Ancient Winds", "Ancient Roots", "Ancient Ember", "Ancient Tide"];
    return limitedCards.includes(card.name);
  };

  const getCardCount = (card) => {
    return (mainDeck.find(c => c.id === card.id)?.quantity || 0) +
           (sideDeck.find(c => c.id === card.id)?.quantity || 0);
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
        <h3 className="text-xl font-semibold mb-2">Main Deck ({mainDeck.reduce((sum, card) => sum + (card.quantity || 1), 0)} cards)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mainDeck.map((card) => (
            <Card key={card.id} className="p-2 relative group">
              <img src={card.image} alt={card.name} className="w-full h-auto" />
              <p className="text-center mt-2">{card.name}</p>
              <div className="flex justify-center items-center mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustCardQuantity(card, -1, true)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{card.quantity || 1}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustCardQuantity(card, 1, true)}
                  disabled={getCardCount(card) === 3 || (isCardLimited(card) && getCardCount(card) === 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Side Deck (Shields) ({sideDeck.reduce((sum, card) => sum + (card.quantity || 1), 0)} cards)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sideDeck.map((card) => (
            <Card key={card.id} className="p-2 relative group">
              <img src={card.image} alt={card.name} className="w-full h-auto" />
              <p className="text-center mt-2">{card.name}</p>
              <div className="flex justify-center items-center mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustCardQuantity(card, -1, false)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{card.quantity || 1}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustCardQuantity(card, 1, false)}
                  disabled={getCardCount(card) === 3 || (isCardLimited(card) && getCardCount(card) === 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
              onClick={() => adjustCardQuantity(card, 1, true)}
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