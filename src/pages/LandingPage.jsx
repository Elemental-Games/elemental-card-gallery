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
    { name: 'Air', color: 'bg-gray-300', hoverColor: 'hover:bg-gray-400' },
    { name: 'Water', color: 'bg-blue-300', hoverColor: 'hover:bg-blue-400' },
    { name: 'Earth', color: 'bg-green-300', hoverColor: 'hover:bg-green-400' },
    { name: 'Fire', color: 'bg-red-300', hoverColor: 'hover:bg-red-400' }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white min-h-screen">
      <ImageHero />
      <div className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <img 
              src={`${import.meta.env.VITE_S3_BUCKET_URL}/Masters_Logo.jpg`} 
              alt="Elemental Games Logo" 
              style={{ width: '200px', height: '125px', marginRight: '8px', marginBottom: '-20px' }}
            />
            Game Features
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
                <p className="mb-4">Master the power of {element.name.toLowerCase()} in Elemental Masters.</p>
                <Link to="/cards">
                  <Button variant="outline">Explore {element.name} Cards</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <CardsOfTheWeek />

        <section className="mb-16">
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