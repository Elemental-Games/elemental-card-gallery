import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, LayoutGrid, Map, Star, X, Gift, PlayCircle, Users, Clock } from 'lucide-react';
import AnimatedCardBackground from '@/components/landing/AnimatedCardBackground';
import KeyFeatures from '../components/KeyFeatures';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import SubscribeButton from '@/components/SubscribeButton';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeEmail } from '../utils/api';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const kingdoms = [
  { name: 'Grivoss', element: 'Earth', description: 'Mountain fortresses carved from living stone.', color: 'bg-green-300', hoverColor: 'hover:bg-green-400', path: '/kinbrold/grivoss', icon: 'images/cards/new-marketing/earth silver.webp' },
  { name: 'Zalos', element: 'Air', description: 'Sky cities that float among the clouds.', color: 'bg-gray-300', hoverColor: 'hover:bg-gray-400', path: '/kinbrold/zalos', icon: 'images/cards/new-marketing/air silver.webp' },
  { name: 'Scarto', element: 'Fire', description: 'Volcanic cities built inside active craters.', color: 'bg-red-300', hoverColor: 'hover:bg-red-400', path: '/kinbrold/scarto', icon: 'images/cards/new-marketing/fire silver.webp' },
  { name: 'Tsunareth', element: 'Water', description: 'Riverside cities accompanied by the tides.', color: 'bg-blue-300', hoverColor: 'hover:bg-blue-400', path: '/kinbrold/tsunareth', icon: 'images/cards/new-marketing/water silver.webp' },
];

const LandingPage = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasTriggeredExitIntent, setHasTriggeredExitIntent] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [exitIntentSuccess, setExitIntentSuccess] = useState(false);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasTriggeredExitIntent) {
        setShowExitIntent(true);
        setHasTriggeredExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggeredExitIntent]);

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
        toast.success('Welcome to the Elementals!');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setEmail('');
        setExitIntentSuccess(true);
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

  // Discord link handler for exit intent popup
  const handleDiscordJoinFromExitIntent = () => {
    window.open('https://discord.gg/PVrgZBmcMq', '_blank', 'noopener,noreferrer');
    setShowExitIntent(false);
    setExitIntentSuccess(false);
  };

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Elekin TCG - Pre-Orders Now Open</title>
        <meta name="description" content="Pre-order the Demo Day Edition of Elekin TCG. Secure your decks, boosters, and game mats today!" />
        <meta property="og:title" content="Elekin TCG - Pre-Orders Now Open" />
        <meta property="og:description" content="Pre-order the Demo Day Edition of Elekin TCG. Secure your decks, boosters, and game mats today!" />
        <meta property="og:image" content="/Elekin_Kinbrold.png" />
      </Helmet>
      
      <AnimatedCardBackground />
      
      {/* Game Overview Section */}
      <section className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title and Introduction */}
          <div className="mb-12 text-center">
            <div className="flex flex-col lg:flex-row items-center justify-center mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
              <img 
                src="/Elekin_Kinbrold.png" 
                alt="Elekin Logo" 
                className="w-64 lg:w-96 h-auto -mb-2 -mr-5 -mt-10"
              />
              <h2 className="text-3xl lg:text-5xl font-bold">Why TCG Players Choose Elekin</h2>
            </div>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              Revolutionary mechanics that reward strategic thinking. Perfect for competitive Magic, Pokemon, and Yu-Gi-Oh players seeking the next evolution in TCG design.
            </p>
          </div>
          
                     {/* Features in full width */}
           <div className="w-full">
             <KeyFeatures />
           </div>
           
           {/* Three Button CTA Section */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.0 }}
             className="mt-8 flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 mb-10"
           >
             {/* YouTube Videos Button */}
             <a
               href="https://www.youtube.com/@elekintcg"
               target="_blank"
               rel="noopener noreferrer"
               className="group"
             >
               <div className="bg-gradient-to-br from-red-950/70 to-red-900/50 border-2 border-red-500/60 rounded-xl p-4
                               shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)]
                               transition-all duration-300 hover:scale-105 cursor-pointer">
                 <button className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 
                                    text-white font-bold text-lg px-6 py-3 rounded-xl shadow-lg 
                                    transition-all duration-300 hover:scale-105 flex items-center gap-2">
                   <PlayCircle className="w-5 h-5" />
                   YouTube
                 </button>
               </div>
             </a>

             {/* Learn More About Elekin Button */}
             <Link to="/elekin" className="group">
               <div className="bg-gradient-to-br from-purple-950/70 to-purple-900/50 border-2 border-yellow-500/60 rounded-xl p-4
                               shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_35px_rgba(234,179,8,0.6)]
                               transition-all duration-300 hover:scale-105 cursor-pointer">
                 <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 
                                    text-purple-900 font-bold text-lg px-6 py-3 rounded-xl shadow-lg 
                                    transition-all duration-300 hover:scale-105 flex items-center gap-2">
                   <Book className="w-5 h-5" />
                   Learn More
                 </button>
               </div>
             </Link>

             {/* Join Discord Button */}
             <a
               href="https://discord.gg/PVrgZBmcMq"
               target="_blank"
               rel="noopener noreferrer"
               className="group"
             >
               <div className="bg-gradient-to-br from-indigo-950/70 to-indigo-900/50 border-2 border-indigo-500/60 rounded-xl p-4
                               shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)]
                               transition-all duration-300 hover:scale-105 cursor-pointer">
                 <button className="bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-400 hover:to-indigo-300 
                                    text-white font-bold text-lg px-6 py-3 rounded-xl shadow-lg 
                                    transition-all duration-300 hover:scale-105 flex items-center gap-2">
                   <Users className="w-5 h-5" />
                   Discord
                 </button>
               </div>
             </a>
           </motion.div>
         </div>
       </section>
      
      {/* EXIT INTENT POPUP */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
            onClick={() => setShowExitIntent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-gradient-to-br from-red-950 to-purple-950 border-2 border-yellow-500 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center">
                {exitIntentSuccess ? (
                  // SUCCESS STATE - Thank you message with Discord link
                  <>
                    <div className="mb-6">
                      <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold mb-2 text-green-400">Welcome! You&apos;re In!</h2>
                      <p className="text-xl text-green-300 font-semibold">Your free early access is confirmed!</p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
                      <p className="text-white mb-4">
                        You&apos;re now signed up for <span className="text-yellow-400 font-bold">free early access</span>!
                      </p>
                      <p className="text-purple-200 text-sm mb-4">
                        Check your inbox for your welcome email with Discord access details.
                      </p>
                    </div>

                    <Button
                      onClick={handleDiscordJoinFromExitIntent}
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg rounded-lg shadow-lg mb-4"
                    >
                      Join Discord & Claim Your Exclusive Role →
                    </Button>

                    <button 
                      onClick={() => {setShowExitIntent(false); setExitIntentSuccess(false);}}
                      className="w-full bg-purple-800/50 hover:bg-purple-700/50 text-purple-200 hover:text-white border border-purple-500/30 font-medium py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      Continue exploring
                    </button>
                  </>
                ) : (
                  // ORIGINAL SIGNUP STATE
                  <>
                    <div className="mb-6">
                      <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-red-400" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">Get Free Early Access</h2>
                      <p className="text-base lg:text-lg text-purple-200 font-medium">Be notified of our Kickstarter launch + exclusive Discord role & giveaway entries!</p>
                    </div>

                                         <div className="bg-gradient-to-br from-yellow-500/15 to-purple-500/10 border border-yellow-500/40 rounded-xl p-4 mb-4">
                       <h3 className="text-yellow-400 font-bold mb-3 text-center">🎁 What You Get (Free):</h3>
                       <div className="space-y-2">
                        <div className="flex items-center bg-purple-900/30 rounded-lg p-3">
                          <Gift className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">Exclusive Discord role to claim</span>
                        </div>
                        <div className="flex items-center bg-purple-900/30 rounded-lg p-3">
                          <Gift className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">Kickstarter launch notifications</span>
                        </div>
                        <div className="flex items-center bg-purple-900/30 rounded-lg p-3">
                          <Gift className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">Giveaway entries for free packs & merch</span>
                        </div>
                        <div className="flex items-center bg-purple-900/30 rounded-lg p-3">
                          <Gift className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">Game development updates</span>
                        </div>
                      </div>
                    </div>

                    {/* DIRECT EMAIL SIGNUP FORM */}
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email here"
                          className="w-full bg-gradient-to-r from-purple-900/70 to-purple-800/70 border-2 border-yellow-500/60 text-white placeholder-purple-300 py-5 text-lg text-center font-medium rounded-xl shadow-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-purple-900 font-bold py-5 text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-900 border-t-transparent mr-2"></div>
                            Signing You Up...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Gift className="w-5 h-5 mr-2" />
                            Get Free Early Access
                          </div>
                        )}
                      </Button>
                    </form>


                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY FLOATING EMAIL CAPTURE BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <SubscribeButton 
          className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold shadow-2xl rounded-full px-6 py-4 animate-pulse hover:animate-none"
          showIcon={true}
          iconClassName="mr-2 h-5 w-5"
        >
          Get Free Access
        </SubscribeButton>
      </div>


      
      {/* HERO SECTION - UPDATED */}
      <section className="container mx-auto px-4 py-16 lg:py-24 relative z-10 -mb-20">
        <div className="max-w-6xl mx-auto text-center -mt-20">
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-300 font-semibold">PRE-ORDERS NOW OPEN</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            The Adventure Begins
            <br />
            <motion.span 
              className="bg-gradient-to-r from-yellow-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_100%]"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Pre-Order Elekin TCG Today
            </motion.span>
          </h1>

          <p className="text-xl lg:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto">
            Secure your Demo Day Edition decks, boosters, and game mats. Every pre-order comes with a chance to win exclusive prizes!
                </p>
                
          <Link to="/shop">
              <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 px-8 text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Star className="mr-2 h-5 w-5" />
              Shop Now & Spin to Win!
              </Button>
          </Link>
        </div>
      </section>

      {/* Cards of the Week Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-purple-800 bg-opacity-40 rounded-xl p-6 mb-20">
          <div className="max-w-5xl mx-auto">
            <CardsOfTheWeek />
          </div>
          </div>
        </div>

      {/* EXPLORE THE WORLD OF KINBROLD */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <Link to="/kinbrold">
          <h2 className="text-4xl font-bold mb-8 text-center items-center flex-wrap cursor-pointer hover:text-accent transition-colors">
            Explore the World of Kinbrold
          </h2>
        </Link>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {kingdoms.map((kingdom) => (
            <Link to={kingdom.path} key={kingdom.name} className={`${kingdom.color} bg-opacity-30 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${kingdom.hoverColor} flex flex-col`}>
              <div className="flex-grow">
                <div className="h-24 flex justify-center items-center">
                  <img 
                    src={`/${kingdom.icon}`}
                    alt={`${kingdom.element} Icon`}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <h3 className="text-center text-2xl font-semibold mt-4 mb-2">{kingdom.name}</h3>
                <h4 className="text-center text-sm font-semibold mb-2"><span className="text-sm font-bold">the {kingdom.element} Kingdom</span></h4>
                <p className="mb-2 text-center">{kingdom.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

        {/* Explore More Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/shop">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              >
                <LayoutGrid className="mr-3 h-8 w-8" />
              View Shop
              </Button>
            </Link>
            <Link to="/elekin/how-to-play">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              >
                <Book className="mr-3 h-8 w-8" />
                View Rulebook
              </Button>
            </Link>
            <Link to="/kinbrold">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              >
                <Map className="mr-3 h-8 w-8" />
                Explore Lore
              </Button>
            </Link>
            <SubscribeButton 
              variant="outline"
              size="lg"
              className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              iconClassName="mr-3 h-8 w-8"
            >
              Join Email List
            </SubscribeButton>
          </div>
        </section>
    </div>
  );
};

export default LandingPage;
