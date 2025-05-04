import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, LayoutGrid, Map } from 'lucide-react';
import AnimatedCardBackground from '@/components/landing/AnimatedCardBackground';
import CardsOfTheWeek from '../components/CardsOfTheWeek';
import KeyFeatures from '../components/KeyFeatures';
import ElementalTransition from '../components/ElementalTransition';
import SubscribeButton from '@/components/SubscribeButton';

const LandingPage = () => {
  const [transitionElement, setTransitionElement] = useState(null);

  const kingdoms = [
    { 
      name: 'Zalos', 
      element: 'Air',
      color: 'bg-gray-300', 
      hoverColor: 'hover:bg-gray-400',
      description: 'Among the mountain peaks are floating cities created by the architects and scholars who have harnessed the power of the air.'
    },
    { 
      name: 'Tsunareth', 
      element: 'Water',
      color: 'bg-blue-300', 
      hoverColor: 'hover:bg-blue-400',
      description: 'Beneath crystalline waves lie the ancient coral cities where wisdom flows as freely as the tides that shape them.'
    },
    { 
      name: 'Scarto', 
      element: 'Fire',
      color: 'bg-red-300', 
      hoverColor: 'hover:bg-red-400',
      description: 'From volcanic depths, rise citadels created from those who have mastered the power of fire, where passionate warriors forge their own destiny.'
    },
    { 
      name: 'Grivoss', 
      element: 'Earth',
      color: 'bg-green-300', 
      hoverColor: 'hover:bg-green-400',
      description: 'Deep within mountain strongholds, stand the steadfast people who carve their legacy and test the limits on the land of Kinbrold.'
    }
  ];

  if (transitionElement) {
    return (
      <ElementalTransition element={transitionElement}>
        <div className={`min-h-screen ${transitionElement.toLowerCase()}-bg text-white p-8`}>
          <h1 className="text-4xl font-bold mb-8">Welcome to {transitionElement}</h1>
          <p className="text-xl">Explore the {transitionElement} element</p>
          <Button onClick={() => setTransitionElement(null)}>Go Back</Button>
        </div>
      </ElementalTransition>
    );
  }

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <AnimatedCardBackground />
      
      {/* Game Overview Section */}
      <section className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title and Introduction */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12">
            <div className="flex-grow w-full">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl lg:text-6xl font-bold">Elekin TCG - Game Overview</h2>
                <h3 className="text-xl lg:text-2xl mt-2 text-purple-300 font-medium">Masters of Kinbrold</h3>
              </div>
              <p className="text-lg text-purple-200 mt-4 text-center lg:text-left">
                Embark on an epic journey through the mystical realm of Kinbrold. Master the elements, forge powerful decks, and become a legendary Elekin Master.
              </p>
            </div>
            <div className="lg:w-auto flex justify-center flex-shrink-0">
              <img 
                src="/Masters_Logo.png" 
                alt="Masters Logo" 
                className="w-48 lg:w-80 h-auto"
              />
            </div>
          </div>
          
          {/* Features in full width */}
          <div className="w-full">
            <KeyFeatures />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-purple-800 bg-opacity-50 rounded-xl p-8 mb-32">
          <CardsOfTheWeek />
        </div>

        <section className="mb-16">
          <Link to="/kinbrold">
            <h2 className="text-4xl font-bold mb-8 flex items-center flex-wrap cursor-pointer hover:text-accent transition-colors">
              Explore the World of Kinbrold
            </h2>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {kingdoms.map((kingdom) => (
              <div 
                key={kingdom.name} 
                className={`${kingdom.color} bg-opacity-30 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${kingdom.hoverColor} cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <img 
                    src={`/icons/${kingdom.element}.png`}
                    alt={`${kingdom.element} Icon`}
                    className="w-24 h-24 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2">{kingdom.name}, <span className="text-sm font-bold">the {kingdom.element} Kingdom</span></h3>
                  <p className="mb-4">{kingdom.description}</p>
                </div>
                <Link to={`/kinbrold/${kingdom.name.toLowerCase()}`}>
                  <Button variant="outline" className="mt-auto w-full">Explore {kingdom.name}</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Explore More Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/cards/gallery">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              >
                <LayoutGrid className="mr-3 h-8 w-8" />
                View Gallery
              </Button>
            </Link>
            <Link to="/elekin/how-to-play">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              >
                <Book className="mr-3 h-8 w-8" />
                View Rulebook
              </Button>
            </Link>
            <Link to="/kinbrold">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              >
                <Map className="mr-3 h-8 w-8" />
                Explore Lore
              </Button>
            </Link>
            <SubscribeButton 
              variant="outline"
              size="lg"
              className="w-full bg-purple-900/30 border-purple-500/30 text-white hover:text-yellow-400 hover:bg-purple-800/30 h-[100px] text-lg font-semibold"
              iconClassName="mr-3 h-8 w-8"
            >
              Join Email List
            </SubscribeButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
