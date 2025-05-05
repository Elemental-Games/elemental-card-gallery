import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CardDetailSidebar from './CardDetailSidebar';

const Card = ({ card, onCardClick }) => {
  return (
    <motion.div
      className="w-full pb-[140%] rounded-lg overflow-hidden shadow-lg relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={() => onCardClick(card)}
    >
      <img 
        src={`${window.location.origin}/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`} 
        alt={card.name} 
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `${window.location.origin}/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`;
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
        <h3 className="text-sm font-semibold">{typeof card.name === 'number' ? `Card ${card.name}` : card.name}</h3>
        <p className="text-xs">
          {card.element} | {card.type} | {
            card.rarity === 'C' ? 'Common' :
            card.rarity === 'U' ? 'Uncommon' :
            card.rarity.trim() === 'R' ? 'Rare' :
            card.rarity === 'E' ? 'Epic' :
            card.rarity === 'L' ? 'Legendary' :
            card.rarity
          }
        </p>
        {card.type === 'Creature' && (
          <p className="text-xs">
            STR: {card.stats?.strength || 'N/A'} | AGI: {card.stats?.agility || 'N/A'}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const CardGallery = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadCards = async () => {
      try {
        const elements = ['air', 'water', 'fire', 'earth', 'special'];
        const allCards = [];

        await Promise.all(
          elements.map(async (element) => {
            const response = await fetch(`${window.location.origin}/data/cards/${element}Cards.json`);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${element} cards (${response.status})`);
            }
            const data = await response.json();
            allCards.push(...data.cards);
          })
        );

        setCards(allCards.sort((a, b) => a.cardNumber - b.cardNumber));
        setLoading(false);
      } catch (error) {
        console.error('Error loading cards:', error);
        setError(`Error loading cards: ${error.message}`);
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error loading cards",
          description: `Please try again later. (${error.message})`,
        });
      }
    };

    loadCards();
  }, [toast]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[200px]">Loading cards...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <Card key={card.id} card={card} onCardClick={handleCardClick} />
        ))}
      </div>

      <CardDetailSidebar
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
};

export default CardGallery;