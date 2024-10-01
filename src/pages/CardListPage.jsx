import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import CardGallery from '../components/CardGallery';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

  console.log('Cards data:', cards); // Add this line for debugging

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Card Gallery</h1>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
        <FilterOptions onFilterChange={handleFilterChange} />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(20)].map((_, index) => (
            <Skeleton key={index} className="w-full h-64" />
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load cards: {error.message}</AlertDescription>
        </Alert>
      ) : (
        <CardGallery cards={filteredCards || []} />
      )}
    </div>
  );
};

export default CardListPage;