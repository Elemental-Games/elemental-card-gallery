import { motion } from 'framer-motion';
import CardOfTheWeek from './cards/CardOfTheWeek';
import { useState } from 'react';
import CardDetailSidebar from './CardDetailSidebar';

const CardsOfTheWeek = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  
  const weeklyCards = [
    {
      id: "swoop",
      name: "Swoop",
      image: "/images/cards/new/swoop.webp"
    },
    {
      id: "aqua-dart",
      name: "Aqua Dart",
      image: "/images/cards/new/aqua dart.webp"
    },
    {
      id: "ember-flicker",
      name: "Ember Flicker",
      image: "/images/cards/new/ember flicker.webp"
    },
    {
      id: "nimblefoot",
      name: "Nimblefoot",
      image: "/images/cards/new/nimblefoot.webp"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const handleLearnMore = (card) => {
    setSelectedCard(card);
  };

  return (
    <>
      <motion.div 
        className="border-[4px] sm:border-[5px] border-yellow-500 rounded-xl bg-transparent"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6 text-center text-yellow-500"
            variants={itemVariants}
          >
            Cards of the Week
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto">
            {weeklyCards.map((card) => (
              <motion.div key={card.id} variants={itemVariants} className="scale-95 md:scale-100 w-full mx-auto" style={{ maxWidth: "240px" }}>
                <CardOfTheWeek card={card} onLearnMore={handleLearnMore} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <CardDetailSidebar
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
};

export default CardsOfTheWeek;