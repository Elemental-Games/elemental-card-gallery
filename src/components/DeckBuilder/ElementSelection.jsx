import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const elements = ['Air', 'Water', 'Earth', 'Fire'];

const ElementSelection = ({ onSelect }) => {
  const [selectedElements, setSelectedElements] = useState([]);

  const toggleElement = (element) => {
    if (selectedElements.includes(element)) {
      setSelectedElements(selectedElements.filter(e => e !== element));
    } else if (selectedElements.length < 2) {
      setSelectedElements([...selectedElements, element]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Select up to 2 elements for your deck</h2>
      <div className="flex space-x-4 mb-4">
        {elements.map(element => (
          <Button
            key={element}
            onClick={() => toggleElement(element)}
            variant={selectedElements.includes(element) ? 'default' : 'outline'}
          >
            {element}
          </Button>
        ))}
      </div>
      <Button
        onClick={() => onSelect(selectedElements)}
        disabled={selectedElements.length === 0}
      >
        Continue
      </Button>
    </div>
  );
};

export default ElementSelection;