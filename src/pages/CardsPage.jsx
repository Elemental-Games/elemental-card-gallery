import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { X, Clock, Star, Calendar } from "lucide-react";
import CardOfTheWeek from '@/components/cards/CardOfTheWeek';
import SubscribeButton from '@/components/SubscribeButton';

const CardsPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  
  const weeklyCards = [
    {
      id: "swoop",
      name: "Swoop",
      image: "/images/cards/new/swoop.webp",
      element: "Air",
      type: "Creature",
      rarity: "Common",
      stats: "70/55",
      description: "A swift bird of prey that dives down on unsuspecting enemies. Ideal for early game pressure.",
      ability: "Aerial Assault: When this creature attacks, it does +20 damage if your opponent has no flying creatures."
    },
    {
      id: "aqua-dart",
      name: "Aqua Dart",
      image: "/images/cards/new/aqua dart.webp",
      element: "Water",
      type: "Creature",
      rarity: "Common",
      stats: "65/75",
      description: "A sleek aquatic creature with impressive speed and agility, perfect for evading stronger opponents.",
      ability: "Swift Current: This creature can attack immediately after being played (no summoning sickness)."
    },
    {
      id: "ember-flicker",
      name: "Ember Flicker",
      image: "/images/cards/new/ember flicker.webp",
      element: "Fire",
      type: "Creature",
      rarity: "Common",
      stats: "80/60",
      description: "A dancing flame entity that grows stronger as the battle progresses. Great for longer games.",
      ability: "Growing Flames: At the start of your turn, add +5/+5 to this creature."
    },
    {
      id: "nimblefoot",
      name: "Nimblefoot",
      image: "/images/cards/new/nimblefoot.webp",
      element: "Earth",
      type: "Creature",
      rarity: "Common",
      stats: "60/85",
      description: "A small, agile earth creature that excels at avoiding attacks while providing steady essence generation.",
      ability: "Stone Step: Once per turn, this creature can dodge an attack without turning horizontal."
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
      x: -50,
      rotateY: 0
    },
    visible: { 
      opacity: 1,
      x: 0,
      rotateY: 0,
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

  // Countdown to first card reveal (June 16th, 2025)
  useEffect(() => {
    const getNextRevealDate = () => {
      const now = new Date();
      const firstReveal = new Date('2025-06-16T12:00:00'); // June 16th, 2025 at noon
      
      // If we haven't reached the first reveal date yet
      if (now < firstReveal) {
        return firstReveal;
      }
      
      // Calculate weeks since first reveal for subsequent reveals
      const weeksSinceFirst = Math.floor((now - firstReveal) / (7 * 24 * 60 * 60 * 1000));
      const nextReveal = new Date(firstReveal);
      nextReveal.setDate(firstReveal.getDate() + (weeksSinceFirst + 1) * 7);
      
      return nextReveal;
    };

    const updateTimer = () => {
      const now = new Date();
      const nextReveal = getNextRevealDate();
      const difference = nextReveal - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft({ days, hours, minutes });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Card Reveal Campaign | Early Access Elementals</title>
        <meta name="description" content="Follow our 6-week campaign as we reveal 4 new cards each week leading up to launch. Early Access Elementals get notified first when new cards go live!" />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C] text-white overflow-hidden relative">
        <motion.div 
          className="container mx-auto px-4 py-12 max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Campaign Header with Countdown */}
          <motion.div 
            className="bg-gradient-to-br from-purple-950/70 to-blue-950/70 border border-yellow-500/30 rounded-xl p-8 mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-6">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-yellow-300 font-semibold">6-WEEK CARD REVEAL CAMPAIGN</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Card Reveal <span className="text-yellow-400">Campaign HQ</span>
              </h1>
              
              <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
                Follow our 6-week campaign as we reveal 4 new cards each week leading up to launch. 
                <span className="text-yellow-400 font-bold"> Early Access Elementals get notified first</span> when new cards go live!
              </p>

              {/* Campaign Countdown */}
              <div className="bg-purple-950/50 border border-purple-500/30 rounded-xl p-6 max-w-lg mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-yellow-400 mr-3" />
                  <span className="text-yellow-400 font-semibold text-lg">NEXT REVEAL IN</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-sm text-purple-300">Days</div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-white">{timeLeft.hours}</div>
                    <div className="text-sm text-purple-300">Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-white">{timeLeft.minutes}</div>
                    <div className="text-sm text-purple-300">Minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Weekly Card Deep Dives Section */}
          <motion.div 
            className="bg-purple-950/70 p-8 rounded-2xl border border-yellow-500/30 
              shadow-[0_0_30px_rgba(234,179,8,0.1)] mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-3 text-center bg-gradient-to-r from-yellow-400 to-yellow-400 
              bg-clip-text text-transparent">Current Week&apos;s Featured Cards</h2>
            <p className="mb-8 text-center text-purple-200 max-w-2xl mx-auto">
              This week&apos;s spotlight cards with detailed strategic analysis. 
              <span className="text-yellow-400 font-semibold"> Early Access Elementals receive these analyses first via email!</span>
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {weeklyCards.map((card) => (
                <motion.div 
                  key={card.id} 
                  variants={itemVariants}
                  className="cursor-pointer"
                >
                  <CardOfTheWeek card={card} onLearnMore={handleLearnMore} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Campaign Timeline Section */}
            <div className="bg-purple-950/70 p-6 rounded-xl border border-yellow-500/30 
                shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]
                transition-all duration-300">
              <Calendar className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Campaign Timeline</h2>
              <p className="mb-4 text-purple-200 text-center">View our complete 6-week reveal schedule and track campaign progress.</p>
              <Link 
                to="/cards/campaign"
                className="inline-block px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg 
                  transition-colors border border-yellow-500/30 hover:border-yellow-500/50 w-full text-center"
              >
                View Campaign
              </Link>
            </div>

            {/* Deck Builder Section */}
            <div className="bg-purple-950/70 p-6 rounded-xl border border-yellow-500/30 
                shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]
                transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Deck Builder</h2>
              <p className="mb-4 text-purple-200">Create and share your custom decks.</p>
              <Link 
                to="/cards/deck-builder"
                className="inline-block px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg 
                  transition-colors border border-yellow-500/30 hover:border-yellow-500/50"
              >
                Build Deck (Coming Soon)
              </Link>
            </div>

            {/* Early Access Elementals Section */}
            <div className="bg-gradient-to-br from-purple-950/70 to-blue-950/70 p-6 rounded-xl border border-yellow-500/30 
                shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]
                transition-all duration-300">
              <Star className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Join Early Access Elementals</h2>
              <p className="mb-4 text-purple-200 text-center">Get notified first when new cards are revealed each week. Exclusive OG benefits!</p>
              <SubscribeButton
                className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold rounded-lg 
                  transition-colors shadow-lg hover:scale-105 transition-all duration-200"
                showIcon={false}
              >
                Become an Early Access Elemental
              </SubscribeButton>
            </div>
          </div>
        </motion.div>

        {/* Sidebar that peeks from the right */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50"
            >
              <div className="h-full bg-purple-950/95 border-l border-yellow-500/30 shadow-[-10px_0px_30px_rgba(0,0,0,0.5)] p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-yellow-400">{selectedCard.name}</h3>
                  <button 
                    onClick={() => setSelectedCard(null)}
                    className="p-1 rounded-full hover:bg-purple-800/50 transition-colors"
                  >
                    <X className="w-6 h-6 text-purple-300" />
                  </button>
                </div>
                
                <div className="mb-8 flex justify-center">
                  <img 
                    src={selectedCard.image} 
                    alt={selectedCard.name}
                    className="rounded-lg shadow-lg max-w-[250px]"
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm text-purple-300 font-medium">Element</h4>
                      <p className="text-white text-lg">{selectedCard.element}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-purple-300 font-medium">Type</h4>
                      <p className="text-white text-lg">{selectedCard.type}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-purple-300 font-medium">Rarity</h4>
                      <p className="text-white text-lg">{selectedCard.rarity}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-purple-300 font-medium">Stats</h4>
                      <p className="text-white text-lg">{selectedCard.stats}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-purple-300 font-medium mb-1">Description</h4>
                    <p className="text-white">{selectedCard.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-purple-300 font-medium mb-1">Ability</h4>
                    <p className="text-white">{selectedCard.ability}</p>
                  </div>
                  
                  <div className="mt-8">
                    <Link 
                      to={`/cards/${selectedCard.id}`}
                      className="inline-block w-full text-center px-6 py-4 bg-yellow-500 hover:bg-yellow-400 rounded-lg transition-colors text-purple-900 font-bold text-lg"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Background overlay */}
              <motion.div 
                className="fixed inset-0 bg-black/60 z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCard(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CardsPage;