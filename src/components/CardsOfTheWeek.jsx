import React, { useState, useEffect } from 'react';
import CardDisplay from './CardDisplay';

const CardsOfTheWeek = () => {
  const [weeklyCards, setWeeklyCards] = useState([]);

  useEffect(() => {
    const fetchWeeklyCards = async () => {
      try {
        const response = await fetch('/data/cards.json');
        const data = await response.json();
        const cards = data.cards;

        // Get the current date and time
        const now = new Date();
        
        // Calculate the start of the current week (Sunday at 12:00 PM EST)
        const startOfWeek = new Date(now);
        startOfWeek.setUTCHours(17, 0, 0, 0); // 12:00 PM EST is 17:00 UTC
        startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay());

        // Use the start of the week as a seed for pseudo-random selection
        const seed = startOfWeek.getTime();

        // Function to get a seeded random number
        const seededRandom = (max, seed) => {
          const x = Math.sin(seed++) * 10000;
          return Math.floor((x - Math.floor(x)) * max);
        };

        // Select one card for each element
        const elements = ['Air', 'Water', 'Earth', 'Fire'];
        const selectedCards = elements.map(element => {
          const elementCards = cards.filter(card => card.element === element);
          const randomIndex = seededRandom(elementCards.length, seed + elements.indexOf(element));
          return elementCards[randomIndex];
        });

        setWeeklyCards(selectedCards);
      } catch (error) {
        console.error('Error fetching weekly cards:', error);
      }
    };

    fetchWeeklyCards();

    // Set up an interval to check and update cards every hour
    const interval = setInterval(fetchWeeklyCards, 3600000); // 3600000 ms = 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 bg-gray-900 border-4 border-yellow-500">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Cards of the Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weeklyCards.map((card) => (
            <div key={card.id} className="aspect-[2/3] relative overflow-hidden">
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