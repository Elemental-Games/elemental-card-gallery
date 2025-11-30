export default function TCGDeckSelection({ onSelectDeck }) {
  const decks = [
    {
      id: "crystal",
      name: "Crystal Deck",
      element: "Crystal",
      dragon: "Diamoria",
      description: "Harness the defensive power of Water and Earth elements. Master shield restoration and resilient strategies.",
      image: "/images/products/crystaldemo1.png",
      colors: "from-blue-500 to-green-500",
    },
    {
      id: "lightning",
      name: "Lightning Deck",
      element: "Lightning",
      dragon: "Veton",
      description: "Channel the explosive power of Air and Fire elements. Dominate with devastating combo potential.",
      image: "/images/products/lightningdemo1.png",
      colors: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            ⚔️ Choose Your Deck
          </h1>
          <p className="text-xl text-slate-300">
            Pick your starter deck and battle the AI opponent!
          </p>
        </div>

        {/* Deck Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {decks.map((deck) => (
            <div
              key={deck.id}
              onClick={() => onSelectDeck(deck.id)}
              className="group relative rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 border-slate-700 hover:border-purple-500 overflow-hidden box-border"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${deck.colors} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Content Container */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 hover:shadow-2xl hover:shadow-purple-500/20 h-full">
                {/* Deck Image */}
                <div className="relative mb-6">
                  <img
                    src={deck.image}
                    alt={deck.name}
                    className="w-full h-64 object-contain rounded-lg shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                </div>

                {/* Deck Info */}
                <div className="relative space-y-3">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {deck.name}
                  </h2>
                  <div className="text-lg text-yellow-400 font-semibold">
                    Dragon: {deck.dragon}
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {deck.description}
                  </p>
                  
                  {/* Choose Button */}
                  <div className="mt-6">
                    <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold text-lg text-white transition-all shadow-lg hover:shadow-xl">
                      Select {deck.element} Deck →
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                ✨
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-sm text-slate-400">
          <p>💡 Tip: Both decks are balanced and fun to play!</p>
          <p className="mt-2">
          If you come across any bugs or issues, please reach out in the discord or at mark@elementalgames.gg
          </p>
        </div>
      </div>
    </div>
  );
}



