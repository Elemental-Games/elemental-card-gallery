import React from 'react';
import ElementalTransition from '../components/ElementalTransition';

const EvermerePage = () => {
  return (
    <ElementalTransition element="Neutral">
      <div className="min-h-screen bg-purple-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Evermere</h1>
        <p className="text-xl">The central region for those without elemental control</p>
        {/* Add more content about Evermere here */}
      </div>
    </ElementalTransition>
  );
};

export default EvermerePage;