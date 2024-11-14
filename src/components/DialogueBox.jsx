import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DialogueBox = ({ isOpen, onClose, text, onContinue, onSkip, isLastStep }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-8 left-[200px] md:left-[300px] right-4 pointer-events-auto">
      <div className="relative bg-darkPurple/80 backdrop-blur-sm rounded-lg shadow-xl p-6 text-white">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-2 hover:bg-white/10 rounded-full"
        >
          <X className="h-6 w-6" />
        </button>
        <p className="text-lg mb-6 pr-8">{text}</p>
        <div className="flex justify-end gap-4">
          {!isLastStep ? (
            <>
              <Button 
                variant="outline" 
                onClick={onSkip}
                className="hover:bg-white/10"
              >
                Skip Tour
              </Button>
              <Button 
                onClick={onContinue}
                className="bg-purple-800 hover:bg-purple-700"
              >
                Continue
              </Button>
            </>
          ) : (
            <Button 
              onClick={onSkip}
              className="bg-purple-800 hover:bg-purple-700"
            >
              End Tour
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;