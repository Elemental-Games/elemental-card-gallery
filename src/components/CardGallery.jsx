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
          src={card.image} 
          alt={card.name} 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
          <h3 className="text-sm font-semibold">{card.name}</h3>
          <p className="text-xs">{card.element} | {card.type} | {card.rarity}</p>
        </div>
      </motion.div>
    </Link>
  );
};

const CardGallery = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/storage/cards.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCards(data.cards))
      .catch(error => {
        console.error('Error fetching cards:', error);
        setError('Error loading cards. Please try again later.');
      });
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (cards.length === 0) {
    return <div>Loading cards...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGallery;