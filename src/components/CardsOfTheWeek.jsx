import React, { useState, useEffect } from 'react';
import CardDisplay from './CardDisplay';

const CardsOfTheWeek = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/data/cards.json');
        const data = await response.json();
        const allCards = data.cards;

        // Filter cards by element
        const airCards = allCards.filter(card => card.element === 'Air');
        const waterCards = allCards.filter(card => card.element === 'Water');
        const earthCards = allCards.filter(card => card.element === 'Earth');
        const fireCards = allCards.filter(card => card.element === 'Fire');

        // Get a random card from each element
        const getRandomCard = (cards) => cards[Math.floor(Math.random() * cards.length)];
        const selectedCards = [
          getRandomCard(airCards),
          getRandomCard(waterCards),
          getRandomCard(earthCards),
          getRandomCard(fireCards)
        ];

        setCards(selectedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    // Set up weekly update
    const now = new Date();
    const nextSunday = new Date(now.setDate(now.getDate() + (7 - now.getDay()) % 7));
    nextSunday.setHours(12, 0, 0, 0);
    const timeUntilNextSunday = nextSunday.getTime() - now.getTime();

    fetchCards(); // Initial fetch

    const weeklyTimer = setInterval(fetchCards, 7 * 24 * 60 * 60 * 1000); // Weekly interval
    const initialTimer = setTimeout(() => {
      fetchCards();
      setInterval(fetchCards, 7 * 24 * 60 * 60 * 1000);
    }, timeUntilNextSunday);

    return () => {
      clearInterval(weeklyTimer);
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <div className="py-16 bg-gray-900 border-4 border-yellow-500">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Cards of the Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="aspect-[1500/2100] relative overflow-hidden">
              <CardDisplay 
                card={card} 
                variant="cardsOfWeek"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsOfTheWeek;