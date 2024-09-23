import React from 'react';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import CardGallery from '../components/CardGallery';

const CardsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Elemental Masters Cards</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="mb-8">
        <FilterOptions />
      </div>
      <CardGallery />
    </div>
  );
};

export default CardsPage;