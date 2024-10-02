import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const CardGallery = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Link key={card.id} to={`/cards/${card.id}`} className="block">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={`/cards/${card.image}`} alt={card.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{card.name}</h3>
              <p className="text-sm text-gray-600">{card.element} | {card.type}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const CardListPage = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    element: 'all',
    type: 'all',
    rarity: 'all'
  });

  useEffect(() => {
    fetch('/src/data/ElementalMastersCards.json')
      .then(response => response.json())
      .then(data => {
        setCards(data.cards);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.element === 'all' || card.element === filters.element) &&
    (filters.type === 'all' || card.type === filters.type) &&
    (filters.rarity === 'all' || card.rarity === filters.rarity)
  );

  const handleSearch = (term) => setSearchTerm(term);
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

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
          <AlertDescription>Failed to load cards: {error}</AlertDescription>
        </Alert>
      ) : (
        <CardGallery cards={filteredCards} />
      )}
    </div>
  );
};

export default CardListPage;