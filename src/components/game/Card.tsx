import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '@/lib/game/GameState';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  isPlayable?: boolean;
  showBack?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isPlayable = false, showBack = false }) => {
  if (showBack) {
    return (
      <motion.div
        className="w-full h-full bg-purple-800/50 rounded-lg border-2 border-purple-500/30 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
      />
    );
  }

  return (
    <motion.div
      className={`relative w-full h-full bg-purple-900/50 rounded-lg border-2 
        ${isPlayable ? 'border-yellow-500/50 cursor-pointer' : 'border-purple-500/30'}
        overflow-hidden`}
      whileHover={isPlayable ? { scale: 1.05, borderColor: 'rgba(234,179,8,0.8)' } : {}}
      onClick={isPlayable ? onClick : undefined}
    >
      {/* Card Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover"
        />
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

      {/* Card Info */}
      <div className="p-2 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-white truncate">{card.name}</h3>
          <span className="text-xs font-semibold text-yellow-500">{card.rarity}</span>
        </div>

        {/* Stats for Creatures */}
        {card.type === 'Creature' && card.strength && card.agility && (
          <div className="flex justify-between text-xs text-purple-200">
            <span>STR: {card.strength}</span>
            <span>AGI: {card.agility}</span>
          </div>
        )}

        {/* Ability */}
        {card.ability && (
          <div className="text-xs text-purple-200">
            <p className="font-semibold">{card.ability.name}</p>
            <p className="text-[10px] line-clamp-2">{card.ability.description}</p>
          </div>
        )}

        {/* Essence Cost/Generation */}
        <div className="flex justify-between items-center text-xs">
          {card.essenceCost ? (
            <div className="flex items-center gap-1">
              <span className="text-purple-200">Cost:</span>
              <span className="text-yellow-500">{card.essenceCost}</span>
            </div>
          ) : null}
          {card.essenceGeneration ? (
            <div className="flex items-center gap-1">
              <span className="text-purple-200">Gen:</span>
              <span className="text-yellow-500">+{card.essenceGeneration}</span>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default Card; 