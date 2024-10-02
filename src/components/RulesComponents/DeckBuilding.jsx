import React from 'react';

const DeckBuilding = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Deck Building Rules</h2>
      <ul className="list-disc list-inside space-y-2">
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeckBuilding;