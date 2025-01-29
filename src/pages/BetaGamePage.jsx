import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const BetaGamePage = () => {
  const [gameState, setGameState] = useState('setup');
  const [selectedMat, setSelectedMat] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch('/data/cards.json');
        const data = await response.json();
        setCards(data.cards);
      } catch (error) {
        console.error('Error loading cards:', error);
      }
    };

    loadCards();
  }, []);

  const gameMats = [
    { id: 1, name: 'Balon', image: '/beta/mats/Game Mat.png' },
    { id: 2, name: 'Seeking Revenge', image: '/beta/mats/Game Mat13.png' },
    { id: 3, name: 'Water Kingdom', image: '/beta/mats/Game Mat3.png' },
    { id: 4, name: 'Fire Kingdom', image: '/beta/mats/Game Mat4.png' },
  ];

  const presetDecks = [
    { id: 1, name: 'Frost Deck', element: 'Air & Water' },
    { id: 2, name: 'Lava Deck', element: 'Fire & Earth' },
    { id: 3, name: 'Sand Deck', element: 'Earth & Air' },
    { id: 4, name: 'Poison Deck', element: 'Fire & Water' },
  ];

  const renderSetup = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4 text-yellow-400">Select Game Mat</h3>
        <div className="grid grid-cols-2 gap-4">
          {gameMats.map(mat => (
            <Card 
              key={mat.id}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                selectedMat === mat.id ? 'border-yellow-500' : 'border-purple-500/30'
              }`}
              onClick={() => setSelectedMat(mat.id)}
            >
              <div className="aspect-[24/14]">
                <img 
                  src={mat.image} 
                  alt={mat.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-center mt-2">{mat.name}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-yellow-400">Select Deck</h3>
        <div className="grid grid-cols-2 gap-4">
          {presetDecks.map(deck => (
            <Card 
              key={deck.id}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                selectedDeck === deck.id ? 'border-yellow-500' : 'border-purple-500/30'
              }`}
              onClick={() => setSelectedDeck(deck.id)}
            >
              <div className="h-24 flex items-center justify-center">
                <h4 className="text-xl font-bold">{deck.name}</h4>
              </div>
              <p className="text-center mt-2 text-purple-200">Elements: {deck.element}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 text-center">
        <Button 
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-bold"
          onClick={() => setGameState('playing')}
          disabled={!selectedMat || !selectedDeck}
        >
          Start Game
        </Button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Elemental Masters - Beta - Under Development</h1>
      {gameState === 'setup' && renderSetup()}
    </motion.div>
  );
};

export default BetaGamePage; 