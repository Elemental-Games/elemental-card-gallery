import React from 'react';
import ElementalTransition from '../components/ElementalTransition';
import ElementalIcon from '../components/ElementalIcon';

const GrivossPage = () => {
  return (
    <ElementalTransition element="Earth">
      <div className="min-h-screen bg-green-900 text-white p-8 overflow-y-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-4xl font-bold mr-4">Welcome to Grivoss</h1>
          <ElementalIcon element="Earth" className="w-24 h-24" />
        </div>
        <p className="text-xl mb-4">The lush forests and mountains of the Earth Kingdom</p>
        <div className="mb-8">
          <img src="/cards/balon.jpeg" alt="Balon" className="w-64 h-auto mb-4" />
          <p className="text-lg">
            <span className="text-2xl font-semibold">Grivoss,</span>
            <span className="text-lg"> the Earth Kingdom</span>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kingdom Lore</h2>
          <p>Grivoss is a realm of towering mountains, dense forests, and fertile valleys. Its people are as sturdy and enduring as the land itself, known for their patience and deep connection to nature.</p>
          <p className="mt-4">The kingdom is renowned for its master craftsmen who shape stone and wood into marvels, and its druids who commune with the very essence of the earth. Grivoss stands as an unshakeable bastion of stability in Kinbrold.</p>
        </div>
      </div>
    </ElementalTransition>
  );
};

export default GrivossPage;