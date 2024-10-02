import React from 'react';

const KinbroldPage = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/kinbrold_map.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Kinbrold</h1>
          <p className="text-xl text-white">Explore the magical world of Kinbrold and its regions.</p>
        </div>
      </div>
    </div>
  );
};

export default KinbroldPage;