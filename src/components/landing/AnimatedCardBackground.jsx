import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GradientButton from '../ui/GradientButton';

const AnimatedCardBackground = () => {
  const [cards, setCards] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const existingCards = [
      {
        id: "cloud-sprinter",
        name: "Cloud Sprinter",
        image: "/images/cards/cloud-sprinter.webp"
      },
      {
        id: "swiftreaver",
        name: "Swiftreaver",
        image: "/images/cards/swiftreaver.webp"
      },
      {
        id: "aqua-shade",
        name: "Aqua Shade",
        image: "/images/cards/aqua-shade.webp"
      },
      {
        id: "cloud-warden",
        name: "Cloud Warden",
        image: "/images/cards/cloud-warden.webp"
      },
      {
        id: "mountain-crusher",
        name: "Mountain Crusher",
        image: "/images/cards/mountain-crusher.webp"
      },
      {
        id: "river-sprite",
        name: "River Sprite",
        image: "/images/cards/river-sprite.webp"
      },
      {
        id: "nova",
        name: "Nova",
        image: "/images/cards/nova.webp"
      },
      {
        id: "glacis",
        name: "Glacis",
        image: "/images/cards/glacis.webp"
      },
      {
        id: "terra-warden",
        name: "Terra Warden",
        image: "/images/cards/terra-warden.webp"
      },
      {
        id: "deepseer",
        name: "Deepseer",
        image: "/images/cards/deepseer.webp"
      },
      {
        id: "gust-griffin",
        name: "Gust Griffin",
        image: "/images/cards/gust-griffin.webp"
      },
      {
        id: "ivy-gila",
        name: "Ivy Gila",
        image: "/images/cards/ivy-gila.webp"
      },
      {
        id: "riptide-revenant",
        name: "Riptide Revenant",
        image: "/images/cards/riptide-revenant.webp"
      },
      {
        id: "viktor",
        name: "Viktor, The Fire Demon",
        image: "/images/cards/viktor.webp"
      },
      {
        id: "flamekeeper",
        name: "Flamekeeper",
        image: "/images/cards/flamekeeper.webp"
      }
    ];

    const duplicatedCards = [...existingCards, ...existingCards, ...existingCards];
    setCards(duplicatedCards);
  }, []);

  const createRow = (direction, speed, yOffset, startPosition = 0, zIndex) => {
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
          ease: "easeOut",
          onComplete: () => setAnimationComplete(true)
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
          {rowCards.map((card, i) => (
            <Link 
              key={`${card.id}-${i}-1`}
              to={`/cards/${card.id}`}
              className="block w-40 shrink-0 cursor-pointer pointer-events-auto"
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
                  src={card.image} 
                  alt={card.name}
                  className="w-full h-auto rounded-lg select-none hover:opacity-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = card.image.replace('.webp', '.png');
                  }}
                />
              </motion.div>
            </Link>
          ))}
          {/* Duplicate set of cards for seamless loop */}
          {rowCards.map((card, i) => (
            <Link 
              key={`${card.id}-${i}-2`}
              to={`/cards/${card.id}`}
              className="block w-40 shrink-0 cursor-pointer pointer-events-auto"
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
                  src={card.image} 
                  alt={card.name}
                  className="w-full h-auto rounded-lg select-none"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = card.image.replace('.webp', '.png');
                  }}
                />
              </motion.div>
            </Link>
          ))}
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
            {createRow(1, 80, 0, 0, 1)}
            {createRow(-1, 85, 30, 10, 2)}
            {createRow(1, 85, 60, 20, 3)}
          </>
        )}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A103C]/80 via-[#1A103C]/60 to-[#1A103C] z-0" />
      
      {/* Text Content - pointer-events-none */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-start h-full text-center px-4 pointer-events-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 1,
          ease: "easeOut"
        }}
        style={{ paddingTop: '0vh' }}
      >
        <motion.img
          src="/Games_Logo.png"
          alt="Elemental Games Logo"
          className="w-64 md:w-80 mb-4 md:mb-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        />
        
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Welcome to<br />
          Elemental Games
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-6 md:mb-8 text-purple-200 max-w-2xl font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Master the elements, build your deck, and become a legend in the world of Kinbrold
        </motion.p>
      </motion.div>

      {/* Button Container - separate with pointer-events-auto */}
      <motion.div 
        className="absolute z-30 w-full flex justify-center"
        style={{ 
          bottom: '15vh'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <div className="pointer-events-auto">
          <GradientButton />
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedCardBackground;