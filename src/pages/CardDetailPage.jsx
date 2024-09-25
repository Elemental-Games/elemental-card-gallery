import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCardById } from '../utils/awsUtils';

const SynergyCard = ({ card, synergy }) => (
  <div className={`w-40 h-60 rounded-lg overflow-hidden shadow-lg m-2 relative ${synergy.color}`}>
    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded-full">
      {synergy.rating}
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
      <p className="text-sm font-semibold">{card.name}</p>
    </div>
  </div>
);

const CardDetailPage = () => {
  const { id } = useParams();
  const { data: card, isLoading, error } = useQuery({
    queryKey: ['card', id],
    queryFn: () => fetchCardById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img src={card.image} alt={card.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{card.name}</h1>
          <p className="text-xl mb-2">{card.element} | {card.type} | {card.rarity}</p>
          <p className="text-lg mb-4">{card.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Attack</h3>
              <p>{card.attack}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Defense</h3>
              <p>{card.defense}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Special Ability</h3>
              <p>{card.specialAbility}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Synergies</h2>
        <div className="overflow-x-auto whitespace-nowrap pb-4">
          {card.synergies.map((synergy) => (
            <SynergyCard key={synergy.card.id} card={synergy.card} synergy={synergy} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Counters</h2>
        <div className="overflow-x-auto whitespace-nowrap pb-4">
          {card.counters.map((counter) => (
            <SynergyCard key={counter.card.id} card={counter.card} synergy={counter} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;