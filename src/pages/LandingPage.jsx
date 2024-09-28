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

  const elements = ['Air', 'Water', 'Earth', 'Fire'];

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white min-h-screen">
      <ImageHero />
      <div className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 flex items-center">
            <img 
              src={`${import.meta.env.VITE_S3_BUCKET_URL}/icons/Fire.png`} 
              alt="Fire Icon" 
              className="w-12 h-12 mr-4"
            />
            Game Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {elements.map((element) => (
              <div key={element} className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
                <img 
                  src={`${import.meta.env.VITE_S3_BUCKET_URL}/icons/${element}.png`}
                  alt={`${element} Icon`}
                  className="w-16 h-16 mb-4 mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-2">{element}</h3>
                <p className="mb-4">Master the power of {element.toLowerCase()} in Elemental Masters.</p>
                <Link to="/cards">
                  <Button variant="outline">Explore {element} Cards</Button>
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