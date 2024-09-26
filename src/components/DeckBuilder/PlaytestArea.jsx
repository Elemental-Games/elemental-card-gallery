import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const PlaytestArea = ({ deck }) => {
  const [hand, setHand] = useState([]);

  const drawHand = () => {
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setHand(shuffledDeck.slice(0, 5));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Playtest Area</h2>
      <Button onClick={drawHand} className="w-full mb-4">Draw Sample Hand</Button>
      <div className="grid grid-cols-5 gap-2">
        {hand.map((card, index) => (
          <Card key={index} className="p-2">
            <img src={card.image} alt={card.name} className="w-full h-auto" />
            <p className="text-center mt-2 text-xs">{card.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlaytestArea;