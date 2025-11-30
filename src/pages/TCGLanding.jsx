import React, { useState } from "react";
import TCGGameBoard from "../components/TCGGameBoard";
import TCGDeckSelection from "../components/TCGDeckSelection";
import TCGTurnOrder from "../components/TCGTurnOrder";

function TCGWelcome({ onEnter }) {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
            ⚔️ ELEKIN TCG
          </h1>
          <p className="text-2xl text-slate-300 font-semibold">
            Welcome to the Online Game
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Experience the strategic card battle game where elements clash and dragons reign supreme.
            Choose your deck, master your strategy, and defeat your opponent!
          </p>
        </div>

        {/* Enter Battle Button */}
        <div className="mt-12">
          <button
            onClick={onEnter}
            className="px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 rounded-xl font-bold text-2xl text-white transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transform duration-300 border-2 border-white/20 hover:border-white/40"
          >
            🎮 Enter Battle
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="text-xl font-bold mb-2 text-purple-400">Strategic Combat</h3>
            <p className="text-slate-300">Master the art of battle with creatures, spells, and abilities.</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-xl font-bold mb-2 text-cyan-400">Elemental Powers</h3>
            <p className="text-slate-300">Harness the power of Fire, Water, Earth, and Air elements.</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <div className="text-4xl mb-3">🐉</div>
            <h3 className="text-xl font-bold mb-2 text-orange-400">Epic Dragons</h3>
            <p className="text-slate-300">Summon legendary dragons to turn the tide of battle.</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-sm text-slate-400">
          <p>💡 This is the beta version of the online game for Elekin TCG - play now and master your strategy!</p>
        </div>
      </div>
    </div>
  );
}

export default function TCGLanding() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [turnOrderSelected, setTurnOrderSelected] = useState(false);
  const [playerGoesFirst, setPlayerGoesFirst] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnterBattle = () => {
    setShowWelcome(false);
  };

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

  if (showWelcome) {
    return <TCGWelcome onEnter={handleEnterBattle} />;
  }

  return <TCGDeckSelection onSelectDeck={handleSelectDeck} />;
}
