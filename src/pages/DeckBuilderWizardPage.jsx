import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import CardGallery from '@/components/DeckBuilder/CardGallery';

const ELEMENTS = [
  { id: 'Air', name: 'Air', icon: '/icons/Air.png' },
  { id: 'Water', name: 'Water', icon: '/icons/Water.png' },
  { id: 'Fire', name: 'Fire', icon: '/icons/Fire.png' },
  { id: 'Earth', name: 'Earth', icon: '/icons/Earth.png' }
];

const COMBINATIONS = {
  'Water,Air': { name: 'Frost', icon: '/icons/Frost.png' },
  'Air,Earth': { name: 'Sand', icon: '/icons/Sand.png' },
  'Air,Fire': { name: 'Lightning', icon: '/icons/Lightning.png' },
  'Water,Earth': { name: 'Crystal', icon: '/icons/Crystal.png' },
  'Water,Fire': { name: 'Poison', icon: '/icons/Poison.png' },
  'Earth,Fire': { name: 'Lava', icon: '/icons/Lava.png' }
};

const DeckBuilderWizardPage = () => {
  const [step, setStep] = useState(1);
  const [selectedElements, setSelectedElements] = useState([]);
  const [combination, setCombination] = useState(null);
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);

  useEffect(() => {
    const loadCards = async () => {
      if (step > 1) {
        try {
          const response = await fetch('/data/cards.json');
          if (!response.ok) {
            throw new Error('Failed to load cards');
          }
          const data = await response.json();
          
          // Handle different possible data structures
          let allCards = Array.isArray(data) ? data : data.cards;
          
          if (!Array.isArray(allCards)) {
            throw new Error('Invalid cards data format');
          }
          
          // Filter cards based on the current step
          let filteredCards = allCards.filter(card => {
            if (!card || typeof card !== 'object') {
              console.warn('Invalid card object:', card);
              return false;
            }
            if (!card.type || !card.element) {
              console.warn('Card missing required fields:', card);
              return false;
            }

            switch (step) {
              case 2: // Creatures
                return card.type === 'Creature' && selectedElements.includes(card.element);
              case 3: // Dragons
                return card.type === 'Creature' && card.rarity === 'E';
              case 4: // Runes
                return card.type === 'Rune';
              case 5: // Counters
                return card.type === 'Counter';
              case 6: // Shields
                return card.type === 'Shield';
              default:
                return false;
            }
          });
          
          console.log(`Filtered cards for step ${step}:`, filteredCards);
          
          if (filteredCards.length === 0) {
            toast.warning(`No cards found for step ${step}`);
          }
          
          setAvailableCards(filteredCards);
        } catch (error) {
          console.error('Error loading cards:', error);
          toast.error('Failed to load cards: ' + error.message);
          setAvailableCards([]);
        }
      }
    };

    loadCards();
  }, [step, selectedElements]);

  const handleElementSelect = (element) => {
    if (selectedElements.includes(element)) {
      setSelectedElements(selectedElements.filter(e => e !== element));
      setCombination(null);
    } else if (selectedElements.length < 2) {
      const newElements = [...selectedElements, element];
      setSelectedElements(newElements);
      if (newElements.length === 2) {
        // Create combination key by always putting Water first if it exists
        const sortedElements = newElements.includes('Water') 
          ? ['Water', newElements.find(e => e !== 'Water')]
          : newElements.sort();
        setCombination(COMBINATIONS[sortedElements.join(',')]);
      }
    }
  };

  const handleCardSelect = (card, isRemoval = false) => {
    if (isRemoval) {
      switch (step) {
        case 2: // Creatures
          setMainDeck(mainDeck.filter((c, index) => 
            !(c.id === card.id && index === mainDeck.lastIndexOf(card))
          ));
          break;

        case 3: // Dragons
          setMainDeck(mainDeck.filter((c, index) => 
            !(c.id === card.id && index === mainDeck.lastIndexOf(card))
          ));
          break;

        case 4: // Runes
          setMainDeck(mainDeck.filter((c, index) => 
            !(c.id === card.id && index === mainDeck.lastIndexOf(card))
          ));
          break;

        case 5: // Counters
          setMainDeck(mainDeck.filter((c, index) => 
            !(c.id === card.id && index === mainDeck.lastIndexOf(card))
          ));
          break;

        case 6: // Shields
          setSideDeck(sideDeck.filter((c, index) => 
            !(c.id === card.id && index === sideDeck.lastIndexOf(card))
          ));
          break;

        default:
          break;
      }
      return;
    }

    // Move declarations outside switch
    const elementCount = mainDeck.filter(c => 
      c.type === 'Creature' && c.element === card.element
    ).length;
    
    const dragonCount = mainDeck.filter(c => 
      c.type === 'Dragon'
    ).length;

    switch (step) {
      case 2: // Creatures
        if (elementCount >= 12) {
          toast.error(`You already have 12 ${card.element} creatures`);
          return;
        }
        setMainDeck([...mainDeck, card]);
        break;

      case 3: // Dragons
        if (dragonCount >= 2) {
          toast.error("You can only have 2 dragons in your deck");
          return;
        }
        setMainDeck([...mainDeck, card]);
        break;

      case 4: // Runes
        if (mainDeck.filter(c => c.type === 'Rune').length >= 8) {
          toast.error("You can't add more than 8 runes");
          return;
        }
        setMainDeck([...mainDeck, card]);
        break;

      case 5: // Counters
        if (mainDeck.filter(c => c.type === 'Counter').length >= 8) {
          toast.error("You can't add more than 8 counters");
          return;
        }
        setMainDeck([...mainDeck, card]);
        break;

      case 6: // Shields
        if (sideDeck.some(c => c.tier === card.tier)) {
          toast.error(`You already have a tier ${card.tier} shield`);
          return;
        }
        setSideDeck([...sideDeck, card]);
        break;

      default:
        break;
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = {
    1: () => selectedElements.length === 2,
    2: () => mainDeck.filter(c => c.type === 'Creature' && c.rarity === 'C').length >= 8,
    3: () => mainDeck.filter(c => c.type === 'Creature' && c.rarity === 'E').length === 2,
    4: () => mainDeck.filter(c => c.type === 'Rune').length <= 8,
    5: () => true
  };

  const handleNext = () => {
    if (canProceed[step]()) {
      setStep(prev => prev + 1);
    } else {
      let message = '';
      switch (step) {
        case 1:
          message = 'Please select two elements';
          break;
        case 2:
          message = 'Please select at least 8 basic creatures';
          break;
        case 3:
          message = 'Please add exactly 2 copies of your dragon';
          break;
        case 4:
          message = 'You can have at most 8 runes';
          break;
        default:
          message = 'Cannot proceed';
      }
      toast.error(message);
    }
  };

  const stepContent = {
    1: (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Choose Your Elements</h2>
        <p className="text-purple-200 text-center">Select two elements to form your deck&apos;s foundation</p>
        
        <div className="grid grid-cols-2 gap-6">
          {ELEMENTS.map((element) => (
            <motion.button
              key={element.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleElementSelect(element.id)}
              className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                selectedElements.includes(element.id)
                  ? 'bg-purple-700/50 border-yellow-500'
                  : 'bg-purple-900/50 border-purple-500/30 hover:border-purple-400/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <img src={element.icon} alt={element.name} className="w-24 h-24" />
                <span className="text-xl font-bold text-white">{element.name}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {combination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h3 className="text-xl font-bold text-yellow-400">
              You chose to build a {combination.name} deck!
            </h3>
            <img src={combination.icon} alt={combination.name} className="w-32 h-32 mx-auto" />
          </motion.div>
        )}
      </div>
    ),
    2: (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Choose Your Creatures</h2>
        <p className="text-purple-200 text-center">
          Select 12 creatures from each of your chosen elements ({selectedElements.join(' and ')})
        </p>
        
        <div className="bg-purple-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Selected Creatures:</h3>
          <div className="grid grid-cols-2 gap-4">
            {selectedElements.map(element => (
              <div key={element} className="space-y-2">
                <h4 className="text-yellow-400">{element} Creatures: {
                  mainDeck.filter(c => c.type === 'Creature' && c.element === element).length
                }/12</h4>
              </div>
            ))}
          </div>
        </div>
        
        <CardGallery
          onCardSelect={handleCardSelect}
          cards={availableCards.filter(c => c.type === 'Creature')}
          selectedCards={mainDeck}
          maxPerElement={12}
          step={step}
        />
      </div>
    ),
    3: (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Choose Your Dragon</h2>
        <p className="text-purple-200 text-center">
          Add 2 copies of your {combination?.name} Dragon to your deck
        </p>
        
        <div className="bg-purple-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Selected Dragons: {
            mainDeck.filter(c => c.type === 'Creature' && c.rarity === 'E').length
          }/2</h3>
        </div>
        
        <CardGallery
          onCardSelect={handleCardSelect}
          cards={availableCards}
          selectedCards={mainDeck}
          maxPerElement={2}
          step={step}
          combination={combination}
        />
      </div>
    ),
    4: (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Choose Your Runes</h2>
        <p className="text-purple-200 text-center">Select up to 8 runes to enhance your deck</p>
        
        <div className="bg-purple-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Selected Runes: {
            mainDeck.filter(c => c.type === 'Rune').length
          }/8</h3>
        </div>
        
        <CardGallery
          onCardSelect={handleCardSelect}
          cards={availableCards.filter(c => c.type === 'Rune')}
          selectedCards={mainDeck}
          maxPerElement={8}
          step={step}
        />
      </div>
    ),
    5: (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Choose Your Counters</h2>
        <p className="text-purple-200 text-center">Select up to 8 counters to protect your strategy</p>
        
        <div className="bg-purple-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Selected Counters: {
            mainDeck.filter(c => c.type === 'Counter').length
          }/8</h3>
        </div>
        
        <CardGallery
          onCardSelect={handleCardSelect}
          cards={availableCards.filter(c => c.type === 'Counter')}
          selectedCards={mainDeck}
          maxPerElement={8}
          step={step}
        />
      </div>
    ),
    6: (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white text-center">Choose Your Shields</h2>
        <p className="text-purple-200 text-center">Select 3 shields (one of each tier) for your side deck</p>
        
        <div className="bg-purple-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Selected Shields: {sideDeck.length}/3</h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(tier => (
              <div key={tier} className="space-y-2">
                <h4 className="text-yellow-400">Tier {tier}: {
                  sideDeck.filter(c => c.tier === tier).length
                }/1</h4>
              </div>
            ))}
          </div>
        </div>
        
        <CardGallery
          onCardSelect={handleCardSelect}
          cards={availableCards.filter(c => c.type === 'Shield')}
          selectedCards={sideDeck}
          maxPerElement={3}
          step={step}
        />
      </div>
    )
  };

  return (
    <>
      <Helmet>
        <title>Deck Builder Wizard - Create Your Deck</title>
        <meta name="description" content="Build your deck step by step with our interactive deck building wizard." />
      </Helmet>

      <div className="min-h-screen bg-[#1A103C] py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-purple-950/70 p-8 border border-purple-500/30 max-w-4xl mx-auto">
            {stepContent[step]}

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={step === 1}
                className="bg-purple-700 hover:bg-purple-600"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="bg-yellow-500 hover:bg-yellow-400 text-purple-900"
              >
                {step === 6 ? 'Save Deck' : 'Next'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DeckBuilderWizardPage; 