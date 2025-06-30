import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Book, X, Zap, Users, Gamepad2, Calendar, PlayCircle, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { subscribeEmail } from '@/utils/api';
import confetti from 'canvas-confetti';
import { CheckCircle, Info as InfoIcon } from 'lucide-react';
import CardDetailSidebar from '@/components/CardDetailSidebar';

const ElekinPage = () => {
  // State for email subscription
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const elements = [
    { 
      name: 'Air', 
      icon: '/images/cards/new-marketing/air silver.webp',
      description: 'Swift and evasive',
      glowColor: 'shadow-[0_0_20px_rgba(148,163,184,0.8)]', // slate-400 glow
      borderColor: 'border-slate-400'
    },
    { 
      name: 'Water', 
      icon: '/images/cards/new-marketing/water silver.webp',
      description: 'Fluid and adaptive',
      glowColor: 'shadow-[0_0_20px_rgba(37,99,235,0.8)]', // blue-600 glow
      borderColor: 'border-blue-500'
    },
    { 
      name: 'Fire', 
      icon: '/images/cards/new-marketing/fire silver.webp',
      description: 'Aggressive and destructive',
      glowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.8)]', // red-500 glow
      borderColor: 'border-red-500'
    },
    { 
      name: 'Earth', 
      icon: '/images/cards/new-marketing/earth silver.webp',
      description: 'Strong and defensive',
      glowColor: 'shadow-[0_0_20px_rgba(22,163,74,0.8)]', // green-600 glow
      borderColor: 'border-green-500'
    }
  ];

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

  return (
    <>
      <Helmet>
        <title>Elekin: Masters of Kinbrold - Strategic TCG with Elemental Mastery</title>
        <meta name="description" content="Master the elements in Elekin: Masters of Kinbrold. Strategic TCG featuring Air, Water, Fire, and Earth elements with revolutionary combat mechanics." />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C] relative overflow-hidden">
        {/* Hero Section - TCG Introduction */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span 
                  className="text-yellow-400"
                  style={{
                    textShadow: '0 0 5px #eab308, 0 0 10px #eab308'
                  }}
                >
                  Elekin:
                </span>{' '}
                <motion.span 
                  className="bg-gradient-to-r from-gray-400 via-blue-600 via-red-400 via-orange-500 to-green-600 bg-clip-text text-transparent bg-[length:200%_100%]"
                  style={{
                    textShadow: '0 0 5px #a855f7, 0 0 10px #a855f7'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Masters of Kinbrold
                </motion.span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto">
                A strategic Trading Card Game where you harness the power of <span className="text-yellow-400 font-semibold">four elements</span> to dominate the battlefield
              </p>
            </motion.div>

            {/* Interactive Element Showcase */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {elements.map((element) => (
                <motion.div
                  key={element.name}
                  className={`relative p-8 rounded-full aspect-square bg-transparent border-4 ${element.borderColor} group ${element.glowColor} hover:scale-105 flex flex-col items-center justify-center`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-32 h-32 -mt-5 -mb-10 flex items-center justify-center">
                    <img 
                      src={element.icon} 
                      alt={`${element.name} Element`}
                      className="w-full h-full object-contain mb-7 mt-2"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 mt-9 text-center">{element.name}</h3>
                  <p className="text-white/90 text-sm text-center">{element.description}</p>
                  
                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Core Features Highlight */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-transparent p-6 rounded-xl border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:border-purple-300 transition-all duration-300">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Dynamic Combat</h3>
                <p className="text-purple-200">Revolutionary Strength/Agility system that rewards strategic thinking and tactical actions</p>
              </div>
              
              <div className="bg-transparent p-6 rounded-xl border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:border-purple-300 transition-all duration-300">
                <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Comeback Mechanics</h3>
                <p className="text-purple-200">Our Shields provide the perfect foundation for mounting a comeback, no matter the opposition</p>
              </div>
              
              <div className="bg-transparent p-6 rounded-xl border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:border-purple-300 transition-all duration-300">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Elemental Essence</h3>
                <p className="text-purple-200">Generate essence from your creatures, store it, and use it to activate stronger abilities and summon more powerful creatures</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Navigation Hub */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-center mb-12 text-yellow-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Explore Elekin
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Learn How to Play */}
              <Link to="/elekin/how-to-play">
                <motion.div
                  className="group relative bg-transparent p-8 rounded-xl border-2 border-purple-400 hover:border-yellow-400 transition-all duration-300 h-full shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <Book className="w-16 h-16 text-yellow-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4">Learn How to Play</h3>
                  <p className="text-purple-200 mb-6">
                    Master the rules, mechanics, and strategies. From basic gameplay to advanced tactics.
                  </p>
                  <div className="flex text-2xl items-center text-yellow-400 font-semibold group-hover:text-yellow-300">
                    <PlayCircle className="w-8 h-8 mr-2" />
                    Start Learning
                  </div>
                </motion.div>
              </Link>

              {/* Card Reveal Campaign */}
              <Link to="/cards/campaign">
                <motion.div
                  className="group relative bg-transparent p-8 rounded-xl border-2 border-purple-400 hover:border-yellow-400 transition-all duration-300 h-full shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Calendar className="w-16 h-16 text-yellow-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4">Card Reveal Campaign</h3>
                  <p className="text-purple-200 mb-6">
                    Follow our 6-week journey as we unveil new cards every week leading to launch.
                  </p>
                  <div className="flex text-2xl items-center text-yellow-400 font-semibold group-hover:text-yellow-300">
                    <Gamepad2 className="w-8 h-8 mr-2" />
                    View Campaign
                  </div>
                </motion.div>
              </Link>

              {/* Join Community */}
              <motion.div
                className="group relative bg-transparent p-8 rounded-xl border-2 border-purple-400 hover:border-yellow-400 transition-all duration-300 h-full shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Users className="w-16 h-16 text-yellow-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Join Early Access</h3>
                <p className="text-purple-200 mb-6">
                  Become an Early Access Elemental and get first access to reveals, updates, and community perks.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-purple-400 bg-purple-950/30 text-white placeholder-purple-300 focus:border-yellow-400"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold transition-all duration-200" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Join Now"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Cards Section - Secondary */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-yellow-400">Featured Card Previews</h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Card reveals begin June 23rd! Follow our campaign to see strategic cards as they&apos;re unveiled weekly.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              {[1,2,3,4].map((placeholder) => {
                // Updated schedule: Week 1-3 in June, Week 4-6 in July
                const weekDates = [
                  { date: 23, month: 'June' },   // Week 1: June 23
                  { date: 30, month: 'June' },   // Week 2: June 30  
                  { date: 7, month: 'July' },    // Week 3: July 7
                  { date: 14, month: 'July' },   // Week 4: July 14
                  { date: 21, month: 'July' },   // Week 5: July 21
                  { date: 28, month: 'July' }    // Week 6: July 28
                ];
                const revealInfo = weekDates[placeholder - 1];
                
                return (
                <motion.div 
                  key={placeholder}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + placeholder * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-yellow-500/50 transition-all duration-300">
                    <div className="w-full aspect-[5/7] relative">
                      <img 
                        src="/Card_Back.png" 
                        alt="Card Back"
                        className="w-full h-full object-contain"
                      />
                      {/* Coming Soon Overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🔒</div>
                          <div className="text-yellow-400 font-bold text-lg">Coming Soon</div>
                          <div className="text-purple-200 text-sm">{revealInfo.month} {revealInfo.date}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2">Week {placeholder} Cards</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-300">Reveals {revealInfo.month} {revealInfo.date}</span>
                        <span className="text-yellow-400">4 Cards</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </motion.div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <Link 
                to="/cards/campaign"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-purple-400 hover:border-yellow-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]"
              >
                <Calendar className="w-5 h-5 mr-3" />
                See Full Campaign Timeline
              </Link>
            </motion.div>
          </div>
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