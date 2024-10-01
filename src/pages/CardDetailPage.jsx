import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ElementIcon } from '../components/ElementIcon';

const CardDetailPage = () => {
  const { cardName } = useParams();
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/cards.json')
      .then(response => response.json())
      .then(data => {
        const foundCard = data.find(c => c.name.toLowerCase() === cardName.replace(/-/g, ' '));
        if (foundCard) {
          setCard(foundCard);
        } else {
          setError('Card not found');
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [cardName]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!card) return <div>Card not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img src={card.image} alt={card.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{card.name}</h1>
          <p className="text-xl mb-2 flex items-center">
            <ElementIcon element={card.element} className="mr-2" />
            {card.element} | {card.type} | {card.rarity}
          </p>
          <p className="text-lg mb-4">{card.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;