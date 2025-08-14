import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
        setCard(fullCard || initialCard);
      } catch (error) {
        console.error('Error loading card data:', error);
        setCard(initialCard);
      }
    };

    fetchCardData();
  }, [initialCard]);

  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-[#1A103C] border-l border-purple-500/30 text-white p-6 z-50 shadow-lg flex flex-col"
          >
              <button
                onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
              <X size={24} />
              </button>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400 text-center">{card.name}</h2>
            <div className="w-full max-w-[200px] mx-auto mb-6">
                <img
                src={card.imagePath || card.image}
                  alt={card.name}
                className="w-full h-full object-contain rounded-lg"
                />
            </div>

            <div className="flex-grow overflow-y-auto pr-4 -mr-4 text-gray-300 space-y-4">
              <div className="bg-purple-900/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-500 mb-2">Key Info</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><strong className="font-semibold text-gray-400">Type:</strong> {card.type}</p>
                  <p><strong className="font-semibold text-gray-400">Element:</strong> {card.element}</p>
                  <p><strong className="font-semibold text-gray-400">Rarity:</strong> {card.rarity}</p>
                  <p><strong className="font-semibold text-gray-400">Card #:</strong> {card.cardNumber}</p>
                </div>
                </div>

              {card.stats && (
                <div className="bg-purple-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">Stats</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong className="font-semibold text-gray-400">Strength:</strong> {card.stats.strength}</p>
                    <p><strong className="font-semibold text-gray-400">Agility:</strong> {card.stats.agility}</p>
                    </div>
                  </div>
                )}

                {card.ability && (
                <div className="bg-purple-900/50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">{card.ability.name}</h3>
                  <p className="text-sm">{card.ability.description}</p>
                  </div>
                )}
            </div>

            <div className="mt-auto pt-4 flex flex-col space-y-3">
               <Link
                to={`/cards/${card.id}`}
                className="w-full text-center bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-colors"
              >
                View Full Card Page
            </Link>
              <button
                onClick={onClose}
                className="w-full text-center bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CardDetailSidebar; 