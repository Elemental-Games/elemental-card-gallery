import React from 'react';
import ElementalTransition from '../components/ElementalTransition';

const ZalosPage = () => {
  return (
    <ElementalTransition element="Air">
      <div className="min-h-screen bg-sky-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Zalos</h1>
        <p className="text-xl">The floating islands of the Air Kingdom</p>
        {/* Add more content about Zalos here */}
      </div>
    </ElementalTransition>
  );
};

export default ZalosPage;