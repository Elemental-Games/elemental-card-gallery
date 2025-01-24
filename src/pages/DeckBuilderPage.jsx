import React from 'react';
import { Helmet } from 'react-helmet-async';
import DeckEditor from '@/components/DeckBuilder/DeckEditor';
import CardGallery from '@/components/DeckBuilder/CardGallery';
import { useState } from 'react';

const DeckBuilderPage = () => {
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);

  const canAddCard = (card) => {
    const totalCards = mainDeck.reduce((sum, c) => sum + c.quantity, 0);
    return totalCards < 40;
  };

  const handleCardSelect = (card) => {
    if (card.type === 'Shield') {
      setSideDeck(prev => [...prev, card]);
    } else {
      setMainDeck(prev => [...prev, card]);
    }
  };

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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Deck Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CardGallery 
              cards={[]} // We'll need to pass actual cards data here
              onCardSelect={handleCardSelect}
              deck={[...mainDeck, ...sideDeck]}
            />
          </div>
          
          <div>
            <DeckEditor 
              mainDeck={mainDeck}
              sideDeck={sideDeck}
              setMainDeck={setMainDeck}
              setSideDeck={setSideDeck}
              canAddCard={canAddCard}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeckBuilderPage;