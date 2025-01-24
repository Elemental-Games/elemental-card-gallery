import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import FilterOptions from '@/components/FilterOptions';
import { Link } from 'react-router-dom';

const CardGallery = ({ cards = [], onCardSelect, deck = { mainDeck: [], sideDeck: [] } }) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [strengthAgilitySort, setStrengthAgilitySort] = useState(null);
  const [rarity, setRarity] = useState('all');
  const [tier, setTier] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const cardsPerPage = 20;

  useEffect(() => {
    try {
      // First, filter out any invalid cards
      const validCards = cards.filter(card => card && typeof card === 'object' && card.name);
      
      const filtered = validCards.filter(card => {
        const nameMatch = searchTerm === '' || 
          card.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const elementMatch = element === '' || card.element === element;
        const typeMatch = type === 'all' || card.type === type;
        const rarityMatch = rarity === 'all' ||
          (rarity === 'common' && card.rarity === 'C') ||
          (rarity === 'uncommon' && card.rarity === 'U') ||
          (rarity === 'rare' && card.rarity === 'R') ||
          (rarity === 'epic' && card.rarity === 'E') ||
          (rarity === 'legendary' && card.rarity === 'L');
        const tierMatch = tier === null || card.tier === tier;

        return nameMatch && elementMatch && typeMatch && rarityMatch && tierMatch;
      });

      let sorted = [...filtered];

      if (idSort !== null) {
        sorted.sort((a, b) => {
          const aId = parseInt(a.cardNumber) || 0;
          const bId = parseInt(b.cardNumber) || 0;
          return idSort === 'asc' ? aId - bId : bId - aId;
        });
      }

      if (strengthAgilitySort !== null) {
        sorted.sort((a, b) => {
          const aValue = (parseInt(a.strength) || 0) + (parseInt(a.agility) || 0);
          const bValue = (parseInt(b.strength) || 0) + (parseInt(b.agility) || 0);
          return strengthAgilitySort === 'asc' ? aValue - bValue : bValue - aValue;
        });
      }

      setFilteredCards(sorted);
    } catch (err) {
      console.error('Error filtering cards:', err);
      setError('An error occurred while filtering cards. Please try again.');
    }
  }, [cards, searchTerm, element, type, rarity, tier, idSort, strengthAgilitySort]);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'element':
        setElement(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'rarity':
        setRarity(value);
        break;
      case 'tier':
        setTier(value);
        break;
      case 'idSort':
        setIdSort(value);
        setStrengthAgilitySort(null);
        break;
      case 'strengthAgilitySort':
        setStrengthAgilitySort(value);
        setIdSort(null);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setElement('');
    setType('all');
    setIdSort(null);
    setStrengthAgilitySort(null);
    setRarity('all');
    setTier(null);
    setCurrentPage(1);
  };

  const handleCardClick = (card, amount) => {
    if (onCardSelect && card) {
      onCardSelect(card, amount);
    }
  };

  const getCardCount = (cardId) => {
    if (!cardId) return 0;
    const mainDeckCard = deck.mainDeck?.find(c => c.id === cardId);
    const sideDeckCard = deck.sideDeck?.find(c => c.id === cardId);
    return (mainDeckCard?.quantity || 0) + (sideDeckCard?.quantity || 0);
  };

  // Pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-4">
      <FilterOptions 
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentType={type}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentCards.map((card) => (
          <Card 
            key={card.id} 
            className="p-2 hover:shadow-lg transition-shadow duration-200"
          >
            <img 
              src={`/images/cards/${card.id}.webp`} 
              alt={card.name} 
              className="w-full h-auto object-contain mx-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/images/cards/${card.id}.png`;
              }}
            />
            <div className="flex flex-col gap-2 mt-3">
              <Button 
                variant="outline" 
                className="w-full bg-purple-900/50 hover:bg-purple-800/50"
                onClick={() => handleCardClick(card, 1)}
              >
                Add to Deck
              </Button>
              <Link to={`/cards/${card.id}`} className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full bg-yellow-500 hover:bg-yellow-400"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center space-x-2">
        <Button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="self-center">
          {currentPage} / {Math.ceil(filteredCards.length / cardsPerPage)}
        </span>
        <Button 
          onClick={() => setCurrentPage(prev => 
            Math.min(prev + 1, Math.ceil(filteredCards.length / cardsPerPage))
          )} 
          disabled={currentPage === Math.ceil(filteredCards.length / cardsPerPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CardGallery;
