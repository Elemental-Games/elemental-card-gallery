import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getOptimizedCardImage, handleImageError } from '@/utils/imageUtils';

const CardDetailSidebar = ({ card: initialCard, isOpen, onClose }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      if (!initialCard) return;
      
      try {
        const response = await fetch('/data/new_cards.json');
        if (!response.ok) throw new Error('Failed to load card data');
        
        const data = await response.json();
        const fullCard = data.cards.find(c => c.id === initialCard.id);
        if (fullCard) {
          setCard(fullCard);
        } else {
          setCard(initialCard);
        }
      } catch (error) {
        console.error('Error loading card data:', error);
        setCard(initialCard);
      }
    };

    fetchCardData();
  }, [initialCard]);

  if (!card) return null;

  // Generate the original image path
  const originalImagePath = card.webpPath || `/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`;
  // Get the optimized image path for large size
  const optimizedImagePath = getOptimizedCardImage(originalImagePath, 'large');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#1A103C] border-l border-purple-500/30 
              overflow-y-auto z-50 p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold text-yellow-400">{card.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-purple-800/50 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-purple-200" />
              </button>
            </div>

            {/* Card Image */}
            <div className="flex justify-center mb-6">
              <div className="w-[300px]">
                <img
                  src={optimizedImagePath}
                  alt={card.name}
                  className="rounded-lg shadow-lg w-full"
                  onError={handleImageError}
                />
              </div>
            </div>

            {/* Card Details */}
            <div className="bg-purple-950/70 p-8 rounded-lg border border-purple-500/30 mb-6">
              <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400">Type</h3>
                  <p className="text-xl text-white mt-2">{card.type}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-yellow-400">Element</h3>
                  <p className="text-xl text-white mt-2">{card.element}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-yellow-400">Rarity</h3>
                  <p className="text-xl text-white mt-2">{
                    card.rarity === 'C' ? 'Common' :
                    card.rarity === 'U' ? 'Uncommon' :
                    card.rarity === 'R' ? 'Rare' :
                    card.rarity === 'E' ? 'Epic' :
                    card.rarity === 'L' ? 'Legendary' :
                    card.rarity
                  }</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-yellow-400">Card Number</h3>
                  <p className="text-xl text-white mt-2">#{card.cardNumber}</p>
                </div>

                {card.type === 'Creature' && card.stats && (
                  <div className="col-span-2">
                    <h3 className="text-2xl font-bold text-yellow-400">Stats</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-xl text-white">Strength: {card.stats.strength}</p>
                      <p className="text-xl text-white">Agility: {card.stats.agility}</p>
                    </div>
                  </div>
                )}

                {card.ability && (
                  <div className="col-span-2">
                    <h3 className="text-2xl font-bold text-yellow-400">Ability</h3>
                    {typeof card.ability === 'object' ? (
                      <>
                        <p className="text-xl text-white mt-2 font-bold">{card.ability.name}</p>
                        <p className="text-xl text-white mt-1">{card.ability.description}</p>
                      </>
                    ) : (
                      <p className="text-xl text-white mt-2">{card.ability}</p>
                    )}
                  </div>
                )}

                {card.essence && (
                  <div className="col-span-2">
                    <h3 className="text-2xl font-bold text-yellow-400">Essence</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-xl text-white">Cost: {card.essence.cost.amount} {card.essence.cost.element}</p>
                      <p className="text-xl text-white">Generation: {card.essence.generation.amount} {card.essence.generation.element}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* View Full Page Button */}
            <Link to={`/cards/${card.id}`} className="block w-full">
              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 text-xl font-bold py-6"
              >
                View Full Page
              </Button>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CardDetailSidebar; 