import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Download, Sword, Sparkles, Shield, Scroll, Wand } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HowToPlayPage = () => {
  const [activeTab, setActiveTab] = useState('basics');

  const quickLinks = [
    { title: 'Game Basics', tab: 'basics', icon: Scroll },
    { title: 'Essence System', tab: 'essence', icon: Sparkles },
    { title: 'Combat', tab: 'combat', icon: Sword },
    { title: 'Shields', tab: 'shields', icon: Shield },
    { title: 'Card Types', tab: 'cards', icon: Wand },
  ];

  const elementalCards = {
    air: {
      name: "Cloud Sprinter",
      image: "/images/cards/cloud-sprinter.png",
      stats: "75/75",
      element: "Air",
      description: "Agile air creature with balanced stats"
    },
    water: {
      name: "Aqua Dart",
      image: "/images/cards/aqua-dart.png",
      stats: "90/120",
      element: "Water",
      description: "High agility water creature with dodge ability"
    },
    fire: {
      name: "Flamekeeper",
      image: "/images/cards/flamekeeper.png",
      stats: "110/50",
      element: "Fire",
      description: "High strength fire creature with powerful attacks"
    },
    earth: {
      name: "Sandy Scuttler",
      image: "/images/cards/sandy-scuttler.png",
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
      name: "Flamekeeper",
      image: "/images/cards/flamekeeper.png",
      type: "Creature",
      element: "Fire",
      stats: "110/50",
      cost: "4 Fire"
    },
    rune: {
      name: "Essence Exchange",
      image: "/images/cards/essence-exchange.png",
      type: "Rune",
      element: "Water",
      description: "Convert essence from one element to another"
    },
    counter: {
      name: "Counter Pulse",
      image: "/images/cards/counter-pulse.png",
      type: "Counter",
      element: "Water",
      description: "Negate an opponent's card effect"
    },
    shield: {
      name: "Mystic Ward",
      image: "/images/cards/mystic-ward.png",
      type: "Shield",
      tier: "1",
      health: "150"
    },
    dragon: {
      name: "Eldritch the Frost Dragon",
      image: "/images/cards/eldritch.png",
      type: "Dragon",
      elements: ["Air", "Water"],
      stats: "200/150",
      cost: "3 Air, 3 Water"
    },
    victory: {
      name: "Ancient Sigil",
      image: "/images/cards/ancient-sigil.png",
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
        <title>How to Play Elekin - Masters of Kinbrold</title>
        <meta name="description" content="Learn how to play Elekin: Masters of Kinbrold - A strategic trading card game where you harness the power of elemental creatures." />
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
            <div className="bg-purple-900/30 p-8 rounded-lg border border-purple-500/30">
              <Sparkles className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Essence System</h2>
              <p className="text-purple-200">
                Generate and manage elemental essence to summon creatures and activate powerful abilities.
              </p>
            </div>

            <div className="bg-purple-900/30 p-8 rounded-lg border border-purple-500/30">
              <Sword className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Combat System</h2>
              <p className="text-purple-200">
                Strategic battles using creature stats, abilities, and tactical positioning.
              </p>
            </div>

            <div className="bg-purple-900/30 p-8 rounded-lg border border-purple-500/30">
              <Shield className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Shield System</h2>
              <p className="text-purple-200">
                Protect yourself with powerful shields that provide unique effects when broken.
              </p>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex flex-col md:flex-row gap-8">
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
                  <h2 className="text-2xl font-bold mb-4 text-white">Essence System</h2>
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
                            <p className="text-center font-semibold">Attacker (Flamekeeper)</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <CardImage card={elementalCards.water} className="mb-3" size="normal" />
                            <p className="text-center font-semibold">Defender (Aqua Dart)</p>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <p className="font-semibold mb-2">Initial State: Flamekeeper is declaring to attack Aqua Dart</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Flamekeeper (100/25) - Fire Element</li>
                              <li>Aqua Dart (80/70) - Water Element</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Defender Battle Options:</p>
                            <div className="bg-purple-900/30 p-6 rounded-lg space-y-6">
                              <div>
                                <h5 className="text-yellow-400 mb-3">Option 1: No Dodge</h5>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Aqua Dart attacks first (70 Agility {'>'} 25 Agility)</li>
                                  <li>Deals 80 damage to Flamekeeper</li>
                                  <li>Flamekeeper survives (20 HP remaining)</li>
                                  <li>Flamekeeper counter-attacks for 100 damage</li>
                                  <li>Aqua Dart is destroyed</li>
                                </ol>
                              </div>
                              <div>
                                <h5 className="text-yellow-400 mb-3">Option 2: Dodge</h5>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Aqua Dart uses dodge ability</li>
                                  <li>Turns horizontal (using its action)</li>
                                  <li>Flamekeeper&apos;s attack deals 100 damage to opponent directly</li>
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
                  <h2 className="text-2xl font-bold mb-4 text-white">Shield System</h2>
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

                <TabsContent value="dragons" className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30 mt-4">
                  <h2 className="text-2xl font-bold mb-4 text-white">Dragon Cards</h2>
                  <div className="space-y-6 text-purple-200">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Dragon Mechanics</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Powerful dual-element creatures</li>
                        <li>Require essence from two elements</li>
                        <li>Can use either element for abilities</li>
                        <li>Generate multiple types of essence</li>
                        <li>Often have powerful special abilities</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Strategic Tips</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Build your essence base before summoning</li>
                        <li>Consider dual-element synergies</li>
                        <li>Use as finishers or control pieces</li>
                        <li>Protect with counters and shields</li>
                      </ul>
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
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Core Rules</h4>
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
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Battle System</h4>
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
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Card Reference</h4>
                    <ul className="space-y-2">
                      {quickLinks.slice(4).map((link) => {
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
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Key Stats</h4>
                    <ul className="space-y-1 text-purple-200 text-sm">
                      <li>Starting Health: 500</li>
                      <li>Starting Hand: 5 cards</li>
                      <li>Max Hand Size: 7 cards</li>
                      <li>Field Size: 5 creatures</li>
                      <li>Shield Tiers: 3</li>
                      <li>Elements: 4</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-purple-500/30">
                    <h4 className="text-lg font-semibold text-yellow-400 mb-2">Turn Phases</h4>
                    <ol className="space-y-1 text-purple-200 text-sm list-decimal list-inside">
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
