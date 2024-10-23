import React from 'react';
import { Button } from '@/components/ui/button';

const CardOverlay = ({ 
  onConfirm, 
  onCancel, 
  isBlockPrompt = false,
  isDodgePrompt = false,
  blockText = "Block",
  cancelText = "Cancel"
}) => {
  const getPromptText = () => {
    if (isDodgePrompt) return "Dodge Attack?";
    if (isBlockPrompt) return "Block for Flame Ravager?";
    return "Confirm Target?";
  };

  const getConfirmText = () => {
    if (isDodgePrompt) return "Dodge";
    if (isBlockPrompt) return blockText;
    return "Confirm";
  };

  return (
    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-lg">
      <div className="text-white text-center p-4">
        <h3 className="font-semibold mb-2">{getPromptText()}</h3>
        <div className="flex gap-2 justify-center">
          <Button 
            variant="default"
            size="sm"
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600"
          >
            {getConfirmText()}
          </Button>
          <Button 
            variant="secondary"
            size="sm"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardOverlay;