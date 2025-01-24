const ElementRules = () => {
  return (
    <div className="bg-purple-950/70 rounded-lg p-6 border border-purple-500/30">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 id="element-overview" className="text-xl text-yellow-500">Element Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <h4 className="text-lg text-sky-400">Air</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Fastest creatures but lowest strength</li>
                <li>Tactical, reactive playstyle</li>
                <li>Synergizes well with counter cards</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <h4 className="text-lg text-blue-400">Water</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Third strongest, second fastest</li>
                <li>Card manipulation and deck control</li>
                <li>Strong search and draw effects</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <h4 className="text-lg text-red-400">Fire</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Second strongest, third fastest</li>
                <li>Direct damage capabilities</li>
                <li>Essence depletion effects</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <h4 className="text-lg text-green-400">Earth</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Strongest creatures but slowest</li>
                <li>Consistent essence generation</li>
                <li>Powerful beatdown strategy</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 id="essence-system" className="text-xl text-yellow-500">Essence System</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Maximum 20 essence per element (80 total)</li>
            <li>Basic creatures (no ability): Generate 1 essence per turn</li>
            <li>Effect creatures (no cost): Generate 2 essence per turn</li>
            <li>Essence costs are one-time for normal summons</li>
            <li>Special summons typically bypass essence costs</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 id="elemental-dragons" className="text-xl text-yellow-500">Elemental Dragons</h3>
          <p className="mb-4">Powerful creatures that combine two elements:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <ul className="list-disc list-inside space-y-2">
                <li>Frost Dragon (Air + Water)</li>
                <li>Lightning Dragon (Air + Fire)</li>
                <li>Sand Dragon (Air + Earth)</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <ul className="list-disc list-inside space-y-2">
                <li>Poison Dragon (Water + Fire)</li>
                <li>Crystal Dragon (Water + Earth)</li>
                <li>Lava Dragon (Fire + Earth)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementRules; 