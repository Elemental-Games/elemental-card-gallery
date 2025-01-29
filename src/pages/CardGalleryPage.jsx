import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CardGalleryPage = () => {
  const [cards, setCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const cardsPerPage = 8;

  useEffect(() => {
    const loadCards = async () => {
      try {
        const elements = ['air', 'water', 'fire', 'earth'];
        const allCards = [];

        for (const element of elements) {
          const response = await fetch(`/data/cards/${element}Cards.json`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${element} cards (${response.status})`);
          }
          const data = await response.json();
          if (data && Array.isArray(data.cards)) {
            allCards.push(...data.cards);
          }
        }

        const sortedCards = allCards.sort((a, b) => 
          (parseInt(a.cardNumber) || 0) - (parseInt(b.cardNumber) || 0)
        );

        setCards(sortedCards);
        setDisplayedCards(sortedCards.slice(0, cardsPerPage));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading cards:', error);
        setError(`Failed to load cards: ${error.message}`);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Error loading cards",
          description: `Please try again later. (${error.message})`,
        });
      }
    };

    loadCards();
  }, [toast]);

  const observer = useRef();
  const loadMoreRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayedCards.length < cards.length) {
        loadMoreCards();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, displayedCards.length, cards.length]);

  const loadMoreCards = () => {
    setLoading(true);
    const currentLength = displayedCards.length;
    const nextBatch = cards.slice(currentLength, currentLength + cardsPerPage);
    setDisplayedCards(prev => [...prev, ...nextBatch]);
    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A103C] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Card Gallery</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {displayedCards.map((card) => (
          <Card 
            key={card.id}
            className="p-4 hover:shadow-lg transition-shadow duration-200 bg-purple-950/70 border border-yellow-500/30"
          >
            <img 
              src={`/images/cards/${card.id}.webp`}
              alt={card.name}
              className="w-full h-auto object-contain mx-auto rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/images/cards/${card.id}.png`;
              }}
            />
            <div className="mt-2 text-center">
              <h3 className="font-bold text-yellow-400">{card.name}</h3>
              <p className="text-sm text-purple-200">Element: {card.element}</p>
            </div>
          </Card>
        ))}
      </div>

      {displayedCards.length < cards.length && (
        <div 
          ref={loadMoreRef}
          className="h-10 w-full flex justify-center items-center mt-4"
        >
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
          )}
        </div>
      )}
    </div>
  );
};

export default CardGalleryPage;