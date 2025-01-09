import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { X } from "lucide-react";

const DeckBuilderPage = () => {
  const [showAnnouncement] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Deck Builder - Create Your Elemental Masters TCG Deck</title>
        <meta name="description" content="Build and customize your Elemental Masters TCG deck. Choose your elements, combine powerful cards, and create winning strategies with our interactive deck builder." />
        <meta name="keywords" content="Elemental Masters deck builder, TCG deck construction, card game strategy, deck building tool, trading card game decks" />
        <meta property="og:title" content="Deck Builder - Create Your Elemental Masters TCG Deck" />
        <meta property="og:description" content="Create powerful decks with our interactive deck builder. Combine elements and cards to craft your perfect strategy." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg/cards/deck-builder" />
      </Helmet>

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
        <h1 className="text-3xl font-bold mb-6">Deck Builder</h1>
        <p className="text-lg text-muted-foreground">Loading deck builder...</p>
      </div>
    </>
  );
};

export default DeckBuilderPage;