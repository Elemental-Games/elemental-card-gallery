import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, LayoutGrid, Map, Clock, Zap, ArrowRight, Star, X, Gift, Gem } from 'lucide-react';
import AnimatedCardBackground from '@/components/landing/AnimatedCardBackground';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import KeyFeatures from '../components/KeyFeatures';
import ElementalTransition from '../components/ElementalTransition';
import SubscribeButton from '@/components/SubscribeButton';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { subscribeEmail } from '../utils/api';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LandingPage = () => {
  const [transitionElement, setTransitionElement] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasTriggeredExitIntent, setHasTriggeredExitIntent] = useState(false);
  const [signupCount, setSignupCount] = useState(15);
  const [spotsRemaining, setSpotsRemaining] = useState(485);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [exitIntentSuccess, setExitIntentSuccess] = useState(false);
  const [contentGatedSuccess, setContentGatedSuccess] = useState(false);

  // Fetch current signup count
  useEffect(() => {
    const fetchSignupCount = async () => {
      try {
        const { count, error } = await supabase
          .from('subscribers')
          .select('*', { count: 'exact', head: true });
        
        if (!error) {
          setSignupCount(count || 0);
        }
      } catch (err) {
        console.error('Error fetching signup count:', err);
      }
    };

    fetchSignupCount();
    
    // Update count every 30 seconds
    const interval = setInterval(fetchSignupCount, 30000);
    return () => clearInterval(interval);
  }, []);

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

  // Countdown to Launch Date Reveal (July 26, 2025)
  useEffect(() => {
    const targetDate = new Date('2025-07-26T12:00:00Z');
    
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

  const kingdoms = [
    { 
      name: 'Zalos', 
      element: 'Air',
      color: 'bg-gray-300', 
      hoverColor: 'hover:bg-gray-400',
      description: 'Among the mountain peaks are floating cities created by the architects and scholars who have harnessed the power of the air.'
    },
    { 
      name: 'Tsunareth', 
      element: 'Water',
      color: 'bg-blue-300', 
      hoverColor: 'hover:bg-blue-400',
      description: 'Beneath crystalline waves lie the ancient coral cities where wisdom flows as freely as the tides that shape them.'
    },
    { 
      name: 'Scarto', 
      element: 'Fire',
      color: 'bg-red-300', 
      hoverColor: 'hover:bg-red-400',
      description: 'From volcanic depths, rise citadels created from those who have mastered the power of fire, where passionate warriors forge their own destiny.'
    },
    { 
      name: 'Grivoss', 
      element: 'Earth',
      color: 'bg-green-300', 
      hoverColor: 'hover:bg-green-400',
      description: 'Deep within mountain strongholds, stand the steadfast people who carve their legacy and test the limits on the land of Kinbrold.'
    }
  ];

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
        setContentGatedSuccess(true);
        // Update local count
        setSignupCount(prev => prev + 1);
        setSpotsRemaining(prev => prev - 1);
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

  // Discord link handler for content-gated section
  const handleDiscordJoinFromContentGated = () => {
    window.open('https://discord.gg/PVrgZBmcMq', '_blank', 'noopener,noreferrer');
    setContentGatedSuccess(false);
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
        <meta name="description" content="Be among the first 500 to become an Early Access Elemental for Elekin: Masters of Kinbrold. Limited spots available before launch date reveal!" />
        <meta property="og:title" content="Elekin TCG - Limited Early Access Elemental Spots" />
        <meta property="og:description" content="Only 500 Early Access Elemental spots available. Get exclusive rewards and OG status before launch!" />
        <meta property="og:image" content="/Games_Logo.png" />
      </Helmet>
      
      <AnimatedCardBackground />
      
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
              className="bg-gradient-to-br from-red-950 to-purple-950 border-2 border-yellow-500 rounded-xl shadow-2xl max-w-lg w-full p-8 relative"
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
                      <h2 className="text-3xl font-bold mb-2 text-green-400">Welcome to the Early Access Elementals!</h2>
                      <p className="text-xl text-green-300 font-semibold">Your exclusive elemental status is confirmed!</p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
                      <p className="text-white mb-4">
                        You're now part of the <span className="text-yellow-400 font-bold">exclusive first 500 Early Access Elementals</span>!
                      </p>
                      <p className="text-purple-200 text-sm mb-4">
                        Check your inbox for your Early Access Elemental welcome email with exclusive benefits.
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
                      <h2 className="text-3xl font-bold mb-2">Wait! Don&apos;t Miss Out!</h2>
                      <p className="text-xl text-red-300 font-semibold">Only {spotsRemaining} Early Access Elemental Spots Left!</p>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
                      <h3 className="text-yellow-400 font-bold mb-3">🔥 LAST CHANCE: Become an Early Access Elemental!</h3>
                      <div className="text-left space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-2">✓</span>
                          <span>Lock in exclusive OG elemental benefits</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-2">✓</span>
                          <span>Free pack & deck giveaway eligibility</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-2">✓</span>
                          <span>Early access to launch date announcement</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-2">✓</span>
                          <span>VIP Discord status that new elementals can&apos;t access</span>
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
                          className="w-full bg-purple-900/50 border-yellow-500/50 text-white placeholder-purple-300 py-4 text-md text-center font-semibold"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg rounded-lg shadow-lg"
                      >
                        {loading ? 'Securing Your Spot...' : 'Become an Early Access Elemental'}
                      </Button>
                    </form>

                    <button 
                      onClick={() => setShowExitIntent(false)}
                      className="w-full bg-purple-800/50 hover:bg-purple-700/50 text-purple-200 hover:text-white border border-purple-500/30 font-medium py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      No thanks, I&apos;ll miss out on exclusive rewards
                    </button>
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
          Acquire Founding Status
        </SubscribeButton>
      </div>

      {/* Desktop Sticky Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-purple-950/95 backdrop-blur-sm border-t border-purple-500/30 py-3 z-40 hidden lg:block">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-white">Limited Time: Only {spotsRemaining} Early Access Elemental Spots Left</span>
              <div className="text-sm text-purple-300">
                Launch date reveal in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/join-now">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-6 py-2 rounded-lg">
                  Secure My Spot
                </Button>
              </Link>
              <Link to="/join-now">
                <Button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2 rounded-lg">
                  Learn More
                </Button>
              </Link>
              <button
                onClick={() => setShowStickyBar(false)}
                className="text-purple-300 hover:text-white transition-colors p-1 ml-2"
                aria-label="Close notification bar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* HERO SECTION - UPDATED */}
      <section className="container mx-auto px-4 py-16 lg:py-24 relative z-10 -mb-20">
        <div className="max-w-6xl mx-auto text-center -mt-20">
          {/* Pre-Launch Badge */}
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-300 font-semibold">LIMITED EARLY ACCESS ELEMENTAL SPOTS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Be One of the First <span className="text-yellow-400">500</span>
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
              Early Access Elementals
            </motion.span>
            <br />
            in Elekin TCG
          </h1>

          {/* Subheadline */}
          <p className="text-xl lg:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto">
            Secure your <span className="text-yellow-400 font-bold">exclusive OG elemental status</span> and unlock 
            <span className="text-white font-semibold"> free pack giveaways, early access,</span> and elemental rewards before our launch date reveal
          </p>

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

          {/* Signup Progress - LARGER FONTS */}
          <div className="bg-gradient-to-r from-green-950/50 to-yellow-950/50 border border-yellow-500/30 rounded-xl p-6 mb-8 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg text-purple-300">Early Access Elementals Secured</span>
              <span className="text-xl text-yellow-400 font-bold">{signupCount}/500</span>
            </div>
            <div className="w-full bg-purple-800/30 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((signupCount / 500) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-base text-center text-purple-300 font-semibold">
              {spotsRemaining > 0 ? `${spotsRemaining} exclusive elemental spots remaining` : 'All Early Access Elemental spots claimed!'}
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-8 mb-8 text-sm text-purple-300">
            <div className="flex items-center">
              <Gem className="w-8 h-8 mr-2" />
              <span>Essence Generation & Currency</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-8 h-8 mr-2" />
              <span>20-30 Min Strategic Games</span>
            </div>
            <div className="flex items-center">
              <Star className="w-8 h-8 mr-2" />
              <span>Shield System Comeback Mechanic</span>
            </div>
          </div>

          {/* PRIMARY CTA BUTTONS - UPDATED */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <SubscribeButton 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:scale-105 transition-all duration-200"
              showIcon={false}
            >
              <ArrowRight className="mr-2 w-5 h-5" />
              Become an Early Access Elemental
            </SubscribeButton>
            <Link to="/elekin">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-purple-400 text-white hover:bg-purple-400/20 hover:text-yellow-400 font-semibold text-lg px-8 py-6 rounded-xl"
              >
                Learn More About Elekin
              </Button>
            </Link>
          </div>

          {/* Value Proposition Bullets */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-6">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">OG Elemental Status</h3>
              <p className="text-purple-300 text-sm">Exclusive Early Access Elemental Discord role & privileges that new elementals can&apos;t access</p>
            </div>
            <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-6">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Free Pack Giveaways</h3>
              <p className="text-purple-300 text-sm">Eligible for exclusive OG giveaways including free booster packs, starter decks & more</p>
            </div>
            <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-6">
              <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">Launch Day Priority</h3>
              <p className="text-purple-300 text-sm">First to know launch date, Early Bird pricing access & priority ordering</p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Overview Section - Updated */}
      <section className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title and Introduction */}
          <div className="mb-12 text-center">
            <div className="flex flex-col lg:flex-row items-center justify-center mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
              <img 
                src="/LogoClear.png" 
                alt="Elekin Logo" 
                className="w-32 lg:w-48 h-auto"
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
        </div>
      </section>

      {/* CONTENT-GATED STRATEGY SECTION */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-950/70 to-blue-950/70 border border-purple-500/30 rounded-xl p-8 text-center">
            {contentGatedSuccess ? (
              // SUCCESS STATE - Thank you message with Discord link
              <>
                <div className="mb-6">
                  <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-green-400">
                    Early Access Elemental Status Secured! 🎉
                  </h2>
                  <p className="text-xl text-green-300 mb-6">
                    You&apos;re now one of the exclusive first 500 Early Access Elementals!
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
                  <p className="text-white mb-4">
                    Your exclusive OG elemental rewards are confirmed! Check your inbox for your welcome email.
                  </p>
                  <p className="text-purple-200 text-sm">
                    Next step: Join our Discord community to claim your exclusive Early Access Elemental role and connect with fellow elementals!
                  </p>
                </div>

                <Button
                  onClick={handleDiscordJoinFromContentGated}
                  className="w-full max-w-md bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-xl px-12 py-6 rounded-xl shadow-2xl hover:scale-105 transition-all duration-200 mb-4"
                >
                  Join Discord & Claim Your Exclusive Role →
                </Button>

                <button 
                  onClick={() => setContentGatedSuccess(false)}
                  className="bg-purple-800/50 hover:bg-purple-700/50 text-purple-200 hover:text-white border border-purple-500/30 font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Continue exploring
                </button>
              </>
            ) : (
              // ORIGINAL CONTENT STATE
              <>
                <div className="mb-6">
                  <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Unlock <span className="text-yellow-400">Exclusive Early Access Elemental Rewards</span>
                  </h2>
                  <p className="text-xl text-purple-200 mb-6">
                    Join the first 500 elementals and get access to exclusive OG giveaways, early access content, and elemental privileges!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/20">
                    <h3 className="font-bold text-lg mb-3 text-yellow-400">Exclusive Giveaways:</h3>
                    <div className="text-left space-y-2 text-sm text-purple-200">
                      <div className="flex items-center">
                        <Gift className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>Free booster pack giveaways</span>
                      </div>
                      <div className="flex items-center">
                        <Gift className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>Complimentary starter deck opportunities</span>
                      </div>
                      <div className="flex items-center">
                        <Gift className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>Limited edition card variants</span>
                      </div>
                      <div className="flex items-center">
                        <Gift className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>Exclusive merchandise drops</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/20">
                    <h3 className="font-bold text-lg mb-3 text-yellow-400">OG Member Benefits:</h3>
                    <div className="text-left space-y-2 text-sm text-purple-200">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>OG member Discord Role</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>Early access to all announcements</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>Exclusive Early Rewards</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>Additional Rewards during Launch</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-950/30 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-300 font-semibold">
                    🔥 Only {spotsRemaining} Early Access Elemental spots remaining - These rewards are exclusive to the first 500!
                  </p>
                </div>

                {/* Direct Email Subscription Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email here"
                    className="w-full bg-purple-900/50 border-yellow-500/50 text-white placeholder-purple-300 py-4 text-center font-semibold text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-xl px-12 py-6 rounded-xl shadow-2xl hover:scale-105 transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? 'Securing Your Spot...' : 'Secure My Early Access Elemental Rewards'}
                  </Button>
                </form>

                <p className="text-sm text-purple-400 mt-4">
                  Join {signupCount} elementals who&apos;ve already secured their early access status
                </p>
              </>
            )}
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

        <section className="mb-16">
          <Link to="/kinbrold">
            <h2 className="text-4xl font-bold mb-8 flex items-center flex-wrap cursor-pointer hover:text-accent transition-colors">
              Explore the World of Kinbrold
            </h2>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {kingdoms.map((kingdom) => (
              <div 
                key={kingdom.name} 
                className={`${kingdom.color} bg-opacity-30 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${kingdom.hoverColor} cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <img 
                    src={`/icons/${kingdom.element}.png`}
                    alt={`${kingdom.element} Icon`}
                    className="w-24 h-24 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2">{kingdom.name}, <span className="text-sm font-bold">the {kingdom.element} Kingdom</span></h3>
                  <p className="mb-4">{kingdom.description}</p>
                </div>
                <Link to={`/kinbrold/${kingdom.name.toLowerCase()}`}>
                  <Button variant="outline" className="mt-auto w-full">Explore {kingdom.name}</Button>
                </Link>
              </div>
            ))}
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
