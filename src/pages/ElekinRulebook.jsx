import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  return (
    <>
      <Helmet>
        <title>Elekin Rulebook - Masters of Kinbrold</title>
        <meta 
          name="description" 
          content="Interactive rulebook for Elekin: Masters of Kinbrold trading card game." 
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
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-6 text-xl"
                >
                  Open Rulebook
                </Button>
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
                      Close
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
    </>
  );
};

export default ElekinRulebook; 