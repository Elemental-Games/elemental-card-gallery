import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FilterOptions = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [element, setElement] = useState('all');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onFilterChange({ searchQuery: e.target.value, element });
  };

  const handleElementChange = (value) => {
    setElement(value);
    onFilterChange({ searchQuery, element: value });
  };

  return (
    <div className="flex justify-center gap-4 mb-8">
      <Input
        type="text"
        placeholder="Search by card name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="max-w-xs bg-gray-800 border-gray-700 text-white"
      />
      <Select onValueChange={handleElementChange} defaultValue="all">
        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
          <SelectValue placeholder="Filter by element" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Elements</SelectItem>
          <SelectItem value="Air">Air</SelectItem>
          <SelectItem value="Earth">Earth</SelectItem>
          <SelectItem value="Fire">Fire</SelectItem>
          <SelectItem value="Water">Water</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterOptions;