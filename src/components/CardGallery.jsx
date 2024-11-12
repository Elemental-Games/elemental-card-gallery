import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Card = ({ card }) => {
  return (
    <Link to={`/cards/${card.id}`}>
      <motion.div
        className="w-full pb-[140%] rounded-lg overflow-hidden shadow-lg relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <img 
          src={`/images/cards/${card.id}.webp`} 
          alt={card.name} 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `/images/cards/${card.id}.png`;
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
          <h3 className="text-sm font-semibold">{card.name}</h3>
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
          {card.type === 'Creature' && card.stats && (
            <p className="text-xs">
              STR: {card.stats.strength} | AGI: {card.stats.agility}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

const CardGallery = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch('/data/cards.json');
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        const data = await response.json();
        setCards(data.cards);
      } catch (error) {
        console.error('Error loading cards:', error);
        setError('Error loading cards. Please try again later.');
      }
    };

    loadCards();
  }, []);

  return (
    <div>
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : cards.length === 0 ? (
        <div>Loading cards...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardGallery;