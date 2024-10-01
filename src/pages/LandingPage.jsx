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

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white min-h-screen">
      <ImageHero />
      
      {/* Join Now Button */}
      <div className="text-center mt-8">
        <Link to="/join">
          <Button 
            className="bg-purple-800 text-yellow-300 border-2 border-yellow-300 px-6 py-3 text-xl font-bold rounded-lg transition-all duration-300 hover:bg-purple-600 hover:scale-110 hover:text-yellow-200 hover:border-yellow-200"
          >
            Join Now
          </Button>
        </Link>
      </div>

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
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <img 
              src={`${import.meta.env.VITE_S3_BUCKET_URL}/Masters_Logo.jpg`} 
              alt="Elemental Games Logo" 
              style={{ width: '200px', height: '125px', marginRight: '8px', marginBottom: '-20px' }}
            />
            Master the Elements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {elements.map((element) => (
              <div 
                key={element.name} 
                className={`${element.color} bg-opacity-30 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${element.hoverColor} cursor-pointer`}
                onClick={() => handleElementClick(element.name)}
              >
                <img 
                  src={`${import.meta.env.VITE_S3_BUCKET_URL}/icons/${element.name}.png`}
                  alt={`${element.name} Icon`}
                  style={{ width: '100px', height: '110px', marginLeft: '85px', marginRight: '8px', marginBottom: '-20px' }}
                />
                <h3 className="text-2xl font-semibold mb-2">{element.name}</h3>
                <p className="mb-4">{element.description}</p>
                <Button variant="outline">Explore {element.name} Cards</Button>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-purple-800 bg-opacity-50 rounded-xl p-8 mb-32">
          <CardsOfTheWeek />
        </div>

        <section className="mb-32">
          <h2 className="text-4xl font-bold mb-8 flex items-center">
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
      </div>
      {showLightBox && (
        <LightBox
          cardImage={`${import.meta.env.VITE_S3_BUCKET_URL}/cards/deepseer.png`}
          onClose={() => setShowLightBox(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;