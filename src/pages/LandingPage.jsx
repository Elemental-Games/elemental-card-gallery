import React, { useState, useEffect } from 'react';
import ImageHero from '../components/ImageHero';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import JoinNowSection from '../components/JoinNowSection';
import GameplaySection from '../components/GameplaySection';
import AboutUsSection from '../components/AboutUsSection';
import ThemeToggle from '../components/ThemeToggle';
import Auth from '../components/Auth';
import LightBox from '../components/LightBox';

const LandingPage = () => {
  const [showLightBox, setShowLightBox] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLightBox(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <ImageHero />
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <CardsOfTheWeek />
        <GameplaySection />
        <AboutUsSection />
        <JoinNowSection />
      </div>
      <ThemeToggle />
      <Auth />
      {showLightBox && (
        <LightBox
          cardImage="/path/to/weekly-card-image.jpg"
          onClose={() => setShowLightBox(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;
