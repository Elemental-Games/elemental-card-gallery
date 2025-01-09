import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const CardsPage = () => {
  return (
    <>
      <Helmet>
        <title>Cards Gallery - Elemental Masters TCG</title>
        <meta name="description" content="Browse our extensive collection of Elemental Masters trading cards. Discover rare cards, build your deck, and master the elements." />
        <meta name="keywords" content="Elemental Masters cards, TCG cards, trading cards, card gallery, deck builder" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Cards</h1>

        {/* New Release Schedule Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Card Release Schedule</h2>
          <p className="text-lg mb-6">
            Join us on our journey to reveal all 169 cards leading up to our Kickstarter launch on February 7th, 2024!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Phase 1: The Elements Awaken</h3>
              <p className="text-muted-foreground mb-2">December 1st - December 21st</p>
              <ul className="list-disc list-inside space-y-1">
                <li>40 Basic Element Cards</li>
                <li>10 cards per element</li>
                <li>Focus on core mechanics</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Phase 2: Advanced Powers</h3>
              <p className="text-muted-foreground mb-2">December 22nd - January 11th</p>
              <ul className="list-disc list-inside space-y-1">
                <li>48 Advanced Cards</li>
                <li>12 cards per element</li>
                <li>Introducing combo mechanics</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Phase 3: Exotic Elements</h3>
              <p className="text-muted-foreground mb-2">January 12th - January 25th</p>
              <ul className="list-disc list-inside space-y-1">
                <li>42 Combinational Cards</li>
                <li>7 cards per exotic element</li>
                <li>Revealing special abilities</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Phase 4: Ancient Powers</h3>
              <p className="text-muted-foreground mb-2">January 26th - February 6th</p>
              <ul className="list-disc list-inside space-y-1">
                <li>35 Legendary Cards</li>
                <li>Ancient Element Cards</li>
                <li>Game-changing abilities</li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-yellow-500">
              <h3 className="text-xl font-semibold mb-3">Final Release</h3>
              <p className="text-muted-foreground mb-2">February 7th - Kickstarter Launch!</p>
              <ul className="list-disc list-inside space-y-1">
                <li>4 Secret Legendary Cards</li>
                <li>Complete Card Database</li>
                <li>Full Deck Builder Access</li>
              </ul>
            </Card>

            <Card className="p-6 bg-purple-900 text-white">
              <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
              <p className="mb-4">Don't miss any card reveals! Join our community to get notified of new releases.</p>
              <Link to="/join">
                <Button className="w-full">Subscribe Now</Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Existing Alert */}
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-2xl font-bold">Coming Soon!</AlertTitle>
          <AlertDescription className="mt-2 text-xl">
            The Card Gallery and Deck Builder features will be available post-launch. 
            <Link to="/join" className="ml-2 text-primary hover:text-yellow-400 transition-colors">
              Join now to stay updated and be the first to access these features!
            </Link>
          </AlertDescription>
        </Alert>

        {/* Existing Buttons */}
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