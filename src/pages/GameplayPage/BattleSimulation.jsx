import React, { useEffect } from 'react';
import { toast } from 'sonner';
import BattleTemplate from '../../components/BattleTemplate';
import { useHealth } from '../../hooks/useHealth';
import { useBattleState } from '../../hooks/useBattleState';
import { usePrompts } from '../../hooks/usePrompts';
import { handleDodge, handleBlock } from '../../utils/battleActions';

const BattleSimulation = () => {
  const { health: playerHealth, reduceHealth: reducePlayerHealth, resetHealth: resetPlayerHealth } = useHealth(500);
  const { health: opponentHealth, reduceHealth: reduceOpponentHealth, resetHealth: resetOpponentHealth } = useHealth(500);
  const { battleState, setBattleState, turn, selectedTarget, setSelectedTarget, battleLog, addToLog, resetBattle } = useBattleState();
  const { showDodgePrompt, showBlockPrompt, ...prompts } = usePrompts(selectedTarget);

  const [attacker, setAttacker] = React.useState(null);
  const [defenders, setDefenders] = React.useState([]);

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
        toast.error('Failed to load card data');
      }
    };

    fetchCardData();
  }, []);

  const handleReset = () => {
    resetBattle();
    resetPlayerHealth();
    resetOpponentHealth();
    if (attacker) {
      setAttacker(prev => ({ ...prev, health: prev.maxHealth }));
    }
    setDefenders(prev => prev.map(def => ({ ...def, health: def.maxHealth })));
    prompts.resetPrompts();
    toast.success('Battle reset');
  };

  return (
    <BattleTemplate
      attacker={attacker}
      defenders={defenders}
      battleState={battleState}
      battleLog={battleLog}
      onAction={handleDodge}
      onStartBattle={() => setBattleState('inProgress')}
      onEndTurn={() => setTurn(prev => prev + 1)}
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