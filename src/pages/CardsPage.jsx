import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import CardGallery from '../components/CardGallery';
import { fetchCardsFromS3 } from '../utils/awsUtils';

const CardsPage = () => {
  const { data: allCards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  const [filteredCards, setFilteredCards] = useState([]);
  const [filters, setFilters] = useState({ element: '', type: '', rarity: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (allCards) {
      let result = allCards;

      // Apply filters
      if (filters.element) result = result.filter(card => card.element === filters.element);
      if (filters.type) result = result.filter(card => card.type === filters.type);
      if (filters.rarity) result = result.filter(card => card.rarity === filters.rarity);

      // Apply search
      if (searchTerm) {
        result = result.filter(card => 
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredCards(result);
    }
  }, [allCards, filters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Elemental Masters Cards</h1>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mb-8">
        <FilterOptions cards={allCards} onFilterChange={handleFilterChange} />
      </div>
      <CardGallery cards={filteredCards} />
    </div>
  );
};

export default CardsPage;