import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MapComponent from '../components/MapComponent';
import SpeakerComponent from '../components/SpeakerComponent';
import DragonComponent from '../components/DragonComponent';
import DialogueBox from '../components/DialogueBox';
import { Button } from '@/components/ui/button';
import { tourScript } from '../data/tourScript';
import { dragonInfo } from '../data/dragonInfo';
import { ScrollArea } from "@/components/ui/scroll-area";
import KinbroldMap from '../components/KinbroldMap';
import KinbroldHistory from '../components/KinbroldHistory';

const KinbroldPage = () => {
  const navigate = useNavigate();
  const [currentSpeaker, setCurrentSpeaker] = useState('iris1');
  const [displayedDragon, setDisplayedDragon] = useState(null);
  const [dialogueText, setDialogueText] = useState(tourScript[0].dialogue);
  const [tourStep, setTourStep] = useState(0);
  const [showTour, setShowTour] = useState(true);
  const [allowManualControl, setAllowManualControl] = useState(false);
  const transformComponentRef = useRef(null);

  const kingdoms = [
    { 
      name: 'Evermere',
      path: '/kinbrold/evermere',
      color: 'bg-purple-800 hover:bg-purple-900',
      description: 'The Central Kingdom'
    },
    { 
      name: 'Grivoss',
      path: '/kinbrold/grivoss',
      color: 'bg-green-500 hover:bg-green-600',
      description: 'The Earth Kingdom'
    },
    { 
      name: 'Scarto',
      path: '/kinbrold/scarto',
      color: 'bg-red-500 hover:bg-red-600',
      description: 'The Fire Kingdom'
    },
    { 
      name: 'Tsunareth',
      path: '/kinbrold/tsunareth',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'The Water Kingdom'
    },
    { 
      name: 'Zalos',
      path: '/kinbrold/zalos',
      color: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
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

      <KinbroldHistory />

      <section className="w-full bg-background/95 backdrop-blur-sm p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Explore the Kingdoms of Kinbrold</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {kingdoms.map((kingdom) => (
            <Button
              key={kingdom.name}
              onClick={() => navigate(kingdom.path)}
              className={`${kingdom.color} w-full h-24 font-bold flex flex-col items-center justify-center transition-colors`}
            >
              <span className="text-lg">{kingdom.name}</span>
              <span className="text-sm opacity-80">{kingdom.description}</span>
            </Button>
          ))}
        </div>
      </section>
      </div>
    </>
  );
};

export default KinbroldPage;
