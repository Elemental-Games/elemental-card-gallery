import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LightBox = ({ onClose }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch('/src/data/ElementalMastersCards.json')
      .then(response => response.json())
      .then(data => {
        const randomCard = data.cards[Math.floor(Math.random() * data.cards.length)];
        setCard(randomCard);
      })
      .catch(error => console.error('Error fetching card:', error));
  }, []);

  if (!card) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={`/cards/${card.image}`} alt={card.name} className="w-full h-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
          <p className="text-gray-600 mb-4">{card.description}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightBox;