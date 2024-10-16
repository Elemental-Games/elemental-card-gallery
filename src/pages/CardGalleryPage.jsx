import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CardGalleryPage = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('all');
  const [type, setType] = useState('all');
  const [idSort, setIdSort] = useState(null);
  const [strengthAgilitySort, setStrengthAgilitySort] = useState(null);
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
      (type === 'all' || card.type === type)
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
  }, [searchTerm, element, type, cards, idSort, strengthAgilitySort]);

  const handleSelectChange = (setter) => (value) => {
    setter(value);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setElement('all');
    setType('all');
    setIdSort(null);
    setStrengthAgilitySort(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Card Gallery</h1>
      
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
            <SelectItem value="Combinational">Combinational</SelectItem>
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
              <p className="text-sm text-gray-600">{card.element} | {card.type}</p>
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