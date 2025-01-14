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
  const releasedCards = [
    {
      id: "cloud-sprinter",
      name: "Cloud Sprinter",
      image: "/cards/cloud-sprinter.png",
      element: "Air",
      type: "Basic Creature"
    },
    {
      id: "essence-exchange",
      name: "Essence Exchange",
      image: "/cards/essence-exchange.png",
      element: "Special",
      type: "Counter"
    },
    {
      id: "counter-pulse",
      name: "Counter Pulse",
      image: "/cards/counter-pulse.png",
      element: "Special",
      type: "Counter"
    },
    {
      id: "breeze-imp",
      name: "Breeze Imp",
      image: "/cards/breeze-imp.png",
      element: "Air",
      type: "Basic Creature"
    },
    {
      id: "terra-sprinter",
      name: "Terra Sprinter",
      image: "/cards/terra-sprinter.png",
      element: "Earth",
      type: "Basic Creature"
    },
    {
      id: "ember-flicker",
      name: "Ember Flicker",
      image: "/cards/ember-flicker.png",
      element: "Fire",
      type: "Basic Creature"
    },
    {
      id: "aqua-dart",
      name: "Aqua Dart",
      image: "/cards/aqua-dart.png",
      element: "Water",
      type: "Basic Creature"
    },
    {
      id: "gust-griffin",
      name: "Gust Griffin",
      image: "/cards/gust-griffin.png",
      element: "Air",
      type: "Basic Creature"
    },
    {
      id: "tide-chaser",
      name: "Tide Chaser",
      image: "/cards/tide-chaser.png",
      element: "Water",
      type: "Basic Creature"
    },
    {
      id: "inferno-serpent",
      name: "Inferno Serpent",
      image: "/cards/inferno-serpent.png",
      element: "Fire",
      type: "Basic Creature"
    },
    {
      id: "sandy-scuttler",
      name: "Sandy Scuttler",
      image: "/cards/sandy-scuttler.png",
      element: "Earth",
      type: "Basic Creature"
    }
  ];

  // Get element color
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
        <title>Released Cards - Elemental Masters TCG</title>
        <meta name="description" content="Browse our collection of released Elemental Masters trading cards. Discover creatures and counters from all elements." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400">Released Cards</h1>

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
      </div>
    </>
  );
};

export default CardsPage;