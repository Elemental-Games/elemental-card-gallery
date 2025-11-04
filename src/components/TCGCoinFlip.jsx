import React, { useState } from "react";

export default function TCGCoinFlip({ onResult }) {
  const [hasGuessed, setHasGuessed] = useState(false);
  const [userGuess, setUserGuess] = useState(null);
  const [coinResult, setCoinResult] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [playerChoosesFirst, setPlayerChoosesFirst] = useState(null);

  const handleGuess = (guess) => {
    if (hasGuessed) return;
    
    setUserGuess(guess);
    setHasGuessed(true);
    setIsFlipping(true);

    // Flip the coin after a delay
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "heads" : "tails";
      setCoinResult(result);
      setIsFlipping(false);

      // If player won, show choice screen
      if (result === guess) {
        // Player won! Let them choose
        setTimeout(() => {
          // We'll handle this in the render
        }, 1000);
      } else {
        // Player lost, they go second
        setTimeout(() => {
          onResult(false, result, guess);
        }, 2000);
      }
    }, 2000);
  };

  const handleChooseOrder = (choosesFirst) => {
    setPlayerChoosesFirst(choosesFirst);
    onResult(choosesFirst, coinResult, userGuess);
  };

  // Show result and ask player if they want to go first
  if (coinResult && coinResult === userGuess && playerChoosesFirst === null) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              🎉 You Won the Coin Flip!
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Choose whether you want to go first or second
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleChooseOrder(true)}
              className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl p-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="text-5xl mb-4">➡️</div>
              <h2 className="text-2xl font-bold">Go First</h2>
            </button>

            <button
              onClick={() => handleChooseOrder(false)}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-xl p-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="text-5xl mb-4">⬅️</div>
              <h2 className="text-2xl font-bold">Go Second</h2>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show coin flip result if lost
  if (coinResult && coinResult !== userGuess) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 text-red-400">
              😔 You Lost the Coin Flip
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              The coin landed on <span className="font-bold text-yellow-400">{coinResult}</span>
            </p>
            <p className="text-lg text-slate-400">
              You will go second
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400">
            🪙 Coin Flip
          </h1>
          <p className="text-xl text-slate-300">
            Choose heads or tails to determine who goes first
          </p>
        </div>

        {/* Coin Display */}
        <div className="flex justify-center perspective-1000">
          <div
            className={`
              relative w-48 h-48 preserve-3d
              ${isFlipping ? "animate-coin-flip" : ""}
              ${hasGuessed ? "scale-110" : "scale-100"}
              transition-transform duration-1000
            `}
          >
            {/* Coin Side 1 - Heads */}
            <div className={`
              absolute inset-0 rounded-full flex items-center justify-center text-8xl backface-hidden
              ${coinResult === "heads" ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : "bg-gradient-to-br from-gray-400 to-gray-600"}
              border-4 border-white/50 shadow-2xl
            `}>
              🪙
            </div>

            {/* Coin Side 2 - Tails */}
            <div className={`
              absolute inset-0 rounded-full flex items-center justify-center text-8xl backface-hidden rotate-y-180
              ${coinResult === "tails" ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : "bg-gradient-to-br from-gray-400 to-gray-600"}
              border-4 border-white/50 shadow-2xl
            `}>
              🪙
            </div>
          </div>
        </div>

        {/* Guess Buttons */}
        {!hasGuessed && (
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleGuess("heads")}
              className="bg-gradient-to-br from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 rounded-xl p-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="text-6xl mb-4">🪙</div>
              <h2 className="text-3xl font-bold mb-2">Heads</h2>
              <p className="text-sm opacity-90">Choose heads</p>
            </button>

            <button
              onClick={() => handleGuess("tails")}
              className="bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl p-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="text-6xl mb-4">🪙</div>
              <h2 className="text-3xl font-bold mb-2">Tails</h2>
              <p className="text-sm opacity-90">Choose tails</p>
            </button>
          </div>
        )}

        {/* Result Text */}
        {hasGuessed && coinResult && (
          <div className="mt-8">
            <p className="text-2xl text-slate-300">
              {coinResult === userGuess ? (
                <span className="text-green-400 font-bold">🎉 You guessed correctly!</span>
              ) : (
                <span className="text-red-400 font-bold">❌ Coin landed on {coinResult}</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

