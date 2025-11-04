import React, { useState } from "react";
import TCGGameBoard from "../components/TCGGameBoard";
import TCGDeckSelection from "../components/TCGDeckSelection";
import TCGTurnOrder from "../components/TCGTurnOrder";

export default function TCGLanding() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [turnOrderSelected, setTurnOrderSelected] = useState(false);
  const [playerGoesFirst, setPlayerGoesFirst] = useState(true);

  const handleSelectDeck = (deckId) => {
    setSelectedDeck(deckId);
    setTurnOrderSelected(true);
  };

  const handleTurnOrderSelect = (goesFirst) => {
    setPlayerGoesFirst(goesFirst);
      setGameStarted(true);
  };

  if (gameStarted && selectedDeck) {
    return <TCGGameBoard playerDeck={selectedDeck} playerGoesFirst={playerGoesFirst} />;
  }

  if (turnOrderSelected && selectedDeck) {
    return <TCGTurnOrder onSelect={handleTurnOrderSelect} />;
  }

  return <TCGDeckSelection onSelectDeck={handleSelectDeck} />;
}
