import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Book, Palette, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { subscribeEmail } from '@/utils/api';
import confetti from 'canvas-confetti';
import { CheckCircle, Info as InfoIcon } from 'lucide-react';
import CardOfTheWeek from '@/components/cards/CardOfTheWeek';
import CardDetailSidebar from '@/components/CardDetailSidebar';

const ElekinPage = () => {
  // State for email subscription
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Cards of the Week data
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeEmail(email);
      
      if (result.success) {
        // Show success popup and confetti
        setConfirmationEmail(email);
        setAlreadySubscribed(false);
        setShowConfirmation(true);
        shootConfetti();
        // Reset form
        setEmail('');
      } else {
        // If already subscribed, show different message
        if (result.message && result.message.includes('already subscribed')) {
          setConfirmationEmail(email);
          setAlreadySubscribed(true);
          setShowConfirmation(true);
          shootConfetti(); // Still celebrate their enthusiasm
          setEmail('');
        } else {
          alert(result.message || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLearnMore = (card) => {
    setSelectedCard(card);
  };

  return (
    <>
      <Helmet>
        <title>Elekin: Masters of Kinbrold - Browser TCG Game</title>
        <meta name="description" content="Play Elekin: Masters of Kinbrold in your browser - A strategic trading card game set in the mystical world of Kinbrold." />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C] relative">
        {/* Cards of the Week Section */}
        <section className="container mx-auto px-4 py-10">
          <div className="max-w-6xl mx-auto">
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
                  Weekly Card Deep Dives
                </motion.h2>
                <motion.p 
                  className="mb-4 text-center text-purple-200 max-w-2xl mx-auto"
                  variants={itemVariants}
                >
                  Every week, we analyze four new cards in detail, exploring their strategies, 
                  combinations, and impact on the game.
                </motion.p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto">
                  {weeklyCards.map((card) => (
                    <motion.div 
                      key={card.id} 
                      variants={itemVariants} 
                      className="scale-95 md:scale-100 w-full mx-auto"
                      style={{ maxWidth: "240px" }}
                    >
                      <CardOfTheWeek card={card} onLearnMore={handleLearnMore} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Navigation Bubbles */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link to="/elekin/how-to-play">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 hover:bg-purple-800/30 transition-all cursor-pointer flex flex-col items-center text-center h-full"
              >
                <Book className="w-16 h-16 mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-4 text-white">Learn How to Play</h3>
                <p className="text-purple-200 mb-6">
                  Master the basics and advanced strategies with our comprehensive guides and tutorials.
                </p>
                <Button 
                  className="bg-purple-700/50 hover:bg-purple-600/50 text-white group-hover:bg-yellow-500 group-hover:text-purple-900 transition-all mt-auto"
                >
                  Get Started
                </Button>
              </motion.div>
            </Link>

            <Link to="/cards/gallery">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 hover:bg-purple-800/30 transition-all cursor-pointer flex flex-col items-center text-center h-full"
              >
                <LayoutGrid className="w-16 h-16 mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-4 text-white">View Card Collection</h3>
                <p className="text-purple-200 mb-6">
                  Explore the complete collection of Elekin cards, from basic creatures to legendary dragons.
                </p>
                <Button 
                  className="bg-purple-700/50 hover:bg-purple-600/50 text-white group-hover:bg-yellow-500 group-hover:text-purple-900 transition-all mt-auto"
                >
                  View Cards
                </Button>
              </motion.div>
            </Link>

            <Link to="/cards/deck-builder">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="group bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 hover:bg-purple-800/30 transition-all cursor-pointer flex flex-col items-center text-center h-full"
              >
                <Palette className="w-16 h-16 mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-4 text-white">Deck Builder</h3>
                <p className="text-purple-200 mb-6">
                  Create and share your custom decks with our interactive deck builder tool.
                </p>
                <Button 
                  className="bg-purple-700/50 hover:bg-purple-600/50 text-white group-hover:bg-yellow-500 group-hover:text-purple-900 transition-all mt-auto"
                >
                  Coming Soon
                </Button>
              </motion.div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated on Launch News</h2>
            <p className="text-lg mb-6 text-purple-200">
              Join our mailing list to receive updates and be the first to know when the game launches!
            </p>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-2 border-yellow-500"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-3" 
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </motion.div>
        </section>

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
                  
                  <div className="pt-6 border-t border-purple-500/30">
                    <div>
                      <h4 className="text-sm text-purple-300 font-medium mb-1">Description</h4>
                      <p className="text-white">{selectedCard.description}</p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm text-purple-300 font-medium mb-1">Ability</h4>
                      <p className="text-white">{selectedCard.ability}</p>
                    </div>
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

      {/* Success/Already Subscribed Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-purple-950 border border-purple-500/30 rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center w-full pr-6">
                  {alreadySubscribed ? 'Already Subscribed' : 'Subscription Confirmed'}
                </h2>
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="text-center py-4">
                {alreadySubscribed ? (
                  <>
                    <InfoIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Already Subscribed!</h3>
                    <p className="text-purple-200 mb-6">
                      It looks like {confirmationEmail} is already on our subscriber list. Thanks for your enthusiasm! We appreciate your continued support.
                      <br />
                      <span className="text-sm mt-2 block opacity-80">
                        We&apos;ll keep you updated on all the exciting developments.
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-400 mb-2">Thank You!</h3>
                    <p className="text-purple-200 mb-6">
                      Thanks for subscribing with {confirmationEmail}! You&apos;ll be among the first to know when Elekin launches.
                      <br />
                      <span className="text-sm mt-2 block opacity-80">
                        A welcome email should arrive in your inbox shortly.
                      </span>
                    </p>
                  </>
                )}
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-medium rounded-lg transition-colors duration-300"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add CardDetailSidebar at the bottom of the component */}
      <CardDetailSidebar
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
};

export default ElekinPage; 