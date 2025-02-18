import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import ReleaseSchedule from '@/components/ReleaseSchedule';
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useRef } from "react";
import SEO from '../components/SEO';
import CardOfTheWeek from '@/components/cards/CardOfTheWeek';

const scrollGallery = (direction) => {
  const container = scrollContainerRef.current;
  if (container) {
    const scrollAmount = 600; // Adjust this value to control scroll distance
    const currentScroll = container.scrollLeft;
    container.scrollTo({
      left: currentScroll + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth'
    });
  }
};

const CardsPage = () => {
  const weeklyCards = [
    {
      id: "cloud-sprinter",
      name: "Cloud Sprinter",
      image: "/images/cards/cloud-sprinter.webp"
    },
    {
      id: "swiftreaver",
      name: "Swiftreaver",
      image: "/images/cards/swiftreaver.webp"
    },
    {
      id: "aqua-shade",
      name: "Aqua Shade",
      image: "/images/cards/aqua-shade.webp"
    },
    {
      id: "flamekeeper",
      name: "Flamekeeper",
      image: "/images/cards/flamekeeper.webp"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      rotateY: 45
    },
    visible: { 
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1A103C] text-white overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 py-12 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Weekly Deep Dives Section */}
        <motion.div 
          className="bg-purple-950/70 p-8 rounded-2xl border border-yellow-500/30 
            shadow-[0_0_30px_rgba(234,179,8,0.1)]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-3 text-center bg-gradient-to-r from-yellow-400 to-yellow-400 
            bg-clip-text text-transparent">Weekly Card Deep Dives</h2>
          <p className="mb-8 text-center text-purple-200 max-w-2xl mx-auto">
            Every week, we analyze four new cards in detail, exploring their strategies, 
            combinations, and impact on the game.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {weeklyCards.map((card, index) => (
              <motion.div key={card.id} variants={itemVariants}>
                <CardOfTheWeek card={card} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Card Gallery Section */}
          <div className="bg-purple-950/70 p-6 rounded-xl border border-yellow-500/30 
              shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]
              transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Card Gallery</h2>
            <p className="mb-4 text-purple-200">Browse our complete collection of cards.</p>
            <Link 
              to="/cards/gallery"
              className="inline-block px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg 
                transition-colors border border-yellow-500/30 hover:border-yellow-500/50"
            >
              View Gallery
            </Link>
          </div>

          {/* Deck Builder Section */}
          <div className="bg-purple-950/70 p-6 rounded-xl border border-yellow-500/30 
              shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]
              transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Deck Builder</h2>
            <p className="mb-4 text-purple-200">Create and share your custom decks.</p>
            <Link 
              to="/cards/deck-builder"
              className="inline-block px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg 
                transition-colors border border-yellow-500/30 hover:border-yellow-500/50"
            >
              Build Deck (Coming Soon)
            </Link>
          </div>

          {/* Beta Game Section */}
          <div className="bg-purple-950/70 p-6 rounded-xl border border-yellow-500/30 
              shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]
              transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Play Online</h2>
            <p className="mb-4 text-purple-200">Try out the browser-based version of Elekin: Masters of Kinbrold.</p>
            <Link 
              to="/elekin/online"
              className="inline-block px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg 
                transition-colors border border-yellow-500/30 hover:border-yellow-500/50"
            >
              Play Beta Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardsPage;