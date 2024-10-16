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
          <img src={card.image} alt={card.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div>
          <p><strong>Element:</strong> {card.element}</p>
          <p><strong>Type:</strong> {card.type}</p>
          <p><strong>Rarity:</strong> {card.rarity}</p>
          {card.strength && <p><strong>Strength:</strong> {card.strength}</p>}
          {card.agility && <p><strong>Agility:</strong> {card.agility}</p>}
          {card.abilityName && (
            <div>
              <p><strong>Ability:</strong> {card.abilityName}</p>
              <p>{card.ability}</p>
            </div>
          )}
          {card.specialAbilityName && (
            <div>
              <p><strong>Special Ability:</strong> {card.specialAbilityName}</p>
              <p>{card.specialAbility}</p>
              {card.specialAbilityCost && <p><strong>Cost:</strong> {card.specialAbilityCost}</p>}
            </div>
          )}
          {card.essenceCost && <p><strong>Essence Cost:</strong> {card.essenceCost}</p>}
          {card.essenceGeneration && <p><strong>Essence Generation:</strong> {card.essenceGeneration}</p>}
          {card.quote && <p className="italic mt-4">"{card.quote}"</p>}
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;