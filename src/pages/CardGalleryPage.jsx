import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FilterOptions from '../components/FilterOptions';

const CardGalleryPage = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('all');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [strengthAgilitySort, setStrengthAgilitySort] = useState(null);
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
    let filtered = cards.filter(card => 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (element === 'all' || 
       (element === 'Combinational' ? 
        ['Frost', 'Lava', 'Sand', 'Crystal', 'Poison', 'Lightning'].includes(card.element) : 
        card.element === element)) &&
      (type === 'all' || card.type === type) &&
      (rarity === 'all' || card.rarity === rarity) &&
      (strengthAgilitySort ? card.type === 'Creature' : true)
    );

    filtered.sort((a, b) => {
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

    setFilteredCards(filtered);
  }, [searchTerm, element, type, cards, idSort, strengthAgilitySort, rarity]);

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
      case 'idSort':
        setIdSort(value);
        break;
      case 'strengthAgilitySort':
        setStrengthAgilitySort(value);
        if (value) setType('Creature');
        break;
      default:
        break;
    }
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Card Gallery</h1>
      
      <FilterOptions 
        cards={cards}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
              <p className="text-sm text-gray-600">{card.element} | {card.type} | {card.rarity}</p>
              {strengthAgilitySort && card.type === 'Creature' && (
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
