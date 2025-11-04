import React from "react";

export default function GameOver({ result, onReset, playerDeck = "crystal" }) {
  const isPlayerWon = result === "player_won";
  const aiDeck = playerDeck === "crystal" ? "Lightning" : "Crystal";

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Result Icon */}
        <div className="text-8xl mb-6">
          {isPlayerWon ? "🎉" : "💀"}
        </div>

        {/* Title */}
        <h1 className={`text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${
          isPlayerWon
            ? "from-green-400 to-emerald-500"
            : "from-red-400 to-orange-500"
        }`}>
          {isPlayerWon ? "VICTORY!" : "DEFEAT"}
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-slate-300 mb-8">
          {isPlayerWon 
            ? `You defeated the ${aiDeck} Kingdom! 🏆`
            : `The ${aiDeck} Kingdom has conquered you...`}
        </p>

        {/* Stats */}
        <div className="bg-black/30 backdrop-blur rounded-lg p-8 mb-8 border border-cyan-500/20">
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <p className="text-slate-400">Match Result</p>
              <p className="text-2xl font-bold text-yellow-400">
                {isPlayerWon ? "Won" : "Lost"}
              </p>
            </div>
            <div>
              <p className="text-slate-400">Opponent</p>
              <p className="text-2xl font-bold text-cyan-400">{aiDeck} Kingdom</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={onReset}
            className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-bold text-lg text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔄 Play Again
          </button>
          <a
            href="/"
            className="px-12 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-lg font-bold text-lg text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🏠 Home
          </a>
        </div>

        {/* Tips */}
        <div className="mt-12 text-slate-400 text-sm">
          <p>Tip: Try different strategies in your next match!</p>
          {isPlayerWon && (
            <p className="mt-2 text-cyan-400">
              Great job! Share your victory! 🚀
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
