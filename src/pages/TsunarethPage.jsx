import React from 'react';
import ElementalTransition from '../components/ElementalTransition';
import ElementalIcon from '../components/ElementalIcon';

const TsunarethPage = () => {
  return (
    <ElementalTransition element="Water">
      <div className="min-h-screen bg-blue-900 text-white p-8 overflow-y-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-4xl font-bold mr-4">Welcome to Tsunareth</h1>
          <ElementalIcon element="Water" className="w-24 h-24" />
        </div>
        <p className="text-xl mb-4">The vast underwater realm of the Water Kingdom</p>
        <div className="mb-8">
          <img src="/cards/mek.png" alt="Mek" className="w-64 h-auto mb-4" />
          <p className="text-lg">
            <span className="text-2xl font-semibold">Tsunareth,</span>
            <span className="text-lg"> the Water Kingdom</span>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kingdom Lore</h2>
          <p>Tsunareth is a mesmerizing underwater kingdom of coral cities and bioluminescent forests. Its people are adaptable and fluid, much like the element they command.</p>
          <p className="mt-4">The kingdom is home to the greatest healers in Kinbrold, and its scholars are unmatched in their pursuit of knowledge. Tsunareth's navy is a force to be reckoned with, capable of manipulating currents and tides to their advantage.</p>
        </div>
      </div>
    </ElementalTransition>
  );
};

export default TsunarethPage;