import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Book, Map } from 'lucide-react';

const ElekinPage = () => {
  return (
    <>
      <Helmet>
        <title>Elekin: Masters of Kinbrold - Browser TCG Game</title>
        <meta name="description" content="Play Elekin: Masters of Kinbrold in your browser - A strategic trading card game set in the mystical world of Kinbrold." />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C]">
        {/* Hero Section */}
        <section 
          className="relative w-full bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/Background.jpg)',
            aspectRatio: '16/9'
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-7xl font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Elekin: Masters of Kinbrold
            </h1>
            <p className="text-2xl mb-12 text-white max-w-2xl mx-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Unleash the power of the elements
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/elekin/online">
                <Button 
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-lg px-8 py-6"
                >
                  Play Beta Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Navigation Bubbles */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link to="/elekin/how-to-play">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 hover:bg-purple-800/30 transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <Book className="w-16 h-16 mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-4 text-white">Learn How to Play</h3>
                <p className="text-purple-200 mb-6">
                  Master the basics and advanced strategies with our comprehensive guides and tutorials.
                </p>
                <Button 
                  className="bg-purple-700/50 hover:bg-purple-600/50 text-white group-hover:bg-yellow-500 group-hover:text-purple-900 transition-all"
                >
                  Get Started
                </Button>
              </motion.div>
            </Link>

            <Link to="/cards">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 hover:bg-purple-800/30 transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <LayoutGrid className="w-16 h-16 mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-4 text-white">View Card Collection</h3>
                <p className="text-purple-200 mb-6">
                  Explore the complete collection of Elekin cards, from basic creatures to legendary dragons.
                </p>
                <Button 
                  className="bg-purple-700/50 hover:bg-purple-600/50 text-white group-hover:bg-yellow-500 group-hover:text-purple-900 transition-all"
                >
                  View Cards
                </Button>
              </motion.div>
            </Link>

            <Link to="/elekin/roadmap">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="group bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 hover:bg-purple-800/30 transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <Map className="w-16 h-16 mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-4 text-white">View Roadmap</h3>
                <p className="text-purple-200 mb-6">
                  Follow our journey and see what exciting features are coming next.
                  <br />
                </p>
                <Button 
                  className="bg-purple-700/50 hover:bg-purple-600/50 text-white group-hover:bg-yellow-500 group-hover:text-purple-900 transition-all"
                >
                  View Roadmap
                </Button>
              </motion.div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-purple-900/30 p-12 rounded-lg border border-purple-500/30 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Begin Your Journey?</h2>
            <p className="text-xl mb-8 text-purple-200">
              Join the beta and become a Master of Kinbrold today.
            </p>
            <Link to="/elekin/online">
              <Button 
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-lg px-8 py-6"
              >
                Play Beta Now
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default ElekinPage; 