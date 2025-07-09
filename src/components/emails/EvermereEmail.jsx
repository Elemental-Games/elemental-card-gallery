import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EvermereEmail = () => {
  const [currentCard, setCurrentCard] = useState(0);

  // Evermere cards for the showcase
  const evermereCards = [
    {
      name: 'Lifebound Armour',
      image: '/images/cards/new-marketing/lifebound armour-r.webp', 
      description: 'Protection woven from life essence',
      releaseDate: 'July 8th, 2025',
      type: 'Rune Equipment'
    },
    {
      name: 'Rapid Recovery',
      image: '/images/cards/new-marketing/rapid recovery-r.webp',
      description: 'When hope seems lost, rise again',
      releaseDate: 'July 9th, 2025',
      type: 'Counter'
    },
    {
      name: 'Celestial Fortress',
      image: '/images/cards/new-marketing/celestial fortress-r.webp',
      description: 'The ultimate sanctuary of power',
      releaseDate: 'July 12th, 2025',
      type: 'Epic Shield'
    }
  ];

  // Auto-rotate cards every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % evermereCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [evermereCards.length]);

  return (
    <div className="max-w-2xl mx-auto bg-white text-gray-900 font-sans">
      {/* Email Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 text-center">
        <img 
          src="/Elekin_Kinbrold_Icon.png" 
          alt="Elekin Kinbrold" 
          className="h-48 mx-auto -mb-6 -mt-6"
        />
        <p className="text-md font-bold opacity-90 mt-5">Weekly Kingdom Reveal</p>
      </div>

      {/* Hero Section */}
      <div className="relative h-80 w-full flex items-center justify-center overflow-hidden">
        <img
          src="/Evermere - street.jpg"
          alt="Evermere Street View"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '100%', minWidth: '100%' }}
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative text-center z-20 px-4 w-full">
          <h2 className="text-5xl font-extrabold mb-8 -mt-10 tracking-wider text-white drop-shadow-lg" style={{textShadow: '0 2px 12px #6D28D9, 0 0 8px #fff'}}>WELCOME TO EVERMERE</h2>
          <h3 className="text-3xl font-extrabold mb-4 tracking-wide text-purple-200 drop-shadow-lg" style={{textShadow: '0 2px 8px #6D28D9'}}>The Birthplace of Elekin</h3>
          <p className="text-xl font-semibold text-yellow-300 drop-shadow-lg max-w-md mx-auto" style={{textShadow: '0 2px 8px #6D28D9'}}>Three new card types await</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-purple-600 mb-3">
            The Central Kingdom Awakens 🏰
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            In the heart of Kinbrold, where all elements converge, Evermere stands as the 
            beacon of balance. This week, discover three new card types that provide the depth, strategy, and comeback mechanics in Elekin.
          </p>
        </div>

        {/* Evermere Spotlight */}
        <Card className="mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img 
                src="/Evermere_-_card_crafting-min.jpg" 
                alt="Card Crafting in Evermere"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h4 className="text-2xl font-bold text-purple-600 mb-3">
                The Art of Card Crafting
              </h4>
              <p className="text-gray-100 mb-4">
                In the heart of Evermere, master artisans blend elemental essence with fallen 
                creature remains to forge the powerful cards used in Elemental Masters. This 
                ancient craft requires perfect balance between life and death energies.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-800 font-semibold">
                  🏺 Ancient Craft: Cards forged from essence and memory
                </p>
                <p className="text-sm text-purple-800 font-semibold mt-1">
                  ⚡ Living Power: Each card holds a fragment of the original creature&apos;s soul
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Dynamic Card Showcase */}
        <div className="mb-8 py-12">
          <h4 className="text-2xl font-bold text-center mb-8 text-gray-800">
            New Powers from the Central Kingdom
          </h4>
          
          {/* Card Display */}
          <div className="relative h-96 mb-8">
            {evermereCards.map((card, index) => (
              <div
                key={card.name}
                className={`absolute inset-0 -mb-5 transition-all duration-1000 ${
                  index === currentCard 
                    ? 'opacity-100 transform scale-100' 
                    : 'opacity-0 transform scale-95'
                }`}
              >
                <Card className="h-full flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`md:w-1/2 ${card.name === 'Celestial Fortress' ? 'flex items-center justify-center bg-black-50' : ''}`}>
                    <img 
                      src={card.image}
                      alt={card.name}
                      className={card.name === 'Celestial Fortress' 
                        ? "max-h-48 md:max-h-full max-w-full object-contain"
                        : "w-full h-48 md:h-full object-cover"
                      }
                    />
                  </div>
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h5 className="text-3xl font-bold text-purple-600 mb-2">{card.name}</h5>
                    <p className="text-sm text-purple-500 mb-2 font-semibold">{card.type}</p>
                    <p className="text-lg text-white-100 mb-4 italic">{card.description}</p>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 rounded-lg">
                      <p className="font-semibold">🏰 Release Date:</p>
                      <p className="text-sm mt-1">{card.releaseDate}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Card Navigation Dots */}
          <div className="flex justify-center space-x-2">
            {evermereCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCard ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Weekly Giveaway Section */}
        {/* REPLACED: Kickstarter Announcement Section */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-400">
          <div className="p-6 text-center">
            <h4 className="text-2xl font-bold text-green-700 mb-4">
              🚀 We're coming to Kickstarter!
            </h4>
            <p className="text-lg text-gray-700 mb-6">
              The pre-launch of our Kickstarter page for Elekin: Masters of Kinbrold is now LIVE!<br/>
              Be among the first to support the game, get exclusive rewards, and help bring the world of Kinbrold to life.
            </p>
            <a 
              href="https://www.kickstarter.com/projects/elemental-games/elekin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              🔗 Visit the Elekin Kickstarter Pre-Launch Page
            </a>
            <p className="text-sm mt-4 text-green-800 font-semibold">
              Your early support means the world to us. Let’s make TCG history together!
            </p>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all">
            <a href="https://elementalgames.gg/kinbrold/evermere" target="_blank" rel="noopener noreferrer">
              Explore the Central Kingdom
            </a>
          </Button>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            <a href="https://elementalgames.gg/cards/campaign" target="_blank" rel="noopener noreferrer">
              View All Revealed Cards
            </a>
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            <a href="https://discord.gg/PVrgZBmcMq" target="_blank" rel="noopener noreferrer">
              Join Discord
            </a>
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center space-x-6 text-gray-500">
            <a href="https://discord.gg/PVrgZBmcMq" className="hover:text-purple-600 transition-colors">Discord</a>
            <a href="https://www.facebook.com/ElekinTCG" className="hover:text-purple-600 transition-colors">Facebook</a>
            <a href="https://www.instagram.com/elekin_tcg/" className="hover:text-purple-600 transition-colors">Instagram</a>
            <a href="https://www.tiktok.com/@elekin_tcg" className="hover:text-purple-600 transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p className="mb-2">Next week: The Fire Kingdom of Scarto ignites...</p>
        <p>You received this email because you subscribed to Elekin TCG updates.</p>
        <a href="https://www.elementalgames.gg/unsubscribe" className="text-purple-600 hover:underline">Unsubscribe</a>
      </div>
    </div>
  );
};

export default EvermereEmail; 