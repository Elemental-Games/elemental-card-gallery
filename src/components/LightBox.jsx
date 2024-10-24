import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import EmailSignup from './EmailSignup';

const LightBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen popup before
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    
    // Only show if they haven't seen it
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Reduced to 1 second for testing
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] p-6 relative">
        <DialogClose asChild>
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-center">
            Updated with Elemental Games
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left Column - Card Image */}
          <div className="flex items-center justify-center h-full">
            <img 
              src="/images/cards/nimbus.png" 
              alt="Nimbus Card" 
              className="w-full h-auto object-contain max-h-[400px] rounded-lg shadow-lg"
            />
          </div>

          {/* Right Column - Subscription Form */}
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-lg font-semibold">
              Stay Up to Date with Elemental Masters
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Be notified when we launch our Kickstarter and get exclusive updates about everything Elemental Masters!
            </p>
            <EmailSignup onClose={handleClose} buttonClassName="bg-yellow-500 hover:bg-yellow-600" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LightBox;