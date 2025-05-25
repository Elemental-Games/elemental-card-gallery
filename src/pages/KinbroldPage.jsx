import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProgressiveKinbroldMap from '../components/ProgressiveKinbroldMap';
import KinbroldHistory from '../components/KinbroldHistory';
import { Button } from '@/components/ui/button';
import { trackPageView, getCampaignStatus } from '../utils/analytics';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const kingdoms = [
  {
    name: 'Grivoss',
    path: '/kinbrold/grivoss',
    description: 'Kingdom of Earth',
    color: 'from-green-500 to-green-700',
    glowColor: 'shadow-green-500/50',
    week: 1
  },
  {
    name: 'Zalos',
    path: '/kinbrold/zalos',
    description: 'Kingdom of Air',
    color: 'from-gray-300 to-gray-100',
    glowColor: 'shadow-gray-300/50',
    week: 2
  },
  {
    name: 'Evermere',
    path: '/kinbrold/evermere',
    description: 'The Central Kingdom',
    color: 'from-purple-500 to-purple-700',
    glowColor: 'shadow-purple-500/50',
    week: 3
  },
  {
    name: 'Scarto',
    path: '/kinbrold/scarto',
    description: 'Kingdom of Fire',
    color: 'from-red-500 to-red-700',
    glowColor: 'shadow-red-500/50',
    week: 4
  },
  {
    name: 'Tsunareth',
    path: '/kinbrold/tsunareth',
    description: 'Kingdom of Water',
    color: 'from-blue-700 to-blue-900',
    glowColor: 'shadow-blue-500/50',
    week: 5
  }
];

const KinbroldPage = () => {
  const navigate = useNavigate();
  const [selectedDragon, setSelectedDragon] = useState(null);
  const [selectedElementalist, setSelectedElementalist] = useState(null);
  const [campaignStatus, setCampaignStatus] = useState(getCampaignStatus());

  useEffect(() => {
    trackPageView('kinbrold_main');
    setCampaignStatus(getCampaignStatus());
  }, []);

  const isKingdomUnlocked = (kingdomName) => {
    const kingdom = kingdoms.find(k => k.name === kingdomName);
    if (!kingdom) return false;
    
    // Map kingdom names to the analytics format
    const kingdomKey = kingdomName.toLowerCase();
    return campaignStatus.unlockedKingdoms.includes(kingdomKey);
  };

  const handleKingdomClick = (kingdom) => {
    if (isKingdomUnlocked(kingdom.name)) {
      navigate(kingdom.path);
    }
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
        <section className="relative w-full h-screen overflow-hidden">
          <ProgressiveKinbroldMap />
        </section>

        <KinbroldHistory setSelectedDragon={setSelectedDragon} setSelectedElementalist={setSelectedElementalist} />

        <section className="w-full bg-background/95 backdrop-blur-sm p-8">
          <div className="max-w-7xl mx-auto mb-6">
            <h2 className="text-2xl font-bold text-center mb-2">Elemental Kingdoms</h2>
            <p className="text-center text-gray-400">
              Campaign Week {campaignStatus.week} of 6 • {campaignStatus.unlockedKingdoms.length}/5 Kingdoms Unlocked
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {kingdoms.map((kingdom) => {
              return (
                <Button
                  key={kingdom.name}
                  onClick={() => handleKingdomClick(kingdom)}
                  disabled={true}
                  className={`bg-transparent border-2 w-full h-24 font-bold flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 relative text-white opacity-60 cursor-not-allowed`}
                  style={{
                    borderColor: kingdom.name === 'Grivoss' ? '#10b981' :
                                kingdom.name === 'Zalos' ? '#9ca3af' :
                                kingdom.name === 'Evermere' ? '#8b5cf6' :
                                kingdom.name === 'Scarto' ? '#ef4444' :
                                kingdom.name === 'Tsunareth' ? '#3b82f6' : '#6b7280',
                    boxShadow: `0 0 20px ${kingdom.name === 'Grivoss' ? '#10b981' :
                                           kingdom.name === 'Zalos' ? '#9ca3af' :
                                           kingdom.name === 'Evermere' ? '#8b5cf6' :
                                           kingdom.name === 'Scarto' ? '#ef4444' :
                                           kingdom.name === 'Tsunareth' ? '#3b82f6' : '#6b7280'}40`
                  }}
                >
                  <span className="text-lg">{kingdom.name}</span>
                  <span className="text-sm opacity-80">{kingdom.description}</span>
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-yellow-400 text-xs mb-1">🔒</div>
                      <div className="text-yellow-400 text-xs font-semibold">Week {kingdom.week}</div>
                      <div className="text-yellow-300 text-xs opacity-80">Locked</div>
                    </div>
                  </div>
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