import React from 'react';
import MapComponent from '../components/MapComponent';

const KinbroldPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden p-4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome to Kinbrold</h1>
      <MapComponent />
    </div>
  );
};

export default KinbroldPage;