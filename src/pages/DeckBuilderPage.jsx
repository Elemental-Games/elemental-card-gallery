import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import ElementSelection from '../components/DeckBuilder/ElementSelection';
import CardSelection from '../components/DeckBuilder/CardSelection';
import DeckEditor from '../components/DeckBuilder/DeckEditor';
import DeckStats from '../components/DeckBuilder/DeckStats';

const DeckBuilderPage = () => {
  const [step, setStep] = useState(0);
  const [selectedElements, setSelectedElements] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
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

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error loading cards: {error.message}</div>;

  if (step === 0) {
    return <ElementSelection onSelect={handleElementSelection} />;
  }

  if (step < steps.length) {
    const currentStep = steps[step];
    return (
      <CardSelection
        cards={allCards.filter(currentStep.filter)}
        count={currentStep.count}
        onSelect={handleCardSelection}
        stepType={currentStep.type}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Deck Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <DeckEditor mainDeck={mainDeck} sideDeck={sideDeck} setMainDeck={setMainDeck} setSideDeck={setSideDeck} />
        </div>
        <div>
          <DeckStats mainDeck={mainDeck} sideDeck={sideDeck} />
        </div>
      </div>
    </div>
  );
};

export default DeckBuilderPage;