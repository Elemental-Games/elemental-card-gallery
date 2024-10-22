import React from 'react';
import BattleSimulation from './GameplayPage/BattleSimulation';

const GameplayPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gameplay</h1>
      <BattleSimulation />
    </div>
  );
};

export default GameplayPage;