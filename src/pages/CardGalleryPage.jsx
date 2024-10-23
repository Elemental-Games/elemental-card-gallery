import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FilterOptions from '../components/FilterOptions';

const CardGalleryPage = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('All Elements');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [rarity, setRarity] = useState('all');
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
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const filtered = cards.filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const elementMatch = element === 'All Elements' || card.element === element;
      const typeMatch = type === 'all' || card.type === type;
      const rarityMatch = rarity === 'all' ||
        (rarity === 'common' && card.rarity === 'C') ||
        (rarity === 'uncommon' && card.rarity === 'U') ||
        (rarity === 'rare' && card.rarity.trim() === 'R') ||
        (rarity === 'epic' && card.rarity === 'E') ||
        (rarity === 'legendary' && card.rarity === 'L');

      return nameMatch && elementMatch && typeMatch && rarityMatch;
    });

    if (idSort) {
      filtered.sort((a, b) => {
        return idSort === 'asc' ? a.cardNumber - b.cardNumber : b.cardNumber - a.cardNumber;
      });
    }

    setFilteredCards(filtered);
  }, [searchTerm, element, type, cards, idSort, rarity]);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'element':
        setElement(value);
        break;
      case 'type':
        setType(value.toLowerCase());
        break;
      case 'rarity':
        setRarity(value.toLowerCase());
        break;
      case 'idSort':
        setIdSort(value);
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setElement('All Elements');
    setType('all');
    setIdSort(null);
    setRarity('all');
  };

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