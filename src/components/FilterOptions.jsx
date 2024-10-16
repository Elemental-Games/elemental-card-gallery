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
  const elements = ['All', ...new Set(cards.map(card => 
    ['Frost', 'Lightning', 'Lava', 'Crystal', 'Sand', 'Poison'].includes(card.element) 
      ? 'Combinational' 
      : card.element
  ))].filter(Boolean);

  const types = ['All', ...new Set(cards.map(card => card.type))];
  
  const rarities = ['All', ...new Set(cards.map(card => {
    if (card.rarity === 'C') return 'Common';
    if (card.rarity === 'U') return 'Uncommon';
    if (card.rarity.trim() === 'R') return 'Rare';
    if (card.rarity === 'E') return 'Epic';
    if (card.rarity === 'L') return 'Legendary';
    return card.rarity;
  }))];

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Select onValueChange={(value) => onFilterChange('element', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Elements" />
        </SelectTrigger>
        <SelectContent>
          {elements.map((element) => (
            <SelectItem key={element} value={element.toLowerCase()}>{element}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('type', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('rarity', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Rarities" />
        </SelectTrigger>
        <SelectContent>
          {rarities.map((rarity) => (
            <SelectItem key={rarity} value={rarity.toLowerCase()}>{rarity}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('idSort', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ID" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Lowest to Highest</SelectItem>
          <SelectItem value="desc">Highest to Lowest</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        onValueChange={(value) => {
          onFilterChange('strengthAgilitySort', value);
          onFilterChange('type', 'creature');
        }}
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

      <Button onClick={onResetFilters}>Reset Filters</Button>
    </div>
  );
};

export default FilterOptions;