import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, Gift, Star, Mail } from 'lucide-react';
import SubscribeButton from '@/components/SubscribeButton';

const CardGalleryPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // Countdown to first card reveal (June 9th, 2025) and subsequent weekly reveals
  useEffect(() => {
    const getNextRevealDate = () => {
      const now = new Date();
      const firstReveal = new Date('2025-06-09T12:00:00'); // June 9th, 2025 at noon
      
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

  // Placeholder card data
  const cardPlaceholders = [
    { id: 1, week: 'Week 1', status: 'coming-soon' },
    { id: 2, week: 'Week 1', status: 'coming-soon' },
    { id: 3, week: 'Week 1', status: 'coming-soon' },
    { id: 4, week: 'Week 1', status: 'coming-soon' }
  ];

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

            {/* Progress Bar */}
            <div className="bg-purple-950/50 border border-purple-500/30 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
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
                <span className="text-white font-semibold">  more coming at launch!</span>
              </p>
            </div>
          </div>

          {/* Next Reveal Countdown */}
          <div className="bg-purple-950/70 border border-purple-500/30 rounded-xl p-8 mb-12 max-w-lg mx-auto text-center">
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

          {/* Card Placeholders Grid */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Preview Collection</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {cardPlaceholders.map((placeholder) => (
                <motion.div
                  key={placeholder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: placeholder.id * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-purple-900/50 border border-purple-500/30 rounded-lg p-4 aspect-[2.5/3.5] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Card back pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 to-purple-900/50"></div>
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-[url('/LogoClear.png')] bg-center bg-no-repeat bg-contain opacity-30"></div>
                    </div>
                    
                    <div className="relative z-10 text-center group-hover:opacity-0 transition-opacity duration-300">
                      <div className="text-yellow-400 font-bold text-lg mb-2">{placeholder.week}</div>
                      <div className="text-purple-300 text-sm">Coming Soon</div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <Gift className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                        <p className="text-sm">Revealed to Early Access Elementals First</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-lg px-8 py-6 rounded-xl shadow-2xl hover:scale-105 transition-all duration-200 mb-4"
              showIcon={false}
            >
              Join Early Access Elementals
            </SubscribeButton>
            
            <p className="text-sm text-purple-400">
              Full 175-card collection available at launch • No spam, just card reveals
            </p>
          </div>

          {/* Campaign Timeline */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">6-Week Reveal Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6 text-center">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">Week 1</h3>
                <p className="text-purple-200 text-sm">Common Elemental Creatures</p>
                <div className="text-xs text-purple-400 mt-2">4 cards revealed</div>
              </div>
              <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6 text-center">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">Week 2</h3>
                <p className="text-purple-200 text-sm">Runes & Counters</p>
                <div className="text-xs text-purple-400 mt-2">4 cards revealed</div>
              </div>
              <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6 text-center">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">Week 3</h3>
                <p className="text-purple-200 text-sm">Uncommon Elemental Creatures</p>
                <div className="text-xs text-purple-400 mt-2">4 cards revealed</div>
              </div>
              <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6 text-center">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">Week 4</h3>
                <p className="text-purple-200 text-sm">Shields</p>
                <div className="text-xs text-purple-400 mt-2">3 cards revealed</div>
              </div>
              <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6 text-center">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">Week 5</h3>
                <p className="text-purple-200 text-sm">Rare Elemental Creatures</p>
                <div className="text-xs text-purple-400 mt-2">4 cards revealed</div>
              </div>
              <div className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-6 text-center">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">Week 6</h3>
                <p className="text-purple-200 text-sm">Elementalists</p>
                <div className="text-xs text-purple-400 mt-2">4 cards revealed</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-purple-300 text-sm">
                <span className="text-yellow-400 font-semibold">23 total preview cards</span> • 
                <span className="text-white"> Full 175-card collection at launch</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardGalleryPage;