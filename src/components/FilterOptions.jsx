import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterOptions = ({ cards, onFilterChange, onResetFilters, searchTerm, setSearchTerm, currentType }) => {
  const elements = ['All Elements', 'Air', 'Water', 'Earth', 'Fire', 'Combinational'];
  const types = ['All Types', ...new Set(cards.map(card => card.type))];
  const rarities = ['All Rarities', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

  const [selectedElement, setSelectedElement] = useState('All Elements');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRarity, setSelectedRarity] = useState('All Rarities');
  const [selectedIdSort, setSelectedIdSort] = useState('');
  const [selectedStrengthAgilitySort, setSelectedStrengthAgilitySort] = useState('');

  useEffect(() => {
    if (selectedElement !== 'All Elements' || selectedStrengthAgilitySort !== '') {
      setSelectedType('Creature');
    }
  }, [selectedElement, selectedStrengthAgilitySort]);

  const handleChange = (filterType, value) => {
    console.log(`Changing filter: ${filterType} to ${value}`);
    switch (filterType) {
      case 'element':
        setSelectedElement(value);
        if (value !== 'All Elements') {
          setSelectedType('Creature');
          onFilterChange('type', 'Creature');
        }
        onFilterChange(filterType, value === 'All Elements' ? '' : value);
        break;
      case 'type':
        setSelectedType(value);
        onFilterChange(filterType, value === 'All Types' ? 'all' : value);
        break;
      case 'rarity':
        setSelectedRarity(value);
        onFilterChange(filterType, value === 'All Rarities' ? 'all' : value);
        break;
      case 'idSort':
        setSelectedIdSort(value);
        onFilterChange(filterType, value);
        break;
      case 'strengthAgilitySort':
        setSelectedStrengthAgilitySort(value);
        setSelectedType('Creature');
        onFilterChange('type', 'Creature');
        onFilterChange(filterType, value);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedElement('All Elements');
    setSelectedType('All Types');
    setSelectedRarity('All Rarities');
    setSelectedIdSort('');
    setSelectedStrengthAgilitySort('');
    onResetFilters();
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Select 
        value={selectedElement}
        onValueChange={(value) => handleChange('element', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Element" />
        </SelectTrigger>
        <SelectContent>
          {elements.map((element) => (
            <SelectItem key={element} value={element}>{element}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedType} onValueChange={(value) => handleChange('type', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedRarity} onValueChange={(value) => handleChange('rarity', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Rarities" />
        </SelectTrigger>
        <SelectContent>
          {rarities.map((rarity) => (
            <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedIdSort} onValueChange={(value) => handleChange('idSort', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ID" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Sort by ID</SelectItem>
          <SelectItem value="asc">Lowest to Highest</SelectItem>
          <SelectItem value="desc">Highest to Lowest</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={selectedStrengthAgilitySort}
        onValueChange={(value) => handleChange('strengthAgilitySort', value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Strength/Agility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Sort by Strength/Agility</SelectItem>
          <SelectItem value="strength-asc">Strength (Lowest to Highest)</SelectItem>
          <SelectItem value="strength-desc">Strength (Highest to Lowest)</SelectItem>
          <SelectItem value="agility-asc">Agility (Lowest to Highest)</SelectItem>
          <SelectItem value="agility-desc">Agility (Highest to Lowest)</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleReset}>Reset Filters</Button>
    </div>
  );
};

export default FilterOptions;
