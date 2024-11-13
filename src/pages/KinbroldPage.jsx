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

  const kingdoms = [
    { 
      name: 'Evermere',
      path: '/kinbrold/evermere',
      color: 'from-purple-700 to-purple-900 shadow-purple-500/50',
      description: 'The Central Kingdom'
    },
    { 
      name: 'Grivoss',
      path: '/kinbrold/grivoss',
      color: 'from-green-600 to-green-800 shadow-green-500/50',
      description: 'The Earth Kingdom'
    },
    { 
      name: 'Scarto',
      path: '/kinbrold/scarto',
      color: 'from-red-600 to-red-800 shadow-red-500/50',
      description: 'The Fire Kingdom'
    },
    { 
      name: 'Tsunareth',
      path: '/kinbrold/tsunareth',
      color: 'from-blue-600 to-blue-800 shadow-blue-500/50',
      description: 'The Water Kingdom'
    },
    { 
      name: 'Zalos',
      path: '/kinbrold/zalos',
      color: 'from-gray-300 to-gray-500 shadow-gray-400/50',
      description: 'The Air Kingdom'
    }
  ];

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

        <KinbroldHistory setSelectedDragon={setSelectedDragon} />

        <section className="w-full bg-background/95 backdrop-blur-sm p-8">
          <h2 className="text-3xl font-bold text-center mb-8">The Age of Kingdoms</h2>
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-lg mb-6">Four great Elementalists arose, each mastering their respective elements:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Galea', description: 'of the Air, founding Zalos in the windswept heights' },
                { name: 'Mek', description: 'of the Water, establishing Tsunareth by the eternal tides' },
                { name: 'Osao', description: 'of the Fire, raising Scarto from volcanic depths' },
                { name: 'Balon', description: 'of the Earth, growing Grivoss from the fertile soil' }
              ].map((elementalist) => (
                <div 
                  key={elementalist.name}
                  onClick={() => setSelectedElementalist(elementalists[elementalist.name])}
                  className="p-4 rounded-lg border-2 border-accent bg-purple-100 dark:bg-purple-900/30 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors"
                >
                  <h5 className="font-heading text-purple-900 dark:text-purple-100">{elementalist.name}</h5>
                  <p className="text-sm text-purple-800 dark:text-purple-200">{elementalist.description}</p>
                  <p className="text-xs text-purple-600 dark:text-purple-300 mt-2 italic">Click to see the Elementalist</p>
                </div>
              ))}
            </div>
          </div>

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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedDragon?.name}</DialogTitle>
              <DialogDescription>
                <img 
                  src={selectedDragon?.image} 
                  alt={selectedDragon?.name}
                  className="w-full h-auto rounded-lg mt-4"
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedElementalist} onOpenChange={() => setSelectedElementalist(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedElementalist?.name}</DialogTitle>
              <DialogDescription>
                <img 
                  src={selectedElementalist?.image} 
                  alt={selectedElementalist?.name}
                  className="w-full h-auto rounded-lg mt-4"
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