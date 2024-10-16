import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import CardGalleryTemplate from '../components/templates/CardGalleryTemplate';

const fetchCards = async () => {
  const response = await fetch('/data/cards.json');
  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }
  return response.json();
};

const CardGalleryPage = () => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    element: '',
    type: 'all',
    rarity: 'all',
    idSort: null,
    strengthAgilitySort: null,
  });

  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
  });

  useEffect(() => {
    if (cards) {
      applyFilters();
    }
  }, [searchTerm, filters, cards]);

  const applyFilters = () => {
    let filtered = cards.cards.filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const elementMatch = filters.element === '' || card.element === filters.element;
      const typeMatch = filters.type === 'all' || card.type === filters.type;
      const rarityMatch = filters.rarity === 'all' || card.rarity === filters.rarity;
      return nameMatch && elementMatch && typeMatch && rarityMatch;
    });

    if (filters.idSort) {
      filtered.sort((a, b) => filters.idSort === 'asc' ? a.cardNumber - b.cardNumber : b.cardNumber - a.cardNumber);
    }

    if (filters.strengthAgilitySort) {
      const [attribute, order] = filters.strengthAgilitySort.split('-');
      filtered.sort((a, b) => {
        const aValue = Number(a[attribute]) || 0;
        const bValue = Number(b[attribute]) || 0;
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    setFilteredCards(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({
      element: '',
      type: 'all',
      rarity: 'all',
      idSort: null,
      strengthAgilitySort: null,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <CardGalleryTemplate
      cards={filteredCards}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSearch={applyFilters}
      onFilterChange={handleFilterChange}
      onResetFilters={handleResetFilters}
    />
  );
};

export default CardGalleryPage;