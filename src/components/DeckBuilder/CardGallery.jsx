import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Minus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const CardGallery = ({ cards = [], onCardSelect, selectedCards = [], maxPerElement = 12, step, combination }) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [type, setType] = useState('all');
  const [rarity, setRarity] = useState('all');
  const [runeType, setRuneType] = useState('all');
  const [showStrongCreaturesTip, setShowStrongCreaturesTip] = useState(false);
  const [tipElement, setTipElement] = useState('');

  useEffect(() => {
    if (!Array.isArray(cards)) {
      setFilteredCards([]);
      return;
    }

    try {
      const filtered = cards.filter(card => {
        if (!card || typeof card !== 'object') return false;

        // Basic search and element filters that apply to all steps
        const nameMatch = !searchTerm || (card.name && 
          card.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const elementMatch = !selectedElement || card.element === selectedElement;

        // Step-specific filtering
        if (step === 4) {
          // For Runes step, show all runes and apply rune type filter
          const runeTypeMatch = runeType === 'all' || card.runeType === runeType;
          return card.type === 'Rune' && nameMatch && elementMatch && runeTypeMatch;
        } else if (step === 3) {
          // For Dragon step, handled separately
          return false;
        } else {
          // For other steps
          const typeMatch = type === 'all' || card.type === type;
          const rarityMatch = rarity === 'all' || card.rarity === rarity;
          return nameMatch && elementMatch && typeMatch && rarityMatch;
        }
      });

      setFilteredCards(filtered);
    } catch (err) {
      console.error('Error filtering cards:', err);
      setFilteredCards([]);
    }
  }, [cards, searchTerm, selectedElement, type, rarity, runeType, step]);

  const getCardCount = (cardId) => {
    return selectedCards.filter(c => c.id === cardId).length;
  };

  const handleAddCard = (card) => {
    const currentCount = getCardCount(card.id);
    const elementCount = selectedCards.filter(c => 
      c.type === card.type && c.element === card.element
    ).length;

    // For dragon step
    if (step === 3) {
      if (currentCount >= 2) return;
    } 
    // For other steps
    else {
      if (elementCount >= maxPerElement) {
        toast.error(`You can't add more than ${maxPerElement} ${card.type.toLowerCase()}s of the same element`);
        return;
      }

      if (currentCount >= 3) {
        toast.error("You can't have more than 3 copies of the same card");
        return;
      }

      // Show strong creatures tip when they have 8 basic creatures of an element
      if (card.type === 'Creature' && !card.essenceCost && elementCount === 7) {
        setTipElement(card.element);
        setShowStrongCreaturesTip(true);
      }
    }

    onCardSelect(card);
  };

  const handleRemoveCard = (card) => {
    onCardSelect(card, true);
  };

  // For dragon step
  if (step === 3) {
    const dragonMap = {
      'Frost': 'eldritch',
      'Sand': 'aridus',
      'Lightning': 'veton',
      'Crystal': 'diamoria',
      'Poison': 'noxilus',
      'Lava': 'zoryn'
    };

    const dragonId = dragonMap[combination?.name];
    const dragonCard = cards.find(card => card.id.includes(dragonId));

    if (!dragonCard) {
      return <div className="text-center text-purple-300 py-8">Loading dragon card...</div>;
    }

    const count = getCardCount(dragonCard.id);

    return (
      <div className="flex justify-center items-center">
        <Card className="group px-2 py-2 hover:shadow-lg transition-all duration-200 relative bg-purple-950/70 border border-purple-500/30 w-[280px]">
          <div className="relative aspect-[2/3] w-full">
            <img 
              src={`/images/cards/${dragonCard.id}.webp`} 
              alt={dragonCard.name} 
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/images/cards/${dragonCard.id}.png`;
              }}
            />
            <div className="absolute top-2 left-2 bg-purple-900/80 text-white px-3 py-1.5 rounded-full text-lg font-bold">
              {count}/2
            </div>
            <Link 
              to={`/cards/${dragonCard.id}`}
              target="_blank"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button
                size="sm"
                variant="ghost"
                className="bg-purple-900/80 hover:bg-purple-800 text-white p-2"
              >
                <Info className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-1 text-center">
            <p className="font-semibold text-white text-base truncate">{dragonCard.name}</p>
            <p className="text-xs text-purple-300 mb-2">{dragonCard.type} • {dragonCard.element}</p>
            
            <div className="flex items-center justify-center gap-4">
              <Button 
                onClick={() => handleRemoveCard(dragonCard)}
                className="bg-purple-900/50 hover:bg-purple-800/50 text-white h-8 w-8 flex items-center justify-center p-0"
                disabled={count === 0}
              >
                <Minus className="w-5 h-5" />
              </Button>
              
              <Button 
                onClick={() => handleAddCard(dragonCard)}
                className="bg-purple-900/50 hover:bg-purple-800/50 text-white h-8 w-8 flex items-center justify-center p-0"
                disabled={count >= 2}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // For regular steps (creatures, runes, counters)
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded bg-purple-900/50 border border-purple-500/30 text-white placeholder-purple-300"
        />
        
        <select
          value={selectedElement}
          onChange={(e) => setSelectedElement(e.target.value)}
          className="px-4 py-2 rounded bg-purple-900/50 border border-purple-500/30 text-white"
        >
          <option value="">All Elements</option>
          <option value="Air">Air</option>
          <option value="Water">Water</option>
          <option value="Fire">Fire</option>
          <option value="Earth">Earth</option>
        </select>

        {step !== 4 && (
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 rounded bg-purple-900/50 border border-purple-500/30 text-white"
          >
            <option value="all">All Types</option>
            <option value="Creature">Creatures</option>
            <option value="Rune">Runes</option>
            <option value="Counter">Counters</option>
            <option value="Shield">Shields</option>
          </select>
        )}

        {(step === 4 || type === 'Rune') && (
          <select
            value={runeType}
            onChange={(e) => setRuneType(e.target.value)}
            className="px-4 py-2 rounded bg-purple-900/50 border border-purple-500/30 text-white"
          >
            <option value="all">All Rune Types</option>
            <option value="Normal">Normal</option>
            <option value="Instant">Instant</option>
            <option value="Equipment">Equipment</option>
          </select>
        )}

        {step !== 4 && (
          <select
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            className="px-4 py-2 rounded bg-purple-900/50 border border-purple-500/30 text-white"
          >
            <option value="all">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Legendary">Legendary</option>
          </select>
        )}

        <Button
          onClick={() => {
            setSearchTerm('');
            setSelectedElement('');
            setType('all');
            setRarity('all');
            setRuneType('all');
          }}
          className="bg-purple-700 hover:bg-purple-600"
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map((card) => (
          <Card 
            key={card.id} 
            className="group px-2 py-2 hover:shadow-lg transition-all duration-200 relative bg-purple-950/70 border border-purple-500/30"
          >
            <div className="relative aspect-[2/3] w-full">
              <img 
                src={`/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`} 
                alt={card.name} 
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`;
                }}
              />
              
              <div className="absolute top-2 left-2 bg-purple-900/80 text-white px-3 py-1.5 rounded-full text-lg font-bold min-w-[2rem] text-center">
                {getCardCount(card.id)}
              </div>
              
              <Link 
                to={`/cards/${card.id}`}
                target="_blank"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-purple-900/80 hover:bg-purple-800 text-white p-2"
                >
                  <Info className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-1 text-center">
              <p className="font-semibold text-white text-base truncate">{card.name}</p>
              <p className="text-xs text-purple-300">
                {!(card.type === 'Rune' || card.type === 'Counter' || card.type === 'Shield')
                  ? `${card.element} • ${card.type}`
                  : `${card.type}`}
              </p>
              {card.type === 'Shield' && (
                <>
                  {card.primaryEffect && (
                    <p className="text-xs text-purple-200 mt-1"><span className="font-bold">Primary:</span> {card.primaryEffect}</p>
                  )}
                  {card.secondaryEffect && (
                    <p className="text-xs text-purple-200 mt-1"><span className="font-bold">Secondary:</span> {card.secondaryEffect}</p>
                  )}
                </>
              )}
              
              <div className="flex items-center justify-center gap-4 mt-2">
                <Button 
                  onClick={() => handleRemoveCard(card)}
                  className="bg-purple-900/50 hover:bg-purple-800/50 text-white h-10 w-10 flex items-center justify-center p-0"
                  disabled={getCardCount(card.id) === 0}
                >
                  <Minus className="w-7 h-7" />
                </Button>
                
                <Button 
                  onClick={() => handleAddCard(card)}
                  className="bg-purple-900/50 hover:bg-purple-800/50 text-white h-10 w-10 flex items-center justify-center p-0"
                  disabled={getCardCount(card.id) >= 3 || 
                    selectedCards.filter(c => c.element === card.element).length >= maxPerElement}
                >
                  <Plus className="w-7 h-7" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center text-purple-300 py-8">
          No cards found matching your criteria
        </div>
      )}

      <Dialog open={showStrongCreaturesTip} onOpenChange={setShowStrongCreaturesTip}>
        <DialogContent className="bg-purple-950/90 border border-purple-500/30 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-yellow-400">
              Time to Add Stronger Creatures!
            </DialogTitle>
            <DialogDescription className="text-purple-200 mt-4">
              You have 8 basic {tipElement} creatures! Consider adding some stronger creatures with essence costs - they have powerful abilities and better stats.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button
              onClick={() => setShowStrongCreaturesTip(false)}
              className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
            >
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardGallery;
