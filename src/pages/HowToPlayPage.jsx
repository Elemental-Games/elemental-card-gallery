import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Download, Sword, Sparkles, Shield, Scroll, Wand, Zap, Lightbulb, Book, PocketKnife, BookText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HowToPlayPage = () => {
  const [activeTab, setActiveTab] = useState('quickstart');

  const quickLinks = [
    { title: 'Quick Start', tab: 'quickstart', icon: Lightbulb },
    { title: 'Game Basics', tab: 'basics', icon: Scroll },
    { title: 'Essence Tracking', tab: 'essence', icon: Sparkles },
    { title: 'Combat', tab: 'combat', icon: Sword },
    { title: 'Shield Mechanics', tab: 'shields', icon: Shield },
    { title: 'Card Types', tab: 'cards', icon: Wand },
    { title: 'Advanced Rules', tab: 'advanced', icon: Book },
    { title: 'Strategy Guide', tab: 'strategy', icon: PocketKnife },
    { title: 'Glossary', tab: 'glossary', icon: BookText },
  ];

  const elementalCards = {
    air: {
      name: "Swoop",
      image: "/images/cards/new/swoop.webp",
      stats: "75/75",
      element: "Air",
      description: "Agile air creature with balanced stats"
    },
    water: {
      name: "Aqua Dart",
      image: "/images/cards/new/aqua dart.webp",
      stats: "65/60",
      element: "Water",
      description: "High agility water creature with dodge ability"
    },
    fire: {
      name: "Ember Flicker",
      image: "/images/cards/new/ember flicker.webp",
      stats: "90/35",
      element: "Fire",
      description: "High strength fire creature with powerful attacks"
    },
    earth: {
      name: "Nimblefoot",
      image: "/images/cards/new/nimblefoot.webp",
      stats: "70/90",
      element: "Earth",
      description: "Defensive earth creature with high durability"
    }
  };

  const elementalIcons = {
    air: {
      name: "Air",
      image: "/icons/Air.png",
      description: "Swift and evasive"
    },
    water: {
      name: "Water",
      image: "/icons/Water.png",
      description: "Fluid and adaptive"
    },
    fire: {
      name: "Fire",
      image: "/icons/Fire.png",
      description: "Powerful and aggressive"
    },
    earth: {
      name: "Earth",
      image: "/icons/Earth.png",
      description: "Sturdy and defensive"
    }
  };

  const cardExamples = {
    creature: {
      name: "Ember Flicker",
      image: "/images/cards/new/ember flicker.webp",
      type: "Creature",
      element: "Fire",
      stats: "90/35",
      cost: "0 Fire"
    },
    rune: {
      name: "Essence Exchange",
      image: "/images/cards/new/essence exchange.webp",
      type: "Rune",
      element: "Water",
      description: "Convert essence from one element to another"
    },
    counter: {
      name: "Counter Pulse",
      image: "/images/cards/new/counter pulse.webp",
      type: "Counter",
      element: "Water",
      description: "Negate an opponent's card effect"
    },
    shield: {
      name: "Mystic Ward",
      image: "/images/cards/new/mystic ward.webp",
      type: "Shield",
      tier: "1",
      health: "150"
    },
    dragon: {
      name: "Eldritch the Frost Dragon",
      image: "/images/cards/new/eldritch.webp",
      type: "Dragon",
      elements: ["Air", "Water"],
      stats: "185/110",
      cost: "5 Air, 5 Water"
    },
    victory: {
      name: "Ancient Sigil",
      image: "/images/cards/new/ancient sigil.webp",
      type: "Rune",
      description: "Legendary card that grants instant victory"
    }
  };

  const CardImage = ({ card, className = "", size = "normal" }) => {
    const [imgSrc, setImgSrc] = useState(card.image);
    const handleError = () => setImgSrc(card.fallbackImage);

    const sizeClasses = {
      small: "w-32",
      normal: "w-48",
      large: "w-64"
    };

    return (
      <div className={`relative group ${className} ${sizeClasses[size]}`}>
        <img 
          src={imgSrc} 
          alt={card.name}
          onError={handleError}
          className="rounded-lg shadow-lg transition-transform group-hover:scale-105 w-full h-auto object-contain bg-purple-950/50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end">
          <div className="p-2 text-white text-sm">
            <p className="font-bold">{card.name}</p>
            <p>{card.type} {card.element && `- ${card.element}`}</p>
            {card.stats && <p>Stats: {card.stats}</p>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>How To Play Elekin TCG - Game Rules & Instructions</title>
        <meta name="description" content="Learn how to play Elekin Trading Card Game with our comprehensive rules, tutorials, and strategy guides. Perfect for beginners and experienced players alike." />
        <meta name="keywords" content="Elekin rules, how to play Elekin, TCG instructions, card game tutorial, Elekin strategy guide, trading card game rules" />
        <meta property="og:title" content="How To Play Elekin TCG - Game Rules & Instructions" />
        <meta property="og:description" content="Master the Elekin Trading Card Game with our easy-to-follow rules and guides. Learn gameplay mechanics, card types, and winning strategies." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://elementalgames.gg/how-to-play" />

        {/* HowTo structured data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How To Play Elekin Trading Card Game",
            "description": "Learn how to play the Elekin Trading Card Game with these comprehensive instructions.",
            "totalTime": "PT15M",
            "tool": [
              {
                "@type": "HowToTool",
                "name": "Elekin deck of cards"
              },
              {
                "@type": "HowToTool",
                "name": "Game board (optional)"
              },
              {
                "@type": "HowToTool",
                "name": "Element tokens"
              }
            ],
            "step": [
              {
                "@type": "HowToStep",
                "name": "Prepare Your Deck",
                "text": "Build a deck of 40 cards, including Elementalist cards, Element cards, and Action cards.",
                "url": "https://elementalgames.gg/how-to-play#deck-building",
                "image": "https://elementalgames.gg/images/how-to-play/deck-building.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Setup The Game",
                "text": "Each player draws 5 cards. Determine who goes first randomly.",
                "url": "https://elementalgames.gg/how-to-play#game-setup",
                "image": "https://elementalgames.gg/images/how-to-play/game-setup.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Play Elements",
                "text": "Place element cards to generate resources for playing other cards.",
                "url": "https://elementalgames.gg/how-to-play#playing-elements",
                "image": "https://elementalgames.gg/images/how-to-play/elements.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Summon Creatures",
                "text": "Use element resources to play creature cards to attack and defend.",
                "url": "https://elementalgames.gg/how-to-play#creatures",
                "image": "https://elementalgames.gg/images/how-to-play/creatures.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Attack and Defend",
                "text": "Use your creatures to attack the opponent and defend against their attacks.",
                "url": "https://elementalgames.gg/how-to-play#combat",
                "image": "https://elementalgames.gg/images/how-to-play/combat.jpg"
              }
            ]
          }
        `}</script>
      </Helmet>

      <div className="min-h-screen bg-[#1A103C]">
      <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">How to Play Elekin</h1>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Master the elements and become a legendary card master in the world of Kinbrold
            </p>
            <div className="flex justify-center gap-6">
          <a 
            href="/data/TCG Rulebook.pdf"
            download
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-purple-900 
                  font-bold px-8 py-6 rounded-lg transition-colors text-lg h-[72px] min-w-[240px]"
              >
                <Download className="w-6 h-6" />
                Download Rulebook
              </a>
            </div>
          </motion.div>

          {/* Core Mechanics Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <motion.div 
              className="bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 cursor-pointer transition-all hover:bg-purple-800/40 hover:border-yellow-500/50 hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] relative group"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setActiveTab('essence');
                document.getElementById('tabs-section').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity"
              >
                <Sparkles className="w-full h-full text-yellow-400" />
              </motion.div>
              <Sparkles className="w-12 h-12 text-yellow-500 mb-4 group-hover:text-yellow-400 transition-colors" />
              <h2 className="text-2xl font-bold mb-4 text-white">Essence Tracking</h2>
              <p className="text-purple-200">
                Generate and manage elemental essence to summon creatures and activate powerful abilities.
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-yellow-500 font-semibold text-sm">Click to learn more</span>
              </div>
            </motion.div>

            <motion.div 
              className="bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 cursor-pointer transition-all hover:bg-purple-800/40 hover:border-yellow-500/50 hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] relative group"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setActiveTab('combat');
                document.getElementById('tabs-section').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.div
                initial={{ rotate: -45, y: 20 }}
                animate={{ rotate: 45, y: -20 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity"
              >
                <Sword className="w-full h-full text-yellow-400" />
              </motion.div>
              <Sword className="w-12 h-12 text-yellow-500 mb-4 group-hover:text-yellow-400 transition-colors" />
              <h2 className="text-2xl font-bold mb-4 text-white">Combat System</h2>
              <p className="text-purple-200">
                Strategic battles using creature stats, abilities, and tactical positioning.
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-yellow-500 font-semibold text-sm">Click to learn more</span>
              </div>
            </motion.div>

            <motion.div 
              className="bg-purple-900/30 p-8 rounded-lg border border-purple-500/30 cursor-pointer transition-all hover:bg-purple-800/40 hover:border-yellow-500/50 hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] relative group"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setActiveTab('shields');
                document.getElementById('tabs-section').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity"
              >
                <Shield className="w-full h-full text-yellow-400" />
              </motion.div>
              <Shield className="w-12 h-12 text-yellow-500 mb-4 group-hover:text-yellow-400 transition-colors" />
              <h2 className="text-2xl font-bold mb-4 text-white">Shield Mechanics</h2>
              <p className="text-purple-200">
                Protect yourself with powerful shields that provide unique effects when broken.
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-yellow-500 font-semibold text-sm">Click to learn more</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex flex-col md:flex-row gap-8" id="tabs-section">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-3/4"
            >
              <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full bg-purple-900/30 border-b border-purple-500/30">
                  {quickLinks.map((link) => (
                    <TabsTrigger
                      key={link.tab}
                      value={link.tab}
                      className="flex-1 data-[state=active]:bg-yellow-500 data-[state=active]:text-purple-900"
                    >
                      {link.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="quickstart" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Quick Start Guide</h2>
                  <div className="space-y-6 text-purple-200">
                    <div className="bg-purple-950/60 p-6 rounded-lg border border-yellow-500/30">
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Learn Elekin TCG in 5 Minutes</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3">1. Game Setup</h4>
                          <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Each player starts with 500 health points</li>
                            <li>Draw 5 cards for your starting hand</li>
                            <li>Place your 3 shield cards face-down (one of each tier)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3">2. Turn Structure</h4>
                          <ol className="list-decimal list-inside space-y-2 text-lg">
                            <li><span className="font-semibold">Draw Phase:</span> Draw one card</li>
                            <li><span className="font-semibold">Generation Phase:</span> Generate essence from your creatures</li>
                            <li><span className="font-semibold">Main Phase 1:</span> Summon creatures and play cards</li>
                            <li><span className="font-semibold">Battle Phase:</span> Attack with your creatures</li>
                            <li><span className="font-semibold">Main Phase 2:</span> Play additional cards</li>
                            <li><span className="font-semibold">End Phase:</span> Shields regenerate, cleanup effects</li>
                          </ol>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3">3. Understanding Cards</h4>
                          <ul className="list-disc list-inside space-y-2 text-lg">
                            <li><span className="font-semibold">Strength (First number):</span> Both attack power and health</li>
                            <li><span className="font-semibold">Agility (Second number):</span> Speed for attacking/blocking/dodging</li>
                            <li><span className="font-semibold">Element:</span> Air, Water, Fire, or Earth</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3">4. Combat Basics</h4>
                          <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Higher agility creature strikes first</li>
                            <li>Creatures can block attacks for other creatures</li>
                            <li>Faster creatures can dodge if they have an action available</li>
                            <li>When shields break, special effects activate</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3">5. Winning the Game</h4>
                          <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Reduce your opponent's health to 0</li>
                            <li>Force your opponent to draw when they have no cards left</li>
                            <li>Activate special victory cards like "Ancient Sigil"</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Element Quick Reference</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-950/40 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <img src="/icons/Air.png" alt="Air Icon" className="w-22 h-24 mr-2" />
                            <h4 className="text-xl font-bold text-white">Air</h4>
                          </div>
                          <ul className="list-disc list-inside text-base">
                            <li>Fastest element (highest agility)</li>
                            <li>Lowest strength</li>
                            <li>Excels at blocking and dodging</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-950/40 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <img src="/icons/Water.png" alt="Water Icon" className="w-22 h-24 mr-2" />
                            <h4 className="text-xl font-bold text-white">Water</h4>
                          </div>
                          <ul className="list-disc list-inside text-base">
                            <li>Second fastest element</li>
                            <li>Third highest strength</li>
                            <li>Specializes in essence generation and deck scrying</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-950/40 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <img src="/icons/Fire.png" alt="Fire Icon" className="w-22 h-24 mr-2" />
                            <h4 className="text-xl font-bold text-white">Fire</h4>
                          </div>
                          <ul className="list-disc list-inside text-base">
                            <li>Third fastest element</li>
                            <li>Second highest strength</li>
                            <li>Focuses on discarding opponent's essence and cards</li>
                          </ul>
                        </div>
                        
                        <div className="bg-purple-950/40 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <img src="/icons/Earth.png" alt="Earth Icon" className="w-22 h-24 mr-2" />
                            <h4 className="text-xl font-bold text-white">Earth</h4>
                          </div>
                          <ul className="list-disc list-inside text-base">
                            <li>Slowest element</li>
                            <li>Highest strength</li>
                            <li>Excellent for beatdown strategies</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/20 p-6 rounded-lg border border-yellow-500/40">
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-3">Pro Tip: Deck Building</h3>
                      <p className="mb-3 text-lg">For beginners, we recommend focusing on dual-element decks.</p>
                      <p className="text-lg">Choose a combinational element you like (Frost, Lightning, Lava, Sand, Crystal, or Poison), then build your deck using the two elements that form it. Include 1-2 Elementalists of your favorite element for maximum synergy.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="basics" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Game Basics</h2>
                  <div className="space-y-6 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Starting the Game</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Begin with 500 health points</li>
                        <li>Draw 5 cards for your starting hand</li>
                        <li>Maximum hand size is 7 cards</li>
                        <li>You may mulligan up to 2 times with your starting hand</li>
                        <li>A coin flip determines the first player</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Turn Structure</h3>
                      <ol className="list-decimal list-inside space-y-2">
                        <li><span className="font-semibold">Draw Phase:</span> Draw one card</li>
                        <li><span className="font-semibold">Generation Phase:</span> Generate essence from your creatures</li>
                        <li><span className="font-semibold">Main Phase 1:</span> Summon creatures and play cards</li>
                        <li><span className="font-semibold">Battle Phase:</span> Attack with your creatures</li>
                        <li><span className="font-semibold">Main Phase 2:</span> Play additional cards</li>
                        <li><span className="font-semibold">End Phase:</span> Clean up and prepare for next turn</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Victory Conditions</h3>
                      <div className="flex items-start gap-12">
                        <div className="flex-grow max-w-xl">
                          <ul className="list-disc list-inside space-y-2">
                            <li>Reduce opponent&apos;s health to 0</li>
                            <li>Opponent cannot draw a card when required</li>
                            <li>Activate the Ancient Sigil card</li>
                          </ul>
                          <div className="mt-4">
                            <CardImage card={cardExamples.victory} size="normal" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="essence" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Essence Tracking</h2>
                  <div className="space-y-8 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Main Elements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {Object.entries(elementalIcons).map(([element, icon]) => (
                          <div key={element} className="bg-purple-950/50 p-6 rounded-lg flex flex-col items-center">
                            <img 
                              src={icon.image}
                              alt={icon.name}
                              className="w-32 h-32 mb-4 object-contain"
                            />
                            <h4 className="font-semibold text-yellow-400 mb-2">{icon.name}</h4>
                            <p className="text-center">{icon.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Essence Management</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Start with 0 essence of each element</li>
                        <li>Maximum 20 essence per element</li>
                        <li>Generated during Generation Phase</li>
                        <li>Carries over between turns</li>
                        <li>Used for summoning creatures and activating abilities</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Generation Sources</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Creatures on your field</li>
                        <li>Special rune effects</li>
                        <li>Broken shield effects</li>
                        <li>Dragon creatures can generate multiple types</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="combat" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Combat System</h2>
                  <div className="space-y-6 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Combat Stats</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li><span className="font-semibold">Strength:</span> Determines damage dealt</li>
                        <li><span className="font-semibold">Agility:</span> Determines attack order and dodge ability</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Battle Resolution</h3>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Higher agility creature strikes first</li>
                        <li>Damage equal to strength is dealt</li>
                        <li>If defending creature survives, it counter-attacks</li>
                        <li>Effects trigger after damage resolution</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Combat Example</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <h4 className="font-bold text-yellow-400 mb-4">Battle Scenario</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                          <div className="flex flex-col items-center">
                            <CardImage card={elementalCards.fire} className="mb-3" size="normal" />
                            <p className="text-center font-semibold">Attacker (Ember Flicker)</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <CardImage card={elementalCards.water} className="mb-3" size="normal" />
                            <p className="text-center font-semibold">Defender (Aqua Dart)</p>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <p className="font-semibold mb-2">Initial State: Ember Flicker is declaring to attack Aqua Dart</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Ember Flicker (90/35) - Fire Element</li>
                              <li>Aqua Dart (65/60) - Water Element</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Defender Battle Options:</p>
                            <div className="bg-purple-900/30 p-6 rounded-lg space-y-6">
                              <div>
                                <h5 className="text-yellow-400 mb-3">Option 1: No Dodge</h5>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Aqua Dart attacks first (65 Agility {'>'} 60 Agility)</li>
                                  <li>Deals 65 damage to Ember Flicker</li>
                                  <li>Ember Flicker survives (25 HP remaining)</li>
                                  <li>Ember Flicker counter-attacks for 90 damage</li>
                                  <li>Aqua Dart is destroyed</li>
                                </ol>
                              </div>
                              <div>
                                <h5 className="text-yellow-400 mb-3">Option 2: Dodge</h5>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Aqua Dart uses dodge ability</li>
                                  <li>Turns horizontal (using its action)</li>
                                  <li>Ember Flicker&apos;s attack deals 90 damage to opponent directly</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shields" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Shield Mechanics</h2>
                  <div className="space-y-6 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Shield Tiers</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li><span className="font-semibold">Tier 1:</span> 150 health</li>
                        <li><span className="font-semibold">Tier 2:</span> 300 health</li>
                        <li><span className="font-semibold">Tier 3:</span> 450 health</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Shield Mechanics</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Start with 3 shields (one of each tier)</li>
                        <li>Regenerate to next tier threshold</li>
                        <li>Turn face-up when damaged</li>
                        <li>Cannot be replaced when broken</li>
                        <li>Choose one of two effects when broken</li>
                        <li>Shield effects cannot be countered</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Shield Example</h3>
                      <div className="flex flex-col items-start gap-6">
                        <CardImage card={cardExamples.shield} size="large" />
                        <div className="w-full">
                          <p className="mb-2">Mystic Ward (Tier 1):</p>
                          <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Primary Effect:</span> Destroy up to 2 Rune/Counter cards</li>
                            <li><span className="font-semibold">Secondary Effect:</span> Equip to reduce creature stats</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cards" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Card Types</h2>
                  <div className="space-y-8 text-purple-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-purple-950/50 p-4 rounded-lg">
                        <CardImage card={cardExamples.creature} className="mb-3" />
                        <h3 className="text-xl font-semibold text-yellow-400 mb-2">Creatures</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Basic fighting force</li>
                          <li>Generate essence</li>
                          <li>Combat abilities</li>
                        </ul>
                      </div>
                      <div className="bg-purple-950/50 p-4 rounded-lg">
                        <CardImage card={cardExamples.rune} className="mb-3" />
                        <h3 className="text-xl font-semibold text-yellow-400 mb-2">Runes</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Enhance creatures</li>
                          <li>Powerful effects</li>
                          <li>Multiple types</li>
                        </ul>
                      </div>
                      <div className="bg-purple-950/50 p-4 rounded-lg">
                        <CardImage card={cardExamples.counter} className="mb-3" />
                        <h3 className="text-xl font-semibold text-yellow-400 mb-2">Counters</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Surprise tactics</li>
                          <li>Defensive plays</li>
                          <li>Chain reactions</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Dragon Cards</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="flex justify-center">
                          <CardImage card={cardExamples.dragon} size="large" />
                        </div>
                        <div className="bg-purple-950/50 p-6 rounded-lg">
                          <h3 className="text-xl font-semibold text-yellow-400 mb-6">Frost Dragon</h3>
                          <div className="space-y-6">
                            <div>
                              <p className="font-semibold mb-2">Stats & Elements</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Power: 185/110</li>
                                <li>Element: Frost (Air and Water)</li>
                                <li>Cost: 5 Air, 5 Water</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Abilities</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Frostbite: When this card is summoned, Freeze all creatures your opponent controls (A frozen creature loses all actions).</li>
                                <li>Glacial Roar: (Costs 4 Air/Water to use) Deal 50 damage to all frozen creatures (creatures with no remaining actions).</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Advanced Rules & Mechanics</h2>
                  <div className="space-y-8 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Combinational Elements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Frost (Air + Water)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Freeze effects (reduce actions)</li>
                            <li>High agility, moderate strength</li>
                            <li>Control-focused playstyle</li>
                            <li>Specializes in delaying opponents</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Lightning (Air + Fire)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Chain damage effects</li>
                            <li>Extremely high agility</li>
                            <li>Direct damage capabilities</li>
                            <li>Focuses on quick elimination</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Crystal (Water + Earth)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Shield enhancement effects</li>
                            <li>Card draw and filtering</li>
                            <li>Healing capabilities</li>
                            <li>Defensive control strategy</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Lava (Fire + Earth)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Field-wide damage effects</li>
                            <li>Highest strength creatures</li>
                            <li>Resource destruction</li>
                            <li>Overwhelming force strategy</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Sand (Earth + Air)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Creature position manipulation</li>
                            <li>Defensive battlefield control</li>
                            <li>Damage reduction effects</li>
                            <li>Long-game attrition strategy</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Poison (Water + Fire)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Damage over time effects</li>
                            <li>Hand disruption</li>
                            <li>Essence corruption</li>
                            <li>Resource denial strategy</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Action Points System</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <div className="space-y-4">
                          <p>Each creature has action points equal to their position on the battlefield (1-5):</p>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center mb-4">
                            <div className="bg-purple-900/50 p-2 rounded-lg">
                              <p className="font-bold">Position 1</p>
                              <p>1 Action</p>
                            </div>
                            <div className="bg-purple-900/50 p-2 rounded-lg">
                              <p className="font-bold">Position 2</p>
                              <p>2 Actions</p>
                            </div>
                            <div className="bg-purple-900/50 p-2 rounded-lg">
                              <p className="font-bold">Position 3</p>
                              <p>3 Actions</p>
                            </div>
                            <div className="bg-purple-900/50 p-2 rounded-lg">
                              <p className="font-bold">Position 4</p>
                              <p>4 Actions</p>
                            </div>
                            <div className="bg-purple-900/50 p-2 rounded-lg">
                              <p className="font-bold">Position 5</p>
                              <p>5 Actions</p>
                            </div>
                          </div>
                          
                          <h4 className="font-bold text-white mb-2">Action Usage:</h4>
                          <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Attack:</span> Costs 1 action</li>
                            <li><span className="font-semibold">Block:</span> Costs 1 action</li>
                            <li><span className="font-semibold">Activate Ability:</span> Varies (1-3 actions)</li>
                            <li><span className="font-semibold">Dodge:</span> Costs all remaining actions</li>
                          </ul>
                          
                          <div className="mt-4">
                            <p className="font-semibold mb-2">Action Recovery:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Refresh all actions at the start of your turn</li>
                              <li>Some abilities can restore actions during a turn</li>
                              <li>Creatures retain their position-based action maximum</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Status Effects</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Positive Status Effects</h4>
                          <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Empowered:</span> +25 Strength until end of turn</li>
                            <li><span className="font-semibold">Swift:</span> +25 Agility until end of turn</li>
                            <li><span className="font-semibold">Protected:</span> Cannot be targeted by opponent's effects</li>
                            <li><span className="font-semibold">Regenerating:</span> Heals 25 damage at end phase</li>
                            <li><span className="font-semibold">Enraged:</span> Deals double damage but cannot block</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Negative Status Effects</h4>
                          <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Frozen:</span> Loses all actions for one turn</li>
                            <li><span className="font-semibold">Burning:</span> Takes 25 damage at end phase</li>
                            <li><span className="font-semibold">Poisoned:</span> Takes 15 damage for 3 turns</li>
                            <li><span className="font-semibold">Weakened:</span> -25 Strength until end of turn</li>
                            <li><span className="font-semibold">Slowed:</span> -25 Agility until end of turn</li>
                            <li><span className="font-semibold">Stunned:</span> Cannot attack next turn</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Chain Resolution</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <p className="mb-4">When cards and effects interact, they form a chain that resolves in a specific order:</p>
                        <ol className="list-decimal list-inside space-y-3">
                          <li>Player 1 activates a card or effect (Chain Link 1)</li>
                          <li>Player 2 can respond with a Counter card (Chain Link 2)</li>
                          <li>Player 1 can respond to that Counter (Chain Link 3)</li>
                          <li>Chain continues until both players pass</li>
                          <li>Chain resolves in reverse order (Last In, First Out)</li>
                          <li>If a chain link is negated, all dependent effects are also negated</li>
                        </ol>
                        
                        <div className="mt-6">
                          <h4 className="font-bold text-white mb-2">Example Chain Resolution:</h4>
                          <div className="space-y-2 mt-4">
                            <p>1. Player 1 plays "Flamekeeper" (Chain Link 1)</p>
                            <p>2. Player 2 responds with "Counter Pulse" to negate (Chain Link 2)</p>
                            <p>3. Player 1 responds with "Essence Exchange" to protect (Chain Link 3)</p>
                            <p>4. Both players pass</p>
                            <p>5. Resolution: "Essence Exchange" resolves first, making "Flamekeeper" immune to "Counter Pulse"</p>
                            <p>6. "Counter Pulse" fails to negate</p>
                            <p>7. "Flamekeeper" successfully enters the battlefield</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Battlefield Positioning</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <p className="mb-4">The battlefield consists of 5 positions for each player. A creature's position determines various gameplay factors:</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-bold text-white mb-2">Front Line (Positions 1-2)</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>First to block incoming attacks</li>
                              <li>Fewer actions (1-2)</li>
                              <li>Must be destroyed before hitting back lines</li>
                              <li>Best positions for high-defense creatures</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-white mb-2">Back Line (Positions 3-5)</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Protected by front line</li>
                              <li>More actions (3-5)</li>
                              <li>Cannot block for front line creatures</li>
                              <li>Best positions for ability-focused creatures</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="font-bold text-white mb-2">Positioning Strategy:</h4>
                          <ul className="list-disc list-inside space-y-2">
                            <li>Place high-strength Earth creatures in front positions for defense</li>
                            <li>Place high-agility Air/Water creatures in back positions for attacks</li>
                            <li>When a creature is destroyed, others shift forward to fill the gap</li>
                            <li>Some abilities allow you to swap creature positions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="strategy" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Strategy Guide</h2>
                  <div className="space-y-8 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Deck Building Strategies</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Aggro Strategy</h4>
                          <div className="space-y-4">
                            <p>Focus on overwhelming opponents quickly with high-strength creatures.</p>
                            <div>
                              <p className="font-semibold mb-2">Recommended Elements:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Fire (primary)</li>
                                <li>Earth (secondary)</li>
                                <li>Lava combination for maximum damage</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Key Cards:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>High-strength creatures (90+ strength)</li>
                                <li>Direct damage runes</li>
                                <li>Essence acceleration cards</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Tips:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Aim to finish the game within 5-6 turns</li>
                                <li>Prioritize summoning over countering</li>
                                <li>Attack shields directly to deal early damage</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Control Strategy</h4>
                          <div className="space-y-4">
                            <p>Disrupt opponent's plans while building advantage over time.</p>
                            <div>
                              <p className="font-semibold mb-2">Recommended Elements:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Water (primary)</li>
                                <li>Air (secondary)</li>
                                <li>Frost combination for creature control</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Key Cards:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Status effect creatures</li>
                                <li>Counter cards (4-6)</li>
                                <li>Card draw and filtering effects</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Tips:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Save essence for counter opportunities</li>
                                <li>Focus on preserving your shields</li>
                                <li>Win through card advantage in late game</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Combo Strategy</h4>
                          <div className="space-y-4">
                            <p>Build powerful card combinations for explosive turns.</p>
                            <div>
                              <p className="font-semibold mb-2">Recommended Elements:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Air (primary)</li>
                                <li>Fire (secondary)</li>
                                <li>Lightning combination for chaining effects</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Key Cards:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Searcher/filter creatures</li>
                                <li>Essence generation boosters</li>
                                <li>Game-winning combo pieces</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Tips:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Mulligan aggressively for combo pieces</li>
                                <li>Protect your shields until combo turn</li>
                                <li>Include defensive options for survival</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Midrange Strategy</h4>
                          <div className="space-y-4">
                            <p>Balance offense and defense to adapt to any matchup.</p>
                            <div>
                              <p className="font-semibold mb-2">Recommended Elements:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Earth (primary)</li>
                                <li>Water (secondary)</li>
                                <li>Crystal combination for sustainability</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Key Cards:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Balanced stat creatures (70+/70+)</li>
                                <li>Versatile runes with multiple effects</li>
                                <li>Shield enhancement cards</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2">Tips:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Adjust playstyle based on opponent's deck</li>
                                <li>Trade resources efficiently</li>
                                <li>Build board presence gradually</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Essential Gameplay Tips</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-bold text-white mb-2">Resource Management</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Don't spend all your essence in one turn</li>
                              <li>Keep at least 2-3 essence for emergency counter cards</li>
                              <li>Balance creature summons with other card types</li>
                              <li>Decide when to attack shields vs creatures strategically</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-white mb-2">Card Advantage</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>One-for-one trades favor the player with more cards</li>
                              <li>Use multi-target effects to gain advantage</li>
                              <li>Preserve your resources when behind</li>
                              <li>Force inefficient exchanges when ahead</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-white mb-2">Timing Your Plays</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Summon creatures in Main Phase 1 for immediate attacks</li>
                              <li>Save some plays for Main Phase 2 to react to combat</li>
                              <li>Use counters at the last possible moment</li>
                              <li>Trigger shield effects at strategic moments</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-white mb-2">Reading Your Opponent</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Watch for essence they keep unspent (potential counters)</li>
                              <li>Track their used shield effects</li>
                              <li>Note which cards they hold for extended periods</li>
                              <li>Identify their deck strategy early to counter effectively</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Common Tactics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-purple-950/60 p-4 rounded-lg border border-yellow-500/20">
                          <h4 className="font-bold text-white mb-2">Shield Baiting</h4>
                          <p>Force your opponent to break shields early with small attacks, saving your strongest creatures for direct attacks later.</p>
                        </div>
                        
                        <div className="bg-purple-950/60 p-4 rounded-lg border border-yellow-500/20">
                          <h4 className="font-bold text-white mb-2">Counter Chaining</h4>
                          <p>Hold multiple counter cards to create long chains that protect your key plays while disrupting your opponent's responses.</p>
                        </div>
                        
                        <div className="bg-purple-950/60 p-4 rounded-lg border border-yellow-500/20">
                          <h4 className="font-bold text-white mb-2">Essence Flooding</h4>
                          <p>Rapidly generate large amounts of essence to overwhelm opponents with multiple high-cost creatures in a single turn.</p>
                        </div>
                        
                        <div className="bg-purple-950/60 p-4 rounded-lg border border-yellow-500/20">
                          <h4 className="font-bold text-white mb-2">Battlefield Positioning</h4>
                          <p>Strategically place creatures to optimize action points and protect valuable backline units.</p>
                        </div>
                        
                        <div className="bg-purple-950/60 p-4 rounded-lg border border-yellow-500/20">
                          <h4 className="font-bold text-white mb-2">Card Cycling</h4>
                          <p>Quickly move through your deck with draw/discard effects to find key cards while filling your discard pile for revival effects.</p>
                        </div>
                        
                        <div className="bg-purple-950/60 p-4 rounded-lg border border-yellow-500/20">
                          <h4 className="font-bold text-white mb-2">Status Stacking</h4>
                          <p>Combine multiple status effects on opponent's creatures to render them ineffective (e.g., frozen + weakened).</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-500/20 p-6 rounded-lg border border-yellow-500/40">
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Tournament Tips</h3>
                      <div className="space-y-4">
                        <p>For players looking to compete in organized play:</p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Build a consistent deck with minimal randomness</li>
                          <li>Practice against all major archetypes (aggro, control, combo, midrange)</li>
                          <li>Include 1-2 tech cards specifically for popular matchups</li>
                          <li>Consider your side deck choices carefully (if format allows)</li>
                          <li>Track the evolving meta and adjust your strategy accordingly</li>
                          <li>Know all the rules thoroughly to avoid mistakes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="glossary" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Glossary of Terms</h2>
                  <div className="space-y-6 text-purple-200">
                    <p className="text-lg">This glossary provides definitions for common terms used in Elekin TCG.</p>
                    
                    <div className="bg-purple-950/50 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">A</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Agility</p>
                              <p className="text-sm">The second stat on a creature card that determines attack order, dodge capability, and movement speed.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Action Points</p>
                              <p className="text-sm">Resources creatures use to attack, block, dodge, or activate abilities. Number of actions is based on battlefield position.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Ancient Sigil</p>
                              <p className="text-sm">A legendary rune card that grants instant victory when specific conditions are met.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">B</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Battle Phase</p>
                              <p className="text-sm">The fourth phase of a turn when players can declare attacks with their creatures.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Block</p>
                              <p className="text-sm">Using a creature to defend against an opponent's attack. Costs 1 action point.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Burning</p>
                              <p className="text-sm">A status effect that deals 25 damage to the affected creature during each end phase.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">C</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Chain</p>
                              <p className="text-sm">A sequence of card effects and responses that resolves in reverse order (last in, first out).</p>
                            </div>
                            <div>
                              <p className="font-semibold">Counter Card</p>
                              <p className="text-sm">A card type that can be played outside your turn to negate or respond to opponent's actions.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Combinational Element</p>
                              <p className="text-sm">One of six hybrid elements formed by combining two primary elements (e.g., Frost = Air + Water).</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">D</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Dodge</p>
                              <p className="text-sm">An action that allows a creature to avoid an attack completely. Costs all remaining action points.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Dragon</p>
                              <p className="text-sm">A powerful dual-element creature type with higher stats and unique abilities.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Draw Phase</p>
                              <p className="text-sm">The first phase of a turn when the active player draws one card.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">E</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Essence</p>
                              <p className="text-sm">The primary resource used to summon creatures and activate abilities. Comes in four elemental types.</p>
                            </div>
                            <div>
                              <p className="font-semibold">End Phase</p>
                              <p className="text-sm">The final phase of a turn when shields regenerate and various end-of-turn effects occur.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Elementalist</p>
                              <p className="text-sm">A special character card that provides unique bonuses to a specific element.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">F</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Frozen</p>
                              <p className="text-sm">A status effect that removes all action points from the affected creature for one turn.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Field</p>
                              <p className="text-sm">The play area where creatures are summoned, consisting of 5 positions for each player.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Front Line</p>
                              <p className="text-sm">The first two positions on the battlefield that must be attacked before reaching the back line.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">G</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Generation Phase</p>
                              <p className="text-sm">The second phase of a turn when essence is generated from creatures and other sources.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Guardian</p>
                              <p className="text-sm">A creature type with enhanced defensive capabilities and blocking bonuses.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">M</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Main Phase</p>
                              <p className="text-sm">Phases (1 and 2) when players can summon creatures and play non-counter cards.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Mulligan</p>
                              <p className="text-sm">The opportunity to redraw your starting hand (up to 2 times) before the game begins.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">P</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Position</p>
                              <p className="text-sm">A creature's place on the battlefield (1-5), which determines its action points and defensive priorities.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Poisoned</p>
                              <p className="text-sm">A status effect that deals 15 damage to the affected creature for 3 consecutive turns.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">R</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Rune</p>
                              <p className="text-sm">A card type that provides ongoing effects or one-time boosts to creatures and gameplay.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Regenerating</p>
                              <p className="text-sm">A status effect that heals 25 damage from the affected creature during each end phase.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">S</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Shield</p>
                              <p className="text-sm">A protective barrier with a health value that regenerates each turn and triggers effects when broken.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Strength</p>
                              <p className="text-sm">The first stat on a creature card that determines both attack power and health points.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Status Effect</p>
                              <p className="text-sm">A temporary condition that affects a creature's performance (e.g., Frozen, Burning, Empowered).</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">T</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Tier</p>
                              <p className="text-sm">The level of a shield (1-3), which determines its maximum health and regeneration threshold.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Turn Structure</p>
                              <p className="text-sm">The sequence of six phases that make up a player's turn.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/40">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Can't find a term?</h3>
                      <p>This glossary covers the most common terms. For more detailed explanations or specific card rulings, please consult the full rulebook or contact our support team.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          
          {/* Quick Reference Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-1/4"
            >
              <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 sticky top-4">
                <h3 className="text-xl font-bold mb-4 text-white">Quick Reference</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-yellow-400 mb-2">Core Rules</h4>
                    <ul className="space-y-2">
                      {quickLinks.slice(0, 2).map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.tab}>
                            <button
                              onClick={() => setActiveTab(link.tab)}
                              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                                activeTab === link.tab
                                  ? 'bg-yellow-500 text-purple-900 font-semibold'
                                  : 'text-purple-200 hover:bg-purple-800/30'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              {link.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-yellow-400 mb-2">Battle System</h4>
                    <ul className="space-y-2">
                      {quickLinks.slice(2, 4).map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.tab}>
                            <button
                              onClick={() => setActiveTab(link.tab)}
                              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                                activeTab === link.tab
                                  ? 'bg-yellow-500 text-purple-900 font-semibold'
                                  : 'text-purple-200 hover:bg-purple-800/30'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              {link.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-yellow-400 mb-2">Card Reference</h4>
                    <ul className="space-y-2">
                      {quickLinks.slice(4, 6).map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.tab}>
                            <button
                              onClick={() => setActiveTab(link.tab)}
                              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                                activeTab === link.tab
                                  ? 'bg-yellow-500 text-purple-900 font-semibold'
                                  : 'text-purple-200 hover:bg-purple-800/30'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              {link.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-yellow-400 mb-2">Advanced Topics</h4>
                    <ul className="space-y-2">
                      {quickLinks.slice(6, 8).map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.tab}>
                            <button
                              onClick={() => setActiveTab(link.tab)}
                              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                                activeTab === link.tab
                                  ? 'bg-yellow-500 text-purple-900 font-semibold'
                                  : 'text-purple-200 hover:bg-purple-800/30'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              {link.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-yellow-400 mb-2">Reference</h4>
                    <ul className="space-y-2">
                      {quickLinks.slice(8).map((link) => {
                        const Icon = link.icon;
                        return (
                          <li key={link.tab}>
                            <button
                              onClick={() => setActiveTab(link.tab)}
                              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                                activeTab === link.tab
                                  ? 'bg-yellow-500 text-purple-900 font-semibold'
                                  : 'text-purple-200 hover:bg-purple-800/30'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              {link.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-purple-500/30">
                    <h4 className="text-xl font-semibold text-yellow-400 mb-2">Key Stats</h4>
                    <ul className="space-y-1 text-purple-200 text-base">
                      <li>Starting Health: 500</li>
                      <li>Starting Hand: 5 cards</li>
                      <li>Max Hand Size: 7 cards</li>
                      <li>Field Size: 5 creatures</li>
                      <li>Shield Tiers: 3</li>
                      <li>Elements: 4 primary, 6 combinational</li>
                      <li>Max Essence: 20 per element</li>
                      <li>Actions: Based on position (1-5)</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-purple-500/30">
                    <h4 className="text-xl font-semibold text-yellow-400 mb-2">Turn Phases</h4>
                    <ol className="space-y-1 text-purple-200 text-base list-decimal list-inside">
                      <li>Draw Phase</li>
                      <li>Generation Phase</li>
                      <li>Main Phase 1</li>
                      <li>Battle Phase</li>
                      <li>Main Phase 2</li>
                      <li>End Phase</li>
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToPlayPage;
