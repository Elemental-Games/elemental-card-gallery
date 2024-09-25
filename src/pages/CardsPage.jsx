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
    description: 'A powerful entity born from the depths of the ocean.',
    strength: 7,
    agility: 5,
    ability: 'Tidal Wave: Deal 3 damage to all enemy creatures.',
    specialAbility: 'Hydro Pump: Once per game, deal 10 damage to a single target.',
    essconeCost: 4,
    essenceGeneration: 2,
    background: 'Water Elementals are ancient beings that embody the raw power of the seas. They are known for their fluid tactics and overwhelming force in battle.',
    synergies: [
      { card: { id: 'rain-maker', name: 'Rain Maker' }, rating: 8, color: 'text-blue-500' },
      { card: { id: 'ice-sculptor', name: 'Ice Sculptor' }, rating: 7, color: 'text-blue-300' }
    ],
    counters: [
      { card: { id: 'lightning-bolt', name: 'Lightning Bolt' }, rating: 9, color: 'text-yellow-500' },
      { card: { id: 'desert-nomad', name: 'Desert Nomad' }, rating: 6, color: 'text-orange-500' }
    ],
    news: [
      { title: 'Water Elemental Dominates in Recent Tournament', date: '2023-03-15', description: 'The Water Elemental card showed its strength in last week\'s Elemental Masters Championship.', link: '#' },
      { title: 'New Synergy Discovered with Rain Maker', date: '2023-02-28', description: 'Players have found a powerful combo using Water Elemental and Rain Maker cards.', link: '#' }
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
