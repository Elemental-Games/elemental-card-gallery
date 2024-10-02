import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CardsPage = () => {
  const location = useLocation();

  if (location.pathname === '/cards') {
    return <Navigate to="/card-gallery" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/card-gallery">
          <Button className="w-full">Card Gallery</Button>
        </Link>
        <Link to="/deck-builder">
          <Button className="w-full">Deck Builder</Button>
        </Link>
        <Link to="/rules">
          <Button className="w-full">Rules</Button>
        </Link>
      </div>
    </div>
  );
};

export default CardsPage;