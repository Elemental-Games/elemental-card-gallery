import React, { useEffect } from 'react';
import { toast } from 'sonner';
import BattleTemplate from '../../components/BattleTemplate';
import { useHealth } from '../../hooks/useHealth';
import { useBattleState } from '../../hooks/useBattleState';
import { usePrompts } from '../../hooks/usePrompts';

const BattleSimulation = () => {
  const { health: playerHealth, reduceHealth: reducePlayerHealth, resetHealth: resetPlayerHealth } = useHealth(500);
  const { health: opponentHealth, reduceHealth: reduceOpponentHealth, resetHealth: resetOpponentHealth } = useHealth(500);
  const { battleState, setBattleState, turn, selectedTarget, setSelectedTarget, battleLog, addToLog, resetBattle } = useBattleState();
  const { showDodgePrompt, showBlockPrompt, ...prompts } = usePrompts(selectedTarget);

  const [attacker, setAttacker] = React.useState(null);
  const [defenders, setDefenders] = React.useState([]);

  useEffect(() => {
    const setupBattle = () => {
      // Setup Glacis as attacker
      const glacis = {
        id: 'glacis',
        name: 'Glacis',
        element: 'Water',
        image: '/images/cards/glacis.webp',
        maxHealth: 155,
        health: 155,
        strength: 155,
        agility: 70,
        hasAction: true
      };

      // Setup defenders
      const cloudSprinter = {
        id: 'cloud-sprinter',
        name: 'Cloud Sprinter',
        element: 'Air',
        image: '/images/cards/cloud-sprinter.webp',
        maxHealth: 75,
        health: 75,
        strength: 75,
        agility: 75,
        hasAction: true
      };

      const flameRavager = {
        id: 'flame-ravager',
        name: 'Flame Ravager',
        element: 'Fire',
        image: '/images/cards/flame-ravager.webp',
        maxHealth: 110,
        health: 110,
        strength: 110,
        agility: 40,
        hasAction: true
      };

      setAttacker(glacis);
      setDefenders([flameRavager, cloudSprinter]);

      toast.info("Welcome to the Battle Simulation! Click 'Start Battle' to begin.", {
        duration: 5000,
      });
    };

    setupBattle();
  }, []);

  const handleAction = () => {
    if (!selectedTarget || !attacker) return;

    // Check agility for dodge/block eligibility
    const canDodge = selectedTarget.agility > attacker.agility;
    const canBlock = selectedTarget.agility > attacker.agility;

    if (canDodge && selectedTarget.id === 'cloud-sprinter') {
      // Cloud Sprinter can dodge
      prompts.setShowDodgePrompt(true);
    } else if (canBlock && selectedTarget.id === 'flame-ravager') {
      // Show blocking prompt for Flame Ravager
      prompts.setShowBlockPrompt(true);
    } else {
      // Regular battle resolution
      const damage = attacker.strength;
      selectedTarget.health = Math.max(0, selectedTarget.health - damage);
      selectedTarget.hasAction = false;
      
      addToLog(`${attacker.name} attacks ${selectedTarget.name} for ${damage} damage!`);
      if (selectedTarget.health <= 0) {
        addToLog(`${selectedTarget.name} was destroyed!`);
      }
    }
  };

  const handleReset = () => {
    resetBattle();
    resetPlayerHealth();
    resetOpponentHealth();
    if (attacker) {
      setAttacker(prev => ({ ...prev, health: prev.maxHealth, hasAction: true }));
    }
    setDefenders(prev => prev.map(def => ({ 
      ...def, 
      health: def.maxHealth,
      hasAction: true 
    })));
    prompts.resetPrompts();
    toast.success('Battle reset');
  };

  return (
    <BattleTemplate
      attacker={attacker}
      defenders={defenders}
      battleState={battleState}
      battleLog={battleLog}
      onAction={handleAction}
      onStartBattle={() => setBattleState('inProgress')}
      onEndTurn={() => {
        setTurn(prev => prev + 1);
        // Reset actions at end of turn
        setDefenders(prev => prev.map(def => ({ ...def, hasAction: true })));
        if (attacker) {
          setAttacker(prev => ({ ...prev, hasAction: true }));
        }
      }}
      onResetBattle={handleReset}
      selectedTarget={selectedTarget}
      onSelectTarget={setSelectedTarget}
      playerHealth={playerHealth}
      opponentHealth={opponentHealth}
      setOpponentHealth={reduceOpponentHealth}
      showDodgePrompt={showDodgePrompt}
      showBlockPrompt={showBlockPrompt}
      {...prompts}
    />
  );
};

export default BattleSimulation;