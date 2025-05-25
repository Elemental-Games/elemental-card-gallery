import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Helmet } from 'react-helmet-async';
import EmailSignup from '../components/EmailSignup';
import { useState, useEffect } from 'react';
import { Clock, Users, Star, Zap, Gift, Crown, Trophy } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SocialCard = ({ platform, icon, memberCount, link }) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
    >
      <div className="absolute inset-0 bg-purple-500/20 blur-[50px] rounded-full group-hover:bg-purple-500/30 transition-colors duration-300" />
      <div className="relative bg-purple-950/70 p-6 rounded-lg border border-purple-500/30 
        hover:border-purple-500/50 transition-all duration-300 group">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{platform}</h3>
          <p className="text-purple-200">{memberCount} members</p>
        </div>
      </div>
    </a>
  );
};

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

  // Countdown to Launch Date Reveal (July 19, 2025)
  useEffect(() => {
    const targetDate = new Date('2025-07-19T12:00:00Z');
    
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
      className="min-h-screen bg-[#1A103C]"
    >
      <Helmet>
        <title>Claim Your Elekin Early Access - Limited Early Access Elemental Spots</title>
        <meta name="description" content="Join the exclusive first 500 Early Access Elementals of Elekin TCG. Get OG Discord status, preview pack, and early launch access. Limited spots available." />
        <meta name="keywords" content="Elekin early access, Early Access Elemental, TCG pre-launch, exclusive preview, OG Discord status" />
        <meta property="og:title" content="Elekin TCG - Exclusive Early Access Elemental Access" />
        <meta property="og:description" content="Claim your spot among the elite first 500 Early Access Elementals. Limited time before launch date reveal!" />
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
                  "text": "Yes! That&apos;s what makes our game so unique is that it has a very simplified gameplay and battle mechanic that simply...just makes sense! This allows for newcomers to easily pick-up and play Elekin."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Elekin unique?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Besides our On-Card Technology in the form of a unique QR code, in-game we have a Shield system that protects you from your opponent&apos;s attacks. This is a system that&apos;s never before seen in the TCG world. Lastly, our battling mechanic of using Strength for damage and health and Agility for attack speed, blocking capabilities, and dodging slower attacks is ideal for a new and refreshing gameplay experience."
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
                  "text": "Of course! You can attend our live streams on TikTok and ask our creators any questions during their weekly Q&A sessions. Also, you can join our discord and shoot some messages out there as they&apos;re quite active."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      {/* HERO SECTION */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Exclusive Badge */}
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-6">
            <Crown className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-300 font-semibold">EARLY ACCESS ELEMENTAL STATUS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Secure Your Spot
            <br />
            Among the Top <span className="text-yellow-400">500</span>
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
          </h1>

          {/* Urgency Subheadline */}
          <p className="text-xl lg:text-2xl text-purple-200 mb-8">
            Be part of the <span className="text-yellow-400 font-bold">exclusive Early Access Elemental community</span> and unlock 
            <span className="text-white font-semibold"> OG status, free giveaways,</span> and launch day privileges
          </p>

          {/* Countdown Timer */}
          <div className="bg-red-950/30 border border-red-500/50 rounded-xl p-6 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-400 font-semibold">LAUNCH DATE REVEAL IN</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-sm text-red-300">Days</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-sm text-red-300">Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-sm text-red-300">Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SIGNUP SECTION */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* LEFT: Benefits & Value Prop */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Gift className="w-16 h-16 text-yellow-400 mr-3" />
                Your Early Access Elemental Benefits
              </h2>
              
              <div className="space-y-6">
                <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                      <Crown className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">OG Elemental Status</h3>
                      <p className="text-purple-300">Exclusive Early Access Elemental Discord role, special privileges & access that new elementals will never get</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                      <Gift className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Exclusive Giveaway Access</h3>
                      <p className="text-purple-300">Free booster pack giveaways, starter deck opportunities, limited edition cards & exclusive merchandise</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Launch Day VIP Treatment</h3>
                      <p className="text-purple-300">First to know launch date, priority ordering access, and exclusive Early Bird pricing opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Users className="w-5 h-5 text-green-400 mr-2" />
                Early Access Elementals Secured
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-300">Elementals Secured</span>
                  <span className="text-sm text-yellow-400 font-bold">{signupCount}/500</span>
                </div>
                <div className="w-full bg-purple-800/30 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((signupCount / 500) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-center text-green-300">
                  {spotsRemaining > 0 ? `${spotsRemaining} Early Access Elemental spots remaining!` : 'All Early Access Elemental spots claimed!'}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Email Signup Form */}
          <div className="bg-purple-950/70 p-8 rounded-xl border border-purple-500/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Secure Your Early Access Elemental Status</h2>
              <p className="text-purple-200">Join the exclusive first 500 elementals with one simple step</p>
            </div>
            
            <div className="space-y-6">
              {/* Email Signup */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-center flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                  Early Access Elemental Access
                </h3>
                <EmailSignup 
                  buttonClassName="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg"
                  buttonText="Become an Early Access Elemental"
                />
                <p className="text-sm text-purple-300 text-center mt-3">
                  Instant confirmation + Discord invite with OG elemental role
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-purple-500/30">
              <div className="flex items-center justify-center space-x-6 text-sm text-purple-300">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  <span>No Spam</span>
                </div>
                <div className="flex items-center">
                  <Crown className="w-4 h-4 mr-1" />
                  <span>Exclusive Benefits</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1" />
                  <span>Instant Access</span>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-xs text-purple-400">
                  By joining, you&apos;ll receive exclusive Early Access Elemental emails and Discord access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SocialCard 
              platform="Discord"
              icon={
                <svg width="32" height="32" viewBox="0 0 127.14 96.36" className="fill-current text-white">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
              }
              memberCount="1,300+"
              link="https://discord.gg/PVrgZBmcMq"
            />
            <SocialCard 
              platform="TikTok"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512" className="fill-current text-white">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              }
              memberCount="10"
              link="https://www.tiktok.com/@elekin_tcg"
            />
            <SocialCard 
              platform="Instagram"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512" className="fill-current text-white">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              }
              memberCount="15"
              link="https://instagram.com/elekin_TCG"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1">
              <AccordionTrigger>Can the average person pick up and play Elekin?</AccordionTrigger>
              <AccordionContent>
                Yes! That&apos;s what makes our game so unique is that it has a very simplified gameplay and battle mechanic that simply...just makes sense! This allows for newcomers to easily pick-up and play Elekin.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What makes Elekin unique?</AccordionTrigger>
              <AccordionContent>
                Besides our On-Card Technology in the form of a unique QR code, in-game we have a Shield system that protects you from your opponent&apos;s attacks. This is a system that&apos;s never before seen in the TCG world. Lastly, our battling mechanic of using Strength for damage and health and Agility for attack speed, blocking capabilities, and dodging slower attacks is ideal for a new and refreshing gameplay experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How long does a typical game take?</AccordionTrigger>
              <AccordionContent>
                The average game takes 20-25 minutes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How can I participate in playtests?</AccordionTrigger>
              <AccordionContent>
                Join our community in Discord, attend our live streams on TikTok, or write our support team an email requesting to participate (Discord, TikTok, and email link).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Will there be opportunities to interact with the creator?</AccordionTrigger>
              <AccordionContent>
                Of course! You can attend our live streams on TikTok and ask our creators any questions during their weekly Q&A sessions. Also, you can join our discord and shoot some messages out there as they&apos;re quite active.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Final CTA */}
        <div className="text-center">
          <div className="max-w-md mx-auto bg-purple-950/70 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-xl font-semibold mb-4 text-center">Don&apos;t Miss Your Chance!</h3>
            <p className="text-purple-300 mb-4 text-sm">
              Only {spotsRemaining} Early Access Elemental spots remaining
            </p>
            <EmailSignup 
              buttonClassName="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-3"
              buttonText="Become an Early Access Elemental"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JoinNowPage;
