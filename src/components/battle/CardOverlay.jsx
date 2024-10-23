import React from 'react';
import { Button } from '@/components/ui/button';

const CardOverlay = ({ 
  onConfirm, 
  onCancel, 
  isBlockPrompt = false,
  blockText = "Block",
  cancelText = "Cancel"
}) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-lg">
      <div className="text-white text-center p-4">
        <h3 className="font-semibold mb-2">
          {isBlockPrompt ? 'Blocking Decision' : 'Confirm Target?'}
        </h3>
        <div className="flex gap-2 justify-center">
          <Button 
            variant="default"
            size="sm"
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600"
          >
            {isBlockPrompt ? blockText : 'Confirm'}
          </Button>
          <Button 
            variant="secondary"
            size="sm"
            onClick={onCancel}
          >
            {isBlockPrompt ? cancelText : 'Cancel'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardOverlay;