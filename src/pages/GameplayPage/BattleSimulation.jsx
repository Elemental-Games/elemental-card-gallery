import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Page
const BattleSimulation = () => {
  const [battleState, setBattleState] = useState('ready');
  const [battleLog, setBattleLog] = useState([]);
  const [turn, setTurn] = useState(1);
  const [attacker, setAttacker] = useState(null);
  const [defenders, setDefenders] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('/data/cards.json');
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        const cardData = await response.json();
        
        const glacis = cardData.cards.find(card => card.id === 'glacis');
        const flameRavager = cardData.cards.find(card => card.id === 'flame-ravager');
        const cloudSprinter = cardData.cards.find(card => card.id === 'cloud-sprinter');

        if (!glacis || !flameRavager || !cloudSprinter) {
          throw new Error('One or more required cards not found');
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
      } catch (error) {
        console.error('Error fetching card data:', error);
        toast.error('Failed to load card data. Please try again later.');
      }
    };

    fetchCardData();
  }, []);

  const addToLog = (message) => {
    setBattleLog(prevLog => [...prevLog, `Turn ${turn}: ${message}`]);
  };

  const handleAction = () => {
    // Action handling logic
  };

  const resolveBattle = () => {
    // Battle resolution logic
  };

  const startBattle = () => {
    // Start battle logic
  };

  const endTurn = () => {
    // End turn logic
  };

  const resetBattle = () => {
    // Reset battle logic
  };

  if (!attacker || defenders.length === 0) {
    return <div>Loading battle simulation...</div>;
  }

  return (
    <BattleTemplate
      attacker={attacker}
      defenders={defenders}
      battleState={battleState}
      battleLog={battleLog}
      onAction={handleAction}
      onStartBattle={startBattle}
      onEndTurn={endTurn}
      onResetBattle={resetBattle}
    />
  );
};

export default BattleSimulation;
