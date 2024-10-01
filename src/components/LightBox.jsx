import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const LightBox = ({ cardImage, onClose }) => {
  const [email, setEmail] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setShowThankYou(true);
  };

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        setShowThankYou(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showThankYou, onClose]);

  if (user) {
    return null; // Don't show the lightbox for signed-in users
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <AnimatePresence>
        {!showThankYou && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-popover p-8 rounded-lg max-w-4xl w-full relative border-4 border-accent"
          >
            <Button
              onClick={onClose}
              variant="ghost"
              className="absolute top-2 right-2 text-primary hover:bg-primary/10"
            >
              <X size={24} />
            </Button>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4 text-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">Get the Latest News & Announcements to your Inbox</h2>
                <p className="text-xl mb-6 text-primary">Gain access to all website features and stay up-to-date on our progress</p>
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-primary w-full"
                  />
                  <Button type="submit" className="w-full bg-accent text-primary hover:bg-accent/90">Sign Up</Button>
                </form>
              </div>
              <div className="md:w-1/2">
                <img src={cardImage} alt="Card of the Week" className="w-full h-auto rounded shadow-lg" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-yellow-300 p-8 rounded-lg shadow-lg max-w-4xl w-full flex items-center justify-center"
            style={{ height: '400px' }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-800">Thanks for signing up!</p>
              <p className="text-xl text-yellow-800 mt-4">You're now one step closer to being an Elemental Master</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LightBox;