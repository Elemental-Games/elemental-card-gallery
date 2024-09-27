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
    <div className="bg-purple-900 p-8 rounded-lg text-purple-100">
      <h2 className="text-2xl font-bold mb-4">Select up to 2 elements for your deck</h2>
      <div className="flex space-x-4 mb-4">
        {elements.map(element => (
          <Button
            key={element}
            onClick={() => toggleElement(element)}
            variant={selectedElements.includes(element) ? 'default' : 'outline'}
            className={selectedElements.includes(element) ? 'bg-purple-500 hover:bg-purple-600' : 'text-purple-100 border-purple-100'}
          >
            {element}
          </Button>
        ))}
      </div>
      <Button
        onClick={() => onSelect(selectedElements)}
        disabled={selectedElements.length === 0}
        className="bg-purple-500 hover:bg-purple-600"
      >
        Continue
      </Button>
    </div>
  );
};

export default ElementSelection;