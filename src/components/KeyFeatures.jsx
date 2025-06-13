import { motion } from 'framer-motion';
import { Clock, Users, Gem, Shield, Zap, TestTube, QrCode } from 'lucide-react';

const features = [
  {
    title: '2 Player Strategic Battles',
    description: 'Head-to-head combat designed for intense 1v1 gameplay. Perfect for competitive tournaments or casual matches with friends.',
    icon: <Users className="w-8 h-8 text-purple-400" />,
    highlight: '2 Players'
  },
  {
    title: 'Quick 20-30 Minute Games',
    description: 'Fast-paced matches that fit into any schedule. Strategic depth without the time commitment of longer TCGs.',
    icon: <Clock className="w-8 h-8 text-purple-400" />,
    highlight: '20-30 Min'
  },
  {
    title: 'Essence Currency System',
    description: 'Generate and spend Essence to summon creatures and use stronger abilities. Strategic resource management is key to victory.',
    icon: <Gem className="w-8 h-8 text-purple-400" />,
    highlight: 'Resource Management'
  },
  {
    title: 'Shield Comeback Mechanics',
    description: 'Three protective shields with increasingly powerful effects when broken. These turn the tide of battle even when behind.',
    icon: <Shield className="w-8 h-8 text-purple-400" />,
    highlight: 'Comeback System'
  },
  {
    title: 'Elemental Creatures & Dragons',
    description: 'Command Air, Water, Fire, and Earth creatures. Summon powerful dual-element Dragons with unique combination abilities.',
    icon: <TestTube className="w-8 h-8 text-purple-400"/>,
    highlight: 'Dual-Element Dragons'
  },
  {
    title: 'Runes & Counters',
    description: 'Nostalgic spell and trap mechanics inspired by Yu-Gi-Oh! Simple yet strategic cards that can help mount a comeback or stay on top.',
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    highlight: 'Yu-Gi-Oh Style'
  }
];

const KeyFeatures = () => {
  return (
    <div className="w-full">
      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
                         className="bg-gradient-to-br from-purple-950/70 to-purple-900/50 p-6 rounded-xl border-2 border-purple-500/50 
                        hover:border-purple-400/80 transition-all duration-300
                        shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]
                        hover:scale-105"
          >
                         {/* Header with icon and title */}
             <div className="flex items-start mb-4">
               <div className="bg-purple-800/50 p-3 rounded-lg mr-4 flex-shrink-0 shadow-lg">
                 {feature.icon}
               </div>
               <div className="flex-1">
                 <h3 className="text-xl font-bold text-yellow-400 mb-1">{feature.title}</h3>
               </div>
             </div>
            
            {/* Description */}
            <p className="text-purple-200 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* QR Code Feature - Special Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
                 className="mt-8 bg-gradient-to-r from-yellow-500/15 to-purple-500/15 border-2 border-yellow-500/60 rounded-xl p-6
                    shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)]
                    transition-all duration-300 hover:scale-105"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-yellow-500/20 p-3 rounded-lg mr-4">
            <QrCode className="w-8 h-8 text-yellow-400" />
          </div>
                     <h3 className="text-2xl font-bold text-yellow-400">Interactive Card Technology</h3>
        </div>
        <p className="text-center text-purple-200 text-lg">
          <span className="text-yellow-400 font-semibold">Every card features a unique QR code</span> - 
          scan for instant access to detailed stats, lore, strategies, and deck-building tips.
        </p>
      </motion.div>
    </div>
  );
};

export default KeyFeatures;