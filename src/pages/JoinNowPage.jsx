import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Star, Gift, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import KickstarterCountdown from '@/components/KickstarterCountdown';
import SignupForm from '@/components/auth/SignupForm';
import { trackKickstarterPageView, trackKickstarterNotifyClick } from '@/utils/analytics';

const JoinNowPage = () => {
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    trackKickstarterPageView();
  }, []);

  const rewardTiers = [
    {
      name: 'Early Bird',
      price: '$75',
      originalPrice: '$90',
      description: '2-Player Starter Bundle',
      benefits: [
        '2 Starter Decks',
        '10 Booster Packs',
        '2 Game Mats',
        'Early Bird Exclusive Cards',
        'Free Shipping'
      ],
      limited: 'First 100 backers only'
    },
    {
      name: 'Standard',
      price: '$90',
      description: '2-Player Starter Bundle',
      benefits: [
        '2 Starter Decks',
        '10 Booster Packs',
        '2 Game Mats',
        'Free Shipping'
      ]
    },
    {
      name: 'Collector',
      price: '$150',
      description: 'Deluxe Collection',
      benefits: [
        'Everything in Standard',
        'Exclusive Signed Art Prints',
        'Limited Edition Promo Cards',
        'Collector\'s Box',
        'VIP Discord Role'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Kickstarter Launch - Elekin TCG</title>
        <meta name="description" content="Support Elekin TCG on Kickstarter! Get early bird pricing, exclusive rewards, and help bring this epic trading card game to life. Launching February 17, 2026." />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C] text-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-2 mb-6">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-yellow-300 font-semibold">KICKSTARTER LAUNCH</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Help Bring Elekin TCG to Life
              </h1>

              <p className="text-xl lg:text-2xl text-purple-200 mb-8">
                Launching February 17, 2026
              </p>

              {/* Countdown */}
              <div className="mb-8 flex justify-center">
                <KickstarterCountdown showSeconds={true} forceSingleRow={true} />
              </div>

              {/* Email Capture */}
              {!hasSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="max-w-2xl mx-auto mb-8"
                >
                  <p className="text-xl lg:text-2xl text-purple-200 mb-6">
                    Get notified when we launch + unlock early bird pricing
                  </p>
                  <SignupForm 
                    buttonClassName="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold w-full"
                    onSuccess={() => setHasSubscribed(true)}
                    source="kickstarter_join_now"
                    inputSize="large"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mb-8"
                >
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-400 mb-2">You&apos;re Signed Up!</h3>
                  <p className="text-purple-200">
                    We&apos;ll notify you when our Kickstarter launches on February 17, 2026
                  </p>
                </motion.div>
              )}

              {/* Kickstarter Link (when live) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a
                  href="https://www.kickstarter.com/projects/elemental-games/elekin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  onClick={trackKickstarterNotifyClick}
                >
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="mr-2">🚀</span>
                    Notify Me on Kickstarter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Campaign Preview Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold -mt-16 mb-4">
                What Makes Elekin Special
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                A revolutionary TCG that combines strategic depth with fast-paced gameplay
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-purple-900/50 border border-purple-500/30 rounded-lg p-6"
              >
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Speed-Based Combat</h3>
                <p className="text-purple-200">
                  Faster creatures strike first, creating tactical depth where agility matters as much as strength.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-purple-900/50 border border-purple-500/30 rounded-lg p-6"
              >
                <Gift className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Unique Shield System</h3>
                <p className="text-purple-200">
                  Defensive strategy layers that add depth and tactical options to every battle.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-purple-900/50 border border-purple-500/30 rounded-lg p-6"
              >
                <Users className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">4-Element System</h3>
                <p className="text-purple-200">
                  Master Earth, Air, Fire, and Water essences to build powerful decks.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reward Tiers Preview */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold -mt-16 mb-4">
                Early Bird Reward Tiers
              </h2>
              <p className="text-xl text-purple-200">
                Limited availability - first come, first served
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {rewardTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`bg-gradient-to-br ${
                    tier.name === 'Early Bird'
                      ? 'from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50'
                      : 'from-purple-900/50 to-purple-800/50 border border-purple-500/30'
                  } rounded-lg p-6`}
                >
                  {tier.limited && (
                    <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-2 mb-4 text-center">
                      <p className="text-yellow-400 font-bold text-sm">{tier.limited}</p>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-yellow-400">{tier.price}</span>
                    {tier.originalPrice && (
                      <span className="text-lg text-purple-300 line-through ml-2">
                        {tier.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-purple-200 mb-4">{tier.description}</p>
                  <ul className="space-y-2 mb-6">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      tier.name === 'Early Bird'
                        ? 'bg-yellow-500 hover:bg-yellow-400 text-purple-900'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    } font-bold py-3`}
                    disabled
                  >
                    Available Feb 17
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-500/20 to-purple-500/20 border-2 border-yellow-500/50 rounded-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Back Elekin?</h2>
              <p className="text-xl text-purple-200 mb-6">
                Sign up now to get notified the moment we launch and secure your early bird pricing!
              </p>
              
              {/* Countdown Timer */}
              <div className="mb-6 flex justify-center">
                <KickstarterCountdown showSeconds={true} forceSingleRow={true} />
              </div>
              
              {/* Email Signup Form */}
              <div className="max-w-2xl mx-auto">
                <SignupForm 
                  buttonClassName="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold rounded-xl shadow-lg w-full"
                  source="kickstarter_join_now_bottom"
                  inputSize="large"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JoinNowPage;
