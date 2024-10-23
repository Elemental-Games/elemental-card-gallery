import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import BattleTemplate from '../../components/BattleTemplate';

const BattleSimulation = () => {
  const [battleState, setBattleState] = useState('ready');
  const [battleLog, setBattleLog] = useState([]);
  const [turn, setTurn] = useState(1);
  const [attacker, setAttacker] = useState(null);
  const [defenders, setDefenders] = useState([]);
  const [error, setError] = useState(null);
  const [playerHealth, setPlayerHealth] = useState(500);
  const [opponentHealth, setOpponentHealth] = useState(500);
  const [selectedTarget, setSelectedTarget] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('/data/cards.json');
        if (!response.ok) throw new Error('Failed to fetch card data');
        
        const cardData = await response.json();
        const glacis = cardData.cards.find(card => card.id === 'glacis');
        const flameRavager = cardData.cards.find(card => card.id === 'flame-ravager');
        const cloudSprinter = cardData.cards.find(card => card.id === 'cloud-sprinter');

        if (!glacis || !flameRavager || !cloudSprinter) {
          throw new Error('Required cards not found');
        }

        setAttacker({
          ...glacis,
          maxHealth: glacis.strength,
          health: glacis.strength,
          exhausted: false,
          target: null
        });

        setDefenders([
          {
            ...flameRavager,
            maxHealth: flameRavager.strength,
            health: flameRavager.strength,
            exhausted: false
          },
          {
            ...cloudSprinter,
            maxHealth: cloudSprinter.strength,
            health: cloudSprinter.strength,
            exhausted: false
          }
        ]);

        toast.info("Welcome to the Battle Simulation! Click 'Start Battle' to begin.", {
          duration: 5000,
        });
      } catch (error) {
        console.error('Error fetching card data:', error);
        setError(error.message);
        toast.error('Failed to load card data');
      }
    };

    fetchCardData();
  }, []);

  const addToLog = (message) => {
    setBattleLog(prevLog => [...prevLog, `Turn ${turn}: ${message}`]);
  };

  const handleTargetSelection = (defender) => {
    if (battleState !== 'inProgress') return;
    
    setSelectedTarget(defender);
    toast.info(`Confirm your attack on ${defender.name}?`, {
      duration: 3000,
    });
    addToLog(`Selected ${defender.name} as target`);
  };

  const handleAttackConfirmation = () => {
    if (!selectedTarget) return;

    addToLog(`Glacis attacks ${selectedTarget.name}`);

    if (selectedTarget.id === 'flame-ravager') {
      // Flame Ravager specific logic
      const damage = Math.floor(attacker.strength * 1.2); // 20% bonus damage
      setSelectedTarget(prev => ({
        ...prev,
        health: Math.max(0, prev.health - damage)
      }));
      toast.success(`Flame Ravager takes ${damage} damage!`, {
        duration: 3000,
      });
    } else if (selectedTarget.id === 'cloud-sprinter') {
      // Cloud Sprinter specific logic
      const damage = Math.floor(attacker.strength * 0.8); // 20% reduced damage
      setSelectedTarget(prev => ({
        ...prev,
        health: Math.max(0, prev.health - damage)
      }));
      toast.success(`Cloud Sprinter takes ${damage} damage!`, {
        duration: 3000,
      });
    }

    setSelectedTarget(null);
    setBattleState('post_attack');
  };

  const startBattle = () => {
    setBattleState('inProgress');
    toast.info("Select a defender to attack by clicking on their card!", {
      duration: 4000,
    });
    addToLog("Battle started");
  };

  const endTurn = () => {
    setTurn(prevTurn => prevTurn + 1);
    addToLog("Turn ended");
    toast.info("Turn ended", {
      duration: 2000,
    });
  };

  const resetBattle = () => {
    setBattleState('ready');
    setBattleLog([]);
    setTurn(1);
    setSelectedTarget(null);
    toast.success('Battle reset');
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!attacker || defenders.length === 0) {
    return <div className="p-4">Loading battle simulation...</div>;
  }

  return (
    <BattleTemplate
      attacker={attacker}
      defenders={defenders}
      battleState={battleState}
      battleLog={battleLog}
      onAction={handleAttackConfirmation}
      onStartBattle={startBattle}
      onEndTurn={endTurn}
      onResetBattle={resetBattle}
      selectedTarget={selectedTarget}
      onSelectTarget={handleTargetSelection}
      playerHealth={playerHealth}
      opponentHealth={opponentHealth}
    />
  );
};

export default BattleSimulation;