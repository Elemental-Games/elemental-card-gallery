import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GameplaySection = () => {
  return (
    <div className="py-16 bg-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Gameplay</h2>
        <p className="text-xl mb-8 text-gray-300">
          Master the elements and outsmart your opponents in epic card battles!
        </p>
        <Link to="/gameplay">
          <Button size="lg" variant="outline">
            Learn How to Play
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GameplaySection;