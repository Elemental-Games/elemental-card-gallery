import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CardDetailPage = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch('/data/cards.json')
      .then(response => response.json())
      .then(data => {
        const foundCard = data.cards.find(c => c.id === id);
        if (foundCard) {
          // Handle numeric name references
          if (typeof foundCard.name === 'number') {
            const cardWithName = data.cards.find(c => c.cardNumber === foundCard.name);
            foundCard.name = cardWithName ? cardWithName.name : `Card ${foundCard.name}`;
          }
          setCard(foundCard);
        } else {
          setError('Card not found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading card data');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>;
  if (!card) return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>Card not found</AlertDescription></Alert>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{card.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={`/images/cards/${card.id}.webp`}
            alt={card.name} 
            className="w-full h-auto rounded-lg shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `/images/cards/${card.id}.png`;
            }}
          />
        </div>
        <div>
          <p><strong>Element:</strong> {card.element}</p>
          <p><strong>Type:</strong> {card.type}</p>
          <p><strong>Rarity:</strong> {
            card.rarity === 'C' ? 'Common' :
            card.rarity === 'U' ? 'Uncommon' :
            card.rarity.trim() === 'R' ? 'Rare' :
            card.rarity === 'E' ? 'Epic' :
            card.rarity === 'L' ? 'Legendary' :
            card.rarity
          }</p>
          {card.stats && (
            <>
              <p><strong>Strength:</strong> {card.stats.strength}</p>
              <p><strong>Agility:</strong> {card.stats.agility}</p>
            </>
          )}
          {card.ability && (
            <div>
              <p><strong>Ability:</strong> {card.abilityName}</p>
              <p>{card.ability}</p>
            </div>
          )}
          {card.specialAbility && (
            <div>
              <p><strong>Special Ability:</strong> {card.specialAbilityName}</p>
              <p>{card.specialAbility}</p>
              {card.specialAbilityCost && <p><strong>Cost:</strong> {card.specialAbilityCost}</p>}
            </div>
          )}
          {card.essence && (
            <>
              {card.essence.cost && <p><strong>Essence Cost:</strong> {card.essence.cost.amount} {card.essence.cost.element}</p>}
              {card.essence.generation && <p><strong>Essence Generation:</strong> {card.essence.generation.amount} {card.essence.generation.element}</p>}
            </>
          )}
          {card.quote && <p className="italic mt-4">"{card.quote}"</p>}
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;