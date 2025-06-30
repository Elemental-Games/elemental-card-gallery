import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AirKingdomEmail = () => {
  const [currentCard, setCurrentCard] = useState(0);

  // Air cards for the showcase
  const airCards = [
    {
      name: 'Swoop',
      image: '/images/cards/new-marketing/swoop-r.webp',
      description: 'Swift aerial predator',
      releaseDate: 'July 1st, 2025'
    },
    {
      name: 'Dumoles',
      image: '/images/cards/new-marketing/dumoles-r.webp', 
      description: 'Fast and protective creatures',
      releaseDate: 'July 2nd, 2025'
    },
    {
      name: 'Nimbus',
      image: '/images/cards/new-marketing/nimbus-r.webp',
      description: 'Master of the winds',
      releaseDate: 'July 3rd, 2025'
    }
  ];

  // Auto-rotate cards every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % airCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [airCards.length]);

  return (
    <div className="max-w-2xl mx-auto bg-white text-gray-900 font-sans">
      {/* Email Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 text-center">
        <img 
          src="/Elekin_Kinbrold_Icon.png" 
          alt="Elekin Kinbrold" 
          className="h-48 mx-auto -mb-6 -mt-6"
        />
        <p className="text-md font-bold opacity-90 mt-5">Weekly Kingdom Reveal</p>
      </div>

      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'url(/images/kingdom-headers/zalos-header.webp)',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h2 className="text-4xl font-bold mb-2 tracking-wider">
            MASTER THE WINDS.
          </h2>
          <h3 className="text-3xl font-bold mb-4 tracking-wide">
            RULE THE BATTLEFIELD.
          </h3>
          <p className="text-xl opacity-90 max-w-md mx-auto">
            Galea&apos;s domain opens its gates. Three air creatures await their reveal.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-3">
            The Air Kingdom Rises 💨
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            High above the clouds, where wind meets wisdom, Galea&apos;s floating kingdom 
            awaits your command. This week, three legendary air creatures join the battle.
          </p>
        </div>

        {/* Galea Spotlight */}
        <Card className="mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img 
                src="/images/cards/new-marketing/galea-t.webp" 
                alt="Galea, Air Elementalist"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h4 className="text-2xl font-bold text-blue-600 mb-3">
                Meet Galea, Air Elementalist
              </h4>
              <p className="text-gray-700 mb-4">
                Master of the floating kingdom, Galea commands the very winds themselves. 
                Her tactical brilliance and elemental mastery make her a formidable ally 
                in any battle.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-semibold">
                  💨 Elemental Mastery: Control air currents and wind pressure
                </p>
                <p className="text-sm text-blue-800 font-semibold mt-1">
                  🏰 Kingdom Power: Command floating citadels and sky fortresses
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Dynamic Card Showcase */}
        <div className="mb-8 py-12">
          <h4 className="text-2xl font-bold text-center mb-8 text-gray-800">
            New Air Creatures This Week
          </h4>
          
          {/* Card Display */}
          <div className="relative h-96 mb-8">
            {airCards.map((card, index) => (
              <div
                key={card.name}
                className={`absolute inset-0 -mb-5 transition-all duration-1000 ${
                  index === currentCard 
                    ? 'opacity-100 transform scale-100' 
                    : 'opacity-0 transform scale-95'
                }`}
              >
                <Card className="h-full flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="md:w-1/2">
                    <img 
                      src={card.image}
                      alt={card.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h5 className="text-3xl font-bold text-blue-600 mb-2">{card.name}</h5>
                    <p className="text-lg text-gray-600 mb-4 italic">{card.description}</p>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
                      <p className="font-semibold">💨 Release Date:</p>
                      <p className="text-sm mt-1">{card.releaseDate}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Card Navigation Dots */}
          <div className="flex justify-center space-x-2">
            {airCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCard ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Weekly Giveaway Section */}
        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400">
          <div className="p-6 text-center">
            <h4 className="text-2xl font-bold text-orange-600 mb-4">
              🎁 Weekly Giveaway - Air Kingdom Edition
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-yellow-300">
                <div className="text-3xl mb-2">🏆</div>
                <h5 className="font-bold text-lg text-gray-800 mb-2">Grand Prize</h5>
                <p className="text-sm text-gray-600">
                  1 lucky subscriber wins an <strong>exclusive Galea promo card</strong> post-launch!
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-yellow-300">
                <div className="text-3xl mb-2">🎪</div>
                <h5 className="font-bold text-lg text-gray-800 mb-2">Runner-Up Prizes</h5>
                <p className="text-sm text-gray-600">
                  2 lucky subscribers win <strong>free booster packs</strong> post-launch!
                </p>
              </div>
            </div>
            <div className="bg-blue-600 text-white p-4 rounded-lg">
              <p className="font-semibold mb-4">How to Enter:</p>
              <a 
                href="https://discord.gg/elemental" 
                className="inline-block bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors transform hover:scale-105"
              >
                🎮 Join Discord to Enter
              </a>
              <p className="text-xs mt-3 opacity-90">
                Follow us on social media for extra entries!
              </p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all">
            Explore the Air Kingdom
          </Button>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              View All Cards
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              Join Discord
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center space-x-6 text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Discord</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-blue-600 transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p className="mb-2">Next week: The Kingdom of Evermere awaits...</p>
        <p>You received this email because you subscribed to Elekin TCG updates.</p>
        <a href="#" className="text-blue-600 hover:underline">Unsubscribe</a>
      </div>
    </div>
  );
};

export default AirKingdomEmail; 