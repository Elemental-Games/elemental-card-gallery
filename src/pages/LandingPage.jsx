import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ElementIcon } from '../components/ElementIcon';
import ImageHero from '../components/ImageHero';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import NewsFeed from '../components/NewsFeed';
import LightBox from '../components/LightBox';

const LandingPage = () => {
  const [showLightBox, setShowLightBox] = useState(false);

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
        <h3 className="text-2xl font-semibold mb-4">Key Features:</h3>
        <ul className="list-disc list-inside space-y-4 mb-8">
          <li><strong>Interactive Card Technology:</strong> Every card has a unique QR code, unlocking a wealth of information, lore, strategies, and more.</li>
          <li><strong>Rich World:</strong> Explore the world and five Kingdoms of Kinbrold - consisting of 4 Elemental Kingdoms, a Kingdom for those without elemental control, and 6 regions connecting all 5 major Kingdoms.</li>
          <li><strong>Diverse Creatures:</strong> Command Air, Water, Fire, and Earth creatures, including exotic combinational types like Lava, Poison, Sand, Frost, Lightning, and Crystal elements in the form of Dragons.</li>
          <li><strong>Unique Battle Mechanics:</strong> Each creature has a Strength and an Agility which determine their damage dealt, health, and how fast they can attack, block, or dodge respectively. Protecting you from your opponent are three shields, each with an increasingly powerful effect when broken. To win, you must deal 500 damage to your opponent directly or collect all 4 Ancient Elemental cards and use the Ancient Sigil.</li>
          <li><strong>Elemental Essence:</strong> Each creature generates its own elemental essence which is viewed as a currency, used for summoning powerful creatures and using additional creature abilities.</li>
          <li><strong>Quick Yet Strategic:</strong> Easy to learn but challenging to master, with games lasting around 20 minutes and a simple gameplay mechanic.</li>
        </ul>
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
                className={`${element.color} bg-opacity-30 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${element.hoverColor}`}
              >
                <img 
                  src={`${import.meta.env.VITE_S3_BUCKET_URL}/icons/${element.name}.png`}
                  alt={`${element.name} Icon`}
                  style={{ width: '100px', height: '110px', marginLeft: '85px', marginRight: '8px', marginBottom: '-20px' }}
                />
                <h3 className="text-2xl font-semibold mb-2">{element.name}</h3>
                <p className="mb-4">{element.description}</p>
                <Link to={`/cards?element=${element.name.toLowerCase()}`}>
                  <Button variant="outline">Explore {element.name} Cards</Button>
                </Link>
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
            Gameplay
          </h2>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-6">
              Master the elements and outsmart your opponents in epic card battles!
            </p>
            <Link to="/gameplay">
              <Button size="lg" variant="outline">Learn How to Play</Button>
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <ElementIcon element="water" className="mr-2" />
            Join Now
          </h2>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-6">
              Be part of the Elemental Masters community and start your journey today!
            </p>
            <Link to="/join">
              <Button size="lg" variant="outline">Sign Up Now</Button>
            </Link>
          </div>
        </section>

        <NewsFeed />
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