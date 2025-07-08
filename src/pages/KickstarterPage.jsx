import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const KickstarterPage = () => {
  useEffect(() => {
    // Redirect to Kickstarter pre-launch page
    window.location.href = 'https://www.kickstarter.com/projects/elemental-games/elekin';
  }, []);

  return (
    <>
      <Helmet>
        <title>Kickstarter - Elekin TCG</title>
        <meta name="description" content="Support Elekin TCG on Kickstarter! Join our campaign to bring this epic trading card game to life." />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Redirecting to Kickstarter...</h1>
          <p className="text-purple-200">
            If you&apos;re not redirected automatically, 
            <a 
              href="https://www.kickstarter.com/projects/elemental-games/elekin" 
              className="text-yellow-400 hover:text-yellow-300 ml-1 underline"
            >
              click here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default KickstarterPage; 