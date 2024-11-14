import { useState } from 'react';

export const usePrompts = (selectedTarget) => {
  const [showAgilityWarning, setShowAgilityWarning] = useState(false);
  const [showBlockPrompt, setShowBlockPrompt] = useState(false);
  const [showDodgePrompt, setShowDodgePrompt] = useState(false);

  const resetPrompts = () => {
    setShowAgilityWarning(false);
    setShowBlockPrompt(false);
    setShowDodgePrompt(false);
  };

  return {
    showAgilityWarning,
    setShowAgilityWarning,
    showBlockPrompt,
    setShowBlockPrompt,
    showDodgePrompt,
    setShowDodgePrompt,
    resetPrompts
  };
};