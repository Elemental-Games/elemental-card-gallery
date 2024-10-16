import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DeckStats = ({ mainDeck, sideDeck }) => {
  const elementCounts = mainDeck.reduce((acc, card) => {
    if (card.type === 'Creature' && card.element !== undefined) {
      acc[card.element] = (acc[card.element] || 0) + 1;
    }
    return acc;
  }, {});

  const typeCounts = mainDeck.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + 1;
    return acc;
  }, {});

  const elementData = Object.entries(elementCounts).map(([element, count]) => ({
    name: element,
    value: count,
  }));

  const typeData = Object.entries(typeCounts).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

  const renderPieChart = (data, title) => (
    <>
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
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
    </>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Deck Statistics</h2>
      <p>Main Deck: {mainDeck.length} cards</p>
      <p>Side Deck (Shields): {sideDeck.length} cards</p>
      {renderPieChart(typeData, "Card Type Distribution")}
      {renderPieChart(elementData, "Creature Element Distribution")}
    </div>
  );
};

export default DeckStats;