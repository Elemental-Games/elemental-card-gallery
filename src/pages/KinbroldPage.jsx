import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import InteractiveKinbroldMap from '../components/InteractiveKinbroldMap';
import KinbroldHistory from '../components/KinbroldHistory';
import { Button } from '@/components/ui/button';
import { trackPageView } from '../utils/analytics';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Kingdom data
const KINGDOMS = [
  {
    id: 'grivoss',
    name: 'Grivoss',
    element: 'Earth',
    description: 'Kingdom of Earth',
    color: 'from-green-500 to-green-700',
    path: '/kinbrold/grivoss',
    borderColor: '#10b981',
  },
  {
    id: 'zalos',
    name: 'Zalos',
    element: 'Air',
    description: 'Kingdom of Air',
    color: 'from-white to-gray-100',
    path: '/kinbrold/zalos',
    borderColor: '#9ca3af',
  },
  {
    id: 'evermere',
    name: 'Evermere',
    element: 'Central',
    description: 'The Central Kingdom',
    color: 'from-purple-500 to-purple-700',
    path: '/kinbrold/evermere',
    borderColor: '#8b5cf6',
  },
  {
    id: 'scarto',
    name: 'Scarto',
    element: 'Fire',
    description: 'Kingdom of Fire',
    color: 'from-red-500 to-red-700',
    path: '/kinbrold/scarto',
    borderColor: '#ef4444',
  },
  {
    id: 'tsunareth',
    name: 'Tsunareth',
    element: 'Water',
    description: 'Kingdom of Water',
    color: 'from-blue-700 to-blue-900',
    path: '/kinbrold/tsunareth',
    borderColor: '#3b82f6',
  }
];

const KinbroldPage = () => {
  const navigate = useNavigate();
  const [selectedDragon, setSelectedDragon] = useState(null);
  const [selectedElementalist, setSelectedElementalist] = useState(null);

  useEffect(() => {
    trackPageView('kinbrold_main');
  }, []);

  const handleKingdomClick = (kingdom) => {
    navigate(kingdom.path);
  };

  return (
    <>
      <Helmet>
        <title>The World of Kinbrold - Elekin TCG Universe</title>
        <meta name="description" content="Explore the elemental world of Kinbrold, home to five elemental kingdoms: Zalos, Tsunareth, Scarto, Grivoss, and Evermere. Discover the rich lore and history behind Elekin TCG." />
        <meta name="keywords" content="Kinbrold, Elekin lore, TCG world, fantasy kingdoms, elemental realms, Zalos, Tsunareth, Scarto, Grivoss, Evermere" />
        <meta property="og:title" content="The World of Kinbrold - Elekin TCG Universe" />
        <meta property="og:description" content="Journey through the five elemental kingdoms of Kinbrold. Experience the rich lore and history behind Elekin TCG." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://elementalgames.gg/kinbrold" />
      </Helmet>
      
      <div className="flex flex-col w-full">
        <section className="relative w-full py-8 px-4">
          <InteractiveKinbroldMap />
        </section>

        <KinbroldHistory setSelectedDragon={setSelectedDragon} setSelectedElementalist={setSelectedElementalist} />

        <section className="w-full bg-background/95 backdrop-blur-sm p-8">
          <div className="max-w-6xl mx-auto mb-6">
            <h2 className="text-2xl font-bold text-center mb-2">Elemental Kingdoms</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {KINGDOMS.map((kingdom) => {
              return (
                <Button
                  key={kingdom.id}
                  onClick={() => handleKingdomClick(kingdom)}
                  className={`bg-transparent border-2 w-full h-24 font-bold flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 relative text-white opacity-100 cursor-pointer hover:brightness-110`}
                  style={{
                    borderColor: kingdom.borderColor,
                    boxShadow: `0 0 20px ${kingdom.borderColor}40`
                  }}
                >
                  <span className="text-lg">{kingdom.name}</span>
                  <span className="text-sm opacity-80">{kingdom.description}</span>
                </Button>
              );
            })}
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
              <DialogTitle className="text-center text-2xl font-bold mb-4">{selectedElementalist?.name}</DialogTitle>
              <DialogDescription as="div" className="flex justify-center">
                <img 
                  src={selectedElementalist?.image} 
                  alt={selectedElementalist?.name}
                  className="w-full h-auto rounded-lg object-contain max-h-[70vh]"
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