import React from 'react';
import ElementalTransition from '../components/ElementalTransition';

const GrivossPage = () => {
  return (
    <ElementalTransition element="Earth">
      <div className="min-h-screen bg-green-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Grivoss</h1>
        <p className="text-xl">The lush forests and mountains of the Earth Kingdom</p>
        {/* Add more content about Grivoss here */}
      </div>
    </ElementalTransition>
  );
};

export default GrivossPage;