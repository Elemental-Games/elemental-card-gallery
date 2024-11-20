import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CardsPage = () => {
  return (
    <>
      <Helmet>
        <title>Cards Gallery - Elemental Masters TCG</title>
        <meta name="description" content="Browse our extensive collection of Elemental Masters trading cards. Discover rare cards, build your deck, and master the elements." />
        <meta name="keywords" content="Elemental Masters cards, TCG cards, trading cards, card gallery, deck builder" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Coming Soon!</AlertTitle>
          <AlertDescription className="mt-2">
            The Card Gallery and Deck Builder features will be available post-launch. 
            <Link to="/join-now" className="ml-2 text-primary hover:underline">
              Join now to stay updated and be the first to access these features!
            </Link>
          </AlertDescription>
        </Alert>

        <h1 className="text-4xl font-bold mb-6">Cards</h1>
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