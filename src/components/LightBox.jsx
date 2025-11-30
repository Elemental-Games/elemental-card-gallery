import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shuffle, ShoppingBag, Star } from 'lucide-react';

const LightBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
    '/images/products/demopack1.png',
    '/images/products/crystaldemo1.png',
    '/images/products/lightningdemo1.png',
    '/images/products/dumoledemo1.png',
    '/images/products/guardiandemo1.png'
  ];

  useEffect(() => {
    const hasSeenLightbox = localStorage.getItem('hasSeenLightbox');
    
    if (!hasSeenLightbox) {
      setIsOpen(true);
      localStorage.setItem('hasSeenLightbox', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenLightbox', 'true');
  };

  const shuffleImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  if (!isOpen) return null;

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] max-h-[90vh] overflow-y-auto sm:max-w-[700px] p-4 sm:p-6 bg-background border shadow-lg z-50">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold mb-4 text-center pt-4">
            Demo Day Edition Available Now!
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col items-center justify-center relative">
            <img 
              src={productImages[currentImageIndex]}
              alt="Demo Day Edition Product" 
              className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] rounded-lg shadow-lg mb-4"
            />
            <Button
              onClick={shuffleImage}
              className="bg-purple-800 hover:bg-purple-700 text-white w-full max-w-[200px] transition-colors duration-300"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              View More Products
            </Button>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold">
                Limited Edition Products
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Get your hands on exclusive Demo Day Edition decks, boosters, and game mats while supplies last! Every $25+ order includes a bonus wheel spin to win free packs, mats, decks, or discounts.
            </p>
            <div className="space-y-3">
              <Link to="/shop" onClick={handleClose}>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg transition-all duration-300 hover:scale-105">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Demo Day Edition
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground text-center">
                Free shipping on orders $50+ • Wheel spin on orders $25+
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LightBox;