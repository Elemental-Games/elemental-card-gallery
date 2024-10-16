import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FilterOptions from '../components/FilterOptions';

/**
 * CardGalleryPage Component
 * 
 * This component displays a gallery of cards with filtering and sorting options.
 * It fetches card data, allows users to filter by various criteria (element, type, rarity),
 * sort cards, and navigate to individual card details.
 * 
 * Key features:
 * - Displays a grid of cards with images and basic information
 * - Provides filter options for refining the displayed cards
 * - Implements sorting functionality for card ID and creature attributes
 * - Uses framer-motion for smooth animations on card hover
 * - Responsive design for various screen sizes
 */
const CardGalleryPage = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [strengthAgilitySort, setStrengthAgilitySort] = useState(null);
  const [rarity, setRarity] = useState('all');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/data/cards.json');
        const data = await response.json();
        setCards(data.cards);
        setFilteredCards(data.cards);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setError('Failed to load cards. Please try again later.');
      }
    };

    fetchCards();
  }, []);

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

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Card Gallery</h1>
      
      <FilterOptions 
        cards={cards}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentType={type}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredCards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/cards/${card.id}`)}
          >
            <Card className="p-4 cursor-pointer">
              <img 
                src={card.image || '/placeholder.svg'}
                alt={card.name} 
                className="w-full h-48 object-contain mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.svg';
                }}
              />
              <h3 className="font-semibold text-lg">{card.name}</h3>
              <p className="text-sm text-gray-600">
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
                <p className="text-sm text-gray-600">
                  STR: {card.strength || 'N/A'} | AGI: {card.agility || 'N/A'}
                </p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardGalleryPage;