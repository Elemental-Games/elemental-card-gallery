import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterOptions = () => {
  return (
    <div className="flex space-x-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Element" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="air">Air</SelectItem>
          <SelectItem value="water">Water</SelectItem>
          <SelectItem value="earth">Earth</SelectItem>
          <SelectItem value="fire">Fire</SelectItem>
          <SelectItem value="combinations">Combinations</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="creature">Creature</SelectItem>
          <SelectItem value="rune">Rune</SelectItem>
          <SelectItem value="counter">Counter</SelectItem>
          <SelectItem value="shield">Shield</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Rarity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="common">Common</SelectItem>
          <SelectItem value="uncommon">Uncommon</SelectItem>
          <SelectItem value="rare">Rare</SelectItem>
          <SelectItem value="epic">Epic</SelectItem>
          <SelectItem value="legendary">Legendary</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterOptions;