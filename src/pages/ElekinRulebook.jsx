import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Download, Mail, CheckCircle, X } from 'lucide-react';
import { subscribeEmail } from '@/utils/api';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const Page = React.forwardRef(({ content, pageNumber }, ref) => {
  return (
    <div 
      ref={ref}
      className="bg-[#1A103C] p-8 rounded-lg shadow-lg border border-purple-500/30 min-h-[800px] w-full relative"
    >
      <div className="h-full flex flex-col">
        <div className="flex-grow prose prose-invert max-w-none">
          {content}
        </div>
        <div className="text-purple-400 text-sm mt-4 text-center">
          Page {pageNumber}
        </div>
      </div>
    </div>
  );
});

Page.displayName = 'Page';

const ElekinRulebook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const pages = [
    {
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Introduction</h2>
          <p className="text-purple-200 mb-4">
            Welcome to Elekin: Masters of Kinbrold, a strategic trading card game where you harness 
            the power of elemental creatures and ancient magic to defeat your opponents.
          </p>
          <p className="text-purple-200">
            As a Master of Kinbrold, you&apos;ll command powerful creatures, cast devastating spells, 
            and utilize tactical shields in your quest for victory.
          </p>
        </div>
      )
    },
    {
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Getting Started</h2>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">Game Overview</h3>
          <p className="text-purple-200 mb-4">
            In Elekin, two players face off in a battle of strategy and skill. Each player starts with:
          </p>
          <ul className="list-disc list-inside text-purple-200 space-y-2">
            <li>500 health points</li>
            <li>A deck of 40-60 cards</li>
            <li>3 shield cards (one of each tier)</li>
            <li>5 cards in their starting hand</li>
          </ul>
        </div>
      )
    },
    {
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Basic Mechanics</h2>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">Essence System</h3>
          <p className="text-purple-200 mb-4">
            Essence is the core resource in Elekin. You generate essence to cast spells and summon creatures:
          </p>
          <ul className="list-disc list-inside text-purple-200 space-y-2">
            <li>Generate 1 essence per turn automatically</li>
            <li>Some cards provide additional essence</li>
            <li>Essence carries over between turns</li>
            <li>Manage your essence wisely for optimal strategy</li>
          </ul>
        </div>
      )
    },
    {
      content: (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">Want the Complete Rulebook?</h2>
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-8 mb-6">
            <Download className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-xl font-bold mb-4 text-white">Get the Full 40-Page PDF</h3>
            <p className="text-purple-200 mb-6">
              This preview shows you the basics, but there&apos;s so much more! Get the complete rulebook with:
            </p>
            <ul className="text-left text-purple-200 space-y-2 mb-6 max-w-md mx-auto">
              <li>• Advanced strategies and combos</li>
              <li>• Complete card reference guide</li>
              <li>• Tournament rules and formats</li>
              <li>• Detailed examples and scenarios</li>
            </ul>
            <Button
              onClick={() => setShowEmailModal(true)}
              className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-4 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full PDF Rulebook
            </Button>
          </div>
          <p className="text-sm text-purple-400">
            Join the Early Access Elementals and get instant access to the complete rulebook
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 2) {
      setCurrentPage(prev => prev + 2);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 2);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeEmail(email);
      if (result.success) {
        toast.success('Welcome to the Early Access Elementals!');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setDownloadSuccess(true);
        // Simulate PDF download
        setTimeout(() => {
          // Create a fake download link for the PDF
          const link = document.createElement('a');
          link.href = '/elekin-complete-rulebook.pdf'; // This would be your actual PDF
          link.download = 'Elekin-Masters-of-Kinbrold-Complete-Rulebook.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 1000);
      } else {
        if (result.message && result.message.includes('already subscribed')) {
          toast.success('You are already an Early Access Elemental! Download starting...');
          setDownloadSuccess(true);
          // Still allow download for existing subscribers
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = '/elekin-complete-rulebook.pdf';
            link.download = 'Elekin-Masters-of-Kinbrold-Complete-Rulebook.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 1000);
        } else {
          toast.error(result.message || 'Failed to subscribe');
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <>
      <Helmet>
        <title>Elekin Rulebook - Masters of Kinbrold | Interactive & PDF Download</title>
        <meta 
          name="description" 
          content="Interactive preview of Elekin: Masters of Kinbrold rulebook. Join Early Access Elementals to download the complete 40-page PDF guide." 
        />
      </Helmet>

      <div className="min-h-screen bg-[#1A103C] py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <motion.img
                  src="/coverpage.png"
                  alt="Elekin Rulebook Cover"
                  className="w-[600px] rounded-lg shadow-2xl mb-8"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
                
                {/* Interactive Preview Button */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-6 text-xl"
                  >
                    Preview Interactive Rulebook
                  </Button>
                  <Button
                    onClick={() => setShowEmailModal(true)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-6 text-xl"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Complete PDF
                  </Button>
                </div>

                <div className="text-center max-w-2xl">
                  <p className="text-purple-200 mb-4">
                    <strong className="text-yellow-400">Interactive Preview:</strong> Explore the first few pages to get a feel for the game
                  </p>
                  <p className="text-purple-200">
                    <strong className="text-yellow-400">Complete PDF:</strong> Get the full 40-page rulebook with advanced strategies, examples, and tournament rules
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="book"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <motion.div 
                  className="flex justify-center gap-4 mb-8"
                  initial={false}
                  animate={{ 
                    rotateY: 0,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                >
                  <Page 
                    content={pages[currentPage].content}
                    pageNumber={currentPage + 1}
                  />
                  {currentPage + 1 < pages.length && (
                    <Page 
                      content={pages[currentPage + 1].content}
                      pageNumber={currentPage + 2}
                    />
                  )}
                </motion.div>

                <div className="flex justify-center">
                  <div className="flex gap-8">
                    <Button
                      onClick={handlePrev}
                      disabled={currentPage === 0}
                      className="bg-purple-900/50 hover:bg-purple-800/50 text-white"
                    >
                      <ChevronLeft className="w-6 h-6" />
                      Previous
                    </Button>
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-purple-900"
                    >
                      Close Preview
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={currentPage >= pages.length - 2}
                      className="bg-purple-900/50 hover:bg-purple-800/50 text-white"
                    >
                      Next
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Email Modal for PDF Download */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => !loading && setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-purple-950 to-blue-950 border-2 border-yellow-500 rounded-xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => !loading && setShowEmailModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                disabled={loading}
              >
                <X className="h-6 w-6" />
              </button>

              {downloadSuccess ? (
                // Success State
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                  <h2 className="text-2xl font-bold mb-4 text-green-400">Download Starting!</h2>
                  <p className="text-white mb-4">
                    Welcome to the Early Access Elementals! Your complete rulebook is downloading now.
                  </p>
                  <p className="text-purple-200 text-sm mb-6">
                    Check your email for your welcome message and exclusive benefits.
                  </p>
                  <Button
                    onClick={() => {
                      setShowEmailModal(false);
                      setDownloadSuccess(false);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
                  >
                    Continue
                  </Button>
                </div>
              ) : (
                // Email Form
                <div className="text-center">
                  <Download className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                  <h2 className="text-2xl font-bold mb-4 text-white">Download Complete Rulebook</h2>
                  <p className="text-purple-200 mb-6">
                    Join the <span className="text-yellow-400 font-bold">Early Access Elementals</span> to get the full 40-page PDF rulebook with advanced strategies and complete rules.
                  </p>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full bg-purple-900/50 border-yellow-500/50 text-white placeholder-purple-300 py-4 text-center font-semibold"
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-4 text-lg"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-900 mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          Get Rulebook + Join Early Access
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-purple-400 mt-4">
                    Also includes exclusive Early Access Elemental benefits & Discord access
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ElekinRulebook; 