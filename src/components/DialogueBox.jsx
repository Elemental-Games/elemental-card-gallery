import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DialogueBox = ({ isOpen, onClose, text, onContinue, onSkip, isLastStep }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full z-10"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="p-6 pt-12">
          <p className="text-lg mb-6">{text}</p>
          <div className="flex justify-between">
            {!isLastStep ? (
              <Button onClick={onContinue}>Continue</Button>
            ) : (
              <Button onClick={onSkip}>End Tour</Button>
            )}
            {!isLastStep && (
              <Button variant="outline" onClick={onSkip}>
                Skip Tour
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;