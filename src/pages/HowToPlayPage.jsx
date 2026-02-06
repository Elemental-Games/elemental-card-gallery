import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Download, Sword, Sparkles, Shield, Scroll, Wand, Lightbulb, Book, BookText, CircleDot, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import RulebookDownloadModal from '@/components/RulebookDownloadModal';
import TrackedLink from '@/components/TrackedLink';

const HowToPlayPage = () => {
  const [activeTab, setActiveTab] = useState('quickstart');
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const quickLinks = [
    { title: 'Quick Start', tab: 'quickstart', icon: Lightbulb },
    { title: 'Game Basics', tab: 'basics', icon: Scroll },
    { title: 'Essence Tracking', tab: 'essence', icon: Sparkles },
    { title: 'Combat', tab: 'combat', icon: Sword },
    { title: 'Shield Mechanics', tab: 'shields', icon: Shield },
    { title: 'Card Types', tab: 'cards', icon: Wand },
    { title: 'Runes & Counters', tab: 'runes', icon: CircleDot },
    { title: 'Advanced', tab: 'advanced', icon: Book },
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
      image: "/images/cards/new-marketing/air silver.webp",
      description: "Swift and evasive"
    },
    water: {
      name: "Water",
      image: "/images/cards/new-marketing/water silver.webp",
      description: "Fluid and adaptive"
    },
    fire: {
      name: "Fire",
      image: "/images/cards/new-marketing/fire silver.webp",
      description: "Powerful and aggressive"
    },
    earth: {
      name: "Earth",
      image: "/images/cards/new-marketing/earth silver.webp",
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
        <link rel="canonical" href="https://www.elementalgames.gg/elekin/how-to-play" />

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
                    "url": "https://www.elementalgames.gg/elekin/how-to-play#quickstart",
                "image": "https://elementalgames.gg/images/how-to-play/deck-building.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Setup The Game",
                "text": "Each player draws 5 cards. Determine who goes first randomly.",
                    "url": "https://www.elementalgames.gg/elekin/how-to-play#quickstart",
                "image": "https://elementalgames.gg/images/how-to-play/game-setup.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Play Elements",
                "text": "Place element cards to generate resources for playing other cards.",
                    "url": "https://www.elementalgames.gg/elekin/how-to-play#essence",
                "image": "https://elementalgames.gg/images/how-to-play/elements.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Summon Creatures",
                "text": "Use element resources to play creature cards to attack and defend.",
                    "url": "https://www.elementalgames.gg/elekin/how-to-play#cards",
                "image": "https://elementalgames.gg/images/how-to-play/creatures.jpg"
              },
              {
                "@type": "HowToStep",
                "name": "Attack and Defend",
                "text": "Use your creatures to attack the opponent and defend against their attacks.",
                    "url": "https://www.elementalgames.gg/elekin/how-to-play#combat",
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
            <h1 className="text-5xl font-bold text-yellow-400 mb-4">How to Play Elekin</h1>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Rise through the ranks and become a Master Elementalist in the world of Kinbrold
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <TrackedLink
                to="/elekin/how-to-play/interactive-demo"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold transition-colors"
              >
                Try Interactive Demo →
              </TrackedLink>
              <button
                onClick={() => setShowDownloadModal(true)}
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-purple-900/40 hover:bg-purple-800/50 text-white font-semibold border border-purple-500/30 transition-colors"
              >
                Download Rulebook
              </button>
            </div>

          </motion.div>

          {/* Floating Download Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button 
              onClick={() => setShowDownloadModal(true)}
              className="inline-flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-purple-900 
                font-semibold px-3 py-2 rounded-lg transition-all text-sm shadow-lg hover:shadow-xl hover:scale-105
                border border-yellow-400 hover:border-yellow-300"
            >
              <Download className="w-4 h-4" />
              Rulebook
            </button>
          </motion.div>

          {/* Video Tutorials Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Quick Overview Video */}
              <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 group">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Quick Overview</h3>
                <div className="aspect-video bg-purple-950/50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/2cx9x_DTFIQ?enablejsapi=1&mute=1"
                    title="Elekin TCG - Quick Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg transition-transform group-hover:scale-105"
                    onMouseEnter={(e) => {
                      const iframe = e.target;
                      const currentSrc = iframe.src;
                      if (!currentSrc.includes('autoplay=1')) {
                        iframe.src = currentSrc + '&autoplay=1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      const iframe = e.target;
                      iframe.src = iframe.src.replace('&autoplay=1', '');
                    }}
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
                <p className="text-purple-200 text-sm text-center">
                  Get a quick overview of Elekin TCG fundamentals and gameplay
                </p>
                <div className="text-center mt-3">
                  <a 
                    href="https://www.youtube.com/watch?v=2cx9x_DTFIQ&t=4s" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>

              {/* Battle Mechanics Video */}
              <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 group">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Battle Mechanics</h3>
                <div className="aspect-video bg-purple-950/50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/pwEw9pSUT9M?enablejsapi=1&mute=1"
                    title="Elekin TCG - Battle Mechanics"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg transition-transform group-hover:scale-105"
                    onMouseEnter={(e) => {
                      const iframe = e.target;
                      const currentSrc = iframe.src;
                      if (!currentSrc.includes('autoplay=1')) {
                        iframe.src = currentSrc + '&autoplay=1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      const iframe = e.target;
                      iframe.src = iframe.src.replace('&autoplay=1', '');
                    }}
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
                <p className="text-purple-200 text-sm text-center">
                  Learn the strategic combat system with attacks, blocks, and dodges
                </p>
                <div className="text-center mt-3">
                  <a 
                    href="https://www.youtube.com/watch?v=pwEw9pSUT9M" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>

              {/* Third Video */}
              <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 group">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Full Tutorial</h3>
                <div className="aspect-video bg-purple-950/50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/tIeOLRIZzhA?enablejsapi=1&mute=1"
                    title="Elekin TCG - Gameplay Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg transition-transform group-hover:scale-105"
                    onMouseEnter={(e) => {
                      const iframe = e.target;
                      const currentSrc = iframe.src;
                      if (!currentSrc.includes('autoplay=1')) {
                        iframe.src = currentSrc + '&autoplay=1';
                      }
                    }}
                    onMouseLeave={(e) => {
                      const iframe = e.target;
                      iframe.src = iframe.src.replace('&autoplay=1', '');
                    }}
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
                <p className="text-purple-200 text-sm text-center">
                  Learn how to play Elekin TCG with this comprehensive gameplay tutorial
                </p>
                <div className="text-center mt-3">
                  <a 
                    href="https://www.youtube.com/watch?v=tIeOLRIZzhA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
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
              className="bg-purple-900/30 p-3 md:p-8 rounded-lg border border-purple-500/30 cursor-pointer transition-all hover:bg-purple-800/40 hover:border-yellow-500/50 hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] relative group"
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
                className="hidden md:block absolute -top-4 -right-4 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity"
              >
                <Sparkles className="w-full h-full text-yellow-400" />
              </motion.div>
              <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                <Sparkles className="w-8 h-8 md:w-16 md:h-16 text-yellow-500 flex-shrink-0 group-hover:text-yellow-400 transition-colors" />
                <h2 className="text-lg md:text-3xl font-bold text-white">Essence Tracking</h2>
              </div>
              <p className="hidden md:block text-purple-200">
                Generate and manage elemental essence to summon creatures and activate powerful abilities.
              </p>
              <div className="hidden md:block absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-yellow-500 font-semibold text-sm">Click to learn more</span>
            </div>
            </motion.div>

            <motion.div 
              className="bg-purple-900/30 p-3 md:p-8 rounded-lg border border-purple-500/30 cursor-pointer transition-all hover:bg-purple-800/40 hover:border-yellow-500/50 hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] relative group"
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
                className="hidden md:block absolute -top-4 -right-4 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity"
              >
                <Sword className="w-full h-full text-yellow-400" />
              </motion.div>
              <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                <Sword className="w-8 h-8 md:w-16 md:h-16 text-yellow-500 flex-shrink-0 group-hover:text-yellow-400 transition-colors" />
                <h2 className="text-lg md:text-3xl font-bold text-white">Combat System</h2>
              </div>
              <p className="hidden md:block text-purple-200">
                Strategic battles using creature stats, abilities, and tactical positioning.
              </p>
              <div className="hidden md:block absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-yellow-500 font-semibold text-sm">Click to learn more</span>
            </div>
            </motion.div>

            <motion.div 
              className="bg-purple-900/30 p-3 md:p-8 rounded-lg border border-purple-500/30 cursor-pointer transition-all hover:bg-purple-800/40 hover:border-yellow-500/50 hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] relative group"
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
                className="hidden md:block absolute -top-4 -right-4 w-20 h-20 opacity-0 group-hover:opacity-30 transition-opacity"
              >
                <Shield className="w-full h-full text-yellow-400" />
              </motion.div>
              <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                <Shield className="w-8 h-8 md:w-16 md:h-16 text-yellow-500 flex-shrink-0 group-hover:text-yellow-400 transition-colors" />
                <h2 className="text-lg md:text-3xl font-bold text-white">Shield Mechanics</h2>
              </div>
              <p className="hidden md:block text-purple-200">
                Protect yourself with powerful shields that provide unique effects when broken.
              </p>
              <div className="hidden md:block absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
                {/* Mobile-friendly dropdown navigation */}
                <div className="md:hidden mb-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between bg-purple-950/50 border-purple-500/30 text-white hover:bg-purple-900/50 h-12 text-base"
                      >
                        <div className="flex items-center gap-2">
                          {(() => {
                            const Icon = quickLinks.find(link => link.tab === activeTab)?.icon || Lightbulb;
                            return <Icon className="w-5 h-5" />;
                          })()}
                          <span>{quickLinks.find(link => link.tab === activeTab)?.title || 'Quick Start'}</span>
                        </div>
                        <ChevronDown className="ml-2 h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[calc(100vw-2rem)] bg-purple-950/95 backdrop-blur-sm border-purple-500/30 max-h-[70vh] overflow-y-auto">
                      <DropdownMenuGroup>
                        {quickLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <DropdownMenuItem
                              key={link.tab}
                              onClick={() => setActiveTab(link.tab)}
                              className={`flex items-center gap-3 px-4 py-3 text-base cursor-pointer ${
                                activeTab === link.tab
                                  ? 'bg-yellow-500/20 text-yellow-400 font-semibold'
                                  : 'text-purple-200 hover:bg-purple-800/50 hover:text-white'
                              }`}
                            >
                              <Icon className="w-5 h-5 flex-shrink-0" />
                              <span>{link.title}</span>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Desktop tabs */}
                <div className="hidden md:block">
                  <TabsList className="grid grid-cols-2 lg:grid-cols-3 gap-2 bg-purple-950/50 border border-purple-500/30 p-2 rounded-lg">
                    {quickLinks.map((link) => (
                      <TabsTrigger
                        key={link.tab}
                        value={link.tab}
                        className="data-[state=active]:bg-yellow-500 data-[state=active]:text-purple-900"
                      >
                        {link.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent value="quickstart" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
                  <h2 id="quickstart" className="text-2xl font-bold mb-4 text-white">Quick Start Guide</h2>
                  <div className="space-y-6 text-purple-200">
                    <div className="bg-purple-950/60 p-6 rounded-lg border border-yellow-500/30">
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Learn Elekin TCG in 5 Minutes</h3>
                      <div className="space-y-6">
                        <div className="bg-black/25 border border-purple-500/30 rounded-lg p-4">
                          <p className="text-base sm:text-lg text-purple-100">
                            If you can follow the steps below, you can <span className="font-semibold text-white">set up and play your first game</span>. If you get stuck, use the right sidebar (or tabs on mobile) to jump to the exact rule.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3">1. Game Setup</h4>
                          <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Each player starts with 500 health points</li>
                            <li>Draw 5 cards for your starting hand</li>
                            <li>Place your 3 shield cards face-down (one of each tier)</li>
                          </ul>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-3">2. Turn Structure</h4>
                            <ol className="list-decimal list-inside space-y-2 text-lg">
                              <li><span className="font-semibold">Draw Phase:</span> Draw one card</li>
                              <li><span className="font-semibold">Generation Phase:</span> Generate essence from your creatures</li>
                              <li><span className="font-semibold">Main Phase 1:</span> Refresh actions, summon creatures, and play cards</li>
                              <li><span className="font-semibold">Battle Phase:</span> Attack with your creatures</li>
                              <li><span className="font-semibold">Main Phase 2:</span> Play additional cards</li>
                              <li><span className="font-semibold">End Phase:</span> Discard down to 7 cards, then pass the turn</li>
                            </ol>
                          </div>
                          <div className="md:w-64 flex-shrink-0">
                            <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg p-4 h-fit">
                              <h5 className="text-lg font-bold text-yellow-400 mb-2">First Turn Exceptions</h5>
                              <p className="text-sm text-white">
                                The <span className="font-semibold text-yellow-400">first player</span> skips their <span className="font-semibold">Draw Phase</span> and cannot attack on their first turn.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-950/40 p-5 rounded-lg border border-purple-500/30">
                          <h4 className="text-xl font-bold text-white mb-3">First Two Turns (Practical Walkthrough)</h4>
                          <ol className="list-decimal list-inside space-y-3 text-lg">
                            <li>
                              <span className="font-semibold text-white">Turn 1 (Player 1):</span> Skip draw → Skip Generation due to no creatures → Summon a zero‑cost creature → (optional) play a rune or place a counter → end turn.
                            </li>
                            <li>
                              <span className="font-semibold text-white">Turn 2 (Player 2):</span> Draw → Skip Generation due to no creatures → Summon a zero‑cost creature → (optional) play a rune or place a counter → you may battle and target your opponent's creature or any shield → end turn.
                            </li>
                            <li>
                              <span className="font-semibold text-white">Turn 3 (Player 1):</span> Draw → Generate essence from your creatures → Summon a low/zero‑cost creature → (optional) play a rune or place a counter → you may battle → end turn.
                            </li>
                            <li>
                              <span className="font-semibold text-white">Turn 4 (Player 2):</span> Draw → Generate essence from your creatures → Summon a low/zero‑cost creature → (optional) play a rune or place a counter → you may battle → end turn.
                            </li>
                          </ol>
                          <p className="mt-3 text-sm text-purple-200">
                            New-player tip: If you’re wondering “How do I generate essence if I start with 0?”, The answer is: you get an early creature onto the field first, then it generates essence each turn it survives.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3">3. Card Anatomy</h4>
                          <div className="space-y-4">
                            <p className="text-lg">Each card in Elekin contains important information you need to understand to play effectively. Below are examples of the 4 card types and their key features:</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-purple-950/50 p-6 rounded-lg">
                                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Creature Cards</h4>
                                <div className="flex flex-col items-center">
                                  <img src="/images/creature diagram2.png" alt="Creature Card Anatomy" className="w-full max-w-[300px] -mb-4" />
                                  <div className="w-full">
                                    <ul className="list-disc list-inside space-y-2 text-base">
                                      <li><span className="font-semibold">Element and Essence Cost:</span> Element of the creature (Air, Water, Fire, Earth, or Combinational) & Essence cost of one of the primary elements</li>
                                      <li><span className="font-semibold">Strength:</span> Attack power (Damage and Health)</li>
                                      <li><span className="font-semibold">Agility:</span> Speed for action use (Attacking/Blocking/Dodging/Defending)</li>
                                      <li><span className="font-semibold">Card Ability:</span> Used once per turn, or whenever applicable via ability description</li>
                                      <li><span className="font-semibold">Essence Generated:</span> Essence produced during your Generation Phase</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-purple-950/50 p-6 rounded-lg">
                                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Shield Cards</h4>
                                <div className="flex flex-col items-center">
                                  <img src="/images/shield diagram2.png" alt="Shield Card Anatomy" className="w-full max-w-[340px] -mb-4" />
                                  <div className="w-full">
                                    <ul className="list-disc list-inside space-y-2 text-base">
                                      <li><span className="font-semibold">Shield Health:</span> Damage shield can take before breaking</li>
                                      <li><span className="font-semibold">Shield Tier:</span> I, II, or III</li>
                                      <li><span className="font-semibold">Card Abilities:</span> Choose 1 effect to trigger when broken and end opponent&apos;s battle phase</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-purple-950/50 p-6 rounded-lg">
                                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Rune Cards</h4>
                                <div className="flex flex-col items-center">
                                  <img src="/images/rune diagram2.png" alt="Rune Card Anatomy" className="w-full max-w-[300px] -mb-4" />
                                  <div className="w-full">
                                    <ul className="list-disc list-inside space-y-2 text-base">
                                      <li><span className="font-semibold">Rune Symbol:</span> Identifies card as a rune</li>
                                      <li><span className="font-semibold">Rune Type:</span> Normal, Instant, or Equipment</li>
                                      <li><span className="font-semibold">Card Ability:</span> Effect that resolves when played</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-purple-950/50 p-6 rounded-lg">
                                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Counter Cards</h4>
                                <div className="flex flex-col items-center">
                                  <img src="/images/counter diagram2.png" alt="Counter Card Anatomy" className="w-full max-w-[300px] -mb-4" />
                                  <div className="w-full">
                                    <ul className="list-disc list-inside space-y-2 text-base">
                                      <li><span className="font-semibold">Counter Symbol:</span> Identifies card as a counter</li>
                                      <li><span className="font-semibold">Trigger Condition:</span> When this card can be played if it is already placed in the Rune/Counter Zone</li>
                                      <li><span className="font-semibold">Card Ability:</span> Effect that resolves when played</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-purple-500/30 pt-6 mt-6">
                          <h4 className="text-xl font-bold text-white mb-3">4. Combat Basics</h4>
                          <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Every creature has an action which is used to Attack, Block, Dodge, or Defend</li>
                            <li>Creatures without an action are Exhausted and turned horizontal</li>
                            <li>Choose attacks one-by-one and not all at once during Battle Phase</li>
                            <li>Higher agility creature strikes first</li>
                            <li>Creatures can block attacks from slower opponent&apos;s creatures, if they have an action available</li>
                            <li>Faster creatures can dodge, if they have an action available</li>
                            <li>When shields break, the battle phase ends and the controller chooses 1 of the 2 effects to activate</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-xl font-bold text-white mb-3">5. Winning the Game</h4>
                          <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Reduce your opponent's health to 0</li>
                            <li>Your opponent cannot draw a card during their Draw Phase</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Element Quick Reference</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-950/40 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <img src="/images/cards/new-marketing/air silver.webp" alt="Air Icon" className="w-22 h-24 mr-2" />
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
                            <img src="/images/cards/new-marketing/water silver.webp" alt="Water Icon" className="w-22 h-24 mr-2" />
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
                            <img src="/images/cards/new-marketing/fire silver.webp" alt="Fire Icon" className="w-22 h-24 mr-2" />
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
                            <img src="/images/cards/new-marketing/earth silver.webp" alt="Earth Icon" className="w-22 h-24 mr-2" />
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

                <TabsContent value="basics" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Game Basics</h2>
                  <div className="space-y-6 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Starting the Game</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Begin with 500 health points</li>
                        <li>Draw 5 cards for your starting hand</li>
                        <li>You may mulligan up to 2 times with your starting hand</li>
                        <li>A coin flip determines the first player</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Turn Structure</h3>
                      <ol className="list-decimal list-inside space-y-2">
                        <li><span className="font-semibold">Draw Phase:</span> Draw one card</li>
                        <li><span className="font-semibold">Generation Phase:</span> Generate essence from your creatures on the field</li>
                        <li><span className="font-semibold">Main Phase 1:</span> Refresh actions, summon up to 1 creature, use creature effects, and play/place runes and counters</li>
                        <li><span className="font-semibold">Battle Phase:</span> Attack with your creatures by choosing one at a time and finishing the battle with each creature before moving on to the next</li>
                        <li><span className="font-semibold">Main Phase 2:</span> Use creature effects and play/place additional runes and counters</li>
                        <li><span className="font-semibold">End Phase:</span> Discard down to 7 cards, then pass the turn to your opponent</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Victory Conditions</h3>
                      <div className="flex items-start gap-12">
                        <div className="flex-grow max-w-xl">
                          <ul className="list-disc list-inside space-y-2">
                            <li>Reduce opponent&apos;s health to 0</li>
                            <li>Your opponent cannot draw a card during their Draw Phase</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="essence" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
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
                        <li>Generated during Generation Phase and via Effects and Abilities</li>
                        <li>Carries over between turns</li>
                        <li>Used for summoning creatures and activating certain abilities</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Generation Sources</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Creatures on your field</li>
                        <li>Special rune effects</li>
                        <li>Broken shield effects</li>
                        <li>Creature abilities</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="combat" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Combat System</h2>
                  <div className="space-y-6 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Combat Stats</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li><span className="font-semibold">Strength:</span> Determines damage dealt and health of creatures</li>
                        <li><span className="font-semibold">Agility:</span> Determines attack order and dodge/block ability</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Battle Resolution</h3>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Higher agility creature strikes first</li>
                        <li>Damage equal to strength is dealt</li>
                        <li>If defending creature survives, it counter-attacks dealing its original strength in damage</li>
                        <li>Specified abilities and effects may trigger during any point of the battle</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Combat Actions</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg space-y-4">
                        <div>
                          <h4 className="font-semibold text-yellow-300 mb-2">Attack</h4>
                          <ul className="list-disc list-inside space-y-1 text-purple-200">
                            <li>Declare an attack against an opposing target (creature, shield, or opponent if no shields remain)</li>
                            <li>You must declare and resolve an attack with a creature before moving on to the next creature's action</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-300 mb-2">Block</h4>
                          <ul className="list-disc list-inside space-y-1 text-purple-200">
                            <li>Use a creature to intercept an incoming attack, redirecting the attack to the blocking creature</li>
                            <li>The blocking creature must have a higher agility than the attacker</li>
                            <li>The blocking creature does not attack back</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-300 mb-2">Dodge</h4>
                          <ul className="list-disc list-inside space-y-1 text-purple-200">
                            <li>Use a creature to completely avoid an attack (only if the dodging creature has higher agility than the attacker)</li>
                            <li>Both creatures lose their action and become Exhausted, but no damage is dealt</li>
                            <li>This option is only available if the targeted creature has a higher agility than the attacker and an available action</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-300 mb-2">Defend</h4>
                          <ul className="list-disc list-inside space-y-1 text-purple-200">
                            <li>Use a creature to defend against an attack, engaging in full combat with the attacker</li>
                            <li>The defending creature engages in combat with the attacker, dealing damage equal to its strength at the speed of its agility</li>
                          </ul>
                        </div>
                      </div>
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
                                <h5 className="text-yellow-400 mb-3">Option 1: Defend (battle)</h5>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Aqua Dart strikes first (60 Agility {'>'} 35 Agility)</li>
                                  <li>Deals 65 damage to Ember Flicker (Aqua Dart Strength)</li>
                                  <li>Ember Flicker survives (25 HP remaining)</li>
                                  <li>Ember Flicker counter-attacks for 90 damage (Ember Flicker Strength)</li>
                                  <li>Aqua Dart is destroyed</li>
                                  <li>Ember Flicker is exhausted and turned horizontal</li>
                                </ol>
                              </div>
                              <div>
                                <h5 className="text-yellow-400 mb-3">Option 2: Dodge</h5>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Aqua Dart uses dodge action</li>
                                  <li>Turns horizontal (using its action)</li>
                                  <li>Ember Flicker&apos;s attack misses and is now exhausted (turned horizontal)</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shields" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
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
                        <li>Start with 3 shields face-down (one of each tier in any order)</li>
                        <li>Regenerate to the next highest tier threshold during each End Phase</li>
                        <li>Becomes and remains face-up when damaged or per card effect</li>
                        <li>Cannot be replaced when broken</li>
                        <li>Choose one of two effects when broken</li>
                        <li>Battle Phase ends when a shield is broken</li>
                      </ul>
        </div>
        
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Shield Example</h3>
                      <div className="flex flex-col items-start gap-6">
                        <CardImage card={cardExamples.shield} size="large" />
                        <div className="w-full">
                          <p className="mb-2">Mystic Ward (Tier 1):</p>
                          <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Effect #1:</span> Destroy 1 Rune/Counter card on the field.</li>
                            <p className="mb-2">OR</p>
                            <li><span className="font-semibold">Effect #2:</span> Equip this card to a creature. While equipped, the creature loses 30 Strength and 10 Agility.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cards" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Card Types</h2>
                  <div className="space-y-8 text-purple-200">
                    
                    {/* Card Types with Diagrams */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-yellow-400 mb-3">Creatures</h4>
                        <div className="flex flex-col items-center">
                          <img src="/images/creature diagram2.png" alt="Creature Card Anatomy" className="w-full max-w-[300px] -mb-4" />
                          <div className="w-full">
                            <ul className="list-disc list-inside space-y-2 text-base">
                              <li><span className="font-semibold">Element and Essence Cost:</span> Element of the creature (Air, Water, Fire, Earth, or Combinational) & Essence cost of one of the primary elements</li>
                              <li><span className="font-semibold">Strength:</span> Attack power (Damage and Health)</li>
                              <li><span className="font-semibold">Agility:</span> Speed for action use (Attacking/Blocking/Dodging/Defending)</li>
                              <li><span className="font-semibold">Card Ability:</span> Used once per turn, or whenever applicable via ability description</li>
                              <li><span className="font-semibold">Essence Generated:</span> Essence produced during your Generation Phase</li>
                        </ul>
                      </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-yellow-400 mb-3">Shield Cards</h4>
                        <div className="flex flex-col items-center">
                          <img src="/images/shield diagram2.png" alt="Shield Card Anatomy" className="w-full max-w-[340px] -mb-4" />
                          <div className="w-full">
                            <ul className="list-disc list-inside space-y-2 text-base">
                              <li><span className="font-semibold">Shield Health:</span> Damage shield can take before breaking</li>
                              <li><span className="font-semibold">Shield Tier:</span> I, II, or III</li>
                              <li><span className="font-semibold">Card Abilities:</span> Choose 1 effect to trigger when broken and end opponent's battle phase</li>
                        </ul>
                      </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-yellow-400 mb-3">Rune Cards</h4>
                        <div className="flex flex-col items-center">
                          <img src="/images/rune diagram2.png" alt="Rune Card Anatomy" className="w-full max-w-[300px] -mb-4" />
                          <div className="w-full">
                            <ul className="list-disc list-inside space-y-2 text-base">
                              <li><span className="font-semibold">Rune Symbol:</span> Identifies card as a rune</li>
                              <li><span className="font-semibold">Rune Type:</span> Normal, Instant, or Equipment</li>
                              <li><span className="font-semibold">Card Ability:</span> Effect that resolves when played</li>
                        </ul>
                          </div>
          </div>
        </div>
        
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-yellow-400 mb-3">Counter Cards</h4>
                        <div className="flex flex-col items-center">
                          <img src="/images/counter diagram2.png" alt="Counter Card Anatomy" className="w-full max-w-[300px] -mb-4" />
                          <div className="w-full">
                            <ul className="list-disc list-inside space-y-2 text-base">
                              <li><span className="font-semibold">Counter Symbol:</span> Identifies card as a counter</li>
                              <li><span className="font-semibold">Trigger Condition:</span> When this card can be played if it is already placed in the Rune/Counter Zone</li>
                              <li><span className="font-semibold">Card Ability:</span> Effect that resolves when played</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-purple-500/30 pt-8 mt-8">
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Special Creatures</h3>
                      
                      <div className="space-y-12">
                        {/* Dragon Cards Section */}
                    <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Dragon Cards</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex justify-center">
                          <CardImage card={cardExamples.dragon} size="large" />
                        </div>
                        <div className="bg-purple-950/50 p-6 rounded-lg">
                              <h5 className="text-lg font-semibold text-yellow-400 mb-3">Dual-Element Powerhouse</h5>
                          <div className="space-y-6">
                            <div>
                                  <p className="font-semibold mb-2">Key Features:</p>
                                  <ul className="list-disc list-inside space-y-2 text-base">
                                    <li>Always represents two combined elements</li>
                                    <li>Require 5 essence of each element to summon (10 total)</li>
                                    <li>Powerful effects</li>
                                    <li>Unique additional ability with an essence cost</li>
                                  </ul>
                                </div>
                                <div>
                                  <p className="font-semibold mb-2">Example: Eldritch the Frost Dragon</p>
                              <ul className="list-disc list-inside space-y-1">
                                    <li>Elements: Air + Water (Frost)</li>
                                    <li>Stats: 180/110</li>
                                    <li>Frostbite: When this card is summoned, Freezes all creatures your opponent controls for 1 full turn.</li>
                                    <li>Glacial Roar (Costs 2 Air/Water Essence in any combination): Freeze 1 creature on the field for 1 full turn.</li>
                              </ul>
                            </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Elementalist Cards Section */}
                            <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Elementalists</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-purple-950/50 p-6 rounded-lg">
                              <h5 className="text-lg font-semibold text-yellow-400 mb-3">Masters of an Element</h5>
                              <div className="space-y-6">
                                <div>
                                  <p className="font-semibold mb-2">Key Features:</p>
                                  <ul className="list-disc list-inside space-y-2 text-base">
                                    <li>Unique character cards that are the strongest of their respective element</li>
                                    <li>Each has an affinity for their primary element</li>
                                    <li>Have additional abilities that cost essence</li>
                                    <li>Played in the creature zone</li>
                                    <li>Limited to 1 copy per deck</li>
                                  </ul>
                                </div>
                                <div>
                                  <p className="font-semibold mb-2">Example: Balon | The Earth Elementalist</p>
                              <ul className="list-disc list-inside space-y-1">
                                    <li>Element: Earth</li>
                                    <li>Sink Hole: Destroy 1 creature you control to destroy deal direct damage to the opponent equal to the creature's strength.</li>
                                    <li>Tremor (Costs 4 Earth Essence): Exhaust all creatures your opponent controls.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                            <div className="flex justify-center items-center">
                              <div className="relative">
                                <img 
                                  src="/images/cards/new/balon.webp" 
                                  alt="Elementalist Card Example" 
                                  className="w-full max-w-[300px] rounded-lg shadow-lg"
                                />
                      </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-500/20 p-6 rounded-lg border border-yellow-500/40 mt-8">
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Pro Tip: Card Synergies</h4>
                      <p className="text-base">
                        Build your deck with card synergies in mind. Pair creatures with runes that enhance their abilities, and include counters that protect your key combos. Elementalists are most effective with of their matching element in your deck.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="runes" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Runes & Counters</h2>
                  <div className="space-y-8 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Runes Overview</h3>
                      <p className="mb-4">
                        Runes are a card type that provides on-going or one-time effects to creatures and overall gameplay. Runes are played in the Rune/Counter Zone on your turn and resolved instantly. There are three types of runes, each of which are played face-up during your Main Phase 1 or 2. All Runes may be placed face-down and stored in your Rune/Counter Zone until activation.
                      </p>
                      
                      <div className="space-y-0">
                        <div className="bg-purple-950/50 p-6 rounded-lg flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-yellow-300 mb-3">Normal Runes</h4>
                            <ul className="list-disc list-inside space-y-2">
                              <li>Activate their effects immediately when placed</li>
                              <li>Effect on the card resolves, then sends itself to the Discard Pile after resoliving</li>
                              <li>These effects provide one-time effects to help you gain an edge during your turn</li>
                            </ul>
                          </div>
                          <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
                            <img 
                              src="/images/cards/new/essence exchange.webp" 
                              alt="Essence Exchange - Normal Rune Example"
                              className="w-full h-auto rounded-lg shadow-lg"
                            />
                          </div>
                        </div>

                        <div className="border-t border-purple-500/30 my-0"></div>

                        <div className="bg-purple-950/50 p-6 rounded-lg flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-yellow-300 mb-3">Instant Runes</h4>
                            <ul className="list-disc list-inside space-y-2">
                              <li>Can be placed at any time, even during your opponent&apos;s turn</li>
                              <li>This may be played from your hand or the Rune/Counter Zone</li>
                              <li>Activate their effects immediately when placed</li>
                              <li>Provide one-time effects or temporary advantages</li>
                              <li>Perfect for responding to your opponent&apos;s actions or gaining an edge during a Battle Phase</li>
                              <li>This is the only Rune type that can be played during any Phase of either player's turn</li>
                            </ul>
                          </div>
                          <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
                            <img 
                              src="/images/cards/new/direct assault.webp" 
                              alt="Direct Assault - Instant Rune Example"
                              className="w-full h-auto rounded-lg shadow-lg"
                            />
                          </div>
                        </div>

                        <div className="border-t border-purple-500/30 my-0"></div>

                        <div className="bg-purple-950/50 p-6 rounded-lg flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-yellow-300 mb-3">Equipment Runes</h4>
                            <ul className="list-disc list-inside space-y-2">
                              <li>Equip this card to a creature after resolving it in the Rune/Counter Zone</li>
                              <li>You may place this on any creature you or your opponent controls at any time</li>
                              <li>Only one Equipment Rune can be equipped to a creature at a time</li>
                              <li>The Equipment Rune remains on the creature until removed by effect or the creature leaves the battlefield. This equipment goes to the Discard Pile with the creature if the equipped creature is destroyed.</li>
                              <li>Provide stat boosts or abilities to the equipped creature</li>
                              <li>Often provide the most powerful and lasting effects</li>
                            </ul>
                          </div>
                          <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
                            <img 
                              src="/images/cards/new/lifebound armour.webp" 
                              alt="Lifebound Armour - Equipment Rune Example"
                              className="w-full h-auto rounded-lg shadow-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-yellow-500/50 my-6"></div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Counters</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1">
                          <p className="mb-4">
                            Counters are special cards that can be placed on creatures or other targets to provide reactive effects. They have unique timing rules that make them strategic defensive tools.
                          </p>
                          <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/40 mb-4">
                            <h4 className="font-semibold text-yellow-300 mb-2">Important: Counter Placement Rules</h4>
                            <ul className="list-disc list-inside space-y-2">
                              <li><span className="font-semibold">Counters must be placed during your turn</span> - You cannot place counters during your opponent&apos;s turn</li>
                              <li><span className="font-semibold">Counters activate on your opponent&apos;s turn</span> - When the trigger condition is met, the counter&apos;s effect activates</li>
                              <li>This creates a strategic factor where you must anticipate your opponent&apos;s actions and prepare counters in advance</li>
                              <li>Counters are sent to the Discard Pile after their effect resolves (unless otherwise specified)</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-yellow-300 mb-2">Counter Strategy Tips</h4>
                            <ul className="list-disc list-inside space-y-2">
                              <li>Save room in your Rune/Counter Zone for counters, but keep in mind that you can only have 5 cards in your Rune/Counter Zone at a time</li>
                              <li>Use counters to interrupt your opponent&apos;s combos or powerful attacks</li>
                              <li>Consider your opponent&apos;s likely actions when deciding where to place counters</li>
                            </ul>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
                          <img 
                            src="/images/cards/new/revival rain.webp" 
                            alt="Revival Rain - Counter Example"
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/20 p-6 rounded-lg border border-yellow-500/40">
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Pro Tip: Rune & Counter Synergy</h4>
                      <p className="text-base">
                        Combine runes and counters for powerful defensive strategies. Place equipment runes on your creatures during your turn, then use counters to protect them from your opponent&apos;s removal or attacks. Instant runes can be used reactively alongside counters to create layered defenses.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Advanced Rules & Strategy Guide</h2>
                  <div className="space-y-8 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Combinational Elements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Frost (Air + Water)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Freeze effects (reduce actions)</li>
                            <li>Control-focused playstyle</li>
                      </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Lightning (Air + Fire)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Chain damage effects</li>
                            <li>Helps discard opponent's cards in hand</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Crystal (Water + Earth)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Shield enhancement effects</li>
                            <li>Double strike capabilities</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Lava (Fire + Earth)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Card destruction effect when destroyed</li>
                            <li>Pierce capabilities</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Sand (Earth + Air)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Offensive battlefield control</li>
                            <li>Prevention of Rune/Counter activation</li>
                          </ul>
                        </div>
                        <div className="bg-purple-950/50 p-4 rounded-lg">
                          <h4 className="font-bold text-white mb-2">Poison (Water + Fire)</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Depletion of opponent's essence</li>
                            <li>Helps discard opponent's cards in hand</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Action System</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <div className="space-y-4">
                          <p>Each creature enters the battlefield with an action unless specified (enters play Exhausted):</p>
                        </div>
                        <p>Actions may be used to attack, block, dodge, or defend during the battle phase.</p>
                        <p> ---------------------------</p>
                        <p>Attack: Declare an attack against an opposing target (creature, shield, or opponent if no shields remain)</p>
                        <p>Block: Use a creature to block against an attack (changes the target of the attack to the blocking creature, the blocking creature does not attack back)</p>
                        <p>Dodge: Use a creature to avoid an attack (the attack misses and both creatures lose their action, becoming Exhausted)</p>
                        <p>Defend: Use a creature to defend against an attack (battle against the attacker)</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Chain Resolution</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <p className="mb-4">When cards and effects interact, they form a chain that resolves in a Last In, First Out (LIFO) order:</p>
                        <ol className="list-decimal list-inside space-y-3">
                          <li>Player 1 activates a card or effect (Chain Link 1)</li>
                          <li>Player 2 can respond with a Counter card (Chain Link 2)</li>
                          <li>Player 1 can respond to that Counter (Chain Link 3)</li>
                          <li>Chain continues until a player passes</li>
                          <li>Chain resolves in reverse order (Last In, First Out)</li>
                        </ol>
                        
                        <div className="mt-6">
                          <h4 className="font-bold text-white mb-2">Example Chain Resolution:</h4>
                          <div className="space-y-2 mt-4">
                            <p>1. Player 1 plays "Cleanse and Adapt" (Chain Link 1)</p>
                            <p>2. Player 2 responds with "Intrusion Seal" to negate Cleanse and Adapt(Chain Link 2)</p>
                            <p>3. Player 1 responds with another "Intrustion Seal" to negate Player 2's Intrusion Seal (Chain Link 3)</p>
                            <p>4. Player 2 passes</p>
                            <p>5. Resolution: "Intrusion Seal" from Player 1 resolves first, negating "Intrusion Seal" from Player 2</p>
                            <p>6. "Cleanse and Adapt" successfully enters the battlefield</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Battlefield Positioning</h3>
                      <div className="bg-purple-950/50 p-6 rounded-lg">
                        <p className="mb-4">The battlefield allows for 5 creatures to be summoned by each player. A creature's position is determined by the creature's action availability. The battlefield also contains the Shield Zone or the Player themself if no shields remian in front of them.</p>
                        <p>Available targets are the creatures, shields, or the player themself if no shields remain.</p>
                        <p>Creatures can attack shields or the opponent directly even if the opponent has creatures on the field.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="glossary" className="bg-purple-900/30 p-4 sm:p-5 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Glossary of Key Words</h2>
                  <div className="space-y-6 text-purple-200">
                    <p className="text-lg">This glossary provides definitions for common terms used in Elekin TCG.</p>
                    
                    <div className="bg-purple-950/50 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">A</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Action</p>
                              <p className="text-sm">Resource that creatures use to attack, block, dodge, or defend. If a creature has no actions, it is Exhausted and turned horizontal.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Agility</p>
                              <p className="text-sm">The second stat on a creature card that determines attack order, dodge capability, and blocking speed.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Attack</p>
                              <p className="text-sm">Declare an attack against an opposing target (creature, shield, or opponent if no shields remain).</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">B</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Block</p>
                              <p className="text-sm">Using a creature to defend against an opponent's attack. Blocking creature must use an action and cannot fight back.</p>
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
                              <p className="text-sm">A card that is placed in the Rune/Counter Zone on your turn, but only can be played when the trigger condition is met during your opponent's turn.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">D</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Defend</p>
                              <p className="text-sm">An action that allows a creature to defend against an attack. Defending creature use an action to fight back against the attacker.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Dodge</p>
                              <p className="text-sm">An action that allows a creature to avoid an attack completely, thus Exhausting both creatures (the attacker and creature dodging).</p>
                            </div>
                            <div>
                              <p className="font-semibold">Double Strike</p>
                              <p className="text-sm">A creature with double strike can attack twice the same target twice in a single turn. The second strike will always occur at a lower agility than the target.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">E</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Essence</p>
                              <p className="text-sm">The primary resource used to summon creatures and activate enhanced abilities. Comes in four elemental types (Air, Water, Fire, Earth).</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">F</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Frozen</p>
                              <p className="text-sm">A status effect that Exhausts the affected creature for one full turn.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">M</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Mulligan</p>
                              <p className="text-sm">The opportunity to shuffle you starting hand back into your deck, then redraw your starting hand with 1 less card from before (up to 2 times) before the game begins.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">P</h3>
                          <div className="space-y-4">
                          <div>
                              <p className="font-semibold">Pierce</p>
                              <p className="text-sm">A creature with pierce deals the overflow damage to the next line of defense. If the initial target was a creature, then the overflow damage will hit a shield or the opponent directly if no shields remain. If the initial target was a shield, then the overflow damage will hit the opponent directly.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Position</p>
                              <p className="text-sm">A vertical position indicates an available action, and a horizontal position indicates an exhausted creature (no available action).</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">R</h3>
                          <div className="space-y-4">
                          <div>
                              <p className="font-semibold">Refresh</p>
                              <p className="text-sm">Allows a creature to gain its action back after being Exhausted. Turning the creature from horizontal to vertical.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Rune</p>
                              <p className="text-sm">A card type that provides on-going or one-time effects to creatures and gameplay. Runes are played in the Rune/Counter Zone on your turn and resolved instantly.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">S</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Shield</p>
                              <p className="text-sm">A protective barrier with a health value that regenerates to the next highest or current tier during each End Phase. Shields trigger one of two of effects when broken and end the current Battle Phase.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Steal</p>
                              <p className="text-sm">A creature with steal will choose 1 element from your opponent's essence pool, then lower that element by 1 and gain you 1 essence of the chosen element.</p>
                            </div>
                            <div>
                              <p className="font-semibold">Strength</p>
                              <p className="text-sm">The first stat on a creature card that determines both attack power and health points. These points are split into two different values when battling. For instance, if a creature with 100 Strength takes 60 damage prior to attacking, its Health goes down to 40, but then it will still attack for 100 Damage.</p>
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
                      <li>Field Size: Max of 5 creatures per player</li>
                      <li>Shield Tiers: 3</li>
                      <li>Elements: 4 primary, 6 combinational</li>
                      <li>Max Essence: 20 per element</li>
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

      <RulebookDownloadModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
      />
    </>
  );
};

export default HowToPlayPage;
