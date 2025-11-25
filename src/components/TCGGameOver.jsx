import React, { useEffect, useState } from "react";

export default function GameOver({ result, onReset, playerDeck = "crystal" }) {
  const isPlayerWon = result === "player_won";
  const aiDeck = playerDeck === "crystal" ? "Lightning" : "Crystal";
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className={`fixed inset-0 z-[20001] w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
      <div className={`text-center max-w-2xl mx-auto px-6 transition-all duration-700 ${showContent ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        {/* Result Icon with animation */}
        <div className={`text-8xl mb-6 transition-all duration-1000 ${showContent ? (isPlayerWon ? "animate-[bounce_1s_ease-in-out_2,spin_2s_linear] scale-110" : "animate-[pulse_2s_ease-in-out_infinite]") : "scale-0"}`}>
          {isPlayerWon ? "🎉" : "💀"}
        </div>

        {/* Title with animation */}
        <h1 className={`text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r transition-all duration-1000 ${
          isPlayerWon
            ? "from-green-400 to-emerald-500"
            : "from-red-400 to-orange-500"
        } ${showContent ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
          {isPlayerWon ? "VICTORY!" : "DEFEAT"}
        </h1>

        {/* Subtitle */}
        <p className={`text-2xl text-slate-300 mb-8 transition-all duration-1000 delay-200 ${showContent ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
          {isPlayerWon 
            ? `You defeated the ${aiDeck} Kingdom! 🏆`
            : `The ${aiDeck} Kingdom has conquered you...`}
        </p>

        {/* Stats */}
        <div className={`bg-black/30 backdrop-blur rounded-lg p-8 mb-8 border border-cyan-500/20 transition-all duration-1000 delay-300 ${showContent ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
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
        <div className={`flex gap-4 justify-center flex-wrap transition-all duration-1000 delay-500 ${showContent ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
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
        <div className={`mt-12 text-slate-400 text-sm transition-all duration-1000 delay-700 ${showContent ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
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
