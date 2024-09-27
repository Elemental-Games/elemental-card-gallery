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
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.date}</p>
    <p>{item.description}</p>
    <a href={item.link} className="text-blue-500 hover:underline mt-2 inline-block">Watch video</a>
  </div>
);

const CardDetailPage = () => {
  const { cardName } = useParams();
  const { data: card, isLoading, error } = useQuery({
    queryKey: ['card', cardName],
    queryFn: () => fetchCardByName(cardName),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!card) return <div>Card not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img src={card.image} alt={card.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{card.name}</h1>
          <p className="text-xl mb-2">Card Number: {card.cardNumber}</p>
          <p className="text-xl mb-2">{card.element} | {card.type} | {card.rune} | Tier {card.tier} | {card.rarity}</p>
          <p className="text-lg mb-4">{card.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Strength</h3>
              <p>{card.strength}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Agility</h3>
              <p>{card.agility}</p>
            </div>
            {card.abilityName && (
              <div className="col-span-2">
                <h3 className="text-xl font-semibold mb-2">{card.abilityName}</h3>
                <p>{card.ability}</p>
              </div>
            )}
            {card.specialAbilityName && (
              <div className="col-span-2">
                <h3 className="text-xl font-semibold mb-2">{card.specialAbilityName}</h3>
                <p>{card.specialAbility}</p>
                <p className="text-sm text-gray-600">Cost: {card.specialAbilityCost}</p>
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold mb-2">Essence Cost</h3>
              <p>{card.essenceCost}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Essence Generation</h3>
              <p>{card.essenceGeneration}</p>
            </div>
          </div>
        </div>
      </div>

      {card.quote && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Quote</h2>
          <blockquote className="text-lg italic border-l-4 border-gray-300 pl-4">"{card.quote}"</blockquote>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Synergies</h2>
        <div className="flex overflow-x-auto whitespace-nowrap pb-4">
          {card.synergies.map((synergy, index) => (
            <SynergyCard key={index} card={synergy.card} synergy={synergy} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Counters</h2>
        <div className="flex overflow-x-auto whitespace-nowrap pb-4">
          {card.counters.map((counter, index) => (
            <SynergyCard key={index} card={counter.card} synergy={counter} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {card.news.map((item, index) => (
            <NewsItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;