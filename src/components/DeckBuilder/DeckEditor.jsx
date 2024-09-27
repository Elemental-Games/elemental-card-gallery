import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const DeckEditor = ({ mainDeck, sideDeck, setMainDeck, setSideDeck, canAddCard }) => {
  const adjustCardQuantity = (card, amount, isMainDeck) => {
    const updateDeck = (deck, setDeck) => {
      const index = deck.findIndex(c => c.id === card.id);
      if (index === -1 && amount > 0) {
        setDeck([...deck, { ...card, quantity: 1 }]);
      } else if (index !== -1) {
        const newDeck = [...deck];
        const newQuantity = (newDeck[index].quantity || 1) + amount;
        if (newQuantity <= 0) {
          newDeck.splice(index, 1);
        } else {
          newDeck[index] = { ...newDeck[index], quantity: newQuantity };
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

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Deck Editor</h2>
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
                  disabled={!canAddCard(card)}
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
                  disabled={!canAddCard(card)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckEditor;