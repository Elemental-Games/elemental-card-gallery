import React from 'react';
import ElementalTransition from '../components/ElementalTransition';

const TsunarethPage = () => {
  return (
    <ElementalTransition element="Water">
      <div className="min-h-screen bg-blue-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Tsunareth</h1>
        <p className="text-xl">The vast underwater realm of the Water Kingdom</p>
        {/* Add more content about Tsunareth here */}
      </div>
    </ElementalTransition>
  );
};

export default TsunarethPage;