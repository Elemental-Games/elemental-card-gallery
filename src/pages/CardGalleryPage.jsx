import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import CardGallery from '../components/CardGallery';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CardGalleryPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showAnnouncement] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Helmet>
        <title>Card Gallery - Browse Elemental Masters TCG Cards</title>
        <meta name="description" content="Explore the complete collection of Elemental Masters Trading Card Game cards. Browse creatures, runes, counters, and shields from all elements." />
        <meta name="keywords" content="Elemental Masters cards, TCG card gallery, trading card collection, card database, elemental cards" />
        <meta property="og:title" content="Card Gallery - Elemental Masters TCG Collection" />
        <meta property="og:description" content="Browse and discover all cards in the Elemental Masters Trading Card Game. Find creatures, runes, counters, and shields from every element." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg/cards/gallery" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 mb-8">
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

      <Dialog open={showAnnouncement} onOpenChange={() => navigate(-1)}>
        <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => {
          e.preventDefault();
          navigate(-1);
        }}>
          <button
            onClick={() => navigate(-1)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Coming Soon!</DialogTitle>
            <DialogDescription className="text-lg mt-4">
              <p className="mb-4">
                The Card Gallery and Deck Builder features will be available when we launch! 
              </p>
              <p className="mb-4">
                For now, be sure to check out our Weekly Card Reveals and join now to stay updated with all things Elemental!
              </p>
              <div className="flex flex-col gap-4 mt-6">
                <Link to="/join">
                  <Button className="w-full">Subscribe for Updates</Button>
                </Link>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Card Gallery</h1>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(20)].map((_, index) => (
              <Skeleton key={index} className="w-full h-64" />
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load cards: {error}</AlertDescription>
          </Alert>
        ) : (
          <CardGallery />
        )}
      </div>
    </>
  );
};

export default CardGalleryPage;