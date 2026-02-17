import { Link, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Book, X, Zap, Users, Gamepad2, Calendar, PlayCircle, Shield, Star, MapPin, Store, Trophy, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { subscribeEmail } from '@/utils/api';
import confetti from 'canvas-confetti';
import { CheckCircle, Info as InfoIcon } from 'lucide-react';
import CardDetailSidebar from '@/components/CardDetailSidebar';

const ElekinPage = () => {
  const location = useLocation();
  
  // State for email subscription
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Scroll to section if hash is present
  useEffect(() => {
    if (location.hash === '#where-to-find-elekin') {
      setTimeout(() => {
        const element = document.getElementById('where-to-find-elekin');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  // If on /elekin (not /elekin/overview), redirect to overview
  if (location.pathname === '/elekin') {
    return <Navigate to="/elekin/overview" replace />;
  }

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

        {/* Where to Find Elekin Section */}
        <section id="where-to-find-elekin" className="container mx-auto px-4 py-16 -mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-4">
                <Store className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-yellow-300 font-semibold">NOW IN STORES</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-4">
                Where to Find Elekin
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Elekin is now available at select game stores across the US. Visit these locations to pick up your deck, join demo days, and compete in tournaments!
              </p>
            </motion.div>

            {/* Store Locations */}
            <div className="mb-12">
              {/* Top 3 stores */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {[
                  { name: 'Mulligan Games', location: 'Warminster, PA', url: 'https://www.instagram.com/mulligangames/?hl=en', inStock: true },
                  { name: 'Noble Knight Games', location: 'Fitchburg, WI', url: 'https://www.nobleknight.com/', inStock: true },
                  { name: "Frank's Card Shop", location: 'Sicklerville, NJ', url: 'https://frankscardshopnj.com', inStock: true }
                ].map((store, index) => (
                  <motion.a
                    key={store.name}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-transparent p-6 rounded-xl border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:border-yellow-400 transition-all duration-300 cursor-pointer group relative"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-500/20 p-3 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                        <Store className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{store.name}</h3>
                          <ExternalLink className="w-4 h-4 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center text-purple-200 mb-2">
                          <MapPin className="w-4 h-4 mr-2 text-purple-300" />
                          <span>{store.location}</span>
                        </div>
                        {store.inStock && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="relative flex items-center justify-center">
                              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                              <div className="w-3 h-3 bg-green-400 rounded-full absolute animate-ping opacity-75"></div>
                            </div>
                            <span className="text-xs font-semibold text-green-400">In Stock</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
              
              {/* Bottom 2 stores - centered */}
              <div className="flex justify-center gap-6">
                {[
                  { name: "Gamer's Heaven", location: 'Phoenixville, PA', url: 'https://pxv.gamersheaven.com/', comingSoon: true },
                  { name: 'Alternate Universes', location: '3 Locations in PA', url: 'https://alternateu.com/', comingSoon: true }
                ].map((store, index) => (
                  <motion.a
                    key={store.name}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                    className="bg-transparent p-6 rounded-xl border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:border-yellow-400 transition-all duration-300 cursor-pointer group w-full max-w-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-500/20 p-3 rounded-lg group-hover:bg-yellow-500/30 transition-colors">
                        <Store className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{store.name}</h3>
                          <ExternalLink className="w-4 h-4 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center text-purple-200 mb-2">
                          <MapPin className="w-4 h-4 mr-2 text-purple-300" />
                          <span>{store.location}</span>
                        </div>
                        {store.comingSoon && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span className="text-xs font-semibold text-yellow-400">Coming Soon</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Demo Days & Tournament Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Demo Days Card */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 rounded-xl border-2 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-500/30 p-3 rounded-lg">
                    <Calendar className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Demo Days</h3>
                </div>
                <p className="text-purple-200 mb-6">
                  Join us for demo days at our partner stores! Learn how to play, try out different decks, and meet other Elekin players.
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3 opacity-50">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold line-through">Feb 3rd</p>
                        <p className="text-purple-200 text-sm line-through">Gamer&apos;s Heaven - Phoenixville, PA</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3 opacity-50">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold line-through">Feb 6th</p>
                        <p className="text-purple-200 text-sm line-through">Alternate Universes - Blue Bell, PA</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3 opacity-50">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold line-through">Feb 7th</p>
                        <p className="text-purple-200 text-sm line-through">Mulligan Games - Warminster, PA</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-400/40 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-yellow-400 font-semibold">More Demo Days Coming Soon!</p>
                        <p className="text-purple-200 text-sm">New dates will be announced after our Kickstarter campaign</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tournament Card */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-8 rounded-xl border-2 border-yellow-400/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-yellow-500/30 p-3 rounded-lg">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Tournaments</h3>
                </div>
                <p className="text-purple-200 mb-6">
                  Compete against other players in official Elekin tournaments! Show off your skills and compete for prizes.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-lg p-4 opacity-50 mb-3">
                  <div className="flex items-start gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold text-lg mb-1 line-through">Feb 13th</p>
                      <p className="text-purple-200 line-through">Mulligan Games - Warminster, PA</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-400/40 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-400 font-bold text-lg mb-1">Coming Post-Launch</p>
                      <p className="text-purple-200">Organized play and tournament events will be announced after our Kickstarter campaign wraps up.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Navigation Hub */}
        <section className="container mx-auto px-4 py-12 -mt-24">
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
              <Link to="/cards">
                <motion.div
                  className="group relative bg-transparent p-8 rounded-xl border-2 border-purple-400 hover:border-yellow-400 transition-all duration-300 h-full shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Calendar className="w-16 h-16 text-yellow-400 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-4">View Card Gallery</h3>
                  <p className="text-purple-200 mb-6">
                    Explore all released cards from the Pre-Launch Demo Day Edition.
                  </p>
                  <div className="flex text-2xl items-center text-yellow-400 font-semibold group-hover:text-yellow-300">
                    <Gamepad2 className="w-8 h-8 mr-2" />
                    View Gallery
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
                <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
                <p className="text-purple-200 mb-6">
                  Join our community and get first access to products, updates, and community perks.
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