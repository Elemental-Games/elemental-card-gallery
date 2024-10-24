import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EmailSignup from './EmailSignup';

const LightBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-center">
            Updated with Elemental Games
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
          {/* Left Column - Card Image */}
          <div className="flex items-center justify-center">
            <img 
              src="/images/cards/ancient-winds.png" 
              alt="Air Titan Card" 
              className="w-full max-w-[250px] rounded-lg shadow-lg"
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
            <EmailSignup onClose={handleClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LightBox;