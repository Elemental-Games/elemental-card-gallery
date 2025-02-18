import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useUser } from '@supabase/auth-helpers-react';
import { Helmet } from 'react-helmet-async';

const DeckBuilderPage = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleStartWizard = () => {
    navigate('/cards/deck-builder/wizard');
  };

  const handleManualBuild = () => {
    navigate('/cards/deck-builder/manual');
  };

  return (
    <>
      <Helmet>
        <title>Deck Builder - Create Your Elemental Masters TCG Deck</title>
        <meta name="description" content="Build and customize your Elemental Masters TCG deck. Choose your elements, combine powerful cards, and create winning strategies with our interactive deck builder." />
        <meta name="keywords" content="Elemental Masters deck builder, TCG deck construction, card game strategy, deck building tool, trading card game decks" />
        <meta property="og:title" content="Deck Builder - Create Your Elemental Masters TCG Deck" />
        <meta property="og:description" content="Create powerful decks with our interactive deck builder. Combine elements and cards to craft your perfect strategy." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg/cards/deck-builder" />
      </Helmet>

      <div className="min-h-screen bg-[#1A103C] py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="bg-purple-950/70 p-12 border border-purple-500/30">
              <h1 className="text-4xl font-bold text-center text-yellow-400 mb-12">
                Deck Builder
              </h1>

              {!user ? (
                <div className="text-center p-8 bg-purple-900/50 rounded-lg">
                  <p className="text-purple-200 text-lg mb-6">
                    Please sign in to save your decks
                  </p>
                  <Button 
                    onClick={() => navigate('/login')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-6 text-lg"
                  >
                    Sign In
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Button
                      onClick={handleStartWizard}
                      className="w-full h-full p-8 text-xl bg-purple-800/50 hover:bg-purple-700/50 border-2 border-purple-500/30 hover:border-yellow-500/50 transition-all duration-300"
                    >
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Start Deck Building Wizard</h2>
                        <p className="text-base text-purple-300 group-hover:text-purple-200">
                          Get guided through the deck building process
                        </p>
                      </div>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Button
                      onClick={handleManualBuild}
                      className="w-full h-full p-8 text-xl bg-purple-700 hover:bg-purple-600 border-2 border-purple-500/30 hover:border-yellow-500/50 transition-all duration-300"
                    >
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Build Deck Manually</h2>
                        <p className="text-base text-purple-300 group-hover:text-purple-200">
                          Jump straight into deck building
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DeckBuilderPage;