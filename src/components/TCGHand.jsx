import React, { useState } from "react";
import { useGameStore } from "../store/gameStore";
import Card from "./TCGCard";

export default function Hand({ cards, mana, isPlayer }) {
  const { playCard } = useGameStore();
  const [showToast, setShowToast] = useState(false);

  const handlePlayCard = (index) => {
    if (isPlayer) {
      if (cards[index].cost <= mana) {
      playCard(index, true);
      } else {
        // Show "Can't afford" toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    }
  };

  return (
    <>
      <div className="flex gap-3 px-4 overflow-x-auto pb-2 justify-start items-center"
        style={{ scrollbarWidth: 'thin' }}
      >
      {cards.length === 0 ? (
        <div className="w-full flex items-center justify-center p-4 bg-black/20 rounded text-slate-400">
          No cards in hand
        </div>
      ) : (
        cards.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            onClick={() => handlePlayCard(index)}
            className="flex-shrink-0"
          >
            <Card
              card={card}
              isHand={true}
              onClick={() => handlePlayCard(index)}
                showBack={!isPlayer}
            />
          </div>
        ))
      )}
    </div>

      {/* Can't Afford Toast */}
      {showToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl font-bold text-lg animate-pulse">
          Can't afford!
        </div>
      )}
    </>
  );
}
