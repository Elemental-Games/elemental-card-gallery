import React from 'react';
import ElementalTransition from '../components/ElementalTransition';

const EvermerePage = () => {
  return (
    <ElementalTransition element="Neutral">
      <div className="min-h-screen bg-purple-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Evermere</h1>
        <p className="text-xl mb-4">The central region for those without elemental control</p>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Card Crafters</h2>
          <p>Evermere is home to the renowned Card Crafters, artisans who create the magical cards used throughout Kinbrold. Their skill in imbuing cards with elemental essence is unparalleled.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kingdom Lore</h2>
          <p>Evermere stands as a neutral ground in Kinbrold, welcoming all regardless of elemental affinity. It's a hub of knowledge, trade, and diplomacy, playing a crucial role in maintaining balance among the elemental kingdoms.</p>
          <p className="mt-4">Legend has it that Evermere was founded by individuals who sought to understand the nature of all elements, rather than mastering just one. This pursuit of universal knowledge has made Evermere a center of learning and innovation.</p>
        </div>
      </div>
    </ElementalTransition>
  );
};

export default EvermerePage;