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
    // Coming soon
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

      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-purple-950/70 p-8 border border-purple-500/30">
            <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">
              Deck Builder
            </h1>

            <div className="space-y-6">
              {!user ? (
                <div className="text-center p-4 bg-purple-900/50 rounded-lg">
                  <p className="text-purple-200 mb-4">
                    Please sign in to save your decks
                  </p>
                  <Button 
                    onClick={() => navigate('/login')}
                    className="bg-purple-600 hover:bg-purple-500"
                  >
                    Sign In
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleStartWizard}
                    className="w-full p-6 text-lg bg-purple-700/50 hover:bg-purple-600/50"
                  >
                    Start Deck Building Wizard
                    <p className="text-sm text-purple-300 mt-2">
                      Get guided through the deck building process (Coming Soon)
                    </p>
                  </Button>

                  <Button
                    onClick={handleManualBuild}
                    className="w-full p-6 text-lg bg-purple-700 hover:bg-purple-600"
                  >
                    Build Deck Manually
                    <p className="text-sm text-purple-300 mt-2">
                      Jump straight into deck building
                    </p>
                  </Button>
                </>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default DeckBuilderPage;