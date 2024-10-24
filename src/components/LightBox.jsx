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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            Stay Updated with Elemental Masters
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="mb-4">
            Subscribe to our newsletter to receive updates about game releases,
            special offers, and exclusive content!
          </p>
          <EmailSignup onClose={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LightBox;