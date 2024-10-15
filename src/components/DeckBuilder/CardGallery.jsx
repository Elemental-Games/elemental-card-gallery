import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CardGallery = ({ onCardSelect }) => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [element, setElement] = useState('all');
  const [type, setType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const cardsPerPage = 8;

  useEffect(() => {
    fetch('/storage/cards.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCards(data))
      .catch(error => {
        console.error('Error fetching cards:', error);
        setError('Error loading cards. Please try again later.');
      });
  }, []);

  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (element === 'all' || card.element === element) &&
    (type === 'all' || card.type === type)
  );

  const pageCount = Math.ceil(filteredCards.length / cardsPerPage);
  const displayedCards = filteredCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

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
            <img 
              src={card.image} 
              alt={card.name} 
              className="w-full h-auto object-contain mx-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.svg';
              }}
            />
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