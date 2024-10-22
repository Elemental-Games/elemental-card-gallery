import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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
  playerHealth = 500,
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
      <div className="flex flex-col gap-8">
        {/* Attacker Section */}
        <div className="relative flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Attacker</h3>
          <div className="text-2xl font-bold text-green-500 mb-2">HP: 500</div>
          <motion.div
            animate={getCardPosition(attacker, 0, 'attacker')}
            transition={{ duration: 0.5 }}
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={attacker.image} 
              alt={attacker.name} 
              className="w-48 rounded-lg transition-transform duration-300"
            />
            <RippleEffect isActive={isAttacking && selectedTarget} />
          </motion.div>
        </div>

        {/* Defenders Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Defenders</h3>
          <div className="flex gap-4 justify-center">
            {defenders.map((defender, index) => (
              <motion.div
                key={defender.id}
                animate={getCardPosition(defender, index, 'defender')}
                transition={{ duration: 0.5 }}
                className={`relative cursor-pointer ${
                  selectedTarget?.id === defender.id ? 'ring-2 ring-blue-500' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  if (battleState === 'choosing_target') {
                    onSelectTarget(defender);
                  }
                }}
              >
                <DestroyEffect isDestroying={isDestroying && selectedTarget?.id === defender.id}>
                  <img 
                    src={defender.image} 
                    alt={defender.name} 
                    className="w-48 rounded-lg transition-transform duration-300"
                  />
                </DestroyEffect>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Player Health Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Opponent's Health</h3>
          <div className="text-2xl font-bold text-green-500">{playerHealth}</div>
        </div>

        {/* Battle Log */}
        <div className="mb-4 text-center">
          <h3 className="text-xl font-semibold">Battle Log</h3>
          <ul className="list-none">
            {battleLog.map((log, index) => (
              <li key={index} className="mt-1">{log}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-2 mt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={battleState !== 'ready'}>
              Start Battle
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Battle Start</AlertDialogTitle>
              <AlertDialogDescription>
                Target a creature by clicking on one of the defenders.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onStartBattle}>Begin</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {selectedTarget && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                Confirm Target
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Target</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to attack {selectedTarget.name}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onAction}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <Button onClick={onEndTurn} disabled={battleState !== 'inProgress'}>
          End Turn
        </Button>
        <Button onClick={onResetBattle}>Reset Battle</Button>
      </div>
    </div>
  );
};

export default BattleTemplate;