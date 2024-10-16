import React from 'react';
import SearchBar from '../molecules/SearchBar';
import CardGrid from '../organisms/CardGrid';
import FilterOptions from '../organisms/FilterOptions';

const CardGalleryTemplate = ({ cards, searchTerm, setSearchTerm, onSearch, onFilterChange, onResetFilters }) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8">Card Gallery</h1>
    <SearchBar value={searchTerm} onChange={setSearchTerm} onSearch={onSearch} />
    <FilterOptions onFilterChange={onFilterChange} onResetFilters={onResetFilters} />
    <CardGrid cards={cards} />
  </div>
);

export default CardGalleryTemplate;