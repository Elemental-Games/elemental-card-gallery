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

const FilterOptions = ({ cards, onFilterChange, onResetFilters, searchTerm, setSearchTerm, currentType }) => {
  const elements = ['All Elements', 'Air', 'Water', 'Earth', 'Fire', 'Combinational'];
  const types = ['All Types', 'Creature', 'Rune', 'Counter', 'Shield'];
  const rarities = ['All Rarities', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

  const handleTypeChange = (value) => {
    const normalizedValue = value === 'All Types' ? 'all' : value;
    onFilterChange('type', normalizedValue);
    
    if (value !== 'Creature' && value !== 'All Types') {
      onFilterChange('element', 'All Elements');
    }
  };

  const handleElementChange = (value) => {
    onFilterChange('element', value);
    if (value !== 'All Elements') {
      onFilterChange('type', 'Creature');
    }
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
        onValueChange={handleElementChange}
        disabled={currentType !== 'Creature' && currentType !== 'all'}
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

      <Select onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('rarity', value.toLowerCase())}>
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

      <Button 
        onClick={onResetFilters}
        variant="outline"
        className="hover:bg-gray-100"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterOptions;