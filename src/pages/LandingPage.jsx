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
      <div className="container mx-auto px-16 py-32">
        <section className="mb-64">
          <h2 className="text-4xl font-bold mb-32 flex items-center">
            <img 
              src={`${import.meta.env.VITE_S3_BUCKET_URL}/icons/Fire.png`} 
              alt="Fire Icon" 
              className="w-48 h-48 mr-16"
            />
            Game Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32">
            {elements.map((element) => (
              <div 
                key={element.name} 
                className={`${element.color} bg-opacity-30 p-24 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${element.hoverColor}`}
              >
                <img 
                  src={`${import.meta.env.VITE_S3_BUCKET_URL}/icons/${element.name}.png`}
                  alt={`${element.name} Icon`}
                  className="w-64 h-64 mb-16 mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-8">{element.name}</h3>
                <p className="mb-16">Master the power of {element.name.toLowerCase()} in Elemental Masters.</p>
                <Link to="/cards">
                  <Button variant="outline">Explore {element.name} Cards</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <CardsOfTheWeek />

        <section className="mb-64">
          <h2 className="text-4xl font-bold mb-32 flex items-center">
            <ElementIcon element="earth" className="mr-8" />
            Gameplay
          </h2>
          <div className="bg-white bg-opacity-10 p-32 rounded-lg shadow-lg">
            <p className="text-xl mb-24">
              Master the elements and outsmart your opponents in epic card battles!
            </p>
            <Link to="/gameplay">
              <Button size="lg" variant="outline">Learn How to Play</Button>
            </Link>
          </div>
        </section>

        <section className="mb-64">
          <h2 className="text-4xl font-bold mb-32 flex items-center">
            <ElementIcon element="water" className="mr-8" />
            Join Now
          </h2>
          <div className="bg-white bg-opacity-10 p-32 rounded-lg shadow-lg">
            <p className="text-xl mb-24">
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