import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterOptions = ({ cards, onFilterChange, onResetFilters, searchTerm, setSearchTerm }) => {
  const elements = ['All Elements', 'Air', 'Water', 'Earth', 'Fire', 'Combinational'];

  const types = ['All Types', ...new Set(cards.map(card => card.type))];
  
  const rarities = ['All Rarities', ...new Set(cards.map(card => {
    if (card.rarity === 'C') return 'Common';
    if (card.rarity === 'U') return 'Uncommon';
    if (card.rarity.trim() === 'R') return 'Rare';
    if (card.rarity === 'E') return 'Epic';
    if (card.rarity === 'L') return 'Legendary';
    return card.rarity;
  }))];

  const [selectedElement, setSelectedElement] = React.useState('All Elements');
  const [selectedType, setSelectedType] = React.useState('All Types');
  const [selectedRarity, setSelectedRarity] = React.useState('All Rarities');
  const [selectedIdSort, setSelectedIdSort] = React.useState('');
  const [selectedStrengthAgilitySort, setSelectedStrengthAgilitySort] = React.useState('');

  const handleReset = () => {
    setSearchTerm('');
    setSelectedElement('All Elements');
    setSelectedType('All Types');
    setSelectedRarity('All Rarities');
    setSelectedIdSort('');
    setSelectedStrengthAgilitySort('');
    onFilterChange('element', 'all');
    onFilterChange('type', 'all');
    onFilterChange('rarity', 'all');
    onFilterChange('idSort', null);
    onFilterChange('strengthAgilitySort', null);
    onResetFilters();
  };

  const handleElementChange = (value) => {
    setSelectedElement(value);
    onFilterChange('element', value === 'All Elements' ? 'all' : value.toLowerCase());
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    onFilterChange('type', value === 'All Types' ? 'all' : value.toLowerCase());
    if (value !== 'Creature' && value !== 'All Types') {
      setSelectedStrengthAgilitySort('');
      onFilterChange('strengthAgilitySort', null);
    }
  };

  const handleRarityChange = (value) => {
    setSelectedRarity(value);
    onFilterChange('rarity', value === 'All Rarities' ? 'all' : value.toLowerCase());
  };

  const handleIdSortChange = (value) => {
    setSelectedIdSort(value);
    onFilterChange('idSort', value);
  };

  const handleStrengthAgilitySortChange = (value) => {
    setSelectedStrengthAgilitySort(value);
    setSelectedType('Creature');
    onFilterChange('strengthAgilitySort', value);
    onFilterChange('type', 'creature');
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
      <Select value={selectedElement} onValueChange={handleElementChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Elements" />
        </SelectTrigger>
        <SelectContent>
          {elements.map((element) => (
            <SelectItem key={element} value={element}>{element}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedType} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedRarity} onValueChange={handleRarityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Rarities" />
        </SelectTrigger>
        <SelectContent>
          {rarities.map((rarity) => (
            <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedIdSort} onValueChange={handleIdSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ID" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Lowest to Highest</SelectItem>
          <SelectItem value="desc">Highest to Lowest</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={selectedStrengthAgilitySort}
        onValueChange={handleStrengthAgilitySortChange}
        disabled={selectedType !== 'Creature' && selectedType !== 'All Types'}
      >
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

      <Button onClick={handleReset}>Reset Filters</Button>
    </div>
  );
};

export default FilterOptions;