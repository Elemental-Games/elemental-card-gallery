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
        {cards && cards.map((card) => (
          <CardDisplay key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardsPage;