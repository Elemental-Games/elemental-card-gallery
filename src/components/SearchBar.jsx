import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search cards..."
        className="pl-10 pr-4 py-2 w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;