import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Button from '../atoms/Button';

const FilterOptions = ({ onFilterChange, onResetFilters }) => {
  const elements = ['All Elements', 'Air', 'Water', 'Earth', 'Fire', 'Combinational'];
  const types = ['All Types', 'Creature', 'Rune', 'Counter', 'Shield'];
  const rarities = ['All Rarities', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Select onValueChange={(value) => onFilterChange('element', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Element" />
        </SelectTrigger>
        <SelectContent>
          {elements.map((element) => (
            <SelectItem key={element} value={element}>{element}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('type', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('rarity', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Rarities" />
        </SelectTrigger>
        <SelectContent>
          {rarities.map((rarity) => (
            <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
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

      <Select onValueChange={(value) => onFilterChange('strengthAgilitySort', value)}>
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