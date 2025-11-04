import React from "react";
import Card from "./TCGCard";

export default function Battlefield({ creatures, isPlayer }) {
  const elementColors = {
    fire: "border-red-500/50 bg-red-500/10",
    water: "border-blue-500/50 bg-blue-500/10",
    earth: "border-green-500/50 bg-green-500/10",
    air: "border-purple-500/50 bg-purple-500/10",
  };

  return (
    <div
      className={`
        min-h-20 p-4 rounded-lg border-2 border-dashed
        ${isPlayer ? "border-orange-500/30 bg-orange-500/5" : "border-blue-500/30 bg-blue-500/5"}
      `}
    >
      {creatures.length === 0 ? (
        <div className="text-center text-slate-500 py-8">
          {isPlayer ? "Play creatures here" : "AI creatures"}
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {creatures.map((creature) => (
            <div
              key={creature.instanceId}
              className={`
                relative p-3 rounded-lg border-2 transition-all
                ${
                  creature.canAttack
                    ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/50"
                    : "border-slate-500 bg-slate-500/10"
                }
              `}
            >
              {/* Creature Info */}
              <div className="flex flex-col gap-1">
                <div className="font-bold text-sm text-white">{creature.name}</div>
                <div className="flex justify-between gap-2 text-xs font-bold">
                  <span className="text-red-400">⚔️ {creature.attack}</span>
                  <span className="text-green-400">❤️ {creature.currentHealth}/{creature.health}</span>
                </div>
              </div>

              {/* Status Badges */}
              {!creature.canAttack && (
                <div className="absolute top-1 right-1 text-xs bg-slate-600 text-slate-200 px-2 py-1 rounded">
                  😴
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
