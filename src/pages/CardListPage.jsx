import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CardsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-purple-900 to-indigo-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Elemental Masters Cards</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <Link to="/cards/card-list">
          <Button className="w-64 h-32 text-xl">View Card Gallery</Button>
        </Link>
        <Link to="/cards/deck-builder">
          <Button className="w-64 h-32 text-xl">Use Deck Builder</Button>
        </Link>
      </div>
    </div>
  );
};

export default CardsPage;