import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const KickstarterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to join-now page (which now contains Kickstarter content)
    navigate('/join-now', { replace: true });
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Kickstarter Launch - Elekin TCG</title>
        <meta name="description" content="Support Elekin TCG on Kickstarter! Help us fund manufacturing and development. Stretch goals unlock free promo cards, playmats, and more for all backers." />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Redirecting...</h1>
          <p className="text-purple-200">
            If you&apos;re not redirected automatically, 
            <a 
              href="/join-now" 
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
