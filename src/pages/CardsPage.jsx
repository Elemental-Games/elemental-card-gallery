import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import CardDisplay from '../components/CardDisplay';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CardsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    element: 'all',
    type: 'all',
    rarity: 'all',
    strength: 'all',
    agility: 'all',
  });

  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });

  const filterOptions = useMemo(() => {
    if (!cards) return { elements: [], types: [], rarities: [] };
    return {
      elements: [...new Set(cards.map(card => card.element))],
      types: [...new Set(cards.map(card => card.type))],
      rarities: [...new Set(cards.map(card => card.rarity))],
    };
  }, [cards]);

  const filteredCards = useMemo(() => {
    if (!cards) return [];
    return cards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesElement = filters.element === 'all' || card.element.toLowerCase() === filters.element;
      const matchesType = filters.type === 'all' || card.type.toLowerCase() === filters.type;
      const matchesRarity = filters.rarity === 'all' || card.rarity.toLowerCase() === filters.rarity;
      return matchesSearch && matchesElement && matchesType && matchesRarity;
    }).sort((a, b) => {
      if (filters.strength !== 'all') {
        return filters.strength === 'highest' ? b.strength - a.strength : a.strength - b.strength;
      }
      if (filters.agility !== 'all') {
        return filters.agility === 'highest' ? b.agility - a.agility : a.agility - b.agility;
      }
      return 0;
    });
  }, [cards, searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Loading Cards...</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="w-full h-96" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error loading the cards. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Elemental Masters Cards</h1>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mb-8">
        <FilterOptions filters={filterOptions} onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCards.map((card) => (
          <CardDisplay key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardsPage;