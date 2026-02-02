import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Book, LayoutGrid, Map, Star, X, Gift, PlayCircle, Users, ShoppingBag } from 'lucide-react';
import AnimatedCardBackground from '@/components/landing/AnimatedCardBackground';
import KeyFeatures from '../components/KeyFeatures';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import SubscribeButton from '@/components/SubscribeButton';
import { motion, AnimatePresence } from 'framer-motion';
import TrackedLink from '@/components/TrackedLink';
import KickstarterCountdown from '@/components/KickstarterCountdown';
import SignupForm from '@/components/auth/SignupForm';

const kingdoms = [
  { name: 'Grivoss', element: 'Earth', description: 'Mountain fortresses carved from living stone.', color: 'bg-green-300', hoverColor: 'hover:bg-green-400', path: '/kinbrold/grivoss', icon: 'images/cards/new-marketing/earth silver.webp' },
  { name: 'Zalos', element: 'Air', description: 'Sky cities that float among the clouds.', color: 'bg-gray-300', hoverColor: 'hover:bg-gray-400', path: '/kinbrold/zalos', icon: 'images/cards/new-marketing/air silver.webp' },
  { name: 'Scarto', element: 'Fire', description: 'Volcanic cities built inside active craters.', color: 'bg-red-300', hoverColor: 'hover:bg-red-400', path: '/kinbrold/scarto', icon: 'images/cards/new-marketing/fire silver.webp' },
  { name: 'Tsunareth', element: 'Water', description: 'Riverside cities accompanied by the tides.', color: 'bg-blue-300', hoverColor: 'hover:bg-blue-400', path: '/kinbrold/tsunareth', icon: 'images/cards/new-marketing/water silver.webp' },
];

const LandingPage = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasTriggeredExitIntent, setHasTriggeredExitIntent] = useState(false);
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

  // Discord link handler for exit intent popup
  const handleDiscordJoinFromExitIntent = () => {
    window.open('https://discord.gg/QyNDMYprCg', '_blank', 'noopener,noreferrer');
    setShowExitIntent(false);
    setExitIntentSuccess(false);
  };

  // Handle email signup success in exit intent
  const handleExitIntentEmailSuccess = () => {
    setExitIntentSuccess(true);
  };

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Elekin TCG - Kickstarter Launch February 17, 2026</title>
        <meta name="description" content="Get notified for our Kickstarter launch! Early bird pricing + exclusive rewards. Launching February 17, 2026." />
        <meta property="og:title" content="Elekin TCG - Kickstarter Launch February 17, 2026" />
        <meta property="og:description" content="Get notified for our Kickstarter launch! Early bird pricing + exclusive rewards. Launching February 17, 2026." />
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
              Revolutionary mechanics that reward strategic thinking. Perfect for new and veteran TCG players seeking the next best TCG to hit the market.
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
             {/* Instagram Button */}
             <a
               href="https://www.instagram.com/elekin_tcg/"
               target="_blank"
               rel="noopener noreferrer"
               className="group"
             >
               <div className="bg-gradient-to-br from-pink-950/70 to-purple-900/50 border-2 border-pink-500/60 rounded-xl p-4
                               shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]
                               transition-all duration-300 hover:scale-105 cursor-pointer">
                 <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 
                                    text-white font-bold text-lg px-6 py-3 rounded-xl shadow-lg 
                                    transition-all duration-300 hover:scale-105 flex items-center gap-2">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                     <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                   </svg>
                   Instagram
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
               href="https://discord.gg/QyNDMYprCg"
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
                  // SUCCESS STATE - Thank you message
                  <>
                    <div className="mb-6">
                      <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold mb-2 text-green-400">You&apos;re Signed Up!</h2>
                      <p className="text-xl text-green-300 font-semibold">Kickstarter launch notifications confirmed!</p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-6">
                      <p className="text-white mb-4">
                        You&apos;ll be notified when our <span className="text-yellow-400 font-bold">Kickstarter launches on February 17, 2026</span>!
                      </p>
                      <p className="text-purple-200 text-sm mb-4">
                        Check your inbox for your welcome email with early bird pricing details and exclusive rewards.
                      </p>
                    </div>

                    <Button
                      onClick={handleDiscordJoinFromExitIntent}
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg rounded-lg shadow-lg mb-4"
                    >
                      Join Discord Community →
                    </Button>

                    <button 
                      onClick={() => {setShowExitIntent(false); setExitIntentSuccess(false);}}
                      className="w-full bg-purple-800/50 hover:bg-purple-700/50 text-purple-200 hover:text-white border border-purple-500/30 font-medium py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      Continue exploring
                    </button>
                  </>
                ) : (
                  // KICKSTARTER FOCUSED STATE
                  <>
                    <div className="mb-6">
                      <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-yellow-400" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">Don&apos;t Miss Our Kickstarter Launch!</h2>
                      <p className="text-base lg:text-lg text-purple-200 font-medium">Get notified for early bird pricing + exclusive rewards</p>
                    </div>

                    {/* Countdown in popup */}
                    <div className="mb-6">
                      <KickstarterCountdown showLabel={false} />
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500/15 to-purple-500/10 border border-yellow-500/40 rounded-xl p-4 mb-4">
                      <h3 className="text-yellow-400 font-bold mb-3 text-center">🎁 What You Get:</h3>
                      <div className="space-y-2">
                        <div className="flex items-center bg-purple-900/30 rounded-lg p-3">
                          <Star className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">Early bird pricing (20-30% off)</span>
                        </div>
                        <div className="flex items-center bg-purple-900/30 rounded-lg p-3">
                          <Gift className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">Exclusive launch day rewards</span>
                        </div>
                        <div className="flex items-center bg-purple-900/30 rounded-lg p-3">
                          <Star className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">First access to Kickstarter page</span>
                        </div>
                        <div className="flex items-center bg-purple-900/30 rounded-lg p-3">
                          <Gift className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                          <span className="text-white font-medium">VIP status in community</span>
                        </div>
                      </div>
                    </div>

                    {/* EMAIL CAPTURE FORM */}
                    <SignupForm 
                      buttonClassName="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-purple-900 font-bold py-5 text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                      onSuccess={handleExitIntentEmailSuccess}
                      source="exit_intent_popup"
                    />

                    <button 
                      onClick={() => setShowExitIntent(false)}
                      className="w-full text-purple-300 hover:text-white text-sm mt-3 transition-colors"
                    >
                      Maybe later
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
          Get Free Access
        </SubscribeButton>
      </div>


      
      {/* HERO SECTION - KICKSTARTER FOCUSED */}
      <section className="container mx-auto px-4 py-16 lg:py-24 relative z-10 -mb-20">
        <div className="max-w-6xl mx-auto text-center -mt-20">
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-300 font-semibold">KICKSTARTER LAUNCH</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            Kickstarter Launch:
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
              February 17, 2026
            </motion.span>
          </h1>

          <p className="text-xl lg:text-2xl text-purple-200 mb-6 max-w-4xl mx-auto">
            Get Early Access + Exclusive Rewards
          </p>

          {/* Countdown Timer */}
          <div className="mb-8 flex justify-center">
            <KickstarterCountdown showLabel={false} />
          </div>

          {/* Email Capture Form - Primary CTA */}
          <div className="max-w-md mx-auto mb-8">
            <SignupForm 
              buttonClassName="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-6 text-lg" 
              source="kickstarter_landing_hero"
            />
          </div>

          {/* Secondary CTA - Shop Now */}
          <div className="mt-8">
            <TrackedLink to="/shop">
              <Button
                variant="outline"
                size="lg"
                className="bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 font-semibold py-5 px-8 text-xl lg:text-2xl rounded-xl"
              >
                <ShoppingBag className="mr-3 h-6 w-6 lg:h-7 lg:w-7" />
                Shop Demo Day Edition
              </Button>
            </TrackedLink>
          </div>
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
          <TrackedLink to="/shop">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              >
                <LayoutGrid className="mr-3 h-8 w-8" />
              Shop Demo Day Products
              </Button>
            </TrackedLink>
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
