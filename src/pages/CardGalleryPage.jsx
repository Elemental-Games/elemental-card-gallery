import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, Gift, Star, Mail } from 'lucide-react';
import SubscribeButton from '@/components/SubscribeButton';
import { getCardImagePath, createCardImageErrorHandler } from '@/utils/imageUtils';

const CardGalleryPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  // Helper function to determine if card is available (today or earlier)
  const isCardAvailable = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const currentYear = today.getFullYear();
    
    // For cards with "May" dates, use 2024 (already released)
    if (dateString.includes('May')) {
      const targetDate = new Date(dateString + ', 2024');
      targetDate.setHours(0, 0, 0, 0);
      return targetDate <= today;
    }
    
    // For July dates, determine year based on current date
    let year = currentYear;
    const testDate = new Date(dateString + ', ' + currentYear);
    testDate.setHours(0, 0, 0, 0);
    
    // If the date in current year is more than 6 months away, use next year
    const sixMonthsFromNow = new Date(today);
    sixMonthsFromNow.setMonth(today.getMonth() + 6);
    
    if (testDate > sixMonthsFromNow) {
      year = currentYear + 1;
    }
    
    const targetDate = new Date(dateString + ', ' + year);
    targetDate.setHours(0, 0, 0, 0);
    
    return targetDate <= today;
  };

  // Helper function to determine if a date is tomorrow
  const isTomorrow = (dateString) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const currentYear = today.getFullYear();
    
    // For cards with "May" dates, use 2024 (already released)
    if (dateString.includes('May')) {
      const targetDate = new Date(dateString + ', 2024');
      return targetDate.toDateString() === tomorrow.toDateString();
    }
    
    // For July dates, determine year based on current date
    let year = currentYear;
    const testDate = new Date(dateString + ', ' + currentYear);
    
    // If the date in current year is more than 6 months away, use next year
    const sixMonthsFromNow = new Date(today);
    sixMonthsFromNow.setMonth(today.getMonth() + 6);
    
    if (testDate > sixMonthsFromNow) {
      year = currentYear + 1;
    }
    
    const targetDate = new Date(dateString + ', ' + year);
    return targetDate.toDateString() === tomorrow.toDateString();
  };

  // Helper function to format release date
  const formatReleaseDate = (dateString) => {
    if (isTomorrow(dateString)) {
      return 'Releasing Tomorrow';
    }
    
    // Add ordinal suffix for display
    const addOrdinalSuffix = (dateStr) => {
      // Extract the day number from the date string
      const dayMatch = dateStr.match(/(\w+)\s+(\d+)/);
      if (dayMatch) {
        const month = dayMatch[1];
        const day = parseInt(dayMatch[2]);
        
        const getOrdinal = (n) => {
          const s = ["th", "st", "nd", "rd"];
          const v = n % 100;
          return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };
        
        return `${month} ${getOrdinal(day)}`;
      }
      return dateStr;
    };
    
    return addOrdinalSuffix(dateString);
  };

  // Currently released cards (already available)
  const releasedCards = [
    { 
      id: 'nimblefoot', 
      name: 'Nimblefoot', 
      element: 'Earth',
      releaseDate: 'May 1' // Set to past date to show as released
    },
    { 
      id: 'tuskhammer', 
      name: 'Tuskhammer', 
      element: 'Earth',
      releaseDate: 'May 2' // Set to past date to show as released
    },
    { 
      id: 'terra', 
      name: 'Terra', 
      element: 'Earth',
      releaseDate: 'May 3' // Set to past date to show as released
    },
    { 
      id: 'swoop', 
      name: 'Swoop', 
      element: 'Air',
      releaseDate: 'July 1'
    },
    { 
      id: 'dumoles', 
      name: 'Dumoles', 
      element: 'Earth',
      releaseDate: 'July 2'
    },
    { 
      id: 'nimbus', 
      name: 'Nimbus', 
      element: 'Air',
      releaseDate: 'July 3'
    },
    { 
      id: 'galea', 
      name: 'Galea', 
      element: 'Water',
      releaseDate: 'July 4'
    },
    { 
      id: 'balon', 
      name: 'Balon', 
      element: 'Fire',
      releaseDate: 'July 5'
    }
  ];

  // Full card reveal schedule (upcoming cards)
  const upcomingMarketingCards = [
    { 
      id: 'lifebound-armour', 
      name: 'Lifebound Armour', 
      element: 'Earth',
      releaseDate: 'July 8'
    },
    { 
      id: 'rapid-recovery', 
      name: 'Rapid Recovery', 
      element: 'Water',
      releaseDate: 'July 9'
    },
    { 
      id: 'essence-exchange', 
      name: 'Essence Exchange', 
      element: 'Special',
      releaseDate: 'July 10'
    },
    { 
      id: 'revival-rain', 
      name: 'Revival Rain', 
      element: 'Water',
      releaseDate: 'July 11'
    },
    { 
      id: 'guardians-sanctuary', 
      name: "Guardian's Sanctuary", 
      element: 'Earth',
      releaseDate: 'July 12'
    },
    { 
      id: 'draconic-shield', 
      name: 'Draconic Shield', 
      element: 'Fire',
      releaseDate: 'July 12'
    },
    { 
      id: 'celestial-fortress', 
      name: 'Celestial Fortress', 
      element: 'Air',
      releaseDate: 'July 12'
    },
    { 
      id: 'ember-flicker', 
      name: 'Ember Flicker', 
      element: 'Fire',
      releaseDate: 'July 15'
    },
    { 
      id: 'lavrok', 
      name: 'Lavrok', 
      element: 'Fire',
      releaseDate: 'July 16'
    },
    { 
      id: 'ignus', 
      name: 'Ignus', 
      element: 'Fire',
      releaseDate: 'July 17'
    },
    { 
      id: 'osao', 
      name: 'Osao', 
      element: 'Earth',
      releaseDate: 'July 18'
    },
    { 
      id: 'aqua-dart', 
      name: 'Aqua Dart', 
      element: 'Water',
      releaseDate: 'July 21'
    },
    { 
      id: 'malletin', 
      name: 'Malletin', 
      element: 'Earth',
      releaseDate: 'July 22'
    },
    { 
      id: 'torrent', 
      name: 'Torrent', 
      element: 'Water',
      releaseDate: 'July 23'
    },
    { 
      id: 'mek', 
      name: 'Mek', 
      element: 'Earth',
      releaseDate: 'July 24'
    }
  ];

  // Combine all cards and add status
  const allMarketingCards = [...releasedCards, ...upcomingMarketingCards];

  // Add status based on release date - recalculate when lastUpdateTime changes
  const cardsWithStatus = useMemo(() => {
    return allMarketingCards.map(card => {
      // Force certain cards to be available regardless of date logic
      if (card.id === 'galea' || card.id === 'balon') {
        return {
          ...card,
          status: 'available',
          displayDate: formatReleaseDate(card.releaseDate)
        };
      }
      
      const isAvailable = isCardAvailable(card.releaseDate);
      
      return {
        ...card,
        status: isAvailable ? 'available' : 'upcoming',
        displayDate: formatReleaseDate(card.releaseDate)
      };
    });
  }, [lastUpdateTime, allMarketingCards]);

  // Sort cards: released cards first, then upcoming cards by release date
  const sortedCards = useMemo(() => {
    return cardsWithStatus.sort((a, b) => {
      if (a.status === 'available' && b.status === 'upcoming') return -1;
      if (a.status === 'upcoming' && b.status === 'available') return 1;
      
      // If both have same status, sort by release date
      const currentYear = new Date().getFullYear();
      const dateA = new Date(a.releaseDate + ', ' + currentYear);
      const dateB = new Date(b.releaseDate + ', ' + currentYear);
      return dateA - dateB;
    });
  }, [cardsWithStatus]);

  // Calculate collection progress
  const availableCards = useMemo(() => {
    return sortedCards.filter(card => card.status === 'available');
  }, [sortedCards]);
  
  // Total cards to be released before launch: 29 (3 already released + 20 upcoming + 6 more)
  const totalCardsBeforeLaunch = 29;
  const cardsLeftToRelease = totalCardsBeforeLaunch - availableCards.length;

  // For display, show first 6 cards (prioritizing released cards first)
  const marketingCards = useMemo(() => {
    return sortedCards.slice(0, 6);
  }, [sortedCards]);

  // Countdown to first card reveal (June 23rd, 2025) and subsequent weekly reveals
  useEffect(() => {
    const getNextRevealDate = () => {
      const now = new Date();
      const firstReveal = new Date('2025-06-23T12:00:00'); // June 23rd, 2025 at noon
      
      // If we haven't reached the first reveal date yet
      if (now < firstReveal) {
        return firstReveal;
      }
      
      // Calculate weeks since first reveal for subsequent reveals (every Monday)
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

  // Force re-render when cards should be revealed
  useEffect(() => {
    const checkForCardUpdates = () => {
      const now = Date.now();
      // Check every hour if any cards should be revealed
      if (now - lastUpdateTime > 60 * 60 * 1000) { // 1 hour
        setLastUpdateTime(now);
      }
    };

    const interval = setInterval(checkForCardUpdates, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, [lastUpdateTime]);

  const [showFullCollection, setShowFullCollection] = useState(false);

  return (
    <>
      <Helmet>
        <title>Card Gallery - Elekin TCG Campaign Preview</title>
        <meta name="description" content="Follow our 6-week card reveal campaign leading up to launch. Early Access Elementals get notified first when new cards are revealed!" />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C] text-white">
        <div className="container mx-auto px-4 py-12">
          
          {/* Campaign Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-yellow-300 font-semibold">6-WEEK CARD REVEAL CAMPAIGN</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Elekin Card <span className="text-yellow-400">Preview Gallery</span>
            </h1>
            
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
              Watch our collection grow <span className="text-yellow-400 font-bold">each week</span> over the next 6 weeks. 
              <span className="text-white font-semibold"> Early Access Elementals get notified first</span> when new cards are revealed each week!
            </p>
          </div>

          {/* 6-Week Reveal Timeline - MOVED TO TOP */}
          <div className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">6-Week Reveal Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-800/30 to-green-900/50 border-2 border-green-500/50 rounded-xl p-6 text-center
                              shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <img src="/images/cards/new-marketing/earth silver.webp" alt="Earth" className="w-14 h-12 mr-3" />
                  <h3 className="text-green-400 font-bold text-xl">Week 1: Grivoss</h3>
                </div>
                <p className="text-green-200 text-base mb-2">Earth Kingdom & Earth Creatures</p>
                <p className="text-purple-300 text-sm mb-2">Grivoss Area • 3 Earth Creatures • 1 Elementalist</p>
                <div className="text-sm text-green-400 mt-2 font-semibold">4 cards revealed</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-600/30 to-gray-800/50 border-2 border-gray-400/50 rounded-xl p-6 text-center
                              shadow-[0_0_25px_rgba(156,163,175,0.4)] hover:shadow-[0_0_40px_rgba(156,163,175,0.6)] transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <img src="/images/cards/new-marketing/air silver.webp" alt="Air" className="w-14 h-12 mr-3" />
                  <h3 className="text-gray-300 font-bold text-xl">Week 2: Zalos</h3>
                </div>
                <p className="text-gray-200 text-base mb-2">Air Kingdom & Air Creatures</p>
                <p className="text-purple-300 text-sm mb-2">Zalos Area • 3 Air Creatures • 1 Elementalist</p>
                <div className="text-sm text-gray-300 mt-2 font-semibold">4 cards revealed</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-700/30 to-purple-900/50 border-2 border-purple-400/50 rounded-xl p-6 text-center
                              shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <img src="/icons/Rune.png" alt="Rune" className="w-8 h-13 mr-2 -mb-5" />
                  <h3 className="text-purple-400 font-bold text-xl -mb-5">Week 3: Evermere</h3>
                </div>
                <p className="text-purple-200 text-base mb-2 mt-8">Central Kingdom & Non-Creatures</p>
                <p className="text-purple-300 text-sm mb-2">Evermere Area • 2 Runes • 2 Counters • 3 Shields</p>
                <div className="text-sm text-purple-200 mt-2 font-semibold">7 cards revealed</div>
              </div>
              
              <div className="bg-gradient-to-br from-red-800/30 to-red-900/50 border-2 border-red-500/50 rounded-xl p-6 text-center
                              shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <img src="/images/cards/new-marketing/fire silver.webp" alt="Fire" className="w-14 h-12 mr-3" />
                  <h3 className="text-red-400 font-bold text-xl">Week 4: Scarto</h3>
                </div>
                <p className="text-red-200 text-base mb-2">Fire Kingdom & Fire Creatures</p>
                <p className="text-purple-300 text-sm mb-2">Scarto Area • 3 Fire Creatures • 1 Elementalist</p>
                <div className="text-sm text-red-400 mt-2 font-semibold">4 cards revealed</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/50 border-2 border-blue-500/50 rounded-xl p-6 text-center
                              shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <img src="/images/cards/new-marketing/water silver.webp" alt="Water" className="w-14 h-12 mr-3" />
                  <h3 className="text-blue-400 font-bold text-xl">Week 5: Tsunareth</h3>
                </div>
                <p className="text-blue-200 text-base mb-2">Water Kingdom & Water Creatures</p>
                <p className="text-purple-300 text-sm mb-2">Tsunareth Area • 3 Water Creatures • 1 Elementalist</p>
                <div className="text-sm text-blue-400 mt-2 font-semibold">4 cards revealed</div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-700/30 to-orange-800/50 border-2 border-yellow-500/50 rounded-xl p-6 text-center
                              shadow-[0_0_25px_rgba(234,179,8,0.4)] hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-5xl mr-2 mt-3 -mb-5">🐉</span>
                  <h3 className="text-yellow-400 font-bold text-xl mt-3 -mb-5">Week 6: Dragons</h3>
                </div>
                <p className="text-yellow-200 text-base mb-2 mt-7">Kinbrold Sub-Regions & Dragons</p>
                <p className="text-purple-300 text-sm mb-2">6 Sub-Regions • 6 Dragon Cards</p>
                <div className="text-sm text-yellow-400 mt-2 font-semibold">6 cards revealed</div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-purple-300 text-base">
                <span className="text-yellow-400 font-semibold">29 total preview cards</span> • 
                <span className="text-white"> 12 Creatures • 6 Dragons • 4 Elementalists • 3 Shields • 2 Runes • 2 Counters</span>
                <span className="text-yellow-400 font-semibold"><br></br>11 areas unlocked</span> • 
                <span className="text-white"> 5 Kingdoms • 6 Sub-Regions</span>
              </p>
            </div>
          </div>

          {/* Progress Bar & Next Reveal */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-purple-950/50 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg text-purple-300">Pre-Kickstarter Campaign Progress</span>
                <span className="text-xl text-yellow-400 font-bold">Week 0 of 6</span>
              </div>
              <div className="w-full bg-purple-800/30 rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-4 rounded-full transition-all duration-500"
                  style={{ width: '0%' }}
                ></div>
              </div>
              <p className="text-base text-center text-purple-300">
                <span className="text-yellow-400 font-bold">0 cards revealed</span> • 
                  <span className="text-white font-semibold"> more coming at launch!</span>
              </p>
          </div>

          {/* Next Reveal Countdown */}
              <div className="bg-purple-950/70 border border-purple-500/30 rounded-xl p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-yellow-400 font-semibold text-xl">NEXT REVEAL IN</span>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-sm text-purple-300">Days</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-sm text-purple-300">Hours</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-sm text-purple-300">Minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Collection */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-center flex-1">🎉 Released Preview Collection</h2>
              <button
                onClick={() => setShowFullCollection(!showFullCollection)}
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg border border-purple-500/50 transition-all duration-300"
              >
                {showFullCollection ? 'Show Preview Only' : 'Show Full Collection'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {marketingCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.id * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-purple-900/50 border border-purple-500/30 rounded-lg p-2 aspect-[2.5/3.5] relative overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
                    {card.status === 'available' ? (
                      <>
                        {/* Available card - show actual image */}
                        <img 
                          src={getCardImagePath(card).marketingPath}
                          alt={card.name}
                          className={`w-full h-full object-contain rounded-lg ${
                            ['guardians-sanctuary', 'draconic-shield', 'celestial-fortress'].includes(card.id) 
                              ? 'transform rotate-90' 
                              : ''
                          }`}
                          onError={createCardImageErrorHandler(card)}
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          RELEASED
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 rounded-b-lg">
                          <div className="text-sm font-bold text-center">{card.name}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Upcoming card - show card back with countdown */}
                        <img 
                          src="/Card_Back.png" 
                          alt="Card Back"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <div className="text-center p-2">
                            <div className="text-yellow-400 font-bold text-sm mb-1">{card.name}</div>
                            <div className="text-orange-400 text-xs mb-2">🔒 Coming Soon</div>
                            <div className="text-purple-200 text-xs">{card.displayDate}</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {showFullCollection && (
                <>
                  {/* Show remaining upcoming cards with names and dates */}
                  {sortedCards.slice(6).map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (6 + index) * 0.1 }}
                      className="relative group"
                    >
                      <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-2 aspect-[2.5/3.5] relative overflow-hidden">
                        <img 
                          src="/Card_Back.png" 
                          alt="Card Back"
                          className="w-full h-full object-contain rounded-lg opacity-50"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-center p-2">
                            <div className="text-yellow-400 font-bold text-xs mb-1">{card.name}</div>
                            <div className="text-orange-400 text-xs mb-1">🔒 Coming Soon</div>
                            <div className="text-purple-200 text-xs">{card.displayDate}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Fill remaining slots with placeholder cards if needed */}
                  {sortedCards.length < 12 && [...Array(12 - sortedCards.length)].map((_, index) => (
                    <motion.div
                      key={`placeholder-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (sortedCards.length + index) * 0.1 }}
                      className="relative group"
                    >
                      <div className="bg-purple-900/20 border border-purple-500/10 rounded-lg p-2 aspect-[2.5/3.5] relative overflow-hidden">
                        <img 
                          src="/Card_Back.png" 
                          alt="Card Back"
                          className="w-full h-full object-contain rounded-lg opacity-30"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="text-center p-2">
                            <div className="text-purple-400 text-xs">More Coming</div>
                            <div className="text-purple-400 text-xs">at Launch!</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
            
            <div className="text-center mt-6">
              <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-4 inline-block">
                <div className="text-lg font-bold text-yellow-400 mb-2">
                  📊 Collection Progress
                </div>
                <div className="text-sm text-purple-200">
                  <span className="text-green-400 font-bold">{availableCards.length} Cards Released Now</span> • 
                  <span className="text-orange-400"> {cardsLeftToRelease} More Coming Before Launch</span> • 
                  <span className="text-purple-300"> 155+ More at Launch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-purple-950/70 to-blue-950/70 border border-purple-500/30 rounded-xl p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Get Notified About New Card Reveals</h2>
            <p className="text-lg mb-6 text-purple-200">
              Join the <span className="text-yellow-400 font-bold">first 500 Early Access Elementals</span> and be the first to know when new cards are revealed each week!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="font-bold mb-2">Email Notifications</h3>
                <p className="text-sm text-purple-300">Get notified the moment new cards go live</p>
              </div>
              <div className="text-center">
                <Gift className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="font-bold mb-2">Exclusive Benefits</h3>
                <p className="text-sm text-purple-300">OG status and launch day rewards</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="font-bold mb-2">Community Access</h3>
                <p className="text-sm text-purple-300">Join Discord with exclusive role</p>
              </div>
            </div>

            <SubscribeButton 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-lg px-8 py-6 rounded-xl 
                         shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:shadow-[0_0_50px_rgba(234,179,8,0.8)] 
                         border-2 border-yellow-500/60 hover:border-yellow-400/80 transition-all duration-300 hover:scale-105 mb-4"
              showIcon={false}
            >
              Join the Email List Now
            </SubscribeButton>
            
            <p className="text-sm text-purple-400">
              Full 175-card collection available at launch
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardGalleryPage;