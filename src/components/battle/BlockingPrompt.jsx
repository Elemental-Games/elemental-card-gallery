import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const BlockingPrompt = ({ isOpen, onBlock, onDecline }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Blocking Opportunity</AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to block for Flame Ravager with Cloud Sprinter?
            Cloud Sprinter will deal 75 damage to Glacis before being destroyed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDecline}>Don't Block</AlertDialogCancel>
          <AlertDialogAction onClick={onBlock}>Block Attack</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BlockingPrompt;