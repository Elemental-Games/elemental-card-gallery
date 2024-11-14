import React from 'react';
import { Helmet } from 'react-helmet-async';
import CardGallery from '../components/CardGallery';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CardGalleryPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
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