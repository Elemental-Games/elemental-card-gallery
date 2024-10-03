import React from 'react';
import { Button } from '@/components/ui/button';

const DialogueBox = ({ text, onContinue, onSkip, isLastStep }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-purple-900 bg-opacity-90 p-4 rounded-lg shadow-lg" style={{ maxWidth: '80%', margin: '0 auto' }}>
      <p className="text-lg text-purple-200 mb-4">{text}</p>
      <div className="flex justify-end space-x-4">
        {!isLastStep && (
          <Button 
            onClick={onContinue}
            className="bg-purple-700 text-purple-200 hover:bg-purple-600"
          >
            Continue
          </Button>
        )}
        <Button 
          onClick={onSkip}
          className="bg-purple-700 text-purple-200 hover:bg-purple-600"
        >
          {isLastStep ? "Finish" : "Skip Tour"}
        </Button>
      </div>
    </div>
  );
};

export default DialogueBox;