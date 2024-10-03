import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ImageHero from '../components/ImageHero';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import LightBox from '../components/LightBox';
import KeyFeatures from '../components/KeyFeatures';
import ExploreItem from '../components/ExploreItem';
import ElementalTransition from '../components/ElementalTransition';

const LandingPage = () => {
  const [showLightBox, setShowLightBox] = useState(false);
  const [transitionElement, setTransitionElement] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLightBox(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const kingdoms = [
    { 
      name: 'Zalos', 
      element: 'Air',
      color: 'bg-gray-300', 
      hoverColor: 'hover:bg-gray-400',
      description: 'The Air Kingdom, where creatures are the fastest and ever-changing.'
    },
    { 
      name: 'Tsunareth', 
      element: 'Water',
      color: 'bg-blue-300', 
      hoverColor: 'hover:bg-blue-400',
      description: 'The Water Kingdom, focusing on card milling features and swift actions.'
    },
    { 
      name: 'Scarto', 
      element: 'Fire',
      color: 'bg-red-300', 
      hoverColor: 'hover:bg-red-400',
      description: 'The Fire Kingdom, built for damage and steadily taking down opponents.'
    },
    { 
      name: 'Grivoss', 
      element: 'Earth',
      color: 'bg-green-300', 
      hoverColor: 'hover:bg-green-400',
      description: 'The Earth Kingdom, standing strong with resilient and defensive creatures.'
    }
  ];

  const exploreItems = [
    { title: 'Kinbrold Lore', emoji: '📚', link: '/kinbrold' },
    { title: 'Deck Builder', emoji: '🃏', link: '/cards/deck-builder' },
    { title: 'Gameplay', emoji: '♟️', link: '/gameplay' },
    { title: 'Card Gallery', emoji: '🐉', link: '/cards' },
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
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white min-h-screen">
      <ImageHero />
      
      {/* Game Overview Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-start justify-between">
          <div className="flex-grow mr-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Game Overview</h2>
              <img 
                src="/Masters_Logo.png" 
                alt="Masters Logo" 
                className="w-40 h-auto"
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
                <Link to={`/${kingdom.name.toLowerCase()}`}>
                  <Button variant="outline" className="mt-auto w-full">Explore {kingdom.name}</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-8 flex items-center justify-center">
            Explore More
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {exploreItems.map((item, index) => (
              <Link to={item.link} key={index}>
                <ExploreItem title={item.title} emoji={item.emoji} />
              </Link>
            ))}
          </div>
        </section>
      </div>
      {showLightBox && (
        <LightBox
          onClose={() => setShowLightBox(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;