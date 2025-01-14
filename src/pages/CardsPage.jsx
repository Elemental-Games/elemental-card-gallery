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

const scrollGallery = (scrollRef, direction) => {
  if (scrollRef.current) {
    const scrollAmount = 300; // Adjust this value to control scroll distance
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};

const CardsPage = () => {
  // This would come from your database/API in a real implementation
  const releasedCards = [
    // Example structure - update with your actual released cards
    {
      id: "cloud-sprinter",
      name: "Cloud Sprinter",
      image: "/images/cards/cloud-sprinter.png",
      element: "Air",
      type: "Basic Creature"
    },
    {
      id: "essence-exchange",
      name: "Essence Exchange",
      image: "/images/cards/essence-exchange.png",
      element: "Special",
      type: "Counter"
    },
    {
      id: "counter-pulse",
      name: "Counter Pulse",
      image: "/images/cards/counter-pulse.png",
      element: "Special",
      type: "Counter"
    },
    {
      id: "breeze-imp",
      name: "Breeze Imp",
      image: "/images/cards/breeze-imp.png",
      element: "Air",
      type: "Basic Creature"
    },
    {
      id: "terra-sprinter",
      name: "Terra Sprinter",
      image: "/images/cards/terra-sprinter.png",
      element: "Earth",
      type: "Basic Creature"
    },
    {
      id: "ember-flicker",
      name: "Ember Flicker",
      image: "/images/cards/ember-flicker.png",
      element: "Fire",
      type: "Basic Creature"
    },
    {
      id: "aqua-dart",
      name: "Aqua Dart",
      image: "/images/cards/aqua-dart.png",
      element: "Water",
      type: "Basic Creature"
    },
    {
      id: "gust-griffin",
      name: "Gust Griffin",
      image: "/images/cards/gust-griffin.png",
      element: "Air",
      type: "Basic Creature"
    },
    {
      id: "tide-chaser",
      name: "Tide Chaser",
      image: "/images/cards/tide-chaser.png",
      element: "Water",
      type: "Basic Creature"
    },
    {
      id: "inferno-serpent",
      name: "Inferno Serpent",
      image: "/images/cards/inferno-serpent.png",
      element: "Fire",
      type: "Basic Creature"
    },
    {
      id: "sandy-scuttler",
      name: "Sandy Scuttler",
      image: "/images/cards/sandy-scuttler.png",
      element: "Earth",
      type: "Basic Creature"
    }
  ];

  const getElementColor = (element) => {
    const colors = {
      Air: 'from-sky-500/20 to-sky-700/20',
      Water: 'from-blue-500/20 to-blue-700/20',
      Fire: 'from-red-500/20 to-red-700/20',
      Earth: 'from-green-500/20 to-green-700/20',
      Special: 'from-purple-500/20 to-purple-700/20'
    };
    return colors[element] || 'from-gray-500/20 to-gray-700/20';
  };

  const scrollRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Cards - Elemental Masters TCG</title>
        <meta name="description" content="Browse our extensive collection of Elemental Masters trading cards. Discover rare cards, build your deck, and master the elements." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400">Cards</h1>

        {/* Release Schedule Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Release Schedule</h2>
          <div className="flex justify-center">
            <ReleaseSchedule />
          </div>
        </section>

        {/* Released Cards Gallery Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Released Cards</h2>
          <div className="relative">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border border-yellow-500/20">
              <div className="flex w-max space-x-4 p-4" ref={scrollRef}>
                {releasedCards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="relative"
                  >
                    <Card className={`overflow-hidden inline-block w-[240px] bg-gradient-to-br ${getElementColor(card.element)} hover:shadow-lg hover:shadow-${card.element.toLowerCase()}-500/20 transition-all duration-300`}>
                      <div className="aspect-[7/10] relative">
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 bg-black/40 backdrop-blur-sm">
                        <h3 className="font-semibold text-yellow-400">{card.name}</h3>
                        <p className="text-sm text-yellow-400/70">
                          {card.type} • {card.element}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            
            {/* Left Arrow */}
            <button
              onClick={() => scrollGallery(scrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-yellow-500/20 flex items-center justify-center text-yellow-400 transition-all hover:scale-110 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scrollGallery(scrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-yellow-500/20 flex items-center justify-center text-yellow-400 transition-all hover:scale-110 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Full Card Gallery Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Full Card Gallery</h2>
          <Card className="p-6 text-center bg-muted">
            <h3 className="text-xl font-semibold mb-2">Coming January 1st!</h3>
            <p className="text-muted-foreground">
              The first wave of cards will be revealed soon. Subscribe to our newsletter to be notified!
            </p>
            <Link to="/join" className="inline-block mt-4">
              <Button>Get Notified</Button>
            </Link>
          </Card>
        </section>
      </div>
    </>
  );
};

export default CardsPage;