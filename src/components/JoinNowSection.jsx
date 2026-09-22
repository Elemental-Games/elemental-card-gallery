import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const JoinNowSection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-cyan-700 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Play Elekin</h2>
        <p className="text-xl mb-8 text-purple-100">
          Jump into the browser beta or pick up Lightning and Crystal in the shop.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tcg">
            <Button size="lg" className="bg-purple-300 text-[#1A103C] border-2 border-[#1A103C] hover:bg-purple-200 font-bold">Play the Beta</Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-purple-900">Shop Decks</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinNowSection;
