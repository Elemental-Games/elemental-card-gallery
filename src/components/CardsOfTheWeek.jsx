import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import CardDetailSidebar from './CardDetailSidebar';
import { getCardImagePath, createCardImageErrorHandler } from '@/utils/imageUtils';

const CardsOfTheWeek = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Helper function to determine if a date is tomorrow
  const isTomorrow = (dateString) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Use 2025 for upcoming marketing cards, 2024 for already released cards
    const year = dateString.includes('May') ? 2024 : 2025;
    const targetDate = new Date(dateString + ', ' + year);
    
    return targetDate.toDateString() === tomorrow.toDateString();
  };

  // Helper function to format release date
  const formatReleaseDate = (dateString) => {
    if (isTomorrow(dateString)) {
      return 'Releasing Tomorrow';
    }
    
    // Add ordinal suffix for display
    const addOrdinalSuffix = (dateStr) => {
      // Extract the day number from the date string
      const dayMatch = dateStr.match(/(\w+)\s+(\d+)/);
      if (dayMatch) {
        const month = dayMatch[1];
        const day = parseInt(dayMatch[2]);
        
        const getOrdinal = (n) => {
          const s = ["th", "st", "nd", "rd"];
          const v = n % 100;
          return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };
        
        return `${month} ${getOrdinal(day)}`;
      }
      return dateStr;
    };
    
    return addOrdinalSuffix(dateString);
  };

  // Helper function to determine if card is available (today or earlier)
  const isCardAvailable = (dateString) => {
    const today = new Date();
    // Use 2025 for upcoming marketing cards, 2024 for already released cards
    const year = dateString.includes('May') ? 2024 : 2025;
    const targetDate = new Date(dateString + ', ' + year);
    return targetDate <= today;
  };

  // Currently released cards (already available)
  const releasedCards = [
    { 
      id: 'nimblefoot', 
      name: 'Nimblefoot', 
      element: 'Earth',
      description: 'A swift earth creature with excellent mobility.',
      releaseDate: 'May 1' // Set to past date to show as released
    },
    { 
      id: 'tuskhammer', 
      name: 'Tuskhammer', 
      element: 'Earth',
      description: 'A powerful earth creature with devastating attacks.',
      releaseDate: 'May 2' // Set to past date to show as released
    },
    { 
      id: 'terra', 
      name: 'Terra', 
      element: 'Earth',
      description: 'An ancient earth elemental with immense power.',
      releaseDate: 'May 3' // Set to past date to show as released
    }
  ];

  // Full card reveal schedule (upcoming cards)
  const upcomingMarketingCards = [
    { 
      id: 'swoop', 
      name: 'Swoop', 
      element: 'Air',
      description: 'A fierce aerial predator with swift attack capabilities.',
      releaseDate: 'July 1'
    },
    { 
      id: 'dumoles', 
      name: 'Dumoles', 
      element: 'Earth',
      description: 'A sturdy earth creature with defensive prowess.',
      releaseDate: 'July 2'
    },
    { 
      id: 'nimbus', 
      name: 'Nimbus', 
      element: 'Air',
      description: 'A mystical air elemental that manipulates the weather.',
      releaseDate: 'July 3'
    },
    { 
      id: 'galea', 
      name: 'Galea', 
      element: 'Air',
      description: 'A powerful water creature with healing abilities.',
      releaseDate: 'July 4'
    },
    { 
      id: 'balon', 
      name: 'Balon', 
      element: 'Earth',
      description: 'A blazing fire creature with explosive attacks.',
      releaseDate: 'July 5'
    },
    { 
      id: 'lifebound-armour', 
      name: 'Lifebound Armour', 
      element: 'Rune',
      description: 'Protective armor that grows stronger with life force.',
      releaseDate: 'July 8'
    },
    { 
      id: 'rapid-recovery', 
      name: 'Rapid Recovery', 
      element: 'Counter',
      description: 'A healing spell that restores health quickly.',
      releaseDate: 'July 9'
    },
    { 
      id: 'essence-exchange', 
      name: 'Essence Exchange', 
      element: 'Rune',
      description: 'A powerful spell that manipulates essence flow.',
      releaseDate: 'July 10'
    },
    { 
      id: 'revival-rain', 
      name: 'Revival Rain', 
      element: 'Counter',
      description: 'A restorative rain that brings life back to the battlefield.',
      releaseDate: 'July 11'
    },
    { 
      id: 'guardians-sanctuary', 
      name: "Guardian's Sanctuary", 
      element: 'Shield',
      description: 'A protective shield that guards against attacks.',
      releaseDate: 'July 12'
    },
    { 
      id: 'draconic-shield', 
      name: 'Draconic Shield', 
      element: 'Shield',
      description: 'A powerful dragon-forged shield with fire resistance.',
      releaseDate: 'July 12'
    },
    { 
      id: 'celestial-fortress', 
      name: 'Celestial Fortress', 
      element: 'Shield',
      description: 'A heavenly fortification that protects from above.',
      releaseDate: 'July 12'
    },
    { 
      id: 'ember-flicker', 
      name: 'Ember Flicker', 
      element: 'Fire',
      description: 'A quick fire spell that deals burst damage.',
      releaseDate: 'July 15'
    },
    { 
      id: 'lavrok', 
      name: 'Lavrok', 
      element: 'Fire',
      description: 'A molten fire creature from the depths of volcanoes.',
      releaseDate: 'July 16'
    },
    { 
      id: 'ignus', 
      name: 'Ignus', 
      element: 'Fire',
      description: 'A legendary fire elemental with immense power.',
      releaseDate: 'July 17'
    },
    { 
      id: 'osao', 
      name: 'Osao', 
      element: 'Fire',
      description: 'An ancient earth guardian with protective instincts.',
      releaseDate: 'July 18'
    },
    { 
      id: 'aqua-dart', 
      name: 'Aqua Dart', 
      element: 'Water',
      description: 'A swift water projectile spell with piercing damage.',
      releaseDate: 'July 21'
    },
    { 
      id: 'malletin', 
      name: 'Malletin', 
      element: 'Water',
      description: 'A sturdy earth creature with hammer-like attacks.',
      releaseDate: 'July 22'
    },
    { 
      id: 'torrent', 
      name: 'Torrent', 
      element: 'Water',
      description: 'A powerful water spell that floods the battlefield.',
      releaseDate: 'July 23'
    },
    { 
      id: 'mek', 
      name: 'Mek', 
      element: 'Water',
      description: 'A mechanical earth construct with precise movements.',
      releaseDate: 'July 24'
    }
  ];

  // Combine all cards and add status
  const allCards = [...releasedCards, ...upcomingMarketingCards].map(card => ({
    ...card,
    status: isCardAvailable(card.releaseDate) ? 'available' : 'upcoming',
    displayDate: formatReleaseDate(card.releaseDate)
  }));

  // Sort cards: released cards first, then upcoming cards by release date
  const sortedCards = allCards.sort((a, b) => {
    if (a.status === 'available' && b.status === 'upcoming') return -1;
    if (a.status === 'upcoming' && b.status === 'available') return 1;
    
    // If both have same status, sort by release date
    const yearA = a.releaseDate.includes('May') ? 2024 : 2025;
    const yearB = b.releaseDate.includes('May') ? 2024 : 2025;
    const dateA = new Date(a.releaseDate + ', ' + yearA);
    const dateB = new Date(b.releaseDate + ', ' + yearB);
    return dateA - dateB;
  });

  // Show only the first 4 cards for the "Cards of the Week" display
  const displayCards = sortedCards.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const availableCount = sortedCards.filter(card => card.status === 'available').length;
  const nextCard = sortedCards.find(card => card.status === 'upcoming');

  return (
    <>
    <motion.div 
        className="border-[4px] sm:border-[5px] border-yellow-500 rounded-xl bg-transparent"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6 text-center text-yellow-500"
          variants={itemVariants}
        >
          Cards of the Week
        </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto">
          {displayCards.map((card) => {
            return (
              <motion.div 
                key={card.id} 
                variants={itemVariants} 
                className="scale-95 md:scale-100 w-full mx-auto group cursor-pointer" 
                style={{ maxWidth: "240px" }}
              >
                <Link to={`/cards/${card.id}`} className="block">
                  <div className="relative overflow-hidden rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-yellow-500/50 transition-all duration-300">
                    <div className="w-full aspect-[5/7] relative">
                      {card.status === 'available' ? (
                        <>
                          <img 
                            src={getCardImagePath(card).marketingPath}
                            alt={card.name}
                            className={`w-full h-full object-contain ${
                              ['guardians-sanctuary', 'draconic-shield', 'celestial-fortress'].includes(card.id) 
                                ? 'transform rotate-90' 
                                : ''
                            }`}
                            onError={createCardImageErrorHandler(card)}
                          />
                          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            RELEASED
                          </div>
                          {/* Hover info overlay */}
                          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center p-4">
                              <div className="text-yellow-400 font-bold text-lg">{card.name}</div>
                              <div className="text-purple-200 text-sm mb-2">{card.element} Type</div>
                              <div className="text-purple-300 text-xs">{card.description}</div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <img 
                            src="/Card_Back.png" 
                            alt="Card Back"
                            className="w-full h-full object-contain"
                          />
                          {/* Coming Soon Overlay */}
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🔒</div>
                              <div className="text-yellow-400 font-bold text-lg">{card.name}</div>
                              <div className="text-purple-200 text-sm">{card.displayDate}</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2">{card.name}</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-300">{card.element} Type</span>
                        <span className={`font-bold ${card.status === 'available' ? 'text-green-400' : 'text-orange-400'}`}>
                          {card.status === 'available' ? 'Available Now!' : 'Coming Soon'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Campaign Status & Action */}
        <motion.div 
          className="text-center mt-8"
          variants={itemVariants}
        >
          <div className="mb-4">
            <div className="inline-flex items-center bg-green-500/20 border border-green-500/50 rounded-full px-4 py-2 mb-2">
              <span className="text-green-400 font-semibold">🎉 RELEASED: {availableCount} Cards Available Now!</span>
            </div>
            <div className="text-purple-300 text-sm">
              More revealing this week • {nextCard && (
                <span className="text-orange-400 font-bold">
                  {nextCard.name} {nextCard.displayDate.toLowerCase() === 'releasing tomorrow' ? 'tomorrow' : `on ${nextCard.displayDate}`}
                </span>
              )}
            </div>
          </div>
          
          <Link 
            to="/cards/campaign"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-purple-400 hover:border-yellow-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]"
          >
            <Calendar className="w-5 h-5 mr-3" />
            View Full Preview Collection
          </Link>
        </motion.div>
      </div>
    </motion.div>

      <CardDetailSidebar
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </>
  );
};

export default CardsOfTheWeek;