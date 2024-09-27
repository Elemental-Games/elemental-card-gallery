import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CardGallery = ({ cards, onCardSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('all');
  const [type, setType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (element === 'all' || card.element === element) &&
    (type === 'all' || card.type === type)
  );

  const pageCount = Math.ceil(filteredCards.length / cardsPerPage);
  const displayedCards = filteredCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  return (
    <div className="mt-4">
      <div className="mb-4 flex space-x-4">
        <Input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={element} onValueChange={setElement}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Element" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Elements</SelectItem>
            <SelectItem value="Fire">Fire</SelectItem>
            <SelectItem value="Water">Water</SelectItem>
            <SelectItem value="Earth">Earth</SelectItem>
            <SelectItem value="Air">Air</SelectItem>
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Creature">Creature</SelectItem>
            <SelectItem value="Spell">Spell</SelectItem>
            <SelectItem value="Shield">Shield</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {displayedCards.map((card) => (
          <Card key={card.id} className="p-2 cursor-pointer" onClick={() => onCardSelect(card)}>
            <img src={card.image} alt={card.name} className="w-full h-auto" />
            <p className="text-center mt-2">{card.name}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="self-center">{currentPage} / {pageCount}</span>
        <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CardGallery;