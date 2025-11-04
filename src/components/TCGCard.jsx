import React, { useState } from "react";

const elementColors = {
  fire: "from-red-600 to-orange-500",
  water: "from-blue-600 to-cyan-500",
  earth: "from-green-600 to-emerald-500",
  air: "from-purple-600 to-pink-500",
};

const elementIcons = {
  fire: "🔥",
  water: "💧",
  earth: "🌿",
  air: "💨",
};

export default function Card({ card, isHand = false, onClick, disabled = false, showBack = false, onMouseEnter, onMouseLeave, disableHover = false, isOpponent = false }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Local hover state for non-hand cards

  // Generate image path if not provided
  const getImagePath = () => {
    if (card.imagePath) return card.imagePath;
    const imageFileName = card.id.replace(/_/g, ' ');
    return `/images/cards/new/${imageFileName}.webp`;
  };

  // Show card back if requested
  if (showBack) {
    return (
      <div className="relative w-16 h-20 rounded-lg overflow-hidden">
        <img 
          src="/Card_Back.png" 
          alt="Card Back" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Use passed-in handlers for hand cards, local state for board cards
          const handleMouseEnter = isHand ? onMouseEnter : () => { if (!disableHover) setIsHovered(true); };
          const handleMouseLeave = isHand ? onMouseLeave : () => { if (!disableHover) setIsHovered(false); };

  return (
    <>
      <div
        onClick={(e) => {
          // Only handle click if onClick prop is provided
          if (onClick) {
            e.stopPropagation();
            onClick(card);
          } else {
            // If no onClick, still stop propagation to let parent handle it
            // But don't prevent default - parent will handle it
          }
        }}
        style={!onClick ? { pointerEvents: 'none' } : {}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          relative w-24 h-32 rounded-lg overflow-hidden cursor-pointer
          transition-all duration-200
          ${isHand ? "shadow-lg" : "shadow-md"}
          ${!isHand && card.exhausted ? "transform rotate-90" : (!isHand && isOpponent && !card.exhausted) ? "transform rotate-180" : ""}
        `}
      >
        {/* Card Image */}
        {!imageError && (
          <img 
            src={getImagePath()} 
            alt={card.name}
            className="w-full h-full object-cover pointer-events-none"
            onError={() => setImageError(true)}
          />
        )}

        {/* Gradient Fallback if image missing */}
        {imageError && (
          <div className={`absolute inset-0 bg-gradient-to-br ${elementColors[card.element] || 'from-slate-600 to-slate-500'} flex items-center justify-center`}>
            <span className="text-white text-xs font-bold drop-shadow">{card.name}</span>
          </div>
        )}
      </div>
      
      {/* Local Hover Preview (For Board Cards) - Only if no equipment */}
              {!isHand && isHovered && !disableHover && !card.equippedCards && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ width: '360px', height: '504px' }}>
            <img 
              src={getImagePath()}
              alt={card.name}
              className="w-full h-full object-contain shadow-2xl rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
