import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const DeckSharing = ({ deck, deckName, setDeckName }) => {
  const handleShare = () => {
    const deckList = deck.map(card => card.name).join('\n');
    const blob = new Blob([deckList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deckName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Deck Sharing</h2>
      <Input
        type="text"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        placeholder="Deck Name"
        className="mb-4"
      />
      <Button onClick={handleShare} className="w-full">Share Deck</Button>
    </div>
  );
};

export default DeckSharing;