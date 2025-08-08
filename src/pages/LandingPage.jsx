import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, LayoutGrid, Map, Clock, Zap, ArrowRight, Star, X, Gift, Gem, PlayCircle, Users } from 'lucide-react';
import AnimatedCardBackground from '@/components/landing/AnimatedCardBackground';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import KeyFeatures from '../components/KeyFeatures';
import ElementalTransition from '../components/ElementalTransition';
import SubscribeButton from '@/components/SubscribeButton';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeEmail } from '../utils/api';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { getCampaignStatus } from '../utils/analytics';

const LandingPage = () => {
  const navigate = useNavigate();
  const [transitionElement, setTransitionElement] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasTriggeredExitIntent, setHasTriggeredExitIntent] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [exitIntentSuccess, setExitIntentSuccess] = useState(false);

  const [campaignStatus, setCampaignStatus] = useState({ unlockedKingdoms: [], nextUnlock: null, week: 0 });

  // Initialize campaign status and update periodically
  useEffect(() => {
    const updateCampaignStatus = () => {
      const status = getCampaignStatus();
      console.log('Campaign Status Update:', {
        currentDate: new Date().toISOString(),
        week: status.week,
        unlockedKingdoms: status.unlockedKingdoms,
        nextUnlock: status.nextUnlock
      });
      setCampaignStatus(status);
    };
    
    // Initial update
    updateCampaignStatus();
    
    // Update every 5 minutes to catch new unlocks
    const interval = setInterval(updateCampaignStatus, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Note: Removed signup count tracking for landing page simplicity

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

  // Countdown to Launch Date Reveal (August 4, 2025)
  useEffect(() => {
    const targetDate = new Date('2025-08-04T12:00:00Z');
    
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft({ days, hours, minutes });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Dynamic kingdoms based on campaign schedule
  const KINGDOM_SCHEDULE = [
    {
      id: 'grivoss',
      name: 'Grivoss',
      element: 'Earth',
      color: 'bg-green-300',
      hoverColor: 'hover:bg-green-400',
      description: 'Mountain fortresses carved from living stone. The Grivoss people are builders, miners, and warriors who never back down from a fight.',
      path: '/kinbrold/grivoss',
      unlockDate: new Date('2025-06-23T00:00:00'),
      week: 1
    },
    {
      id: 'zalos',
      name: 'Zalos',
      element: 'Air',
      color: 'bg-gray-300',
      hoverColor: 'hover:bg-gray-400',
      description: 'Sky cities that float among the clouds. Home to brilliant inventors, wind-riders, and scholars who study the ancient arts.',
      path: '/kinbrold/zalos',
      unlockDate: new Date('2025-06-30T00:00:00'),
      week: 2
    },
    {
      id: 'scarto',
      name: 'Scarto',
      element: 'Fire',
      color: 'bg-red-300',
      hoverColor: 'hover:bg-red-400',
      description: 'Volcanic cities built inside active craters. Fierce warriors and master smiths who forge weapons in eternal fire.',
      path: '/kinbrold/scarto',
      unlockDate: new Date('2025-07-14T00:00:00'),
      week: 4
    },
    {
      id: 'tsunareth',
      name: 'Tsunareth',
      element: 'Water',
      color: 'bg-blue-300',
      hoverColor: 'hover:bg-blue-400',
      description: 'Riverside cities accompanied by the tides. Wise healers and sea-riders who command the tides and ocean storms.',
      path: '/kinbrold/tsunareth',
      unlockDate: new Date('2025-07-21T00:00:00'),
      week: 5
    }
  ];

  // Helper functions
  const isKingdomUnlocked = (kingdomId) => {
    return campaignStatus.unlockedKingdoms.includes(kingdomId);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleKingdomClick = (kingdom) => {
    if (isKingdomUnlocked(kingdom.id)) {
      navigate(kingdom.path);
    }
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



  if (transitionElement) {
    return (
      <ElementalTransition element={transitionElement}>
        <div className={`min-h-screen ${transitionElement.toLowerCase()}-bg text-white p-8`}>
          <h1 className="text-4xl font-bold mb-8">Welcome to {transitionElement}</h1>
          <p className="text-xl">Explore the {transitionElement} element</p>
          <Button onClick={() => setTransitionElement(null)}>Go Back</Button>
        </div>
      </ElementalTransition>
    );
  }

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Elekin TCG - Launching Soon</title>
        <meta name="description" content="Get free early access to Elekin: Masters of Kinbrold. Join our Discord community for exclusive updates and be first to know our launch date!" />
        <meta property="og:title" content="Elekin TCG - Free Early Access" />
        <meta property="og:description" content="Sign up for FREE for early access to Elekin TCG. Get exclusive updates and Discord access!" />
        <meta property="og:image" content="/Elekin_Kinbrold.png" />
      </Helmet>
      
      <AnimatedCardBackground />
      {/* Game Overview Section - Updated */}
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
             className="mt-8 flex flex-col lg:flex-row justify-center gap-6 mb-10"
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
      
      {/* EXIT INTENT POPUP - UPDATED WITH DIRECT EMAIL SIGNUP */}
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
          {/* Pre-Launch Badge */}
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-300 font-semibold">FREE EARLY ACCESS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Get Free Early Access to
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
              Elekin TCG
            </motion.span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl lg:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto">
            Sign up for <span className="text-yellow-400 font-bold">FREE</span> to be notified of our 
            <span className="text-white font-semibold"> Kickstarter launch</span>, get an exclusive role, and an additional entry for all giveaways such as free packs, decks & merch
          </p>
 
          {/* PRE-ORDER ANNOUNCEMENT SECTION */}
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="my-12"
          >
           <div className="bg-gradient-to-br from-yellow-500/20 via-transparent to-yellow-500/20 border-2 border-yellow-400 rounded-2xl p-8 max-w-4xl mx-auto shadow-[0_0_40px_rgba(234,179,8,0.3)]">
             <div className="text-center">
               <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                 Pre-Orders Are Now Live!
               </h2>
               <p className="text-lg text-purple-200 mb-6">
                 Secure your Demo Day decks and get a chance to win big with our pre-order wheel spin!
               </p>
               <Link to="/shop">
                 <Button
                   size="lg"
                   className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 px-8 text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                 >
                   <Star className="mr-2 h-5 w-5" />
                   Pre-Order Now & Spin to Win!
                 </Button>
               </Link>
             </div>
           </div>
          </motion.div>
 
          {/* Countdown Timer - BIGGER FONTS */}
          <div className="bg-purple-950/70 border border-purple-500/30 rounded-xl p-8 mb-8 max-w-lg mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-yellow-400 font-semibold text-xl">LAUNCH DATE REVEAL IN</span>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-lg text-purple-300">Days</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-lg text-purple-300">Hours</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-lg text-purple-300">Minutes</div>
              </div>
            </div>
          </div>



          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-8 mb-8 text-sm text-purple-300">
            <div className="flex items-center">
              <Gem className="w-8 h-8 mr-2" />
              <span>Essence Generation & Currency</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-8 h-8 mr-2" />
              <span>2 Player Game | 20-30 Min</span>
            </div>
            <div className="flex items-center">
              <Star className="w-8 h-8 mr-2" />
              <span>Shield System Comeback Mechanic</span>
            </div>
          </div>

          {/* 2 WAYS TO SUPPORT US - DUAL CTA */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="text-yellow-400">2 Ways to Support Us</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Email Signup */}
              <div className="bg-gradient-to-br from-purple-950/70 to-blue-950/70 border-2 border-yellow-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                  Join Email List
                </h3>
                <p className="text-purple-200 text-sm mb-6 text-center">
                  Get early access, giveaways, and launch notifications
                </p>
                
                <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email for free early access"
                    className="w-full bg-purple-900/50 border-2 border-yellow-500/50 text-white placeholder-purple-300 py-4 px-4 text-lg font-medium rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg rounded-xl shadow-2xl hover:scale-105 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                      <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-900 border-t-transparent mr-2"></div>
                    Signing Up...
                  </div>
                ) : (
                      <div className="flex items-center justify-center">
                    <ArrowRight className="mr-2 w-5 h-5" />
                    Get Free Access
                  </div>
                )}
              </Button>
            </form>
                
                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-purple-300">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-green-400" />
                    <span>Discord Role</span>
                  </div>
                  <div className="flex items-center">
                    <Gift className="w-4 h-4 mr-1 text-green-400" />
                    <span>Giveaway Entries</span>
                  </div>
                </div>
          </div>

              {/* Kickstarter Support */}
              <div className="bg-gradient-to-br from-green-950/70 to-emerald-950/70 border-2 border-green-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-400 mr-2" />
                  Back on Kickstarter
                </h3>
                <p className="text-green-200 text-sm mb-6 text-center">
                  Help us reach our funding goal and bring Elekin to life
                </p>
                
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-green-300 font-bold text-lg mb-2">Pre-Launch Page Live!</div>
                      <p className="text-green-200 text-sm">
                        Follow our campaign to be notified when we launch
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href="/kickstarter"
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 text-lg rounded-xl shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
                  >
                    Support Our Campaign 🚀
                  </a>
              </div>
                
                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-green-300">
                  <div className="flex items-center">
                    <Gift className="w-4 h-4 mr-1 text-green-400" />
                    <span>Physical Cards</span>
            </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-green-400" />
                    <span>Exclusive Rewards</span>
              </div>
            </div>
              </div>
            </div>
            
            {/* Supporting Text */}
            <p className="text-center text-purple-300 mt-6 text-sm">
              Choose one or both! Every form of support helps us reach our goal of bringing Elekin TCG to players worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Cards of the Week Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-purple-800 bg-opacity-40 rounded-xl p-6 mb-20">
          <div className="max-w-6xl mx-auto">
            <CardsOfTheWeek />
          </div>
        </div>

            {/* EXPLORE THE WORLD OF KINBROLD - FIRST SECTION */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <Link to="/kinbrold">
          <h2 className="text-4xl font-bold mb-8 text-center items-center flex-wrap cursor-pointer hover:text-accent transition-colors">
            Explore the World of Kinbrold
          </h2>
        </Link>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {KINGDOM_SCHEDULE.map((kingdom) => {
            const isUnlocked = isKingdomUnlocked(kingdom.id);
            return (
              <div 
                key={kingdom.name} 
                className={`${kingdom.color} bg-opacity-30 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${kingdom.hoverColor} flex flex-col justify-between relative cursor-pointer`}
                onClick={() => handleKingdomClick(kingdom)}
              >
                <div>
                  <img 
                    src={`/icons/${kingdom.element}.png`}
                    alt={`${kingdom.element} Icon`}
                    className="w-24 h-24 mx-auto"
                  />
                  <h3 className="text-center text-2xl font-semibold mb-2">{kingdom.name} </h3>
                  <h4 className="text-center text-sm font-semibold mb-2"><span className="text-sm font-bold">the {kingdom.element} Kingdom</span></h4>
                  <p className="mb-2 text-center">{kingdom.description}</p>
                </div>
                
                {/* Week and Unlock Date Info */}
                <div className="mt-auto">
                  <div className="bg-purple-900/50 border border-purple-500/30 rounded-lg p-3 mb-3">
                    <div className="text-center">
                      <div className="text-yellow-400 font-bold text-sm">Week {kingdom.week}</div>
                      <div className="text-purple-200 text-xs">
                        {isUnlocked ? 'Unlocked!' : `Unlocks ${formatDate(kingdom.unlockDate)}`}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className={`w-full ${isUnlocked ? 'bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/30' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isUnlocked}
                  >
                    {isUnlocked ? `Explore ${kingdom.name}` : `Coming Week ${kingdom.week}`}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

        {/* Explore More Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/cards/campaign">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              >
                <LayoutGrid className="mr-3 h-8 w-8" />
                View Campaign
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
    </div>
  );
};

export default LandingPage;
