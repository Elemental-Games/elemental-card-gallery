import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DeckInfoStep from './DeckInfoStep';
import ShieldSelectionStep from './ShieldSelectionStep';
import CardSelectionStep from './CardSelectionStep';

const DeckWizard = () => {
  const [step, setStep] = useState(1);
  const [deckData, setDeckData] = useState({
    name: '',
    description: '',
    shields: {
      tier1: null,
      tier2: null,
      tier3: null
    },
    cards: []
  });

  const steps = [
    {
      title: "Deck Information",
      component: <DeckInfoStep 
        deckData={deckData} 
        setDeckData={setDeckData} 
      />
    },
    {
      title: "Shield Selection",
      component: <ShieldSelectionStep 
        deckData={deckData} 
        setDeckData={setDeckData} 
      />
    },
    {
      title: "Card Selection",
      component: <CardSelectionStep 
        deckData={deckData} 
        setDeckData={setDeckData} 
      />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((s, i) => (
            <div 
              key={i}
              className={`flex items-center ${
                i + 1 === step ? 'text-yellow-400' : 'text-purple-400'
              }`}
            >
              <div className="rounded-full h-8 w-8 flex items-center justify-center border">
                {i + 1}
              </div>
              <span className="ml-2">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {steps[step - 1].component}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => step === steps.length ? handleFinish() : setStep(s => s + 1)}
        >
          {step === steps.length ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default DeckWizard; 