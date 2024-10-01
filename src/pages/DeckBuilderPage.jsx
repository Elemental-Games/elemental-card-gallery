import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import ElementSelection from '../components/DeckBuilder/ElementSelection';
import DeckEditor from '../components/DeckBuilder/DeckEditor';
import DeckStats from '../components/DeckBuilder/DeckStats';
import CardGallery from '../components/DeckBuilder/CardGallery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const DeckBuilderPage = () => {
  const [showWizard, setShowWizard] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [showCardList, setShowCardList] = useState(false);
  const { data: allCards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  const handleSaveDeck = async () => {
    alert('Deck saving is temporarily disabled.');
  };

  const totalCards = mainDeck.reduce((sum, card) => sum + card.quantity, 0) +
                     sideDeck.reduce((sum, card) => sum + card.quantity, 0);

  const handleWizardChoice = (choice) => {
    setShowWizard(choice === 'yes');
  };

  const handleElementSelection = (elements) => {
    setSelectedElements(elements);
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

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Deck Builder</h1>
        <p className="text-xl mb-4">Total cards selected: {totalCards}</p>
        {showWizard === null && (
          <div className="fixed inset-0 bg-purple-900 bg-opacity-95 flex items-center justify-center z-50">
            <div className="bg-purple-800 p-8 rounded-lg max-w-md w-full text-purple-100">
              <h2 className="text-2xl font-bold mb-4">Deck Builder Wizard</h2>
              <p className="mb-4">Would you like to use our deck builder wizard?</p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => handleWizardChoice('yes')} className="bg-purple-500 hover:bg-purple-600">Yes</Button>
                <Button onClick={() => handleWizardChoice('no')} className="bg-purple-500 hover:bg-purple-600">No</Button>
              </div>
            </div>
          </div>
        )}
        {showWizard && selectedElements.length < 2 && (
          <ElementSelection onSelect={handleElementSelection} />
        )}
        {(!showWizard || (showWizard && selectedElements.length === 2)) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <DeckEditor 
                  mainDeck={mainDeck} 
                  sideDeck={sideDeck} 
                  setMainDeck={setMainDeck} 
                  setSideDeck={setSideDeck}
                  allCards={allCards || []}
                  canAddCard={canAddCard}
                  selectedElements={selectedElements}
                />
              </div>
              <div>
                <DeckStats mainDeck={mainDeck} sideDeck={sideDeck} />
              </div>
            </div>
            <div className="mt-8">
              <Button onClick={() => setShowCardList(!showCardList)}>
                {showCardList ? 'Hide Card List' : 'Show Card List'}
              </Button>
              {showCardList && (
                <CardGallery
                  cards={allCards || []}
                  onCardSelect={(card) => {
                    if (card.type === 'Shield') {
                      setSideDeck([...sideDeck, { ...card, quantity: 1 }]);
                    } else {
                      setMainDeck([...mainDeck, { ...card, quantity: 1 }]);
                    }
                  }}
                />
              )}
            </div>
            <div className="mt-8 bg-purple-900 p-6 rounded-lg text-purple-100">
              <h3 className="text-xl font-bold mb-4">Save Your Deck</h3>
              <Input
                type="text"
                placeholder="Deck Name"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="mb-4 bg-purple-800 text-purple-100 placeholder-purple-300"
              />
              <Button onClick={handleSaveDeck} className="bg-purple-500 hover:bg-purple-600">Save Deck</Button>
              <p className="mt-2">Note: Deck saving is temporarily disabled.</p>
            </div>
          </>
        )}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load card data. You can still use the deck builder, but card information may be limited.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DeckBuilderPage;