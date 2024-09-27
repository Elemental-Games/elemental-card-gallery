import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import ElementSelection from '../components/DeckBuilder/ElementSelection';
import CardSelection from '../components/DeckBuilder/CardSelection';
import DeckEditor from '../components/DeckBuilder/DeckEditor';
import DeckStats from '../components/DeckBuilder/DeckStats';
import LightBox from '../components/LightBox';

const DeckBuilderPage = () => {
  const [showHelper, setShowHelper] = useState(false);
  const [step, setStep] = useState(-1); // Start at -1 to show the helper prompt
  const [selectedElements, setSelectedElements] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const { data: allCards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(-1); // Show helper prompt
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const handleHelperChoice = (choice) => {
    setShowHelper(choice === 'yes');
    setStep(choice === 'yes' ? 0 : 9); // Skip to free build if 'no'
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
    return mainDeck.filter(c => c.id === card.id).length + 
           sideDeck.filter(c => c.id === card.id).length;
  };

  const canAddCard = (card) => {
    const count = getCardCount(card);
    if (isCardLimited(card)) {
      return count < 1;
    }
    return count < 3;
  };

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error loading cards: {error.message}</div>;

  if (step === -1) {
    return (
      <LightBox
        onClose={() => handleHelperChoice('no')}
        content={
          <div>
            <h2>Would you like to use our deck builder helper?</h2>
            <button onClick={() => handleHelperChoice('yes')}>Yes</button>
            <button onClick={() => handleHelperChoice('no')}>No</button>
          </div>
        }
      />
    );
  }

  if (showHelper && step < steps.length) {
    const currentStep = steps[step];
    return (
      <CardSelection
        cards={allCards.filter(currentStep.filter)}
        count={currentStep.count}
        onSelect={handleCardSelection}
        stepType={currentStep.type}
        canAddCard={canAddCard}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Deck Builder</h1>
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
    </div>
  );
};

export default DeckBuilderPage;