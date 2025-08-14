import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FilterOptions = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    element: 'all',
    type: 'all',
    sort: 'asc',
  });

  const handleChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <Input
          type="text"
          placeholder="Search by card name..."
          value={filters.searchQuery}
          onChange={(e) => handleChange('searchQuery', e.target.value)}
          className="relative max-w-xs bg-gray-900 border-gray-700 text-white"
        />
      </div>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <Select onValueChange={(value) => handleChange('element', value)} defaultValue="all">
          <SelectTrigger className="relative w-[180px] bg-gray-900 border-gray-700 text-white">
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
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <Select onValueChange={(value) => handleChange('type', value)} defaultValue="all">
          <SelectTrigger className="relative w-[180px] bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Creature">Creature</SelectItem>
            <SelectItem value="Rune">Rune</SelectItem>
            <SelectItem value="Counter">Counter</SelectItem>
            <SelectItem value="Shield">Shield</SelectItem>
        </SelectContent>
      </Select>
      </div>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <Select onValueChange={(value) => handleChange('sort', value)} defaultValue="asc">
          <SelectTrigger className="relative w-[180px] bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Sort by #" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="asc">Card #: Low to High</SelectItem>
            <SelectItem value="desc">Card #: High to Low</SelectItem>
        </SelectContent>
      </Select>
      </div>
    </div>
  );
};

export default FilterOptions;