import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ReleaseSchedule from '@/components/ReleaseSchedule';
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const CardsPage = () => {
  // This would come from your database/API in a real implementation
  const releasedCards = [
    // Example structure - update with your actual released cards
    {
      id: 1,
      name: "Torrent",
      image: "/cards/torrent.png",
      element: "water",
      type: "Basic Creature",
      releaseDate: "2024-01-01"
    },
    // Add more cards as they're released
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

  return (
    <>
      <Helmet>
        <title>Cards - Elemental Masters TCG</title>
        <meta name="description" content="Browse our extensive collection of Elemental Masters trading cards. Discover rare cards, build your deck, and master the elements." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400">Cards</h1>

        {/* Released Cards Gallery Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Released Cards</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border border-yellow-500/20">
            <div className="flex w-max space-x-4 p-4">
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

        {/* Release Schedule Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Release Schedule</h2>
          <div className="flex justify-center">
            <ReleaseSchedule />
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsPage;