import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import GameBoard from '@/components/game/GameBoard.jsx';
import { Button } from '@/components/ui/button';

const DECKS = [
  { id: 'frost', name: 'Frost Deck', description: 'Control the battlefield with ice and snow' },
  { id: 'poison', name: 'Poison Deck', description: 'Wear down your opponents with toxic effects' },
  { id: 'lightning', name: 'Lightning Deck', description: 'Strike fast with devastating attacks' },
  { id: 'lava', name: 'Lava Deck', description: 'Overwhelm with raw power and burn damage' }
];

const ElekinOnlinePage = () => {
  const [gameState, setGameState] = useState('deck-select'); // deck-select, opponent-select, coin-flip, ready
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [opponentDeck, setOpponentDeck] = useState(null);
  const [coinChoice, setCoinChoice] = useState(null);
  const [coinResult, setCoinResult] = useState(null);
  const [goingFirst, setGoingFirst] = useState(null);

  const handleDeckSelect = (deckId) => {
    setSelectedDeck(deckId);
    setGameState('opponent-select');
  };

  const handleOpponentDeckSelect = (deckId) => {
    setOpponentDeck(deckId);
    setGameState('coin-flip');
  };

  const handleCoinFlip = (choice) => {
    setCoinChoice(choice);
    // Simulate coin flip
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    setCoinResult(result);
    
    // If player wins the flip, they choose order. If they lose, AI goes second
    const playerWonFlip = choice === result;
    if (playerWonFlip) {
      setGameState('order-select');
    } else {
      setGoingFirst(true); // AI always chooses to make player go first if AI wins flip
      setGameState('ready');
    }
  };

  const handleOrderSelect = (goFirst) => {
    setGoingFirst(goFirst);
    setGameState('ready');
  };

  return (
    <>
      <Helmet>
        <title>Play Elekin Online - Beta</title>
        <meta name="description" content="Play the beta version of Elekin: Masters of Kinbrold - A strategic trading card game set in the mystical world of Kinbrold." />
      </Helmet>

      <div className="min-h-screen bg-[#1A103C]">
        <div className="container mx-auto px-4 py-8">
          {/* Game Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Elekin Online Beta</h1>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-yellow-500 text-purple-900 rounded-full text-sm font-semibold">
                Beta v0.1
              </div>
              <div className="text-purple-200">
                Early Access
              </div>
            </div>
          </motion.div>

          {/* Game Setup Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-purple-900/30 rounded-lg border border-purple-500/30 overflow-hidden p-8"
          >
            {gameState === 'deck-select' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Choose Your Deck</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DECKS.map((deck) => (
                    <Button
                      key={deck.id}
                      onClick={() => handleDeckSelect(deck.id)}
                      className="h-24 bg-purple-800/50 hover:bg-purple-700/50 border border-purple-500/30"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg">{deck.name}</div>
                        <div className="text-sm text-purple-200">{deck.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {gameState === 'opponent-select' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Select AI Opponent Deck</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DECKS.map((deck) => (
                    <Button
                      key={deck.id}
                      onClick={() => handleOpponentDeckSelect(deck.id)}
                      className="h-24 bg-purple-800/50 hover:bg-purple-700/50 border border-purple-500/30"
                      disabled={deck.id === selectedDeck}
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg">{deck.name}</div>
                        <div className="text-sm text-purple-200">{deck.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {gameState === 'coin-flip' && (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Call the Coin Flip</h2>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => handleCoinFlip('heads')}
                    className="w-32 h-32 bg-yellow-500 hover:bg-yellow-400 text-purple-900"
                    disabled={coinChoice !== null}
                  >
                    Heads
                  </Button>
                  <Button
                    onClick={() => handleCoinFlip('tails')}
                    className="w-32 h-32 bg-yellow-500 hover:bg-yellow-400 text-purple-900"
                    disabled={coinChoice !== null}
                  >
                    Tails
                  </Button>
                </div>
                {coinResult && (
                  <div className="text-xl text-white mt-4">
                    {coinResult === coinChoice ? "You won the flip!" : "You lost the flip!"}
                  </div>
                )}
              </div>
            )}

            {gameState === 'order-select' && (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Choose Turn Order</h2>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => handleOrderSelect(true)}
                    className="w-48 h-32 bg-purple-800/50 hover:bg-purple-700/50"
                  >
                    Go First
                  </Button>
                  <Button
                    onClick={() => handleOrderSelect(false)}
                    className="w-48 h-32 bg-purple-800/50 hover:bg-purple-700/50"
                  >
                    Go Second
                  </Button>
                </div>
              </div>
            )}

            {gameState === 'ready' && (
              <GameBoard
                playerDeck={selectedDeck}
                opponentDeck={opponentDeck}
                goingFirst={goingFirst}
              />
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ElekinOnlinePage; 