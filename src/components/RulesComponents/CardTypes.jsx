import React from 'react';

const CardTypes = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Card Types</h2>
      <ul className="list-disc list-inside space-y-2">
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CardTypes;