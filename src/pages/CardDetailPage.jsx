import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CardDetailSidebar from '@/components/CardDetailSidebar';

const CardDetailPage = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const [sidebarCard, setSidebarCard] = useState(null);

  // Determine the previous page and back link
  const getBackInfo = () => {
    // Default to gallery
    let backText = "Back to Gallery";
    let backLink = "/cards/gallery";

    // Check the referrer path
    if (location.state?.from) {
      const fromPath = location.state.from;
      if (fromPath.includes('deck-builder')) {
        backText = "Back to Deck Builder";
        backLink = "/cards/deck-builder";
      } else if (fromPath === '/') {
        backText = "Back to Home";
        backLink = "/";
      }
    }

    return { text: backText, link: backLink };
  };

  // We'll get these values but use them later when needed
  getBackInfo();

  useEffect(() => {
    fetch('/data/new_cards.json')
      .then(response => response.json())
      .then(data => {
        const foundCard = data.cards.find(c => c.id === id);
        if (foundCard) {
          // Handle numeric name references
          if (typeof foundCard.name === 'number') {
            const cardWithName = data.cards.find(c => c.cardNumber === foundCard.name);
            foundCard.name = cardWithName ? cardWithName.name : `Card ${foundCard.name}`;
          }
          setCard(foundCard);
        } else {
          setError('Card not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error loading card data');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Link 
          to="/cards/gallery"
          className="px-4 py-2 bg-purple-600/50 text-white rounded-lg hover:bg-purple-500/50"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/cards/gallery"
        className="inline-block mb-8 px-4 py-2 bg-purple-600/50 text-white rounded-lg hover:bg-purple-500/50"
      >
        ← Gallery Page
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="flex justify-center">
          <div className={`relative ${card.type === 'Shield' ? 'w-full pt-[100%]' : ''}`}>
            <img
              src={card.webpPath}
              alt={card.name}
              className={`rounded-lg shadow-lg ${
                card.type === 'Shield' 
                  ? 'absolute top-0 left-0 w-full h-full object-contain'
                  : 'max-w-md w-full'
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = card.imagePath || `/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`;
              }}
            />
          </div>
        </div>

        <div className="bg-purple-950/70 p-6 rounded-lg border border-purple-500/30">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">{card.name}</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-purple-300 font-medium">Type</h2>
              <p className="text-white">{card.type}</p>
            </div>

            {card.type === 'Creature' && (
              <div>
                <h2 className="text-purple-300 font-medium">Element</h2>
                <p className="text-white">{card.element}</p>
              </div>
            )}

            {card.type === 'Shield' && (
              <div>
                <h2 className="text-purple-300 font-medium">Tier</h2>
                <p className="text-white">{card.tier}</p>
              </div>
            )}

            {card.type === 'Rune' && (
              <div>
                <h2 className="text-purple-300 font-medium">Rune Type</h2>
                <p className="text-white">{card.runeType}</p>
              </div>
            )}

            <div>
              <h2 className="text-purple-300 font-medium">Rarity</h2>
              <p className="text-white">{
                card.rarity === 'C' ? 'Common' :
                card.rarity === 'U' ? 'Uncommon' :
                card.rarity === 'R' ? 'Rare' :
                card.rarity === 'E' ? 'Epic' :
                card.rarity === 'L' ? 'Legendary' :
                card.rarity
              }</p>
            </div>

            <div>
              <h2 className="text-purple-300 font-medium">Card Number</h2>
              <p className="text-white">#{card.cardNumber}</p>
            </div>
          </div>

          {card.type === 'Shield' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-purple-300 font-medium mb-2">Primary Effect</h2>
                <p className="text-white">{card.primaryEffect}</p>
              </div>
              <div>
                <h2 className="text-purple-300 font-medium mb-2">Secondary Effect</h2>
                <p className="text-white">{card.secondaryEffect}</p>
              </div>
            </div>
          )}

          {card.type === 'Counter' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-purple-300 font-medium mb-2">Trigger</h2>
                <p className="text-white">{card.trigger}</p>
              </div>
              <div>
                <h2 className="text-purple-300 font-medium mb-2">Effect</h2>
                <p className="text-white">{card.effect}</p>
              </div>
            </div>
          )}

          {card.type === 'Rune' && (
            <div>
              <h2 className="text-purple-300 font-medium mb-2">Effect</h2>
              <p className="text-white">{card.effect}</p>
            </div>
          )}

          {card.type === 'Creature' && (
            <>
              {card.stats && (
                <div className="mb-6">
                  <h2 className="text-purple-300 font-medium mb-2">Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <p className="text-white">Strength: {card.stats.strength}</p>
                    <p className="text-white">Agility: {card.stats.agility}</p>
                  </div>
                </div>
              )}

              {card.ability && (
                <div className="mb-6">
                  <h2 className="text-purple-300 font-medium mb-2">Ability</h2>
                  {typeof card.ability === 'object' ? (
                    <>
                      <p className="text-white">{card.ability.name}</p>
                      <p className="text-purple-200 text-sm mt-1">{card.ability.description}</p>
                    </>
                  ) : (
                    <p className="text-white">{card.ability}</p>
                  )}
                </div>
              )}

              {card.essence && (
                <div className="mb-6">
                  <h2 className="text-purple-300 font-medium mb-2">Essence</h2>
                  {card.essence.cost && (
                    <p className="text-white">Cost: {card.essence.cost.amount} {card.essence.cost.element}</p>
                  )}
                  {card.essence.generation && (
                    <p className="text-white">Generation: {card.essence.generation.amount} {card.essence.generation.element}</p>
                  )}
                </div>
              )}
            </>
          )}

          {card.quote && (
            <div className="mt-6 border-t border-purple-500/30 pt-4">
              <p className="text-purple-200 italic">&quot;{card.quote}&quot;</p>
            </div>
          )}
        </div>
      </div>

      {/* Synergy and Counter Cards Section (side-by-side, with images) */}
      {(Array.isArray(card.synergies) && card.synergies.length > 0) || (Array.isArray(card.counters) && card.counters.length > 0) ? (
        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Synergy Cards */}
          {Array.isArray(card.synergies) && card.synergies.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Synergy Cards</h2>
              <div className="flex flex-wrap gap-4">
                {card.synergies.map((synergy) => {
                  let id = synergy.id || synergy;
                  let name = synergy.name || id;
                  let imgPath = `/images/cards/new/${id.replace(/-/g, ' ')}.webp`;
                  return (
                    <div key={id} className="flex flex-col items-center w-24 cursor-pointer" onClick={() => setSidebarCard({ id })}>
                      <img src={imgPath} alt={name} className="w-full rounded mb-2 border-2 border-purple-400 bg-purple-950" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Counter Cards */}
          {Array.isArray(card.counters) && card.counters.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Counter Cards</h2>
              <div className="flex flex-wrap gap-4">
                {card.counters.map((counter) => {
                  let id = counter.id || counter;
                  let name = counter.name || id;
                  let imgPath = `/images/cards/new/${id.replace(/-/g, ' ')}.webp`;
                  return (
                    <div key={id} className="flex flex-col items-center w-24 cursor-pointer" onClick={() => setSidebarCard({ id })}>
                      <img src={imgPath} alt={name} className="w-full rounded mb-2 border-2 border-purple-400 bg-purple-950" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Lore section */}
      {(card.loreDescription || card.cardFact) && (
        <div className="max-w-6xl mx-auto mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-purple-950/70 p-6 rounded-lg border border-purple-500/30"
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">{card.name} in the World of Kinbrold</h2>
            
            <div className="space-y-6">
              {card.loreDescription && (
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Backstory</h3>
                <p className="text-white leading-relaxed">
                    {card.loreDescription}
                  </p>
        </div>
      )}

              {card.cardFact && (
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Card Fact</h3>
                <p className="text-white leading-relaxed">
                    {card.cardFact}
                </p>
        </div>
      )}
            </div>
          </motion.div>
        </div>
      )}

      {/* News Section with YouTube Thumbnails at the bottom */}
      {Array.isArray(card.news) && card.news.length > 0 && (
        <div className="max-w-6xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">News</h2>
          <div className="flex flex-wrap gap-4">
            {card.news.map((item) => {
              let url = typeof item === 'string' ? item : (item && typeof item === 'object' && typeof item.link === 'string' ? item.link : null);
              let title = (item && typeof item === 'object' && item.title) ? item.title : url;
              let videoId = null;
              let isYouTube = false;
              if (typeof url === 'string' && url.includes('youtube.com/watch?v=')) {
                isYouTube = true;
                videoId = url.split('v=')[1]?.split('&')[0];
              }
              if (isYouTube && videoId) {
                return (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="block w-40 aspect-square rounded overflow-hidden border-2 border-yellow-400 hover:scale-105 transition-transform">
                    <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={title} className="w-full h-full object-cover" />
                  </a>
                );
              }
              // Fallback for non-YouTube links
              return (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="block w-40 aspect-square rounded overflow-hidden border-2 border-yellow-400 flex items-center justify-center bg-purple-900 text-yellow-400">
                  <span className="text-center px-2">{title}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      <CardDetailSidebar
        card={sidebarCard}
        isOpen={!!sidebarCard}
        onClose={() => setSidebarCard(null)}
      />
    </div>
  );
};

export default CardDetailPage;