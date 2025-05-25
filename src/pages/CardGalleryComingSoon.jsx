import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CardGalleryComingSoon = () => {
  return (
    <>
      <Helmet>
        <title>Card Gallery - Coming Soon | Elekin TCG</title>
        <meta name="description" content="Our full card gallery is coming soon! For now, check out our exciting card reveal campaign." />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C] text-white flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-8">
              <Clock className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                Coming <span className="text-yellow-400">Soon</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8">
                Our full card gallery will be available at launch! For now, check out our exciting card reveal campaign where we&apos;re previewing new cards each week.
              </p>
            </div>

            <div className="space-y-6">
              <Link 
                to="/cards/campaign"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold text-lg px-8 py-4 rounded-xl shadow-2xl hover:scale-105 transition-all duration-200 mb-4"
              >
                View Card Reveal Campaign
              </Link>
              
              <div className="flex justify-center">
                <Link 
                  to="/"
                  className="inline-flex items-center text-purple-300 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CardGalleryComingSoon; 