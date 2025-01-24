import ImageModal from '@/components/ui/ImageModal';

const ShieldRules = () => {
  return (
    <div className="bg-purple-950/70 rounded-lg p-6 border border-purple-500/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 id="shield-tiers" className="text-xl text-yellow-500">Shield Tiers</h3>
            <div className="grid gap-4">
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <h4 className="text-lg text-purple-300">Tier I Shield</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>150 Health Points</li>
                  <li>Basic protection</li>
                  <li>Entry-level effects</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <h4 className="text-lg text-purple-300">Tier II Shield</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>300 Health Points</li>
                  <li>Enhanced protection</li>
                  <li>Stronger effects</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <h4 className="text-lg text-purple-300">Tier III Shield</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>450 Health Points</li>
                  <li>Ultimate protection</li>
                  <li>Powerful effects</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 id="shield-mechanics" className="text-xl text-yellow-500">Shield Mechanics</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Health resets to next highest tier threshold at end of turn</li>
              <li>Tier thresholds: 150 → 300 → 450</li>
              <li>Damage carries over between turns if threshold is crossed</li>
              <li>When broken, choose between two effects:</li>
              <ul className="list-circle list-inside space-y-1 ml-8">
                <li>Primary Effect: Generally applicable</li>
                <li>Secondary Effect: Situational power</li>
              </ul>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 id="shield-breaking" className="text-xl text-yellow-500">Shield Breaking Example</h3>
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <p className="mb-2">Scenario with a Tier II Shield (300 HP):</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Shield takes 200 damage (100 HP remaining)</li>
                <li>End of turn: Health resets to Tier I (150 HP)</li>
                <li>Next turn: 150+ damage breaks the shield</li>
                <li>Player chooses one of two shield effects</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start">
          <div className="w-64">
            <ImageModal 
              src="/images/cards/woodland-wall.webp"
              alt="Woodland Wall Shield Example"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShieldRules; 