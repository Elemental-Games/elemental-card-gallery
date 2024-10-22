import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from "sonner";
import RippleEffect from './animations/RippleEffect';
import DestroyEffect from './animations/DestroyEffect';
import HealthBar from './battle/HealthBar';
import BattleLog from './battle/BattleLog';

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
          return { x: -50, y: -30, rotate: 0, zIndex: 10 };
        }
        if (isDodging && card.id === selectedTarget?.id) {
          return { x: 100, y: -50, rotate: 45 };
        }
        return { x: 0, y: 0, rotate: 0 };
      default:
        return { x: 0, y: 0, rotate: 0 };
    }
  };

  const handleStartBattle = () => {
    onStartBattle();
    toast.info("Select a defender to attack by clicking on their card!", {
      duration: 4000,
    });
  };

  const handleDefenderClick = (defender) => {
    if (battleState === 'inProgress' || battleState === 'choosing_target') {
      onSelectTarget?.(defender);
      toast.success(`Selected ${defender.name} as target!`);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow">
      <div className="flex flex-col gap-8">
        {/* Player Health Section */}
        <div className="text-center">
          <HealthBar 
            health={playerHealth} 
            maxHealth={500} 
            label="Player Health" 
          />
        </div>

        {/* Attacker Section */}
        <div className="relative flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Attacker</h3>
          <div className="w-48">
            <HealthBar 
              health={attacker.health} 
              maxHealth={attacker.maxHealth} 
              label={`${attacker.name}'s Health`} 
            />
          </div>
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
        <div>
          <h3 className="text-xl font-semibold mb-4">Defenders</h3>
          <div className="flex gap-8 justify-center">
            {defenders.map((defender, index) => (
              <motion.div
                key={defender.id}
                animate={getCardPosition(defender, index, 'defender')}
                transition={{ duration: 0.5 }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  battleState === 'inProgress' ? 'hover:ring-4 hover:ring-blue-500' : ''
                } ${
                  selectedTarget?.id === defender.id ? 'ring-2 ring-blue-500' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleDefenderClick(defender)}
              >
                <div className="w-48">
                  <HealthBar 
                    health={defender.health} 
                    maxHealth={defender.maxHealth} 
                    label={`${defender.name}'s Health`} 
                  />
                </div>
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

        <BattleLog logs={battleLog} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="secondary" 
              disabled={battleState !== 'ready'}
              className="w-full sm:w-auto"
            >
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
              <AlertDialogAction onClick={handleStartBattle}>Begin</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {selectedTarget && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                className="w-full sm:w-auto"
              >
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

        <Button 
          onClick={onEndTurn} 
          disabled={battleState !== 'inProgress'}
          className="w-full sm:w-auto"
        >
          End Turn
        </Button>
        <Button 
          onClick={onResetBattle}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Reset Battle
        </Button>
      </div>
    </div>
  );
};

export default BattleTemplate;