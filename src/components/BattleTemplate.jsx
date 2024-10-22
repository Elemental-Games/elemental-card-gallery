import React from 'react';
import { Button } from '@/components/ui/button';

const BattleTemplate = ({
  attacker,
  defenders,
  battleState,
  battleLog,
  onAction,
  onStartBattle,
  onEndTurn,
  onResetBattle
}) => {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Battle Simulation</h2>
        <p>State: {battleState}</p>
      </div>
      
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">Attacker</h3>
          <p>{attacker.name} (Strength: {attacker.strength}, Agility: {attacker.agility})</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Defenders</h3>
          {defenders.map((defender, index) => (
            <p key={index}>{defender.name} (Strength: {defender.strength}, Agility: {defender.agility})</p>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Battle Log</h3>
        <ul className="list-disc list-inside">
          {battleLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
      
      <div className="flex space-x-2">
        <Button onClick={onStartBattle} disabled={battleState !== 'ready'} className="bg-blue-600 hover:bg-blue-700">Start Battle</Button>
        <Button onClick={onAction} disabled={battleState !== 'inProgress'} className="bg-green-600 hover:bg-green-700">Perform Action</Button>
        <Button onClick={onEndTurn} disabled={battleState !== 'inProgress'} className="bg-yellow-600 hover:bg-yellow-700">End Turn</Button>
        <Button onClick={onResetBattle} className="bg-red-600 hover:bg-red-700">Reset Battle</Button>
      </div>
    </div>
  );
};

export default BattleTemplate;