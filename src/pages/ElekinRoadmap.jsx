import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Snowflake, Wind, Swords, Sparkles } from 'lucide-react';

const ElekinRoadmap = () => {
  const roadmapItems = [
    {
      title: "Lightning & Crystal",
      date: "Now",
      description: "The two starter decks you can buy and play today — on the table (~30–45 min) or in the browser beta (~30 min).",
      icon: Star,
      status: "current"
    },
    {
      title: "Frost & Lava",
      date: "Next print",
      description: "Water/Air and Earth/Fire. These go on sale once Lightning and Crystal sell through.",
      icon: Snowflake,
      status: "upcoming"
    },
    {
      title: "Sand & Poison",
      date: "After Frost & Lava",
      description: "Air/Earth and Water/Fire — the last two of the six combination decks.",
      icon: Wind,
      status: "upcoming"
    },
    {
      title: "Skirmish in Kinbrold",
      date: "After the six decks",
      description: "Quickplay: 5–15 minute matches inside the world. Click someone in Kinbrold, play a short game, get back to walking around.",
      icon: Swords,
      status: "upcoming"
    },
    {
      title: "Kinbrold MMOTCG",
      date: "The long game",
      description: "A persistent world whose combat is Elekin. Towns, NPCs, other players — grown one kingdom at a time. An MMORPG that plays like a TCG.",
      icon: Sparkles,
      status: "upcoming"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Elekin Roadmap — What&apos;s next</title>
        <meta name="description" content="Elekin now: Lightning and Crystal. Then Frost and Lava, Sand and Poison, short Skirmish matches in Kinbrold, and a Kinbrold MMOTCG." />
      </Helmet>
      
      <div className="min-h-screen bg-[#1A103C]">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Development Roadmap</h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              We&apos;re putting decks in people&apos;s hands first. When those exist, we build the world they belong in.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {roadmapItems.map((item, index) => {
              const Icon = item.icon;
              const isFirst = index === 0;
              const isLast = index === roadmapItems.length - 1;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex w-14 shrink-0 flex-col items-center">
                    <div className="flex w-full min-h-0 flex-1 flex-col items-center">
                      <div className={`w-0.5 flex-1 ${isFirst ? 'bg-transparent' : 'bg-purple-500/30'}`} />
                      <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full
                        ${item.status === 'current' ? 'bg-yellow-500' : 'bg-purple-900/50 border border-purple-500/30'}`}
                      >
                        <Icon className={`w-6 h-6 ${item.status === 'current' ? 'text-purple-900' : 'text-yellow-500'}`} />
                      </div>
                      <div className={`w-0.5 flex-1 ${isLast ? 'bg-transparent' : 'bg-purple-500/30'}`} />
                    </div>
                    {!isLast && (
                      <div className="h-12 w-0.5 shrink-0 bg-purple-500/30" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex-1 bg-purple-900/30 p-6 rounded-lg border border-purple-500/30">
                      <div className="flex items-start justify-between mb-2 gap-4">
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        <span className="text-yellow-500 font-semibold shrink-0">{item.date}</span>
                      </div>
                      <p className="text-purple-200">{item.description}</p>
                      {item.status === 'current' && (
                        <div className="mt-4 inline-block px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-semibold">
                          Currently available
                        </div>
                      )}
                    </div>
                    {!isLast && <div className="h-12 shrink-0" />}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Follow along</h2>
            <p className="text-purple-200 mb-8">
              If you want to be part of it now: play the beta, grab a Lightning or Crystal deck, and hang out in Discord.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tcg">
                <Button 
                  size="lg"
                  className="bg-purple-300 text-[#1A103C] border-2 border-[#1A103C] hover:bg-purple-200 font-bold px-8 py-6"
                >
                  Play the Beta
                </Button>
              </Link>
              <Link to="/shop">
                <Button 
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-6"
                >
                  Shop Decks
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ElekinRoadmap;
