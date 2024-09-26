import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const GameplayPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Gameplay</h1>
      <p className="mb-4">
        Elemental Masters is an exciting trading card game where you harness the power of the elements to defeat your opponents.
      </p>
      <div className="mb-6">
        <Link to="/gameplay/rules">
          <Button className="mr-4">View Full Rules</Button>
        </Link>
        <Button onClick={() => window.open('/rulebook.pdf', '_blank')}>
          <Download className="mr-2 h-4 w-4" /> Download Rulebook PDF
        </Button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Quick Overview</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Build a deck of 40 cards, combining different elements and strategies.</li>
        <li>Take turns playing cards, attacking opponents, and defending yourself.</li>
        <li>Use special abilities and combinations to gain the upper hand.</li>
        <li>Reduce your opponent's life points to zero to win the game!</li>
      </ul>
      <p>
        For a complete understanding of the game mechanics and strategies, please refer to the full rulebook.
      </p>
    </div>
  );
};

export default GameplayPage;