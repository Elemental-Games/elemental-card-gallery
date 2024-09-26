import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import DeckList from '../components/DeckBuilder/DeckList';
import CardSearch from '../components/DeckBuilder/CardSearch';
import DeckStats from '../components/DeckBuilder/DeckStats';
import DeckSharing from '../components/DeckBuilder/DeckSharing';
import PlaytestArea from '../components/DeckBuilder/PlaytestArea';

const DeckBuilderPage = () => {
  const [deck, setDeck] = useState([]);
  const [deckName, setDeckName] = useState('New Deck');
  const { data: allCards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  const addCardToDeck = (card) => {
    if (deck.length >= 40) {
      alert('Maximum deck size reached (40 cards)');
      return;
    }
    const ancientCards = ['Ancient Sigil', 'Ancient Winds', 'Ancient Ember', 'Ancient Tide', 'Ancient Roots'];
    if (ancientCards.includes(card.name) && deck.some(c => c.name === card.name)) {
      alert(`Only one copy of ${card.name} is allowed per deck`);
      return;
    }
    setDeck([...deck, card]);
  };

  const removeCardFromDeck = (index) => {
    const newDeck = [...deck];
    newDeck.splice(index, 1);
    setDeck(newDeck);
  };

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error loading cards: {error.message}</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Deck Builder</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CardSearch cards={allCards} onAddCard={addCardToDeck} />
            <DeckList deck={deck} onRemoveCard={removeCardFromDeck} />
          </div>
          <div>
            <DeckStats deck={deck} />
            <DeckSharing deck={deck} deckName={deckName} setDeckName={setDeckName} />
            <PlaytestArea deck={deck} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DeckBuilderPage;