import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import EmailSignup from '../components/EmailSignup';
import { useState, useEffect } from 'react';
import { Clock, Users, Zap, CheckCircle, Crown, Star, Gift } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);



const JoinNowPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [signupCount, setSignupCount] = useState(0);

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
    const timer = setInterval(updateTimer, 60000);

    return () => clearInterval(timer);
  }, []);

  const spotsRemaining = Math.max(0, 500 - signupCount);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#1A103C] relative overflow-hidden"
    >
      <Helmet>
        <title>Join Elekin TCG - Free Early Access</title>
        <meta name="description" content="Get free early access to Elekin TCG. Join 500 exclusive early supporters and be first to know our launch date!" />
        <meta name="keywords" content="Elekin early access, free signup, TCG community, Discord access" />
        <meta property="og:title" content="Elekin TCG - Free Early Access" />
        <meta property="og:description" content="Get free early access to Elekin TCG. Join 500 exclusive early supporters!" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg/join-now" />
        
        {/* FAQ structured data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Can the average person pick up and play Elekin?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! That's what makes our game so unique is that it has a very simplified gameplay and battle mechanic that simply...just makes sense! This allows for newcomers to easily pick-up and play Elekin."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Elekin unique?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Besides our On-Card Technology in the form of a unique QR code, in-game we have a Shield system that protects you from your opponent's attacks. This is a system that's never before seen in the TCG world. Lastly, our battling mechanic of using Strength for damage and health and Agility for attack speed, blocking capabilities, and dodging slower attacks is ideal for a new and refreshing gameplay experience."
                }
              },
              {
                "@type": "Question",
                "name": "How long does a typical game take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The average game takes 20-25 minutes."
                }
              },
              {
                "@type": "Question",
                "name": "How can I participate in playtests?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Join our community in Discord, attend our live streams on TikTok, or write our support team an email requesting to participate (Discord, TikTok, and email link)."
                }
              },
              {
                "@type": "Question",
                "name": "Will there be opportunities to interact with the creator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Of course! You can attend our live streams on TikTok and ask our creators any questions during their weekly Q&A sessions. Also, you can join our discord and shoot some messages out there as they're quite active."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 -mt-20 container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Floating Badge */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-3 mb-8"
          >
            <Crown className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-300 font-bold text-lg">FREE EARLY ACCESS</span>
          </motion.div>

          {/* Main Headline with Animation */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Join the Email List
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
              {signupCount}/500
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl lg:text-2xl text-purple-200 mb-12 max-w-3xl -mt-5 mx-auto"
          >
            Be one of the <span className="text-yellow-400 font-bold">first 500</span> to sign-up and get <span className="text-yellow-400 font-bold">free early access</span> to Elekin TCG, 
            launch notifications, giveaways, and exclusive Discord perks.
          </motion.p>

          {/* Main Signup Form - 2 Ways to Support */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12 max-w-4xl mx-auto -mt-5"
          >
            {/* Section Header */}
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="text-yellow-400">2 Ways to Support Us</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Signup */}
              <div className="bg-gradient-to-br from-purple-950/70 to-blue-950/70 border-2 border-yellow-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                  Join Email List
                </h3>
                <p className="text-purple-200 text-sm mb-6 text-center">
                  Get early access, giveaways, and launch notifications
                </p>
                
                <EmailSignup 
                  buttonClassName="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(234,179,8,0.5)] hover:shadow-[0_0_40px_rgba(234,179,8,0.7)]"
                  buttonText="Get Free Early Access →"
                />
                
                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-purple-300">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                    <span>Early Bird Pricing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                    <span>VIP Discord Role</span>
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
                
                <a
                  href="/kickstarter"
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] flex items-center justify-center"
                >
                  Support Our Campaign 🚀
                </a>
                
                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-green-300">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                    <span>Physical Cards</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                    <span>Exclusive Rewards</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Supporting Text */}
            <p className="text-center text-purple-300 mt-6 text-sm">
              Choose one or both! Every form of support helps us reach our goal of bringing Elekin TCG to players worldwide.
            </p>
          </motion.div>

          {/* Progress Bar and Countdown Side-by-Side */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            {/* Progress Bar with Animation */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="bg-purple-950/50 border border-purple-500/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-green-400 font-semibold">
                  {signupCount}/500 SPOTS CLAIMED
                </span>
              </div>
              <div className="w-full bg-purple-800/30 rounded-full h-4 mb-3">
                <motion.div 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((signupCount / 500) * 100, 100)}%` }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </div>
              <p className="text-yellow-400 font-bold text-center">
                {spotsRemaining > 0 ? `${spotsRemaining} spots remaining!` : 'All spots claimed!'}
              </p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="bg-purple-950/30 border border-purple-500/50 rounded-xl p-6 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
            >
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-400 font-semibold">LAUNCH DATE REVEAL IN</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <motion.div 
                    className="text-3xl font-bold text-white"
                    key={timeLeft.days}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {timeLeft.days}
                  </motion.div>
                  <div className="text-sm text-purple-300">Days</div>
                </div>
                <div>
                  <motion.div 
                    className="text-3xl font-bold text-white"
                    key={timeLeft.hours}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {timeLeft.hours}
                  </motion.div>
                  <div className="text-sm text-purple-300">Hours</div>
                </div>
                <div>
                  <motion.div 
                    className="text-3xl font-bold text-white"
                    key={timeLeft.minutes}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {timeLeft.minutes}
                  </motion.div>
                  <div className="text-sm text-purple-300">Minutes</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* What You Get - Simple 3-Point List */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg p-6">
              <Gift className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Free Giveaways</h3>
              <p className="text-purple-300 text-sm">Exclusive and additional entries into Elekin giveaways</p>
            </div>
            <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg p-6">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Launch Day Priority</h3>
              <p className="text-purple-300 text-sm">First to know launch date and get early bird pricing</p>
            </div>
            <div className="bg-purple-950/30 border border-purple-500/20 rounded-lg p-6">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Discord VIP Role</h3>
              <p className="text-purple-300 text-sm">Exclusive early supporter role that new members cannot get</p>
            </div>
          </motion.div>



        </div>
      </div>
    </motion.div>
  );
};

export default JoinNowPage;
