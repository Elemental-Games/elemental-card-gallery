import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import CardGallery from '../components/CardGallery';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import { Skeleton } from '@/components/ui/skeleton';

const CardListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    element: 'all',
    type: 'all',
    rarity: 'all'
  });

  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  const filteredCards = cards?.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.element === 'all' || card.element === filters.element) &&
    (filters.type === 'all' || card.type === filters.type) &&
    (filters.rarity === 'all' || card.rarity === filters.rarity)
  );

  const handleSearch = (term) => setSearchTerm(term);
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Card Gallery</h1>
        <div className="mb-8">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(20)].map((_, index) => (
            <Skeleton key={index} className="w-full h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Card Gallery</h1>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
        {cards && <FilterOptions cards={cards} onFilterChange={handleFilterChange} />}
      </div>
      {error ? (
        <div className="text-center text-red-500">Error loading cards: {error.message}</div>
      ) : (
        <CardGallery cards={filteredCards || []} />
      )}
    </div>
  );
};

export default CardListPage;