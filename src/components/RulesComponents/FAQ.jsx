import React from 'react';

const FAQ = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border-b pb-4">
            <h3 className="font-semibold mb-2">{item.question}</h3>
            <p className="text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;