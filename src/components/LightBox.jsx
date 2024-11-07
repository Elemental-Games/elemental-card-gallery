import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from 'lucide-react';

// Mock EmailSignup component for demonstration
const EmailSignup = ({ onClose }) => (
  <div className="space-y-4">
    <input 
      type="email" 
      placeholder="Enter your email" 
      className="w-full p-2 border rounded"
    />
    <button 
      onClick={onClose}
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    >
      Sign Up
    </button>
  </div>
);

const LightBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window !== 'undefined') {
      const hasSeenPopup = localStorage.getItem('hasSeenPopup');
      
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 2500);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasSeenPopup', 'true');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] w-[95%] p-4 sm:p-6 relative bg-white dark:bg-gray-800">
        <DialogClose className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
          <X className="h-8 w-8" />
          <span className="sr-only">Close</span>
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
            <p className="text-gray-500 text-sm mb-4">
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