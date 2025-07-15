import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ScartoEmail = () => {
  const [currentCard, setCurrentCard] = useState(0);

  // Fire cards for the showcase
  const fireCards = [
    {
      name: 'Ember Flicker',
      image: '/images/cards/new-marketing/ember flicker-r.webp',
      description: 'A spark of untamed fire',
      releaseDate: 'July 15th, 2025',
      type: 'Fire Creature'
    },
    {
      name: 'Ignus',
      image: '/images/cards/new-marketing/ignus-r.webp',
      description: 'The mighty Fire Titan',
      releaseDate: 'July 16th, 2025',
      type: 'Fire Titan'
    },
    {
      name: 'Lavrok',
      image: '/images/cards/new-marketing/lavrok-r.webp',
      description: 'Volcanic predator of the depths',
      releaseDate: 'July 17th, 2025',
      type: 'Fire Creature'
    }
  ];

  // Auto-rotate cards every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % fireCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [fireCards.length]);

  return (
    <div className="max-w-2xl mx-auto bg-white text-gray-900 font-sans">
      {/* Email Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 text-center">
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
          backgroundImage: 'url(/images/kingdom-headers/scarto-header.webp)',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h2 className="text-4xl font-bold mb-2 tracking-wider">
            FORGE YOUR DESTINY.
          </h2>
          <h3 className="text-3xl font-bold mb-4 tracking-wide">
            IGNITE THE BATTLEFIELD.
          </h3>
          <p className="text-xl opacity-90 max-w-md mx-auto">
            Osao&apos;s volcanic realm opens its gates. Three fire creatures await their reveal.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-red-600 mb-3">
            The Fire Kingdom Ignites 🔥
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Deep within the volcanic peaks, where molten earth meets blazing sky, Osao&apos;s 
            kingdom thrives with untamed power. This week, three legendary fire creatures 
            join the eternal flame.
          </p>
        </div>

        {/* Osao Spotlight */}
        <Card className="mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 md:ml-8 flex items-center justify-center">
              <img 
                src="/images/cards/new-marketing/osao-r.webp" 
                alt="Osao, Fire Elementalist"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h4 className="text-2xl font-bold text-red-600 mb-3">
                Meet Osao, Fire Elementalist
              </h4>
              <p className="text-gray-700 mb-4">
                Master of the volcanic kingdom, Osao commands the very essence of fire itself. 
                His passion burns eternal, and his strategic mind forges victory from the 
                crucible of battle.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800 font-semibold">
                  🔥 Elemental Mastery: Control volcanic forces and molten energy
                </p>
                <p className="text-sm text-red-800 font-semibold mt-1">
                  ⚒️ Kingdom Power: Command forge-cities and volcanic strongholds
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Dynamic Card Showcase */}
        <div className="mb-8 py-12">
          <h4 className="text-2xl font-bold text-center mb-8 text-gray-800">
            New Fire Creatures This Week
          </h4>
          
          {/* Card Display */}
          <div className="relative h-96 mb-8">
            {fireCards.map((card, index) => (
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
                    <h5 className="text-3xl font-bold text-red-600 mb-2">{card.name}</h5>
                    <p className="text-lg text-gray-600 mb-4 italic">{card.description}</p>
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg">
                      <p className="font-semibold">🔥 Release Date:</p>
                      <p className="text-sm mt-1">{card.releaseDate}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Card Navigation Dots */}
          <div className="flex justify-center space-x-2">
            {fireCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCard ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Kickstarter Support Section */}
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-red-400">
          <div className="p-6 text-center">
            <h4 className="text-2xl font-bold text-red-600 mb-4">
              🚀 Support Our Kickstarter Campaign
            </h4>
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-4">
                Help bring the Fire Kingdom to life! Your support makes Elekin TCG possible.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-red-300">
                  <div className="text-3xl mb-2">⚔️</div>
                  <h5 className="font-bold text-lg text-gray-800 mb-2">Exclusive Rewards</h5>
                  <p className="text-sm text-gray-600">
                    Get <strong>early access</strong> to cards and <strong>exclusive promo items</strong> only available to backers!
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-300">
                  <div className="text-3xl mb-2">🔥</div>
                  <h5 className="font-bold text-lg text-gray-800 mb-2">Shape the Game</h5>
                  <p className="text-sm text-gray-600">
                    Be part of the <strong>development process</strong> and help us create the ultimate TCG experience!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-600 text-white p-4 rounded-lg">
              <p className="font-semibold mb-4">Ready to Join the Fire Kingdom?</p>
              <a 
                href="https://elementalgames.gg/kickstarter" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors transform hover:scale-105 text-lg"
              >
                🚀 Back Our Kickstarter
              </a>
              <p className="text-xs mt-3 opacity-90">
                Every pledge helps us forge the future of Elekin TCG!
              </p>
            </div>
          </div>
        </Card>

        {/* Scarto Lore Section */}
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
          <div className="p-6">
            <h4 className="text-2xl font-bold text-red-600 mb-4 text-center">
              ⚒️ The Forges of Scarto
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold text-lg text-gray-800 mb-3">Volcanic Mastery</h5>
                <p className="text-gray-700 text-sm">
                  In Scarto&apos;s volcanic depths, master blacksmiths harness molten earth to forge 
                  the finest weapons and armor in all of Kinbrold. Their legendary cooling 
                  systems allow comfortable living amid blazing temperatures.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-lg text-gray-800 mb-3">Philosophy of Fire</h5>
                <p className="text-gray-700 text-sm">
                  Scarto&apos;s inhabitants believe that mastering fire means mastering oneself. 
                  Their philosophy teaches that true power comes from passion tempered by wisdom, 
                  burning bright without being consumed.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all">
            Explore the Fire Kingdom
          </Button>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              View All Cards
            </Button>
            <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              Join Discord
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center space-x-6 text-gray-500">
            <a href="#" className="hover:text-red-600 transition-colors">Discord</a>
            <a href="#" className="hover:text-red-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-red-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-red-600 transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p className="mb-2">Next week: The Water Kingdom of Tsunareth rises...</p>
        <p>You received this email because you subscribed to Elekin TCG updates.</p>
        <a href="#" className="text-red-600 hover:underline">Unsubscribe</a>
      </div>
    </div>
  );
};

export default ScartoEmail; 