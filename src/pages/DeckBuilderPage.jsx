import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import CardSearch from '../components/DeckBuilder/CardSearch';
import DeckEditor from '../components/DeckBuilder/DeckEditor';
import DeckStats from '../components/DeckBuilder/DeckStats';
import PlaytestArea from '../components/DeckBuilder/PlaytestArea';

const DeckBuilderPage = () => {
  const [deck, setDeck] = useState([]);
  const { data: allCards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error loading cards: {error.message}</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Deck Builder</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CardSearch cards={allCards} />
            <DeckEditor deck={deck} setDeck={setDeck} allCards={allCards} />
          </div>
          <div>
            <DeckStats deck={deck} />
            <PlaytestArea deck={deck} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DeckBuilderPage;