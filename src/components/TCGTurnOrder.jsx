import React from "react";

export default function TCGTurnOrder({ onSelect }) {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            Choose Turn Order
          </h1>
          <p className="text-xl text-slate-300">
            Do you want to go 1st or 2nd?
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-8 mt-12">
          {/* Go First */}
          <button
            type="button"
            onClick={() => onSelect(true)}
            aria-label="Go first — you skip your Draw Phase and Battle Phase on turn 1"
            className="group relative w-full text-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 border-2 border-slate-700 hover:border-green-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />

            <div className="relative">
              <div className="text-6xl mb-4">🏁</div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                1st
              </h2>
              <p className="mt-3 text-sm text-slate-400">No draw and no Battle Phase on your first turn</p>
            </div>
          </button>

          {/* Go Second */}
          <button
            type="button"
            onClick={() => onSelect(false)}
            aria-label="Go second — you draw and may attack on turn 1"
            className="group relative w-full text-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 border-2 border-slate-700 hover:border-blue-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />

            <div className="relative">
              <div className="text-6xl mb-4">⏩</div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                2nd
              </h2>
              <p className="mt-3 text-sm text-slate-400">You draw and may attack on your first turn</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

