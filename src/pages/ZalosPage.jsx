import React from 'react';
import ElementalTransition from '../components/ElementalTransition';
import ElementalIcon from '../components/ElementalIcon';

const ZalosPage = () => {
  return (
    <ElementalTransition element="Air">
      <div className="min-h-screen bg-sky-900 text-white p-8 overflow-y-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-4xl font-bold mr-4">Welcome to Zalos</h1>
          <ElementalIcon element="Air" className="w-24 h-24" />
        </div>
        <p className="text-xl mb-4">The floating islands of the Air Kingdom</p>
        <div className="mb-8">
          <img src="/cards/galea.png" alt="Galea" className="w-64 h-auto mb-4" />
          <p className="text-lg">
            <span className="text-2xl font-semibold">Zalos,</span>
            <span className="text-lg"> the Air Kingdom</span>
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kingdom Lore</h2>
          <p>Zalos is a breathtaking realm of floating islands and wind-swept spires. Its people are known for their quick wit, freedom-loving nature, and mastery of flight.</p>
          <p className="mt-4">The kingdom boasts the finest astronomers and weather-shapers in all of Kinbrold. Zalos's aerial forces are unparalleled, with sky knights capable of incredible feats of agility and speed.</p>
        </div>
      </div>
    </ElementalTransition>
  );
};

export default ZalosPage;
