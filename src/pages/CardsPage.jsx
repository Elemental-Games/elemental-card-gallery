import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import CardDisplay from '../components/CardDisplay';
import { fetchCardsFromS3 } from '../utils/awsUtils';

const CardsPage = () => {
  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  const fakeCard = {
    id: 'water-elemental',
    name: 'Water Elemental',
    image: '/images/water-elemental.jpg',
    element: 'Water',
    type: 'Creature',
    rarity: 'Rare',
    description: 'A creature made of the element of water.',
    strength: 7,
    agility: 5,
    ability: 'Tidal Wave: Deal 3 damage to all enemy creatures.',
    specialAbility: 'Hydro Pump: Once per game, deal 10 damage to a single target.',
    essconeCost: 4,
    essenceGeneration: 2,
    background: 'Water Elementals are ancient beings that embody the raw power of the seas. They are known for their fluid tactics and overwhelming force in battle.',
    synergies: [
      { card: { id: 'leaf-spirit', name: 'Leaf Spirit' }, rating: 'S', color: 'text-green-500' },
      { card: { id: 'flame-wisp', name: 'Flame Wisp' }, rating: 'A', color: 'text-red-500' }
    ],
    counters: [
      { card: { id: 'wind-rider', name: 'Wind Rider' }, rating: 'S', color: 'text-blue-300' }
    ],
    news: [
      { 
        title: 'Water Elemental Showcase', 
        date: '2023-05-01', 
        description: 'Check out our latest video showcasing the Water Elemental in action!', 
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Elemental Masters Cards</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="mb-8">
        <FilterOptions />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <CardDisplay card={fakeCard} />
        {cards && cards.map((card) => (
          <CardDisplay key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardsPage;
