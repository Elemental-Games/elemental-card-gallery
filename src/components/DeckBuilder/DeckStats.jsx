import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DeckStats = ({ deck }) => {
  const elementCounts = deck.reduce((acc, card) => {
    acc[card.element] = (acc[card.element] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(elementCounts).map(([element, count]) => ({
    name: element,
    value: count,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Deck Statistics</h2>
      <p>Total Cards: {deck.length}</p>
      <h3 className="text-xl font-semibold mt-4 mb-2">Element Distribution</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center">
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span>{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckStats;