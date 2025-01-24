import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const BattleRules = () => {
  const [battleStep, setBattleStep] = useState(0);
  const [showBattle, setShowBattle] = useState(false);

  const battleSteps = [
    {
      text: "Aqua Dart (80 STR/120 AGI) attacks first due to higher agility",
      damage: "80 damage to Flamekeeper"
    },
    {
      text: "Flamekeeper (100 STR/90 AGI) survives with 20 HP",
      damage: "Flamekeeper HP: 100 → 20"
    },
    {
      text: "Flamekeeper counterattacks",
      damage: "100 damage to Aqua Dart"
    },
    {
      text: "Aqua Dart is destroyed (80 HP - 100 damage)",
      damage: "Battle Complete"
    }
  ];

  return (
    <div className="bg-purple-950/70 rounded-lg p-6 border border-purple-500/30">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 id="creature-actions" className="text-xl text-yellow-500">Creature Actions</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Vertical position: Creature has an available action</li>
            <li>Horizontal position: Creature is exhausted (no action)</li>
            <li>Actions can be used to: Attack, Block, or Dodge</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 id="combat-stats" className="text-xl text-yellow-500">Combat Stats</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Strength (STR): Determines damage dealt and creature health</li>
            <li>Agility (AGI): Determines attack order in battle</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 id="battle-resolution" className="text-xl text-yellow-500">Battle Resolution</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Higher agility creature attacks first</li>
            <li>Damage equal to strength is dealt to the opposing creature</li>
            <li>If a creature's health reaches 0, it is destroyed</li>
            <li>Surviving creatures deal their damage second</li>
          </ul>
        </div>

        <div id="battle-example" className="mt-8 space-y-4">
          <Button 
            onClick={() => {
              setShowBattle(!showBattle);
              setBattleStep(0);
            }}
            className="w-full bg-purple-700 hover:bg-purple-600"
          >
            {showBattle ? "Hide Battle Example" : "Show Battle Example"}
          </Button>

          <AnimatePresence>
            {showBattle && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-purple-900/30 rounded-lg p-4"
              >
                <div className="flex justify-between mb-4">
                  <div className="relative w-48">
                    <img 
                      src="/images/cards/aqua-dart.webp" 
                      alt="Aqua Dart"
                      className="rounded-lg"
                    />
                    {battleStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-red-500/30 rounded-lg flex items-center justify-center"
                      >
                        <span className="text-2xl font-bold text-white">DESTROYED</span>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <motion.div
                      animate={{ x: battleStep >= 1 ? 0 : -50 }}
                      className="text-3xl font-bold text-yellow-500"
                    >
                      {battleStep >= 1 ? "⚔️" : "→"}
                    </motion.div>
                  </div>

                  <div className="relative w-48">
                    <img 
                      src="/images/cards/flamekeeper.webp" 
                      alt="Flamekeeper"
                      className="rounded-lg"
                    />
                    {battleStep >= 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-0 left-0 right-0 bg-red-500/30 p-2 text-center"
                      >
                        <span className="text-white font-bold">HP: 20</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <p className="text-lg">{battleSteps[battleStep].text}</p>
                  <p className="text-yellow-500 font-bold">{battleSteps[battleStep].damage}</p>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setBattleStep(Math.max(0, battleStep - 1))}
                    disabled={battleStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setBattleStep(Math.min(battleSteps.length - 1, battleStep + 1))}
                    disabled={battleStep === battleSteps.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BattleRules; 