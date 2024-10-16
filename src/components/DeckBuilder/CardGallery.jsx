import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import FilterOptions from '../FilterOptions';

const CardGallery = ({ cards, onCardSelect, deck }) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [strengthAgilitySort, setStrengthAgilitySort] = useState(null);
  const [rarity, setRarity] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log('Filtering cards with:', { searchTerm, element, type, rarity, idSort, strengthAgilitySort });
      const filtered = cards.filter(card => {
        const nameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
        const elementMatch = element === '' || element === 'All Elements' || (card.element && card.element === element);
        const typeMatch = type === 'all' || type === 'All Types' || card.type === type;
        const rarityMatch = rarity === 'all' || rarity === 'All Rarities' ||
          (rarity === 'Common' && card.rarity === 'C') ||
          (rarity === 'Uncommon' && card.rarity === 'U') ||
          (rarity === 'Rare' && card.rarity.trim() === 'R') ||
          (rarity === 'Epic' && card.rarity === 'E') ||
          (rarity === 'Legendary' && card.rarity === 'L');
        const strengthAgilityMatch = strengthAgilitySort ? card.type === 'Creature' : true;

        return nameMatch && elementMatch && typeMatch && rarityMatch && strengthAgilityMatch;
      });

      filtered.sort((a, b) => {
        if (idSort) {
          return idSort === 'asc' ? a.cardNumber - b.cardNumber : b.cardNumber - a.cardNumber;
        }
        if (strengthAgilitySort) {
          const [attribute, order] = strengthAgilitySort.split('-');
          const aValue = Number(a[attribute]) || 0;
          const bValue = Number(b[attribute]) || 0;
          return order === 'asc' 
            ? (aValue - bValue) || (a.cardNumber - b.cardNumber)
            : (bValue - aValue) || (b.cardNumber - a.cardNumber);
        }
        return a.cardNumber - b.cardNumber;
      });

      setFilteredCards(filtered);
      setError(null);
    } catch (error) {
      console.error('Error filtering cards:', error);
      setError('An error occurred while filtering cards. Please try again.');
    }
  }, [searchTerm, element, type, cards, idSort, strengthAgilitySort, rarity]);

  const handleFilterChange = (filterType, value) => {
    console.log(`Changing filter: ${filterType} to ${value}`);
    switch (filterType) {
      case 'element':
        setElement(value === 'All Elements' ? '' : value);
        if (value !== 'All Elements') {
          setType('Creature');
        }
        break;
      case 'type':
        setType(value === 'All Types' ? 'all' : value);
        if (value !== 'Creature' && value !== 'All Types') {
          setElement('');
          setStrengthAgilitySort(null);
        }
        break;
      case 'rarity':
        setRarity(value === 'All Rarities' ? 'all' : value);
        break;
      case 'idSort':
        setIdSort(value);
        break;
      case 'strengthAgilitySort':
        setStrengthAgilitySort(value);
        setType('Creature');
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setElement('');
    setType('all');
    setIdSort(null);
    setStrengthAgilitySort(null);
    setRarity('all');
    setFilteredCards(cards);  // Reset to show all cards
  };

  const handleCardClick = (card, amount) => {
    if (onCardSelect) {
      onCardSelect(card, amount);
    }
  };

  const getCardCount = (cardId) => {
    const mainDeckCard = deck.mainDeck.find(c => c.id === cardId);
    const sideDeckCard = deck.sideDeck.find(c => c.id === cardId);
    return (mainDeckCard?.quantity || 0) + (sideDeckCard?.quantity || 0);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-4">
      <FilterOptions 
        cards={cards}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentType={type}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredCards.map((card) => (
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
            <p className="text-center text-sm text-gray-600">
              {card.element} | {card.type} | {
                card.rarity === 'C' ? 'Common' :
                card.rarity === 'U' ? 'Uncommon' :
                card.rarity.trim() === 'R' ? 'Rare' :
                card.rarity === 'E' ? 'Epic' :
                card.rarity === 'L' ? 'Legendary' :
                card.rarity
              }
            </p>
            {card.type === 'Creature' && (
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
    </div>
  );
};

export default CardGallery;