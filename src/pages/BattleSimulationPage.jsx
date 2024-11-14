import React from 'react';
import { Helmet } from 'react-helmet-async';
import BattleSimulation from './GameplayPage/BattleSimulation';

const BattleSimulationPage = () => {
  return (
    <>
      <Helmet>
        <title>Battle Simulation - Elemental Masters TCG</title>
        <meta name="description" content="Experience the battle mechanics of Elemental Masters TCG. Learn combat, blocking, and strategic gameplay through our interactive battle simulator." />
        <meta name="keywords" content="Elemental Masters battle simulator, TCG combat, card game mechanics, trading card game battles" />
        <meta property="og:title" content="Battle Simulation - Elemental Masters TCG" />
        <meta property="og:description" content="Master the battle mechanics of Elemental Masters TCG through our interactive battle simulator. Learn combat strategies and card interactions." />
        <meta property="og:type" content="game" />
        <link rel="canonical" href="https://elementalgames.gg/gameplay/battle-simulation" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Battle Simulation</h1>
        <BattleSimulation />
      </div>
    </>
  );
};

export default BattleSimulationPage;