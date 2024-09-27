import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterOptions = ({ cards, onFilterChange }) => {
  const numbers = [...new Set(cards.map(card => card.cardNumber))].sort((a, b) => a - b);
  const types = [...new Set(cards.map(card => card.type))];
  const elements = [...new Set(cards.map(card => card.element))];
  const rarities = ['C', 'U', 'R', 'E', 'L'];
  const strengths = [...new Set(cards.map(card => card.strength))].sort((a, b) => b - a);
  const agilities = [...new Set(cards.map(card => card.agility))].sort((a, b) => b - a);

  const createFilter = (name, options, placeholder) => (
    <Select onValueChange={(value) => onFilterChange(name.toLowerCase(), value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All {placeholder}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option.toString()}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex flex-wrap gap-4">
      {createFilter('Number', numbers, 'Number')}
      {createFilter('Type', types, 'Type')}
      {createFilter('Element', elements, 'Element')}
      {createFilter('Rarity', rarities, 'Rarity')}
      {createFilter('Strength', strengths, 'Strength')}
      {createFilter('Agility', agilities, 'Agility')}
    </div>
  );
};

export default FilterOptions;