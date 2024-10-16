import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from 'lucide-react';
import FilterOptions from '../FilterOptions';

const CardGallery = ({ cards, onCardSelect, deck }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('all');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [strengthAgilitySort, setStrengthAgilitySort] = useState(null);
  const [rarity, setRarity] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (element === 'all' || card.element === element) &&
    (type === 'all' || card.type === type) &&
    (rarity === 'all' || card.rarity === rarity) &&
    (strengthAgilitySort ? card.type === 'Creature' : true)
  ).sort((a, b) => {
    if (idSort) {
      return idSort === 'asc' ? a.cardNumber - b.cardNumber : b.cardNumber - a.cardNumber;
    }
    if (strengthAgilitySort) {
      const [attribute, order] = strengthAgilitySort.split('-');
      const aValue = a[attribute] || 0;
      const bValue = b[attribute] || 0;
      return order === 'asc' 
        ? (aValue - bValue) || (a.cardNumber - b.cardNumber)
        : (bValue - aValue) || (b.cardNumber - a.cardNumber);
    }
    return a.cardNumber - b.cardNumber;
  });

  const pageCount = Math.ceil(filteredCards.length / cardsPerPage);
  const displayedCards = filteredCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  const handleCardClick = (card, amount) => {
    if (onCardSelect) {
      onCardSelect(card, amount);
    }
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'element':
        setElement(value);
        break;
      case 'type':
        setType(value);
        if (['Rune', 'Counter', 'Shield'].includes(value)) {
          setStrengthAgilitySort(null);
        }
        break;
      case 'rarity':
        setRarity(value);
        break;
      default:
        break;
    }
  };

  const getCardCount = (cardId) => {
    const mainDeckCard = deck.mainDeck.find(c => c.id === cardId);
    const sideDeckCard = deck.sideDeck.find(c => c.id === cardId);
    return (mainDeckCard?.quantity || 0) + (sideDeckCard?.quantity || 0);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setElement('all');
    setType('all');
    setIdSort(null);
    setStrengthAgilitySort(null);
    setRarity('all');
  };

  return (
    <div className="mt-4">
      <div className="mb-4 flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <FilterOptions cards={cards} onFilterChange={handleFilterChange} />
        <Select value={idSort} onValueChange={(value) => setIdSort(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ID" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Lowest to Highest</SelectItem>
            <SelectItem value="desc">Highest to Lowest</SelectItem>
          </SelectContent>
        </Select>
        <Select 
          value={strengthAgilitySort} 
          onValueChange={(value) => {
            setStrengthAgilitySort(value);
            if (value) setType('Creature');
          }}
          disabled={['Rune', 'Counter', 'Shield'].includes(type)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Strength/Agility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strength-asc">Strength (Lowest to Highest)</SelectItem>
            <SelectItem value="strength-desc">Strength (Highest to Lowest)</SelectItem>
            <SelectItem value="agility-asc">Agility (Lowest to Highest)</SelectItem>
            <SelectItem value="agility-desc">Agility (Highest to Lowest)</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={resetFilters}>Reset Filters</Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {displayedCards.map((card) => (
          <Card 
            key={card.id} 
            className="p-2 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <img 
              src={card.image} 
              alt={card.name} 
              className="w-full h-auto object-contain mx-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.svg';
              }}
            />
            <p className="text-center mt-2">{card.name}</p>
            <p className="text-center text-sm text-gray-600">{card.element} | {card.type} | {card.rarity}</p>
            {strengthAgilitySort && card.type === 'Creature' && (
              <p className="text-center text-sm">
                STR: {card.strength || 'N/A'} | AGI: {card.agility || 'N/A'}
              </p>
            )}
            <div className="flex justify-center items-center mt-2">
              <Button size="sm" variant="outline" onClick={() => handleCardClick(card, -1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2">{getCardCount(card.id)}</span>
              <Button size="sm" variant="outline" onClick={() => handleCardClick(card, 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="self-center">{currentPage} / {pageCount}</span>
        <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CardGallery;