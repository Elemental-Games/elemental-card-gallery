import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X, Star, Gift, Gem } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { subscribeEmail } from '../../utils/api';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const AnimatedCardBackground = () => {
  const [cards, setCards] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create array of card backs only - no revealed cards yet
    const allCards = Array.from({ length: 50 }, (_, i) => ({
      id: `card-back-${i}`,
      name: "Card Back",
      image: "/Card_Back.png",
      isRevealed: false
    }));

    setCards(allCards);
  }, []);

  const handleCardClick = () => {
    setShowComingSoon(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeEmail(email);
      if (result.success) {
        toast.success('Welcome to the Early Access Elementals!');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setEmail('');
      } else {
        toast.error(result.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
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
        initial={{ rotate: 25, y: 100, opacity: 0 }}
        animate={{ rotate: 0, y: 0, opacity: 1 }}
        transition={{ 
          duration: 1.2,
          ease: "easeOut",
          delay: 0.2
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
              delay: 1.5
            }
          }}
          style={{ gap: '1rem' }}
        >
          {/* First set of cards */}
          {rowCards.map((card, i) => (
            <div 
              key={`${card.id}-${i}-1`}
              className="block w-40 shrink-0 cursor-pointer pointer-events-auto group"
              onClick={handleCardClick}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="opacity-15 group-hover:opacity-80 transition-all duration-500"
              >
                <div className="relative group-hover:shadow-2xl group-hover:shadow-yellow-500/40">
                  <img 
                    src={card.image}
                    alt={card.name}
                    className="w-full h-auto rounded-lg select-none transition-all duration-300"
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-yellow-400/0 rounded-lg group-hover:border-yellow-400/70 transition-all duration-300"
                    whileHover={{
                      boxShadow: "0 0 25px rgba(250, 204, 21, 0.4)"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          ))}
          {/* Duplicate set of cards for seamless loop */}
          {rowCards.map((card, i) => (
            <div 
              key={`${card.id}-${i}-2`}
              className="block w-40 shrink-0 cursor-pointer pointer-events-auto group"
              onClick={handleCardClick}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="opacity-15 group-hover:opacity-80 transition-all duration-500"
              >
                <div className="relative group-hover:shadow-2xl group-hover:shadow-yellow-500/40">
                  <img 
                    src={card.image}
                    alt={card.name}
                    className="w-full h-auto rounded-lg select-none transition-all duration-300"
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-yellow-400/0 rounded-lg group-hover:border-yellow-400/70 transition-all duration-300"
                    whileHover={{
                      boxShadow: "0 0 25px rgba(250, 204, 21, 0.4)"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Cards Background */}
      <div className="absolute inset-0 z-10 w-full">
        {cards.length > 0 && (
          <>
            {createRow(1, 120, 2, 0)}
            {createRow(-1, 100, 32, 12)}
            {createRow(1, 110, 62, 25)}
          </>
        )}
      </div>
      
      {/* Enhanced Gradient Overlay with more depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A103C]/85 via-[#1A103C]/70 to-[#1A103C] z-15" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A103C]/60 via-transparent to-[#1A103C]/60 z-16" />
      
      {/* Content Container - shifted up positioning */}
      <motion.div 
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 pointer-events-none"
        style={{ marginTop: '-2rem' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 0.8,
          ease: "easeOut"
        }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.img
            src="/LogoClear.png"
            alt="Elekin: Masters of Kinbrold Logo"
            className="w-64 md:w-80 lg:w-96 mx-auto -mb-20 -mt-10"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          />
          
          <motion.p 
            className="text-base md:text-lg text-purple-200 mb-6 mt-10 max-w-xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            Build your deck, play with friends, and become a master in the world of Kinbrold
          </motion.p>
          
          {/* Enhanced Call to Action with Early Access Elemental Focus */}
          <motion.div
            className="bg-gradient-to-br from-yellow-500/15 to-purple-500/10 border-2 border-yellow-500/60 rounded-xl p-4 lg:p-6 -mt-3 max-w-xl mx-auto shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105"
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center mb-3">
              <Gift className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-bold text-md lg:text-base">Free Early Access</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Be One of the First <span className="text-yellow-400">500</span> Sign-Ups
            </h2>
            <div className="flex items-center justify-center space-x-4 text-sm text-purple-200 mb-4">
              <div className="flex items-center">
                  <Gift className="w-4 h-4 mr-1" />
                  <span>Free Giveaways</span>
                </div>
              <div className="flex items-center">
                  <Gem className="w-4 h-4 mr-1" />
                  <span>Kickstarter Notifications</span>
                </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                <span>Discord Role</span>
              </div>
            </div>
            
            {/* Enhanced CTA Button */}
            <div className="pointer-events-auto">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email here"
                  className="w-full bg-purple-900/50 border-yellow-500/50 text-white placeholder-purple-300 py-3 text-center font-semibold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-lg px-6 lg:px-10 py-3 lg:py-4 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Securing Your Spot...' : 'Sign-Up Now'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Coming Soon Modal */}
      {showComingSoon && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gradient-to-br from-purple-950/95 to-blue-950/95 border-2 border-yellow-500/50 rounded-xl p-8 max-w-md w-full text-center relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowComingSoon(false)}
                className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">Card Details Coming Soon!</h3>
              <p className="text-purple-200 mb-6">
                This card will be revealed to <span className="text-yellow-400 font-bold">Early Access Elementals first</span>! 
                Join our exclusive community to see cards before anyone else.
              </p>
              
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 rounded-lg"
                onClick={() => setShowComingSoon(false)}
              >
                Subscribe
              </Button>
              
              <button
                onClick={() => setShowComingSoon(false)}
                className="w-full text-purple-400 hover:text-white text-sm mt-3 transition-colors"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AnimatedCardBackground;