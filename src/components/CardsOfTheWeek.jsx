import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import CardDetailSidebar from './CardDetailSidebar';

const CardsOfTheWeek = () => {
  const [selectedCard, setSelectedCard] = useState(null);

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
          {[1,2,3,4].map((placeholder) => {
            // Updated schedule: Week 1-3 in June, Week 4-6 in July
            const weekDates = [
                { date: 23, month: 'June' },   // Week 1: June 23
                { date: 30, month: 'June' },   // Week 2: June 30  
                { date: 7, month: 'July' },    // Week 3: July 7
                { date: 14, month: 'July' },   // Week 4: July 14
                { date: 21, month: 'July' },   // Week 5: July 21
                { date: 28, month: 'July' }    // Week 6: July 28
            ];
            const revealInfo = weekDates[placeholder - 1];
            
            return (
              <motion.div 
                key={placeholder} 
                variants={itemVariants} 
                className="scale-95 md:scale-100 w-full mx-auto group cursor-pointer" 
                style={{ maxWidth: "240px" }}
              >
                <div className="relative overflow-hidden rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-yellow-500/50 transition-all duration-300">
                  <div className="w-full aspect-[5/7] relative">
                    <img 
                      src="/Card_Back.png" 
                      alt="Card Back"
                      className="w-full h-full object-contain"
                    />
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🔒</div>
                        <div className="text-yellow-400 font-bold text-lg">Coming Soon</div>
                        <div className="text-purple-200 text-sm">{revealInfo.month} {revealInfo.date}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">Week {placeholder} Cards</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Reveals {revealInfo.month} {revealInfo.date}</span>
                      <span className="text-yellow-400">4 Cards</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* See Full Campaign Button */}
        <motion.div 
          className="text-center mt-8"
          variants={itemVariants}
        >
          <Link 
            to="/cards/campaign"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-purple-400 hover:border-yellow-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)]"
          >
            <Calendar className="w-5 h-5 mr-3" />
            See Full Campaign Timeline
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