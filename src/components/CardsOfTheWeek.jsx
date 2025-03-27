import { motion } from 'framer-motion';
import CardOfTheWeek from './cards/CardOfTheWeek';

const CardsOfTheWeek = () => {
  const weeklyCards = [
    {
      id: "wind-sprite",
      name: "Wind Sprite",
      image: "/images/cards/wind-sprite.webp"
    },
    {
      id: "deepseer",
      name: "Deepseer",
      image: "/images/cards/deepseer.webp"
    },
    {
      id: "mountain-giant",
      name: "Mountain Giant",
      image: "/images/cards/mountain-giant.webp"
    },
    {
      id: "emberwing",
      name: "Emberwing",
      image: "/images/cards/emberwing.webp"
    }
  ];

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
    <motion.div 
      className="border-[6px] border-yellow-500 rounded-xl bg-transparent"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center text-yellow-500"
          variants={itemVariants}
        >
          Cards of the Week
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeklyCards.map((card) => (
            <motion.div key={card.id} variants={itemVariants} className="scale-90">
              <CardOfTheWeek card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CardsOfTheWeek;