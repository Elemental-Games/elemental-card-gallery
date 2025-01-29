import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import FilterOptions from '@/components/FilterOptions';
import { Link } from 'react-router-dom';

const CardGallery = ({ cards = [], onCardSelect, deck = { mainDeck: [], sideDeck: [] } }) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [strengthAgilitySort, setStrengthAgilitySort] = useState(null);
  const [rarity, setRarity] = useState('all');
  const [tier, setTier] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cardsPerPage = 50;

  const observer = useRef();
  const loadMoreRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayedCards.length < filteredCards.length) {
        loadMoreCards();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, displayedCards.length, filteredCards.length]);

  useEffect(() => {
    try {
      const filtered = cards.filter(card => {
        if (!card || typeof card !== 'object') {
          console.log('Invalid card:', card);
          return false;
        }
        
        const nameMatch = !searchTerm || (card.name && 
          card.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const elementMatch = !element || card.element === element;
        const typeMatch = type === 'all' || card.type === type;
        const rarityMatch = rarity === 'all' || card.rarity === rarity;
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

      console.log('Filtered cards:', filtered.length);
      setFilteredCards(sorted);
      setDisplayedCards(sorted.slice(0, cardsPerPage));
    } catch (err) {
      console.error('Error filtering cards:', err);
      setError('An error occurred while filtering cards. Please try again.');
    }
  }, [cards, searchTerm, element, type, rarity, tier, idSort]);

  const loadMoreCards = () => {
    setLoading(true);
    const currentLength = displayedCards.length;
    const nextBatch = filteredCards.slice(
      currentLength,
      currentLength + cardsPerPage
    );
    
    setDisplayedCards(prev => [...prev, ...nextBatch]);
    setLoading(false);
  };

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
    setDisplayedCards([]);
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
    setDisplayedCards([]);
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
  const currentCards = displayedCards.slice(indexOfFirstCard, indexOfLastCard);

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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

      {/* Infinite scroll trigger element */}
      {displayedCards.length < filteredCards.length && (
        <div 
          ref={loadMoreRef}
          className="h-10 w-full flex justify-center items-center mt-4"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
          ) : (
            <div className="h-8 w-8" /> // Invisible spacer
          )}
        </div>
      )}
    </div>
  );
};

export default CardGallery;
