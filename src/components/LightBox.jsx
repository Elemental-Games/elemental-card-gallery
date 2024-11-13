import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shuffle } from 'lucide-react';
import EmailSignup from './EmailSignup';

const LightBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cardImages = [
    '/images/cards/nimbus.webp',
    '/images/cards/terra.webp',
    '/images/cards/torrent.webp',
    '/images/cards/ignus.webp'
  ];

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  const shuffleImage = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cardImages.length);
    } while (newIndex === currentImageIndex);
    setCurrentImageIndex(newIndex);
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-[700px] w-[95%] p-4 sm:p-6 bg-background border shadow-lg z-50">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold mb-4 text-center pt-4">
            Stay Updated with Elemental Games
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col items-center justify-center relative">
            <img 
              src={cardImages[currentImageIndex]}
              alt="Featured Card" 
              className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] rounded-lg shadow-lg"
            />
            <Button
              onClick={shuffleImage}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-accent/80 hover:bg-accent text-accent-foreground"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Shuffle Card
            </Button>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-lg font-semibold">
              Don't Miss Out on Exclusive Rewards!
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Sign up now for your chance to win exclusive game content! Every 100th subscriber wins a special prize, and you'll get notified first about our Kickstarter launch and exclusive Elemental Masters updates!
            </p>
            <EmailSignup onClose={handleClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LightBox;