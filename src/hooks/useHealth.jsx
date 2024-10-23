import { useState } from 'react';

export const useHealth = (initialHealth = 500) => {
  const [health, setHealth] = useState(initialHealth);

  const reduceHealth = (amount) => {
    setHealth(prev => Math.max(0, prev - amount));
  };

  const resetHealth = () => {
    setHealth(initialHealth);
  };

  return { health, reduceHealth, resetHealth };
};