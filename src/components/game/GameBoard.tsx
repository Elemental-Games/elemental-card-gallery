import React, { useEffect } from 'react';
import { useGameStore } from '@/lib/game/GameState';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Card from './Card';
import { isCardPlayable } from '@/lib/game/cardService';

const GameBoard = () => {
  const { game, actions } = useGameStore();
  const { initializeGame, startGame, drawCard, playCard, generateEssence, changePhase, endTurn } = actions;

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleStartGame = () => {
    startGame();
  };

  const handleCardClick = (cardId: string) => {
    if (game.status !== 'active') return;
    
    const activePlayer = game.activePlayer;
    const playerState = game.players[activePlayer];
    const card = playerState.hand.find(c => c.id === cardId);
    
    if (!card) return;
    
    if (isCardPlayable(card, playerState.essence)) {
      const zone = card.type.toLowerCase() as keyof typeof playerState.field;
      playCard(activePlayer, cardId, zone);
    }
  };

  if (game.status === 'loading') {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Loading Game...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  if (game.status === 'waiting') {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-3xl font-bold mb-8 text-white">Ready to Begin Your Journey?</h2>
        <Button 
          onClick={handleStartGame}
          className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-6 text-xl"
        >
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#1A103C] text-white p-4">
      <div className="grid grid-rows-[auto_1fr_auto] h-screen gap-4">
        {/* Game Header */}
        <div className="flex justify-between items-center p-4 bg-purple-900/30 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Turn {game.turnCount}</span>
            <span className="text-lg font-semibold">Phase: {game.currentPhase}</span>
          </div>
          <Button 
            onClick={() => endTurn()}
            className="bg-yellow-500 hover:bg-yellow-400 text-purple-900"
            disabled={game.status !== 'active'}
          >
            End Turn
          </Button>
        </div>

        {/* Game Field */}
        <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">
          {/* Player 1 Stats */}
          <div className="bg-purple-900/30 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Player 1</h3>
            <div className="space-y-2">
              <p>Health: {game.players.player1.health}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-purple-800/30 p-2 rounded">
                  <img src="/icons/Air.png" alt="Air" className="w-6 h-6 mb-1" />
                  <span>{game.players.player1.essence.Air}</span>
                </div>
                <div className="bg-purple-800/30 p-2 rounded">
                  <img src="/icons/Water.png" alt="Water" className="w-6 h-6 mb-1" />
                  <span>{game.players.player1.essence.Water}</span>
                </div>
                <div className="bg-purple-800/30 p-2 rounded">
                  <img src="/icons/Fire.png" alt="Fire" className="w-6 h-6 mb-1" />
                  <span>{game.players.player1.essence.Fire}</span>
                </div>
                <div className="bg-purple-800/30 p-2 rounded">
                  <img src="/icons/Earth.png" alt="Earth" className="w-6 h-6 mb-1" />
                  <span>{game.players.player1.essence.Earth}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Game Field */}
          <div className="grid grid-rows-2 gap-4">
            {/* Opponent's Field */}
            <div className="bg-purple-900/30 p-4 rounded-lg">
              <div className="grid grid-cols-5 gap-2">
                {game.players.player2.field.creatures.map((card, index) => (
                  <Card
                    key={`${card.id}-${index}`}
                    card={card}
                    showBack={game.activePlayer === 'player1'}
                  />
                ))}
              </div>
            </div>

            {/* Player's Field */}
            <div className="bg-purple-900/30 p-4 rounded-lg">
              <div className="grid grid-cols-5 gap-2">
                {game.players.player1.field.creatures.map((card, index) => (
                  <Card
                    key={`${card.id}-${index}`}
                    card={card}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Player 2 Stats */}
          <div className="bg-purple-900/30 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Player 2</h3>
            <div className="space-y-2">
              <p>Health: {game.players.player2.health}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-purple-800/30 p-2 rounded">
                  <img src="/icons/Air.png" alt="Air" className="w-6 h-6 mb-1" />
                  <span>{game.players.player2.essence.Air}</span>
                </div>
                <div className="bg-purple-800/30 p-2 rounded">
                  <img src="/icons/Water.png" alt="Water" className="w-6 h-6 mb-1" />
                  <span>{game.players.player2.essence.Water}</span>
                </div>
                <div className="bg-purple-800/30 p-2 rounded">
                  <img src="/icons/Fire.png" alt="Fire" className="w-6 h-6 mb-1" />
                  <span>{game.players.player2.essence.Fire}</span>
                </div>
                <div className="bg-purple-800/30 p-2 rounded">
                  <img src="/icons/Earth.png" alt="Earth" className="w-6 h-6 mb-1" />
                  <span>{game.players.player2.essence.Earth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Hand */}
        <div className="bg-purple-900/30 p-4 rounded-lg">
          <div className="flex justify-center gap-2">
            {game.players.player1.hand.map((card, index) => (
              <Card
                key={`${card.id}-${index}`}
                card={card}
                onClick={() => handleCardClick(card.id)}
                isPlayable={isCardPlayable(card, game.players.player1.essence)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard; 