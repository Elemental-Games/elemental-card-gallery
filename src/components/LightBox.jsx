import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import EmailSignup from './EmailSignup';

const LightBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically reset hasSeenPopup on each page load
    localStorage.removeItem('hasSeenPopup');
    
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    console.log('Initial hasSeenPopup value:', hasSeenPopup);
    
    console.log('Setting timeout for popup...');
    const timer = setTimeout(() => {
      console.log('Timeout triggered, setting isOpen to true');
      setIsOpen(true);
    }, 2500);
    
    return () => {
      console.log('Cleaning up timer');
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    console.log('Closing popup and setting localStorage');
    setIsOpen(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-[700px] w-[95%] p-4 sm:p-6 bg-background border shadow-lg z-50">
        <DialogClose asChild>
          <button 
            className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
            onClick={handleClose}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold mb-4 text-center pt-4">
            Stay Updated with Elemental Games
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex items-center justify-center">
            <img 
              src="/images/cards/nimbus.png"
              alt="Nimbus Card" 
              className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-lg font-semibold">
              Stay Up to Date with Elemental Games
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Be notified when we launch our Kickstarter and get exclusive updates about everything Elemental Masters!
            </p>
            <EmailSignup onClose={handleClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LightBox;