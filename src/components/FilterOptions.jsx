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
  const types = ['All Types', ...new Set(cards.map(card => card.type))];
  const rarities = ['All Rarities', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const tiers = ['All Tiers', 'Tier I', 'Tier II', 'Tier III'];

  const handleChange = (filterType, value) => {
    console.log(`Changing filter: ${filterType} to ${value}`);
    onFilterChange(filterType, value);
  };

  const showStrengthAgilitySort = currentType.toLowerCase() === 'creature' || currentType === 'all';
  const showTierFilter = currentType.toLowerCase() === 'shield';

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
        onValueChange={(value) => handleChange('element', value)}
        disabled={currentType.toLowerCase() !== 'creature' && currentType !== 'all'}
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

      <Select onValueChange={(value) => handleChange('type', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleChange('rarity', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Rarities" />
        </SelectTrigger>
        <SelectContent>
          {rarities.map((rarity) => (
            <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleChange('idSort', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ID" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Lowest to Highest</SelectItem>
          <SelectItem value="desc">Highest to Lowest</SelectItem>
        </SelectContent>
      </Select>

      {showStrengthAgilitySort && (
        <Select 
          onValueChange={(value) => handleChange('strengthAgilitySort', value)}
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
      )}

      {showTierFilter && (
        <Select onValueChange={(value) => handleChange('tier', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Tiers" />
          </SelectTrigger>
          <SelectContent>
            {tiers.map((tier) => (
              <SelectItem key={tier} value={tier}>{tier}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Button onClick={onResetFilters}>Reset Filters</Button>
    </div>
  );
};

export default FilterOptions;