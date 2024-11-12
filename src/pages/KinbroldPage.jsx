import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import KinbroldMap from '../components/KinbroldMap';
import KinbroldHistory from '../components/KinbroldHistory';

const KinbroldPage = () => {
  const navigate = useNavigate();

  const kingdoms = [
    { 
      name: 'Evermere',
      path: '/kinbrold/evermere',
      hoverClass: 'hover:text-yellow-300',
      description: 'The Central Kingdom'
    },
    { 
      name: 'Grivoss',
      path: '/kinbrold/grivoss',
      hoverClass: 'hover:text-green-300',
      description: 'The Earth Kingdom'
    },
    { 
      name: 'Scarto',
      path: '/kinbrold/scarto',
      hoverClass: 'hover:text-red-300',
      description: 'The Fire Kingdom'
    },
    { 
      name: 'Tsunareth',
      path: '/kinbrold/tsunareth',
      hoverClass: 'hover:text-blue-300',
      description: 'The Water Kingdom'
    },
    { 
      name: 'Zalos',
      path: '/kinbrold/zalos',
      hoverClass: 'hover:text-gray-300',
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
                className={`w-full h-24 font-bold flex flex-col items-center justify-center transition-colors bg-purple-800 hover:bg-purple-900`}
              >
                <span className={`text-lg text-white ${kingdom.hoverClass} transition-colors`}>{kingdom.name}</span>
                <span className={`text-sm text-white ${kingdom.hoverClass} transition-colors opacity-80`}>{kingdom.description}</span>
              </Button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default KinbroldPage;