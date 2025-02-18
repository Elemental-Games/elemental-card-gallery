import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Users, Trophy, Sparkles } from 'lucide-react';

const ElekinRoadmap = () => {
  const roadmapItems = [
    {
      title: "Physical TCG Development",
      date: "Current - June 2025",
      description: "Development of the core physical card game including 169 cards, complete ruleset, and extensive playtesting. Culminating in a Kickstarter campaign to fund initial print run and digital development.",
      icon: Star,
      status: "current"
    },
    {
      title: "Digital TCG Launch",
      date: "Q4 2025",
      description: "Launch of Elekin Online featuring digital card system, player accounts, matchmaking, collection management, and comprehensive tutorial system.",
      icon: Users,
      status: "upcoming"
    },
    {
      title: "Enhanced Online Features",
      date: "Q1 2026",
      description: "Introduction of friend system, trading, tournaments, chat features, and competitive ranking system.",
      icon: Trophy,
      status: "upcoming"
    },
    {
      title: "MMO Evolution",
      date: "Q3 2026",
      description: "Evolution into Kinbrold: Elekin Masters - a full MMO with elemental cities, card battle arenas, guild systems, and an expansive world to explore.",
      icon: Sparkles,
      status: "upcoming"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Elekin Development Roadmap - Masters of Kinbrold</title>
        <meta name="description" content="Follow the development journey of Elekin: Masters of Kinbrold and see what exciting features are coming next." />
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
              Follow our journey as we build and expand the world of Elekin
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {roadmapItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  {/* Timeline line */}
                  {index !== roadmapItems.length - 1 && (
                    <div className="absolute left-[27px] top-10 w-[2px] h-full bg-purple-500/30" />
                  )}
                  
                  {/* Timeline item */}
                  <div className="relative">
                    {/* Icon */}
                    <div className={`absolute left-[-27px] w-14 h-14 rounded-full flex items-center justify-center
                      ${item.status === 'current' ? 'bg-yellow-500' : 'bg-purple-900/50 border border-purple-500/30'}`}
                    >
                      <Icon className={`w-6 h-6 ${item.status === 'current' ? 'text-purple-900' : 'text-yellow-500'}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="ml-12">
                      <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                          <span className="text-yellow-500 font-semibold">{item.date}</span>
                        </div>
                        <p className="text-purple-200">{item.description}</p>
                        {item.status === 'current' && (
                          <div className="mt-4 inline-block px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-semibold">
                            Currently in Development
                          </div>
                        )}
                      </div>
                    </div>
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
            <h2 className="text-2xl font-bold text-white mb-4">Want to Help Shape the Future?</h2>
            <p className="text-purple-200 mb-8">
              Join our beta and provide feedback to influence the development of Elekin
            </p>
            <Link to="/join">
              <Button 
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-6"
              >
                Join Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ElekinRoadmap;
