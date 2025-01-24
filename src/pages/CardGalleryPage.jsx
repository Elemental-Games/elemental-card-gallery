import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import CardGallery from '@/components/DeckBuilder/CardGallery';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import card data directly
import airCards from '@/data/cards/airCards.json';
import waterCards from '@/data/cards/waterCards.json';
import fireCards from '@/data/cards/fireCards.json';
import earthCards from '@/data/cards/earthCards.json';

const CardGalleryPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Combine all cards
      const allCards = [
        ...airCards.cards,
        ...waterCards.cards,
        ...fireCards.cards,
        ...earthCards.cards
      ];

      // Sort by card number
      const sortedCards = allCards.sort((a, b) => (a.cardNumber || 0) - (b.cardNumber || 0));
      setCards(sortedCards);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading cards:', error);
      setError(`Error loading cards: ${error.message}`);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error loading cards",
        description: `Please try again later. (${error.message})`,
      });
    }
  }, [toast]);

  const handleCardSelect = (card, amount = 1) => {
    if (card.type === 'Shield') {
      setSideDeck(prev => {
        const existingCard = prev.find(c => c.id === card.id);
        if (existingCard) {
          return prev.map(c => 
            c.id === card.id 
              ? { ...c, quantity: Math.min(3, c.quantity + amount) }
              : c
          );
        }
        return [...prev, { ...card, quantity: 1 }];
      });
    } else {
      setMainDeck(prev => {
        const existingCard = prev.find(c => c.id === card.id);
        if (existingCard) {
          return prev.map(c => 
            c.id === card.id 
              ? { ...c, quantity: Math.min(3, c.quantity + amount) }
              : c
          );
        }
        return [...prev, { ...card, quantity: 1 }];
      });
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#1A103C] text-white flex items-center justify-center">
      Loading cards...
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#1A103C] text-white flex items-center justify-center">
      {error}
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Card Gallery - Browse Elemental Masters TCG Cards</title>
        <meta name="description" content="Explore the complete collection of Elemental Masters Trading Card Game cards. Browse creatures, runes, counters, and shields from all elements." />
        <meta name="keywords" content="Elemental Masters cards, TCG card gallery, trading card collection, card database, elemental cards" />
        <meta property="og:title" content="Card Gallery - Elemental Masters TCG Collection" />
        <meta property="og:description" content="Browse and discover all cards in the Elemental Masters Trading Card Game. Find creatures, runes, counters, and shields from every element." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg/cards/gallery" />
      </Helmet>

      <div className="min-h-screen bg-[#1A103C] text-white relative">
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'mr-80' : 'mr-0'}`}>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Card Gallery</h1>
            <CardGallery 
              cards={cards}
              onCardSelect={handleCardSelect}
              deck={{ mainDeck, sideDeck }}
            />
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <Button
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-purple-700 hover:bg-purple-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronRight /> : <ChevronLeft />}
        </Button>

        {/* Deck Building Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 w-80 h-full bg-purple-950/90 border-l border-yellow-500/30
                shadow-[-10px_0_30px_rgba(0,0,0,0.3)] overflow-y-auto pt-20"
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold text-[#FFB800] mb-4 sticky top-0">Quick Deck Builder</h2>
                
                {/* Main Deck Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Main Deck ({mainDeck.reduce((sum, card) => sum + card.quantity, 0)}/40)</h3>
                  <div className="space-y-2">
                    {mainDeck.map(card => (
                      <div key={card.id} className="flex items-center justify-between bg-purple-900/50 p-2 rounded">
                        <span className="truncate mr-2">{card.name}</span>
                        <span className="flex-shrink-0">x{card.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Deck Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Side Deck ({sideDeck.reduce((sum, card) => sum + card.quantity, 0)})</h3>
                  <div className="space-y-2">
                    {sideDeck.map(card => (
                      <div key={card.id} className="flex items-center justify-between bg-purple-900/50 p-2 rounded">
                        <span className="truncate mr-2">{card.name}</span>
                        <span className="flex-shrink-0">x{card.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 sticky bottom-4">
                  <Link to="/cards/deck-builder">
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-500">
                      Open Full Deck Builder
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CardGalleryPage;