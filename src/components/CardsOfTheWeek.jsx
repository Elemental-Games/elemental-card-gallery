import { useState } from 'react';
import { motion } from 'framer-motion';
import CardDetailSidebar from './CardDetailSidebar';

const cards = [
  { id: 'aqua-dart', name: 'Aqua Dart', image: '/images/cards/new-marketing/aqua dart-r.webp' },
  { id: 'nimblefoot', name: 'Nimblefoot', image: '/images/cards/new/nimblefoot.webp' },
  { id: 'ember-flicker', name: 'Ember Flicker', image: '/images/cards/new/ember flicker.webp' },
  { id: 'swoop', name: 'Swoop', image: '/images/cards/new/swoop.webp' },
];

const Card = ({ card, onCardClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    } else {
      onCardClick(card);
    }
  };

  const shakeAnimation = {
    rotate: [0, -3, 3, -3, 3, 0],
    transition: {
      delay: Math.random() * 2,
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 3 + Math.random() * 2,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      whileHover={isFlipped ? { scale: 1.1, y: -12 } : { scale: 1.05 }}
      animate={!isFlipped ? shakeAnimation : {}}
      className="cursor-pointer aspect-[5/7]"
      onClick={handleCardClick}
    >
      <div className="w-full h-full perspective-1000">
        <motion.div
          className="relative w-full h-full preserve-3d will-change-transform"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute w-full h-full backface-hidden">
            <img src="/Card_Back.png" alt="Card Back" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded-lg" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CardsOfTheWeek = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8 text-white">Cards of the Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map(card => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>
      <CardDetailSidebar
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
};

export default CardsOfTheWeek;