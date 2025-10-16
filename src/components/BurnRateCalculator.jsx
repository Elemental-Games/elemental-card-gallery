import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BurnRateCalculator = () => {
  const [costs, setCosts] = useState({
    marketing: 10000,
    inventory: 4166,
    salary: 4000,
    other: 2250,
  });

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    setCosts(prevCosts => ({
      ...prevCosts,
      [name]: Number(value)
    }));
  };

  const monthlyBurn = useMemo(() => {
    return Object.values(costs).reduce((acc, cost) => acc + cost, 0);
  }, [costs]);

  const runway = (fundingAmount) => {
    if (monthlyBurn === 0) return 0;
    return (fundingAmount / monthlyBurn).toFixed(1);
  };

  const fundingGoal = 250000;

  return (
    <div id="financials" className="p-8 border border-gray-700 rounded-lg bg-gray-800 shadow-lg scroll-mt-20">
      <h2 className="text-3xl font-bold mb-4">Financial Projections & Use of Funds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Monthly Burn Rate</h3>
          <div className="space-y-4">
            {Object.keys(costs).map(key => (
              <div key={key} className="flex items-center space-x-4">
                <Label htmlFor={key} className="capitalize w-32 text-lg">{key}</Label>
                <Input
                  type="number"
                  id={key}
                  name={key}
                  value={costs[key]}
                  onChange={handleCostChange}
                  className="max-w-xs"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-2xl font-bold">
            Total Monthly Burn: ${monthlyBurn.toLocaleString()}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Runway Analysis</h3>
          <p className="text-lg text-gray-300">
            Based on a funding goal of <span className="font-bold text-green-400">${fundingGoal.toLocaleString()}</span>, these projections show how long that capital would last. Investors can adjust the monthly costs to see different runway scenarios.
          </p>
          <div className="mt-6 text-4xl font-extrabold text-green-400">
            {runway(fundingGoal)}
          </div>
          <div className="text-lg text-gray-400">months of runway</div>
        </div>
      </div>
    </div>
  );
};

export default BurnRateCalculator;
