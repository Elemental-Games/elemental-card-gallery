const Keywords = () => {
  const keywords = [
    {
      id: 'freeze',
      name: 'Freeze',
      description: 'Exhaust target creature(s), making them unable to use their action this turn',
      example: 'When a creature is frozen, rotate it horizontally to show it\'s exhausted'
    },
    {
      id: 'pierce',
      name: 'Pierce',
      description: 'Excess damage continues to the next line of defense',
      example: 'A 200 STR creature with Pierce hitting a 100 STR creature will deal 100 damage to a shield'
    },
    {
      id: 'double-strike',
      name: 'Double Strike',
      description: 'Attack the same target twice in one battle',
      example: 'Useful for breaking through high-health shields or defeating strong creatures'
    },
    {
      id: 'exhaust',
      name: 'Exhaust',
      description: 'Creature loses its action and is turned horizontally',
      example: 'Exhausted creatures cannot attack, block, or dodge until they regain their action'
    }
  ];

  return (
    <div className="bg-purple-950/70 rounded-lg p-6 border border-purple-500/30">
      <div className="grid gap-6">
        {keywords.map((keyword) => (
          <div 
            key={keyword.id}
            id={keyword.id}
            className="p-4 bg-purple-900/30 rounded-lg hover:bg-purple-900/50 transition-colors"
          >
            <h3 className="text-xl text-yellow-500 mb-2">{keyword.name}</h3>
            <p className="mb-2">{keyword.description}</p>
            <p className="text-sm text-purple-300 italic">Example: {keyword.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keywords; 