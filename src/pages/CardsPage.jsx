import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ReleaseSchedule from '@/components/ReleaseSchedule';
import { Card } from "@/components/ui/card";

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

  return (
    <>
      <Helmet>
        <title>Cards - Elemental Masters TCG</title>
        <meta name="description" content="Browse our extensive collection of Elemental Masters trading cards. Discover rare cards, build your deck, and master the elements." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Cards</h1>

        {/* Release Schedule Section */}
        <section className="mb-16">
          <div className="flex justify-center">
            <ReleaseSchedule />
          </div>
        </section>

        {/* Released Cards Gallery Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Released Cards</h2>
          {releasedCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {releasedCards.map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  <div className="aspect-w-7 aspect-h-10">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{card.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {card.type} • {card.element}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Released: {new Date(card.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center bg-muted">
              <h3 className="text-xl font-semibold mb-2">Coming January 1st!</h3>
              <p className="text-muted-foreground">
                The first wave of cards will be revealed soon. Subscribe to our newsletter to be notified!
              </p>
              <Link to="/join" className="inline-block mt-4">
                <Button>Get Notified</Button>
              </Link>
            </Card>
          )}
        </section>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/cards/gallery">
            <Button className="w-full">Card Gallery</Button>
          </Link>
          <Link to="/cards/deck-builder">
            <Button className="w-full">Deck Builder</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardsPage;