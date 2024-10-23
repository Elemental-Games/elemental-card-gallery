import { useState, useEffect } from 'react';

export const usePrompts = (selectedTarget) => {
  const [showDodgePrompt, setShowDodgePrompt] = useState(false);
  const [showBlockPrompt, setShowBlockPrompt] = useState(false);
  const [showAgilityWarning, setShowAgilityWarning] = useState(false);
  const [showTargetOverlay, setShowTargetOverlay] = useState(false);

  useEffect(() => {
    if (selectedTarget?.id === 'cloud-sprinter') {
      setShowDodgePrompt(true);
      setShowTargetOverlay(false);
    } else if (selectedTarget) {
      setShowTargetOverlay(true);
      setShowDodgePrompt(false);
    } else {
      setShowTargetOverlay(false);
      setShowDodgePrompt(false);
    }
  }, [selectedTarget]);

  const resetPrompts = () => {
    setShowDodgePrompt(false);
    setShowBlockPrompt(false);
    setShowAgilityWarning(false);
    setShowTargetOverlay(false);
  };

  return {
    showDodgePrompt,
    setShowDodgePrompt,
    showBlockPrompt,
    setShowBlockPrompt,
    showAgilityWarning,
    setShowAgilityWarning,
    showTargetOverlay,
    setShowTargetOverlay,
    resetPrompts
  };
};