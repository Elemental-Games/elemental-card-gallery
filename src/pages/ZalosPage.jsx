import React from 'react';
import ElementalTransition from '../components/ElementalTransition';
import ElementalIcon from '../components/ElementalIcon';

const ZalosPage = () => {
  return (
    <ElementalTransition element="Air">
      <div className="min-h-screen bg-sky-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Zalos</h1>
        <p className="text-xl mb-4">The floating islands of the Air Kingdom</p>
        <div className="flex items-center mb-8">
          <ElementalIcon element="Air" className="w-16 h-16 mr-4" />
          <ElementalIcon element="Air_Elementalist" className="w-16 h-16" />
        </div>
        <div className="mb-8">
          <img src="/cards/galea.png" alt="Galea" className="w-64 h-auto mb-4" />
          <p className="text-lg">Galea, the Air Elementalist, sovereign of Zalos</p>
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