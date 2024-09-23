import React from 'react';
import VideoSection from '../components/VideoSection';
import JoinNowSection from '../components/JoinNowSection';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import GameplaySection from '../components/GameplaySection';
import AboutUsSection from '../components/AboutUsSection';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <VideoSection />
      <JoinNowSection />
      <CardsOfTheWeek />
      <GameplaySection />
      <AboutUsSection />
    </div>
  );
};

export default LandingPage;