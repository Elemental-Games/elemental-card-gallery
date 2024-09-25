import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCardByName } from '../utils/awsUtils';

const SynergyCard = ({ card, synergy }) => (
  <div className={`w-40 h-60 rounded-lg overflow-hidden shadow-lg m-2 relative ${synergy.color}`}>
    <img src={card.image || '/placeholder.svg'} alt={card.name} className="w-full h-full object-cover" />
    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded-full">
      {synergy.rating}
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
      <p className="text-sm font-semibold">{card.name}</p>
    </div>
  </div>
);

const NewsItem = ({ item }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
    <p className="text-sm text-gray-600 mb-2">{item.date}</p>
    <p>{item.description}</p>
    <a href={item.link} className="text-blue-500 hover:underline mt-2 inline-block">Read more</a>
  </div>
);

const CardDetailPage = () => {
  const { cardName } = useParams();
  const { data: card, isLoading, error } = useQuery({
    queryKey: ['card', cardName],
    queryFn: () => fetchCardByName(cardName),
  });

  // Fake card data for Water Elemental
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
      { card: { id: 'rain-maker', name: 'Rain Maker', image: '/placeholder.svg' }, rating: 8, color: 'text-blue-500' },
      { card: { id: 'ice-sculptor', name: 'Ice Sculptor', image: '/placeholder.svg' }, rating: 7, color: 'text-blue-300' }
    ],
    counters: [
      { card: { id: 'lightning-bolt', name: 'Lightning Bolt', image: '/placeholder.svg' }, rating: 9, color: 'text-yellow-500' },
      { card: { id: 'desert-nomad', name: 'Desert Nomad', image: '/placeholder.svg' }, rating: 6, color: 'text-orange-500' }
    ],
    news: [
      { title: 'Water Elemental Dominates in Recent Tournament', date: '2023-03-15', description: 'The Water Elemental card showed its strength in last week\'s Elemental Masters Championship.', link: '#' },
      { title: 'New Synergy Discovered with Rain Maker', date: '2023-02-28', description: 'Players have found a powerful combo using Water Elemental and Rain Maker cards.', link: '#' }
    ]
  };

  // Use fake card data for demonstration
  const displayCard = fakeCard;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img src={displayCard.image} alt={displayCard.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{displayCard.name}</h1>
          <p className="text-xl mb-2">{displayCard.element} | {displayCard.type} | {displayCard.rarity}</p>
          <p className="text-lg mb-4">{displayCard.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Strength</h3>
              <p>{displayCard.strength}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Agility</h3>
              <p>{displayCard.agility}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Ability</h3>
              <p>{displayCard.ability}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Special Ability</h3>
              <p>{displayCard.specialAbility}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Esscone Cost</h3>
              <p>{displayCard.essconeCost}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Essence Generation</h3>
              <p>{displayCard.essenceGeneration}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Card Background</h2>
        <p className="text-lg">{displayCard.background}</p>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Synergies</h2>
        <div className="flex overflow-x-auto whitespace-nowrap pb-4">
          {displayCard.synergies.map((synergy) => (
            <SynergyCard key={synergy.card.id} card={synergy.card} synergy={synergy} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Counters</h2>
        <div className="flex overflow-x-auto whitespace-nowrap pb-4">
          {displayCard.counters.map((counter) => (
            <SynergyCard key={counter.card.id} card={counter.card} synergy={counter} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCard.news.map((item, index) => (
            <NewsItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;
