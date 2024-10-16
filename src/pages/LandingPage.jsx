import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Elemental Masters</h1>
      <p className="mb-4">Explore the world of elemental card battles!</p>
      <div className="space-x-4">
        <Link to="/cards">
          <Button>View Cards</Button>
        </Link>
        <Link to="/deck-builder">
          <Button>Build a Deck</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;