import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterOptions = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Select onValueChange={(value) => handleFilterChange('element', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Element" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Elements</SelectItem>
          {filters.elements.map((element) => (
            <SelectItem key={element} value={element.toLowerCase()}>{element}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange('type', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {filters.types.map((type) => (
            <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange('rarity', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Rarity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rarities</SelectItem>
          {filters.rarities.map((rarity) => (
            <SelectItem key={rarity} value={rarity.toLowerCase()}>{rarity}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange('strength', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Strength" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Strengths</SelectItem>
          <SelectItem value="highest">Highest to Lowest</SelectItem>
          <SelectItem value="lowest">Lowest to Highest</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange('agility', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Agility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Agilities</SelectItem>
          <SelectItem value="highest">Highest to Lowest</SelectItem>
          <SelectItem value="lowest">Lowest to Highest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterOptions;