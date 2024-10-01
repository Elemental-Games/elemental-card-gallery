import React from 'react';
import ElementalTransition from '../components/ElementalTransition';

const ScartoPage = () => {
  return (
    <ElementalTransition element="Fire">
      <div className="min-h-screen bg-red-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Scarto</h1>
        <p className="text-xl">The volcanic landscapes of the Fire Kingdom</p>
        {/* Add more content about Scarto here */}
      </div>
    </ElementalTransition>
  );
};

export default ScartoPage;