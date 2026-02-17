import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Star, Gift, Users, Zap, CheckCircle, ArrowRight, Target } from 'lucide-react';
import KickstarterProgress from '@/components/KickstarterProgress';
import { kickstarterConfig } from '@/config/kickstarter';
import { trackKickstarterPageView } from '@/utils/analytics';

const formatCurrency = (amount) => {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${Math.round(amount / 1000)}K`;
  return `$${amount.toLocaleString()}`;
};

const JoinNowPage = () => {
  useEffect(() => {
    trackKickstarterPageView();
  }, []);

  const rewardTiers = [
    {
      name: 'Starter',
      price: '$50',
      description: 'Jump into Elekin',
      benefits: [
        '1 Starter Deck',
        '5 Booster Packs',
        '1 Game Mat',
        'Alt Art Promo Card',
        'Free Shipping'
      ],
    },
    {
      name: '2-Player Bundle',
      price: '$90',
      description: 'Everything for two players',
      benefits: [
        '2 Starter Decks',
        '10 Booster Packs',
        '2 Game Mats',
        'Alt Art Promo Card',
        'Free Shipping'
      ],
      featured: true,
    },
    {
      name: 'Collector',
      price: '$150',
      description: 'Deluxe Collection',
      benefits: [
        'Everything in 2-Player Bundle',
        'Exclusive Signed Art Prints',
        'Limited Edition Promo Cards',
        'Collector\'s Box',
        'VIP Discord Role'
      ]
    }
  ];

  const { stretchGoals, raised, url } = kickstarterConfig;

  return (
    <>
      <Helmet>
        <title>Back Elekin TCG on Kickstarter</title>
        <meta name="description" content="Elekin TCG is live on Kickstarter! Back us now to help fund manufacturing and development. Stretch goals unlock free promo cards, playmats, and more for all backers." />
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
              <div className="inline-flex items-center bg-green-500/20 border border-green-500/50 rounded-full px-6 py-2 mb-6">
                <Star className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-300 font-semibold">KICKSTARTER IS LIVE</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Help Bring Elekin TCG to Life
              </h1>

              <p className="text-xl lg:text-2xl text-purple-200 mb-8">
                Your pledge funds manufacturing, development, and unlocks stretch goal rewards for every backer.
              </p>

              {/* Funding Progress */}
              <div className="mb-8">
                <KickstarterProgress />
              </div>

              {/* Primary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-5 px-10 text-xl rounded-xl shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all duration-300"
                  >
                    Back This Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What Makes Elekin Special */}
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

        {/* Reward Tiers */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold -mt-16 mb-4">
                Reward Tiers
              </h2>
              <p className="text-xl text-purple-200">
                Choose your pledge level and help us reach our goal
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
                    tier.featured
                      ? 'from-green-500/20 to-yellow-500/10 border-2 border-green-500/50'
                      : 'from-purple-900/50 to-purple-800/50 border border-purple-500/30'
                  } rounded-lg p-6`}
                >
                  {tier.featured && (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-2 mb-4 text-center">
                      <p className="text-green-400 font-bold text-sm">Most Popular</p>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-green-400">{tier.price}</span>
                  </div>
                  <p className="text-purple-200 mb-4">{tier.description}</p>
                  <ul className="space-y-2 mb-6">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      className={`w-full ${
                        tier.featured
                          ? 'bg-green-500 hover:bg-green-400 text-white'
                          : 'bg-purple-600 hover:bg-purple-500 text-white'
                      } font-bold py-3`}
                    >
                      Back on Kickstarter
                    </Button>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stretch Goals Roadmap */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Stretch Goals
              </h2>
              <p className="text-xl text-purple-200">
                The more we raise, the more every backer gets — free upgrades and bonus items unlock at each milestone
              </p>
            </motion.div>

            <div className="space-y-3">
              {stretchGoals.map((sg, index) => {
                const isUnlocked = sg.unlocked || raised >= sg.amount;
                const isCurrent = !isUnlocked && (index === 0 || stretchGoals[index - 1].unlocked || raised >= stretchGoals[index - 1].amount);
                
                return (
                  <motion.div
                    key={sg.amount}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      isUnlocked
                        ? 'bg-green-500/15 border-green-500/50'
                        : isCurrent
                        ? 'bg-yellow-500/10 border-yellow-500/40'
                        : 'bg-purple-900/30 border-purple-500/20 opacity-70'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-green-500/30'
                        : isCurrent
                        ? 'bg-yellow-500/30'
                        : 'bg-purple-800/50'
                    }`}>
                      {isUnlocked ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Target className={`w-5 h-5 ${isCurrent ? 'text-yellow-400' : 'text-purple-400'}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`font-medium ${isUnlocked ? 'text-green-300' : 'text-white'}`}>
                        {sg.label}
                      </span>
                    </div>
                    <div className={`flex-shrink-0 font-bold text-lg ${
                      isUnlocked ? 'text-green-400' : isCurrent ? 'text-yellow-400' : 'text-purple-400'
                    }`}>
                      {formatCurrency(sg.amount)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-green-500/20 to-yellow-500/10 border-2 border-green-500/50 rounded-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Back Elekin?</h2>
              <p className="text-xl text-purple-200 mb-6">
                Every pledge brings us closer to our goal and unlocks more rewards for the entire community.
              </p>
              
              {/* Funding Progress */}
              <div className="mb-6">
                <KickstarterProgress compact />
              </div>
              
              {/* Back on Kickstarter CTA */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-5 px-10 text-xl rounded-xl shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all duration-300"
                >
                  Back This Project →
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JoinNowPage;
