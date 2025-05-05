import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GradientButton from '../ui/GradientButton';
import CardDetailSidebar from '@/components/CardDetailSidebar';
import { getOptimizedCardImage, handleImageError } from '@/utils/imageUtils';

const AnimatedCardBackground = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const existingCards = [
      {
        id: "scirrus",
        name: "Scirrus",
        image: "/images/cards/new/scirrus.webp"
      },
      {
        id: "nimblefoot",
        name: "Nimblefoot",
        image: "/images/cards/new/nimblefoot.webp"
      },
      {
        id: "aqua-dart",
        name: "Aqua Dart",
        image: "/images/cards/new/aqua dart.webp"
      },
      {
        id: "swoop",
        name: "Swoop",
        image: "/images/cards/new/swoop.webp"
      },
      {
        id: "dire-pack",
        name: "Dire Pack",
        image: "/images/cards/new/dire pack.webp"
      },
      {
        id: "tentik",
        name: "Tentik",
        image: "/images/cards/new/tentik.webp"
      },
      {
        id: "ember-flicker",
        name: "Ember Flicker",
        image: "/images/cards/new/ember flicker.webp"
      },
      {
        id: "undine",
        name: "Undine, The Water Tempest",
        image: "/images/cards/new/undine.webp"
      },
      {
        id: "terra",
        name: "Terra, The Earth Titan",
        image: "/images/cards/new/terra.webp"
      },
      {
        id: "revival-rain",
        name: "Revival Rain",
        image: "/images/cards/new/revival rain.webp"
      },
      {
        id: "heavy-chains",
        name: "Heavy Chains",
        image: "/images/cards/new/heavy chains.webp"
      },
      {
        id: "glint",
        name: "Glint",
        image: "/images/cards/new/glint.webp"
      },
      {
        id: "cleanse-and-adapt",
        name: "Cleanse and Adapt",
        image: "/images/cards/new/cleanse and adapt.webp"
      },
      {
        id: "viktor",
        name: "Viktor, The Fire Demon",
        image: "/images/cards/new/viktor.webp"
      },
      {
        id: "reflective-barrier",
        name: "Reflective Barrier",
        image: "/images/cards/new/reflective barrier.webp"
      }
    ];

    const duplicatedCards = [...existingCards, ...existingCards, ...existingCards];
    setCards(duplicatedCards);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const createRow = (direction, speed, yOffset, startPosition = 0) => {
    const rowCards = cards.slice(startPosition, startPosition + 40);
    if (rowCards.length === 0) return null;

    const animationValues = {
      initial: { x: direction > 0 ? '0%' : '-30%' },
      animate: { x: direction > 0 ? '-50%' : '0%' }
    };

    return (
      <motion.div 
        className="absolute w-full"
        style={{ 
          top: `${yOffset}%`,
          zIndex: 1
        }}
        initial={{ rotate: 25, y: 100 }}
        animate={{ rotate: 0, y: 0 }}
        transition={{ 
          duration: 1,
          ease: "easeOut"
        }}
      >
        <motion.div
          className="flex absolute"
          initial={animationValues.initial}
          animate={animationValues.animate}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
              delay: 1
            }
          }}
          style={{ gap: '1rem' }}
        >
          {/* First set of cards */}
          {rowCards.map((card, i) => {
            // Generate optimized image path
            const optimizedImagePath = getOptimizedCardImage(card.image, 'thumbnail');
            
            return (
              <div 
                key={`${card.id}-${i}-1`}
                className="block w-40 shrink-0 cursor-pointer pointer-events-auto"
                onClick={() => handleCardClick(card)}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    opacity: 0.8,
                    transition: { duration: 0.2 }
                  }}
                  className="opacity-10 transition-all duration-300 hover:opacity-80"
                >
                  <img 
                    src={optimizedImagePath}
                    alt={card.name}
                    className="w-full h-auto rounded-lg select-none hover:opacity-100"
                    onError={handleImageError}
                  />
                </motion.div>
              </div>
            );
          })}
          {/* Duplicate set of cards for seamless loop */}
          {rowCards.map((card, i) => {
            // Generate optimized image path
            const optimizedImagePath = getOptimizedCardImage(card.image, 'thumbnail');
            
            return (
              <div 
                key={`${card.id}-${i}-2`}
                className="block w-40 shrink-0 cursor-pointer pointer-events-auto"
                onClick={() => handleCardClick(card)}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1,
                    opacity: 0.8,
                    transition: { duration: 0.2 }
                  }}
                  className="opacity-10 transition-all duration-300"
                >
                  <img 
                    src={optimizedImagePath}
                    alt={card.name}
                    className="w-full h-auto rounded-lg select-none"
                    onError={handleImageError}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden mt-0">
      {/* Cards Background */}
      <div className="absolute inset-0 z-10 w-full">
        {cards.length > 0 && (
          <>
            {createRow(1, 80, 0, 0)}
            {createRow(-1, 85, 30, 10)}
            {createRow(1, 85, 60, 20)}
          </>
        )}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A103C]/80 via-[#1A103C]/60 to-[#1A103C] z-0" />
      
      {/* Content Container - positioned right at the top */}
      <motion.div 
        className="relative z-20 flex flex-col items-center h-full text-center px-4 pointer-events-none"
        style={{ paddingTop: '1rem' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 1,
          ease: "easeOut"
        }}
      >
        <motion.img
          src="/Games_Logo.png"
          alt="Elemental Games Logo"
          className="w-60 md:w-72 -mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        />
        
        <div className="flex flex-col justify-center flex-grow-0 my-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold mb-2 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Welcome to<br />
            Elemental Games
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-purple-200 max-w-2xl font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            Master the elements, build your deck, and become a legend in the world of Kinbrold
          </motion.p>
        </div>
        
        {/* Button with pointer-events-auto */}
        <motion.div 
          className="pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <GradientButton />
        </motion.div>
      </motion.div>

      {/* Card Detail Sidebar */}
      <CardDetailSidebar
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </div>
  );
};

export default AnimatedCardBackground;