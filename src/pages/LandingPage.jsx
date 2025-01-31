import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ImageHero from '../components/ImageHero';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import KeyFeatures from '../components/KeyFeatures';
import ExploreItem from '../components/ExploreItem';
import ElementalTransition from '../components/ElementalTransition';
import LightBox from '../components/LightBox';
import { Book, ScrollText, Gamepad2, LayoutGrid, ChevronRight } from 'lucide-react';
import AnimatedCardBackground from '@/components/landing/AnimatedCardBackground';

const LandingPage = () => {
  const [transitionElement, setTransitionElement] = useState(null);

  const kingdoms = [
    { 
      name: 'Zalos', 
      element: 'Air',
      color: 'bg-gray-300', 
      hoverColor: 'hover:bg-gray-400',
      description: 'Among the mountain peaks are floating cities created by the architects and scholars who have harnessed the power of the air.'
    },
    { 
      name: 'Tsunareth', 
      element: 'Water',
      color: 'bg-blue-300', 
      hoverColor: 'hover:bg-blue-400',
      description: 'Beneath crystalline waves lie the ancient coral cities where wisdom flows as freely as the tides that shape them.'
    },
    { 
      name: 'Scarto', 
      element: 'Fire',
      color: 'bg-red-300', 
      hoverColor: 'hover:bg-red-400',
      description: 'From volcanic depths, rise citadels created from those who have mastered the power of fire, where passionate warriors forge their own destiny.'
    },
    { 
      name: 'Grivoss', 
      element: 'Earth',
      color: 'bg-green-300', 
      hoverColor: 'hover:bg-green-400',
      description: 'Deep within mountain strongholds, stand the steadfast people who carve their legacy and test the limits on the land of Kinbrold.'
    }
  ];

  const exploreItems = [
    { title: 'Kinbrold Lore', icon: <Book size={24} />, link: '/kinbrold' },
    { title: 'Deck Builder', icon: <LayoutGrid size={24} />, link: '/cards/deck-builder' },
    { title: 'Gameplay', icon: <Gamepad2 size={24} />, link: '/gameplay' },
    { title: 'Card Gallery', icon: <ScrollText size={24} />, link: '/cards/gallery' },
  ];

  const handleElementClick = (element) => {
    setTransitionElement(element);
  };

  if (transitionElement) {
    return (
      <ElementalTransition element={transitionElement}>
        <div className={`min-h-screen ${transitionElement.toLowerCase()}-bg text-white p-8`}>
          <h1 className="text-4xl font-bold mb-8">Welcome to {transitionElement}</h1>
          <p className="text-xl">Explore the {transitionElement} element</p>
          <Button onClick={() => setTransitionElement(null)}>Go Back</Button>
        </div>
      </ElementalTransition>
    );
  }

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <AnimatedCardBackground />
      
      {/* Game Overview Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-start justify-between">
          <div className="flex-grow mr-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-6xl font-bold">Elemental Masters</h2>
              <h3 className="text-4xl ml-1000">| Game Overview</h3>
              <img 
                src="/Masters_Logo.png" 
                alt="Masters Logo" 
                className="w-80 h-auto"
              />
            </div>
            <p className="mb-6 text-lg">
              Welcome to Kinbrold, a world of elemental mastery and strategic conquest. Elemental Masters is not just another trading card game – it's a gateway to a rich, immersive universe where every card tells a story and every game is an adventure.
            </p>
            <KeyFeatures />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-purple-800 bg-opacity-50 rounded-xl p-8 mb-32">
          <CardsOfTheWeek />
        </div>

        <section className="mb-16">
          <Link to="/kinbrold">
            <h2 className="text-4xl font-bold mb-8 flex items-center flex-wrap cursor-pointer hover:text-accent transition-colors">
              Explore the World of Kinbrold
              <ChevronRight className="ml-2 w-8 h-8" />
            </h2>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {kingdoms.map((kingdom) => (
              <div 
                key={kingdom.name} 
                className={`${kingdom.color} bg-opacity-30 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${kingdom.hoverColor} cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <img 
                    src={`/icons/${kingdom.element}.png`}
                    alt={`${kingdom.element} Icon`}
                    className="w-24 h-24 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2">{kingdom.name}, <span className="text-sm font-bold">the {kingdom.element} Kingdom</span></h3>
                  <p className="mb-4">{kingdom.description}</p>
                </div>
                <Link to={`/kinbrold/${kingdom.name.toLowerCase()}`}>
                  <Button variant="outline" className="mt-auto w-full">Explore {kingdom.name}</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Explore More Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Explore More</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/kinbrold">
              <div className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
                shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
                border border-purple-500/30 hover:border-purple-500/50 h-full flex flex-col">
                <h3 className="text-2xl font-semibold text-white">Lore</h3>
                <p className="text-purple-300 mt-2 text-sm">World of Kinbrold</p>
                <p className="text-yellow-500 mt-auto pt-4 text-sm">Learn more →</p>
              </div>
            </Link>

            <Link to="/deck-builder">
              <div className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
                shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
                border border-purple-500/30 hover:border-purple-500/50 h-full flex flex-col">
                <h3 className="text-2xl font-semibold text-white">Build</h3>
                <p className="text-purple-300 mt-2 text-sm">Create your deck</p>
                <p className="text-yellow-500 mt-auto pt-4 text-sm">Start now →</p>
              </div>
            </Link>

            <Link to="/how-to-play">
              <div className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
                shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
                border border-purple-500/30 hover:border-purple-500/50 h-full flex flex-col">
                <h3 className="text-2xl font-semibold text-white">Play</h3>
                <p className="text-purple-300 mt-2 text-sm">Learn the game</p>
                <p className="text-yellow-500 mt-auto pt-4 text-sm">Get started →</p>
              </div>
            </Link>

            <Link to="/cards">
              <div className="bg-purple-950/70 p-6 rounded-lg cursor-pointer transition-all duration-300
                shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
                border border-purple-500/30 hover:border-purple-500/50 h-full flex flex-col">
                <h3 className="text-2xl font-semibold text-white">Cards</h3>
                <p className="text-purple-300 mt-2 text-sm">View collection</p>
                <p className="text-yellow-500 mt-auto pt-4 text-sm">Browse now →</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
