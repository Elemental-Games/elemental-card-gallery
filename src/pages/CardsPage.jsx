import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CardsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/card-gallery">
          <Button className="w-full">Card Gallery</Button>
        </Link>
        <Link to="/deck-builder">
          <Button className="w-full">Deck Builder</Button>
        </Link>
      </div>
    </div>
  );
};

export default CardsPage;