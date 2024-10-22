import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import RippleEffect from './animations/RippleEffect';
import DestroyEffect from './animations/DestroyEffect';

const BattleTemplate = ({
  attacker,
  defenders,
  battleState,
  battleLog,
  onAction,
  onStartBattle,
  onEndTurn,
  onResetBattle,
  selectedTarget,
  onSelectTarget,
  isBlocking,
  isDodging,
  isAttacking,
  isDestroying,
  playerHealth,
}) => {
  const getCardPosition = (card, index, role) => {
    switch (role) {
      case 'attacker':
        return {
          x: isAttacking ? 300 : 0,
          y: 0,
          rotate: isAttacking ? 90 : 0,
        };
      case 'defender':
        if (isBlocking && index === 1) {
          return {
            x: -50,
            y: -30,
            rotate: 0,
            zIndex: 10,
          };
        }
        if (isDodging && card.id === selectedTarget?.id) {
          return {
            x: 100,
            y: -50,
            rotate: 45,
          };
        }
        return {
          x: 0,
          y: 0,
          rotate: 0,
        };
      default:
        return { x: 0, y: 0, rotate: 0 };
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Battle Simulation</h2>
        <p>State: {battleState}</p>
        <p>Player Health: {playerHealth}</p>
      </div>
      
      <div className="flex justify-between mb-4 min-h-[400px] relative">
        <div className="relative">
          <h3 className="text-xl font-semibold mb-4">Attacker</h3>
          <motion.div
            animate={getCardPosition(attacker, 0, 'attacker')}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img 
              src={attacker.image} 
              alt={attacker.name} 
              className="w-48 rounded-lg"
            />
            <RippleEffect isActive={isAttacking && selectedTarget} />
          </motion.div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Defenders</h3>
          <div className="flex gap-4">
            {defenders.map((defender, index) => (
              <motion.div
                key={defender.id}
                animate={getCardPosition(defender, index, 'defender')}
                transition={{ duration: 0.5 }}
                className={`relative ${
                  selectedTarget?.id === defender.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => battleState === 'choosing_target' && onSelectTarget(defender)}
              >
                <DestroyEffect isDestroying={isDestroying && selectedTarget?.id === defender.id}>
                  <img 
                    src={defender.image} 
                    alt={defender.name} 
                    className="w-48 rounded-lg cursor-pointer"
                  />
                </DestroyEffect>
              </motion.div>
            ))}
          </div>
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
        <Button onClick={onStartBattle} disabled={battleState !== 'ready'}>
          Start Battle
        </Button>
        <Button onClick={onAction} disabled={battleState !== 'inProgress'}>
          {battleState === 'choosing_target' ? 'Choose Target' : 'Perform Action'}
        </Button>
        <Button onClick={onEndTurn} disabled={battleState !== 'inProgress'}>
          End Turn
        </Button>
        <Button onClick={onResetBattle}>Reset Battle</Button>
      </div>
    </div>
  );
};

export default BattleTemplate;