import { useState } from 'react';

export const useBattleState = () => {
  const [battleState, setBattleState] = useState('ready');
  const [turn, setTurn] = useState(1);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [battleLog, setBattleLog] = useState([]);

  const addToLog = (message) => {
    setBattleLog(prev => [...prev, `Turn ${turn}: ${message}`]);
  };

  const resetBattle = () => {
    setBattleState('ready');
    setBattleLog([]);
    setTurn(1);
    setSelectedTarget(null);
  };

  return {
    battleState,
    setBattleState,
    turn,
    setTurn,
    selectedTarget,
    setSelectedTarget,
    battleLog,
    addToLog,
    resetBattle
  };
};