const SetupRules = () => {
  return (
    <div className="bg-purple-950/70 rounded-lg p-6 border border-purple-500/30">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 id="deck-building" className="text-xl text-yellow-500">Deck Building</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Minimum 40 cards in deck</li>
            <li>Maximum 3 copies of any card</li>
            <li>No maximum deck size</li>
            <li>Can mix elements freely</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 id="initial-setup" className="text-xl text-yellow-500">Initial Setup</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Each player starts with:</li>
            <ul className="list-circle list-inside space-y-1 ml-8">
              <li>5 cards in hand</li>
              <li>3 shield cards (Tier I, II, and III)</li>
              <li>2000 life points</li>
            </ul>
            <li>Decide first player randomly</li>
            <li>First player does not draw on their first turn</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SetupRules; 