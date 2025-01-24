const TurnStructureRules = () => {
  return (
    <div className="bg-purple-950/70 rounded-lg p-6 border border-purple-500/30">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl text-yellow-500">1. Draw Phase</h3>
          <p>Draw 1 card from your deck at the start of your turn.</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl text-yellow-500">2. Generation Phase</h3>
          <p>Generate essence based on your creatures on the field.</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl text-yellow-500">3. Main Phase 1</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Normal summon up to 1 creature</li>
            <li>Play or place rune/counter cards</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl text-yellow-500">4. Battle Phase</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use creature actions to attack targets</li>
            <li>Can target opponent's creatures or shields</li>
            <li>Can only target opponent directly if no shields remain</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl text-yellow-500">5. Main Phase 2</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Normal summon if not done in Main Phase 1</li>
            <li>Play additional rune/counter cards</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl text-yellow-500">6. End Phase</h3>
          <p>End your turn and pass to the next player.</p>
        </div>
      </div>
    </div>
  );
};

export default TurnStructureRules; 