import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="flex">
    <Input
      type="text"
      placeholder="Search cards..."
      value={value}
      onChange={onChange}
      className="flex-grow mr-2"
    />
    <Button onClick={onSearch}>Search</Button>
  </div>
);

export default SearchBar;