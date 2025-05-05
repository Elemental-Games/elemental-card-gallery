import { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import CardDetailSidebar from '@/components/CardDetailSidebar';
import { getOptimizedCardImage, handleImageError } from '@/utils/imageUtils';

const CardGalleryPage = () => {
  const [cards, setCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const cardsPerPage = 10;
  const loadingRef = useRef(null);

  const [filters, setFilters] = useState({
    element: '',
    type: '',
    rarity: '',
    sortOrder: 'asc' // 'asc' or 'desc' for card number
  });
  const [searchTerm, setSearchTerm] = useState('');

  const elements = ['Earth', 'Water', 'Fire', 'Air', 'Combinational'];
  const types = ['Creature', 'Rune', 'Counter', 'Shield'];
  const rarities = ['C', 'U', 'R', 'E', 'L'];

  const [selectedCard, setSelectedCard] = useState(null);

  // Add a state to track if there are more cards to load
  const [hasMore, setHasMore] = useState(true);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  // Load more cards when page changes
  useEffect(() => {
    const filtered = filterCards();
    const nextCards = filtered.slice(0, page * cardsPerPage);
    setDisplayedCards(nextCards);
    setHasMore(nextCards.length < filtered.length);
  }, [page, filters, searchTerm, cards]);

  // Initial load of cards
  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data/new_cards.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !data.cards) {
          throw new Error('Invalid data format');
        }
        setCards(data.cards);
        // Set initial displayed cards
        const initialCards = data.cards.slice(0, cardsPerPage);
        setDisplayedCards(initialCards);
      } catch (err) {
        console.error('Error loading cards:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  const filterCards = useCallback(() => {
    let filtered = [...cards];

    if (searchTerm) {
      filtered = filtered.filter(card => 
        card.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.element) {
      if (filters.element === 'Combinational') {
        filtered = filtered.filter(card => 
          ['Frost', 'Crystal', 'Poison', 'Sand', 'Lava', 'Lightning'].includes(card.element)
        );
      } else {
        filtered = filtered.filter(card => card.element === filters.element);
      }
      if (!filters.type) setFilters(prev => ({ ...prev, type: 'Creature' }));
    }

    if (filters.type) {
      filtered = filtered.filter(card => card.type === filters.type);
    }

    if (filters.rarity) {
      filtered = filtered.filter(card => card.rarity === filters.rarity);
    }

    filtered.sort((a, b) => {
      return filters.sortOrder === 'asc' 
        ? a.cardNumber - b.cardNumber 
        : b.cardNumber - a.cardNumber;
    });

    return filtered;
  }, [cards, filters, searchTerm]);

  // Update debounce time to 1.15 seconds
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 1150),
    []
  );

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (type === 'element') {
        // When selecting an element, auto-set type to Creature
        newFilters.element = value;
        newFilters.type = 'Creature';
      } else if (type === 'type') {
        // When changing type, if it's not Creature, clear element filter
        newFilters.type = value;
        if (value !== 'Creature') {
          newFilters.element = '';
        }
      } else {
        newFilters[type] = value;
      }
      
      // Reset page when filters change
      setPage(1);
      return newFilters;
    });
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters, searchTerm]);

  // Card component with simplified hover state
  const CardItem = ({ card }) => {
    const [isHovering, setIsHovering] = useState(false);

    // Ensure card name is a string
    const cardName = typeof card.name === 'number' ? `Card ${card.name}` : card.name;

    // Generate the original image path
    const originalImagePath = `/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`;
    // Get the optimized image path for thumbnail size
    const optimizedImagePath = getOptimizedCardImage(originalImagePath, 'thumbnail');

    return (
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setSelectedCard(card)}
        className={`bg-purple-950/70 p-4 rounded-lg border border-purple-500/30
          transition-all duration-300 cursor-pointer
          ${isHovering ? 'shadow-lg shadow-purple-500/30 border-purple-500/50' : ''}`}
      >
        <div className="relative group">
          <img 
            src={optimizedImagePath}
            alt={cardName}
            className="w-full h-auto rounded-lg"
            onError={handleImageError}
          />
          
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <p className="text-white text-center px-4">
                View Card Details
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-2 text-center">
          <h3 className="font-bold text-white">{cardName}</h3>
          <p className="text-sm text-purple-200">
            {card.element} • {card.type} • #{card.cardNumber}
          </p>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Card Gallery</h1>
      
      {/* Filters Section */}
      <div className="mb-8 flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 w-full max-w-[1920px]">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search cards..."
            className={`p-2 rounded-lg font-medium transition-all duration-300
              bg-purple-600/50 text-white border-2 border-purple-400/50 
              placeholder:text-purple-300
              hover:bg-purple-500/50 hover:border-purple-300/50 
              focus:shadow-lg focus:shadow-purple-400/20 focus:outline-none
              focus:bg-purple-500/50 focus:border-purple-300/50
              w-full`}
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          
          {/* Filter Selects */}
          <select
            value={filters.element}
            onChange={(e) => handleFilterChange('element', e.target.value)}
            className="p-2 rounded bg-purple-900/50 text-white border border-purple-500/30 w-full"
          >
            <option value="">All Elements</option>
            {elements.map(element => (
              <option key={element} value={element}>{element}</option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="p-2 rounded bg-purple-900/50 text-white border border-purple-500/30 w-full"
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filters.rarity}
            onChange={(e) => handleFilterChange('rarity', e.target.value)}
            className="p-2 rounded bg-purple-900/50 text-white border border-purple-500/30 w-full"
          >
            <option value="">All Rarities</option>
            {rarities.map(rarity => (
              <option key={rarity} value={rarity}>
                {rarity === 'C' ? 'Common' :
                 rarity === 'U' ? 'Uncommon' :
                 rarity === 'R' ? 'Rare' :
                 rarity === 'E' ? 'Epic' :
                 'Legendary'}
              </option>
            ))}
          </select>

          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            className="p-2 rounded bg-purple-900/50 text-white border border-purple-500/30 w-full"
          >
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={() => {
              setFilters({
                element: '',
                type: '',
                rarity: '',
                sortOrder: 'asc'
              });
              setSearchTerm('');
              setPage(1);
            }}
            className={`p-2 rounded-lg font-medium transition-all duration-300 w-full
              ${(filters.element || filters.type || filters.rarity || searchTerm)
                ? 'bg-purple-600/50 text-white border-2 border-purple-400/50 hover:bg-purple-500/50 hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-400/20'
                : 'bg-purple-900/30 text-purple-400/50 border-2 border-purple-500/20 cursor-not-allowed'
              }`}
            disabled={!filters.element && !filters.type && !filters.rarity && !searchTerm}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Cards Grid - No Animation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayedCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>

      {/* Loading indicator */}
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        </div>
      )}

      {/* Card Detail Sidebar */}
      <CardDetailSidebar
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
};

export default CardGalleryPage;