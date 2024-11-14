import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import ElementSelection from '../components/DeckBuilder/ElementSelection';
import DeckEditor from '../components/DeckBuilder/DeckEditor';
import DeckStats from '../components/DeckBuilder/DeckStats';
import CardGallery from '../components/DeckBuilder/CardGallery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DeckBuilderPage = () => {
  const [showAnnouncement] = useState(true);
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [showCardList, setShowCardList] = useState(false);
  const [allCards, setAllCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/data/cards.json');
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        const data = await response.json();
        setAllCards(data.cards);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

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

  const handleCardSelect = (card, amount) => {
    const updateDeck = (deck, setDeck) => {
      const index = deck.findIndex(c => c.id === card.id);
      if (index === -1 && amount > 0) {
        setDeck([...deck, { ...card, quantity: 1 }]);
      } else if (index !== -1) {
        const newDeck = [...deck];
        const newQuantity = Math.min(Math.max((newDeck[index].quantity || 0) + amount, 0), 3);
        if (newQuantity === 0) {
          newDeck.splice(index, 1);
        } else {
          newDeck[index] = { ...newDeck[index], quantity: newQuantity };
        }
        setDeck(newDeck);
      }
    };

    if (card.type === 'Shield') {
      updateDeck(sideDeck, setSideDeck);
    } else {
      updateDeck(mainDeck, setMainDeck);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Deck Builder - Create Your Elemental Masters TCG Deck</title>
        <meta name="description" content="Build and customize your Elemental Masters TCG deck. Choose your elements, combine powerful cards, and create winning strategies with our interactive deck builder." />
        <meta name="keywords" content="Elemental Masters deck builder, TCG deck construction, card game strategy, deck building tool, trading card game decks" />
        <meta property="og:title" content="Deck Builder - Create Your Elemental Masters TCG Deck" />
        <meta property="og:description" content="Create powerful decks with our interactive deck builder. Combine elements and cards to craft your perfect strategy." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg/cards/deck-builder" />
      </Helmet>

      <Dialog open={showAnnouncement} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <button
            onClick={() => navigate('/cards')}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Coming Soon!</DialogTitle>
            <DialogDescription className="text-lg mt-4">
              <p className="mb-4">
                The Card Gallery and Deck Builder features will be available when we launch! 
              </p>
              <p className="mb-4">
                For now, be sure to check out our Weekly Card Reveals and stay updated with all things Elemental!
              </p>
              <div className="flex flex-col gap-4 mt-6">
                <Link to="/join">
                  <Button className="w-full">Subscribe for Updates</Button>
                </Link>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
                    allCards={allCards}
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
                    cards={allCards}
                    onCardSelect={handleCardSelect}
                    deck={{ mainDeck, sideDeck }}
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
        </div>
      </div>
    </>
  );
};

export default DeckBuilderPage;
