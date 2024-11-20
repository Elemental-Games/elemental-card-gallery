import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import KinbroldMap from '../components/KinbroldMap';
import KinbroldHistory from '../components/KinbroldHistory';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const KinbroldPage = () => {
  const navigate = useNavigate();
  const [selectedDragon, setSelectedDragon] = useState(null);
  const [selectedElementalist, setSelectedElementalist] = useState(null);

  const elementalists = {
    'Galea': { name: 'Galea', image: '/tour/galea1.png' },
    'Mek': { name: 'Mek', image: '/tour/mek1.png' },
    'Osao': { name: 'Osao', image: '/tour/osao1.png' },
    'Balon': { name: 'Balon', image: '/tour/balon1.png' }
  };

  return (
    <>
      <Helmet>
        <title>The World of Kinbrold - Elemental Masters TCG Universe</title>
        <meta name="description" content="Explore the magical world of Kinbrold, home to five elemental kingdoms: Zalos, Tsunareth, Scarto, Grivoss, and Evermere. Discover the rich lore and history behind Elemental Masters TCG." />
        <meta name="keywords" content="Kinbrold, Elemental Masters lore, TCG world, fantasy kingdoms, elemental realms, Zalos, Tsunareth, Scarto, Grivoss, Evermere" />
        <meta property="og:title" content="The World of Kinbrold - Elemental Masters TCG Universe" />
        <meta property="og:description" content="Journey through the five elemental kingdoms of Kinbrold. Experience the rich lore and history behind Elemental Masters TCG." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://elementalgames.gg/kinbrold" />
      </Helmet>
      <div className="flex flex-col w-full">
        <section className="relative w-full h-[100vh] overflow-hidden">
          <KinbroldMap />
        </section>

        <KinbroldHistory setSelectedDragon={setSelectedDragon} setSelectedElementalist={setSelectedElementalist} />

        <section className="w-full bg-background/95 backdrop-blur-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {kingdoms.map((kingdom) => (
              <Button
                key={kingdom.name}
                onClick={() => navigate(kingdom.path)}
                className={`bg-gradient-to-br ${kingdom.color} w-full h-24 font-bold flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                <span className="text-lg">{kingdom.name}</span>
                <span className="text-sm opacity-80">{kingdom.description}</span>
              </Button>
            ))}
          </div>
        </section>

        <Dialog open={!!selectedDragon} onOpenChange={() => setSelectedDragon(null)}>
          <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] w-full">
            <DialogHeader>
              <DialogTitle>{selectedDragon?.name}</DialogTitle>
              <DialogDescription>
                <img 
                  src={selectedDragon?.image} 
                  alt={selectedDragon?.name}
                  className="w-full h-auto rounded-lg mt-4 object-contain max-h-[70vh]"
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedElementalist} onOpenChange={() => setSelectedElementalist(null)}>
          <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] w-full">
            <DialogHeader>
              <DialogTitle>{selectedElementalist?.name}</DialogTitle>
              <DialogDescription>
                <img 
                  src={selectedElementalist?.image} 
                  alt={selectedElementalist?.name}
                  className="w-full h-auto rounded-lg mt-4 object-contain max-h-[70vh]"
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default KinbroldPage;
