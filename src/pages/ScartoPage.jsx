import React from 'react';
import ElementalTransition from '../components/ElementalTransition';
import ElementalIcon from '../components/ElementalIcon';

const ScartoPage = () => {
  return (
    <ElementalTransition element="Fire">
      <div className="min-h-screen bg-red-900 text-white p-8 overflow-y-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-4xl font-bold mr-4">Welcome to Scarto</h1>
          <ElementalIcon element="Fire" className="w-24 h-24" />
        </div>
        <p className="text-xl mb-4">The volcanic landscapes of the Fire Kingdom</p>
        <div className="mb-8">
          <img src="/cards/osao.jpeg" alt="Osao" className="w-64 h-auto mb-4" />
          <p className="text-lg">
            <span className="text-2xl font-semibold">Scarto,</span>
            <span className="text-lg"> the Fire Kingdom</span>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kingdom Lore</h2>
          <p>Scarto is a land of intense heat and passion, where the very ground pulses with the heartbeat of volcanoes. Its people are known for their fiery temperaments and unwavering determination.</p>
          <p className="mt-4">The kingdom is home to master blacksmiths and artisans who harness the power of lava to create wonders. Scarto's military might is unmatched, with warriors as fierce and unpredictable as the flames they command.</p>
        </div>
      </div>
    </ElementalTransition>
  );
};

export default ScartoPage;