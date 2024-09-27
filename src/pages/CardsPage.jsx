import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import CardDisplay from '../components/CardDisplay';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CardsPage = () => {
  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  const [filteredCards, setFilteredCards] = useState([]);
  const [strengthSort, setStrengthSort] = useState('');
  const [agilitySort, setAgilitySort] = useState('');

  useEffect(() => {
    if (cards) {
      let sorted = [...cards];
      if (strengthSort) {
        sorted.sort((a, b) => strengthSort === 'highest' ? b.strength - a.strength : a.strength - b.strength);
      } else if (agilitySort) {
        sorted.sort((a, b) => agilitySort === 'highest' ? b.agility - a.agility : a.agility - b.agility);
      }
      setFilteredCards(sorted);
    }
  }, [cards, strengthSort, agilitySort]);

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
        <div className="flex space-x-4 mt-4">
          <Select onValueChange={setStrengthSort} value={strengthSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Strength" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Sort</SelectItem>
              <SelectItem value="highest">Highest to Lowest</SelectItem>
              <SelectItem value="lowest">Lowest to Highest</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setAgilitySort} value={agilitySort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Agility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Sort</SelectItem>
              <SelectItem value="highest">Highest to Lowest</SelectItem>
              <SelectItem value="lowest">Lowest to Highest</SelectItem>
            </SelectContent>
          </Select>
        </div>
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