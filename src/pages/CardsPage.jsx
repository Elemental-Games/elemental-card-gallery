import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import CardGallery from '../components/CardGallery';
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
      <CardGallery cards={cards} />
    </div>
  );
};

export default CardsPage;
