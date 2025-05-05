import { motion } from 'framer-motion';

const Card = ({ card, onClick, isPlayable = false, showBack = false }) => {
  if (showBack) {
    return (
      <motion.div
        className="relative w-48 h-64 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200"
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
      className={`relative w-48 h-64 rounded-lg overflow-hidden ${isPlayable ? 'cursor-pointer' : ''}`}
      whileHover={isPlayable ? { scale: 1.05 } : {}}
      onClick={isPlayable ? onClick : undefined}
    >
      {/* Card Image */}
      <img
        src={`/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`}
        alt={card.name}
        className={`w-full h-full object-cover rounded-lg ${isPlayable ? 'ring-2 ring-yellow-500/50' : ''}`}
      />

      {/* Card Info Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="text-sm font-bold text-white truncate">{card.name}</h3>
          
          {/* Stats for Creatures */}
          {card.type === 'Creature' && card.strength && card.agility && (
            <div className="flex justify-between text-xs text-white/90">
              <span>STR: {card.strength}</span>
              <span>AGI: {card.agility}</span>
            </div>
          )}

          {/* Element Icon */}
          {card.element && (
            <div className="absolute top-2 right-2 w-6 h-6">
              <img
                src={`/icons/${card.element}.png`}
                alt={card.element}
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Card; 