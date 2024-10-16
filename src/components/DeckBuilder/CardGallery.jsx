import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from 'lucide-react';

const CardGallery = ({ cards, onCardSelect, deck }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('all');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [strengthAgilitySort, setStrengthAgilitySort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (element === 'all' || card.element === element) &&
    (type === 'all' || card.type === type)
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

  const handleSelectChange = (setter) => (value) => {
    setter(value);
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
        <Select value={element} onValueChange={handleSelectChange(setElement)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Element" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Elements</SelectItem>
            <SelectItem value="Fire">Fire</SelectItem>
            <SelectItem value="Water">Water</SelectItem>
            <SelectItem value="Earth">Earth</SelectItem>
            <SelectItem value="Air">Air</SelectItem>
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={handleSelectChange(setType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Creature">Creature</SelectItem>
            <SelectItem value="Rune">Rune</SelectItem>
            <SelectItem value="Counter">Counter</SelectItem>
            <SelectItem value="Shield">Shield</SelectItem>
          </SelectContent>
        </Select>
        <Select value={idSort} onValueChange={handleSelectChange(setIdSort)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ID" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Lowest to Highest</SelectItem>
            <SelectItem value="desc">Highest to Lowest</SelectItem>
          </SelectContent>
        </Select>
        <Select value={strengthAgilitySort} onValueChange={handleSelectChange(setStrengthAgilitySort)}>
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