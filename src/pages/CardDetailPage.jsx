import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import CardDetailSidebar from '@/components/CardDetailSidebar';
import { getCardImagePath, createCardImageErrorHandler } from '@/utils/imageUtils';

const CardDetailPage = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const [sidebarCard, setSidebarCard] = useState(null);

  // Determine the previous page and back link
  const getBackInfo = () => {
    // Default to campaign
    let backText = "Back to Campaign";
    let backLink = "/cards/campaign";

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
          to="/cards/campaign"
          className="px-4 py-2 bg-purple-600/50 text-white rounded-lg hover:bg-purple-500/50"
        >
          Back to Campaign
        </Link>
      </div>
    );
  }

  // Get the best image path for this card
  const { marketingPath } = getCardImagePath(card);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/cards/campaign"
        className="inline-block mb-8 px-4 py-2 bg-purple-600/50 text-white rounded-lg hover:bg-purple-500/50"
      >
        ← Campaign Page
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="flex justify-center">
          <div className={`relative ${card.type === 'Shield' ? 'w-full pt-[100%]' : ''}`}>
            <img
              src={marketingPath}
              alt={card.name}
              className={`rounded-lg shadow-lg ${
                card.type === 'Shield' 
                  ? 'absolute top-0 left-0 w-full h-full object-contain'
                  : 'max-w-md w-full'
              }`}
              onError={createCardImageErrorHandler(card)}
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
                  const synergyCard = { id: synergy.id || synergy };
                  const { marketingPath: synergyMarketingPath } = getCardImagePath(synergyCard);
                  
                  return (
                    <div key={synergyCard.id} className="flex flex-col items-center w-24 cursor-pointer" onClick={() => setSidebarCard(synergyCard)}>
                      <img 
                        src={synergyMarketingPath} 
                        alt={synergy.name || synergyCard.id} 
                        className="w-full rounded mb-2 border-2 border-purple-400 bg-purple-950"
                        onError={createCardImageErrorHandler(synergyCard)}
                      />
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
                  const counterCard = { id: counter.id || counter };
                  const { marketingPath: counterMarketingPath } = getCardImagePath(counterCard);
                  
                  return (
                    <div key={counterCard.id} className="flex flex-col items-center w-24 cursor-pointer" onClick={() => setSidebarCard(counterCard)}>
                      <img 
                        src={counterMarketingPath} 
                        alt={counter.name || counterCard.id} 
                        className="w-full rounded mb-2 border-2 border-purple-400 bg-purple-950"
                        onError={createCardImageErrorHandler(counterCard)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Lore section */}
      {(card.cardFact || card.loreDescription) && (
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-purple-950/50 border border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Card Lore</h2>
            
            {card.cardFact && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Card Fact</h3>
                <p className="text-purple-200 leading-relaxed">{card.cardFact}</p>
        </div>
      )}

            {card.loreDescription && (
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Lore Description</h3>
                <p className="text-purple-200 leading-relaxed">{card.loreDescription}</p>
        </div>
      )}
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