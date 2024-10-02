import React from 'react';

const QuickStart = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
      <ol className="list-decimal list-inside space-y-2">
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

export default QuickStart;