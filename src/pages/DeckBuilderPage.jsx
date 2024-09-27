import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import ElementSelection from '../components/DeckBuilder/ElementSelection';
import CardSelection from '../components/DeckBuilder/CardSelection';
import DeckEditor from '../components/DeckBuilder/DeckEditor';
import DeckStats from '../components/DeckBuilder/DeckStats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DeckBuilderPage = () => {
  const [showWizard, setShowWizard] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedElements, setSelectedElements] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [email, setEmail] = useState('');
  const { data: allCards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  const steps = [
    { type: 'element', count: 2, filter: () => true },
    { type: 'creature', count: 20, filter: (card) => card.type === 'Creature' && selectedElements.includes(card.element) },
    { type: 'rune', count: 5, filter: (card) => card.type === 'Rune' },
    { type: 'counter', count: 5, filter: (card) => card.type === 'Counter' },
    { type: 'epicLegendary', count: 5, filter: (card) => (card.rarity === 'E' || card.rarity === 'L') && card.type === 'Creature' },
    { type: 'shield', count: 1, filter: (card) => card.type === 'Shield' && card.tier === 1 },
    { type: 'shield', count: 1, filter: (card) => card.type === 'Shield' && card.tier === 2 },
    { type: 'shield', count: 1, filter: (card) => card.type === 'Shield' && card.tier === 3 },
    { type: 'any', count: 5, filter: () => true },
  ];

  const handleWizardChoice = (choice) => {
    setShowWizard(choice === 'yes');
    if (choice === 'yes') {
      setStep(0);
    }
  };

  const handleElementSelection = (elements) => {
    setSelectedElements(elements);
    setStep(1);
  };

  const handleCardSelection = (selectedCards) => {
    if (step < 5) {
      setMainDeck([...mainDeck, ...selectedCards]);
    } else if (step < 8) {
      setSideDeck([...sideDeck, ...selectedCards]);
    } else {
      setMainDeck([...mainDeck, ...selectedCards]);
    }
    setStep(step + 1);
  };

  const isCardLimited = (card) => {
    const limitedCards = ["Ancient Sigil", "Ancient Winds", "Ancient Roots", "Ancient Ember", "Ancient Tide"];
    return limitedCards.includes(card.name);
  };

  const getCardCount = (card) => {
    return (mainDeck.find(c => c.id === card.id)?.quantity || 0) +
           (sideDeck.find(c => c.id === card.id)?.quantity || 0);
  };

  const canAddCard = (card) => {
    const count = getCardCount(card);
    if (isCardLimited(card)) {
      return count < 1;
    }
    return count < 3;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Here you would typically send the email and deck data to your backend
    console.log('Signing up with email:', email);
    console.log('Deck data:', { mainDeck, sideDeck });
    alert('Thank you for signing up! Your deck has been saved.');
  };

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error loading cards: {error.message}</div>;

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Deck Builder</h1>
        {showWizard === null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-purple-900 p-8 rounded-lg max-w-md w-full text-purple-100">
              <h2 className="text-2xl font-bold mb-4">Deck Builder Wizard</h2>
              <p className="mb-4">Would you like to use our deck builder wizard?</p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => handleWizardChoice('yes')} className="bg-purple-500 hover:bg-purple-600">Yes</Button>
                <Button onClick={() => handleWizardChoice('no')} className="bg-purple-500 hover:bg-purple-600">No</Button>
              </div>
            </div>
          </div>
        )}
        {showWizard && step === 0 && (
          <ElementSelection onSelect={handleElementSelection} />
        )}
        {showWizard && step > 0 && step < steps.length && (
          <CardSelection
            cards={allCards.filter(steps[step].filter)}
            count={steps[step].count}
            onSelect={handleCardSelection}
            stepType={steps[step].type}
            canAddCard={canAddCard}
          />
        )}
        {(!showWizard || (showWizard && step >= steps.length)) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <DeckEditor 
                  mainDeck={mainDeck} 
                  sideDeck={sideDeck} 
                  setMainDeck={setMainDeck} 
                  setSideDeck={setSideDeck}
                  allCards={allCards}
                  canAddCard={canAddCard}
                />
              </div>
              <div>
                <DeckStats mainDeck={mainDeck} sideDeck={sideDeck} />
              </div>
            </div>
            <div className="mt-8 bg-purple-900 p-6 rounded-lg text-purple-100">
              <h3 className="text-xl font-bold mb-4">Save Your Deck</h3>
              <p className="mb-4">Sign up to our website to save your deck and access it anytime!</p>
              <form onSubmit={handleSignUp} className="flex items-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mr-4 bg-purple-800 text-purple-100 placeholder-purple-300"
                />
                <Button type="submit" className="bg-purple-500 hover:bg-purple-600">Sign Up & Save Deck</Button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeckBuilderPage;