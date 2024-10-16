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
    const loadCards = async () => {
      try {
        // Fetch card data from JSON file
        const response = await fetch('/data/cards.json');
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        const data = await response.json();

        // Load all image files from the public/images/cards/ directory
        const imageContext = require.context('/public/images/cards', false, /\.(png|jpe?g|svg)$/);
        const imageFiles = imageContext.keys().map(imageContext);

        // Match images with card data
        const matchedCards = data.cards.map(card => {
          const imageName = card.id + '.png'; // Assuming image names match card IDs
          const matchedImage = imageFiles.find(img => img.includes(imageName));
          return {
            ...card,
            image: matchedImage || '/placeholder.svg' // Use placeholder if no match found
          };
        });

        setCards(matchedCards);
      } catch (error) {
        console.error('Error loading cards:', error);
        setError('Error loading cards. Please try again later.');
      }
    };

    loadCards();
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