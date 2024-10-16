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
  const elements = [...new Set(cards.map(card => card.element))];
  const types = [...new Set(cards.map(card => card.type))];
  const rarities = [...new Set(cards.map(card => card.rarity))];

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
          <SelectValue placeholder="Element" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Elements</SelectItem>
          {elements.map((element) => (
            <SelectItem key={element} value={element}>{element}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('type', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {types.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('rarity', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Rarity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rarities</SelectItem>
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

      <Select 
        onValueChange={(value) => onFilterChange('strengthAgilitySort', value)}
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