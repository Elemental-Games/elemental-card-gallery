import { motion } from 'framer-motion';

const Card = ({ card, onClick, isPlayable = false, showBack = false }) => {
  if (showBack) {
    return (
      <motion.div
        className="relative w-32 h-44 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200"
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
      >
        <img 
          src="/Card_Back.png" 
          alt="Card Back" 
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative w-32 h-44 rounded-lg overflow-hidden ${isPlayable ? 'cursor-pointer' : ''}`}
      whileHover={isPlayable ? { scale: 1.05 } : {}}
      onClick={isPlayable ? onClick : undefined}
    >
      {/* Card Image */}
      <img
        src={`/images/cards/${card.id}.webp`}
        alt={card.name}
        className={`w-full h-full object-cover rounded-lg ${isPlayable ? 'ring-2 ring-yellow-500/50' : ''}`}
      />
    </motion.div>
  );
};

export default Card; 