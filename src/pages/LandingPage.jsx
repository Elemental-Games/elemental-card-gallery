import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ElementIcon } from '../components/ElementIcon';
import ImageHero from '../components/ImageHero';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import LightBox from '../components/LightBox';
import KeyFeatures from '../components/KeyFeatures';
import ExploreItem from '../components/ExploreItem';
import ElementalTransition from '../components/ElementalTransition';
import CardDisplay from '../components/CardDisplay';

const LandingPage = () => {
  const [showLightBox, setShowLightBox] = useState(false);
  const [transitionElement, setTransitionElement] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLightBox(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const elements = [
    { 
      name: 'Air', 
      color: 'bg-gray-300', 
      hoverColor: 'hover:bg-gray-400',
      description: 'Just like the wind, Air creatures are the fastest and ever-changing.'
    },
    { 
      name: 'Water', 
      color: 'bg-blue-300', 
      hoverColor: 'hover:bg-blue-400',
      description: 'Water creatures focus on their card milling features with a tendency to be faster than most elements.'
    },
    { 
      name: 'Fire', 
      color: 'bg-red-300', 
      hoverColor: 'hover:bg-red-400',
      description: 'These creatures are built for damage and steadily taking down your opponent over time.'
    },
    { 
      name: 'Earth', 
      color: 'bg-green-300', 
      hoverColor: 'hover:bg-green-400',
      description: 'All Earth creatures stand strong and resilient by providing a bolstering defense.'
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

  const showcaseCards = [
    { id: 'deepseer', name: 'Deepseer', image: 'deepseer.png' },
    { id: 'card-back', name: 'Card Back', image: 'Card_Back.png' },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white min-h-screen">
      <ImageHero />
      
      {/* Game Overview Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8">Game Overview</h2>
        <p className="mb-6 text-lg">
          Welcome to Kinbrold, a world of elemental mastery and strategic conquest. Elemental Masters is not just another trading card game – it's a gateway to a rich, immersive universe where every card tells a story and every game is an adventure.
        </p>
        <KeyFeatures />
      </section>

      <div className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center flex-wrap">
            <img 
              src="/Games_Logo.png" 
              alt="Elemental Games Logo" 
              className="w-40 h-auto mr-4 mb-4 sm:mb-0"
            />
            <span className="flex-1">Master the Elements</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {elements.map((element) => (
              <div 
                key={element.name} 
                className={`${element.color} bg-opacity-30 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${element.hoverColor} cursor-pointer flex flex-col justify-between`}
                onClick={() => handleElementClick(element.name)}
              >
                <div>
                  <img 
                    src={`/icons/${element.name}.png`}
                    alt={`${element.name} Icon`}
                    className="w-24 h-24 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2">{element.name}</h3>
                  <p className="mb-4">{element.description}</p>
                </div>
                <Button variant="outline" className="mt-auto">Explore {element.name} Cards</Button>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-purple-800 bg-opacity-50 rounded-xl p-8 mb-32">
          <CardsOfTheWeek />
        </div>

        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-8 flex items-center justify-center">
            <ElementIcon element="earth" className="mr-2" />
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

        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-8 text-center">Artwork Showcase</h2>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            {showcaseCards.map((card) => (
              <div key={card.id} className="text-center">
                <CardDisplay card={card} variant="artworkShowcase" />
                <p className="mt-2 italic">
                  {card.id === 'deepseer' ? 'Front of an ability card' : 'Card back of our game'}
                </p>
              </div>
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
