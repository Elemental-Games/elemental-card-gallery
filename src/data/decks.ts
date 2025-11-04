import { Card } from "../types/tcg";
import { allCards } from "./cards";

// ============== CRYSTAL DECK (Water + Earth) ==============

export const crystalDeck: Card[] = [
  // Creatures (28)
  ...Array(3).fill(allCards.Driplets),
  ...Array(3).fill(allCards.AquaDart),
  ...Array(2).fill(allCards.Piddip),
  ...Array(3).fill(allCards.Crag),
  ...Array(3).fill(allCards.Khorn),
  ...Array(2).fill(allCards.IvyMantis),
  ...Array(2).fill(allCards.Manasee),
  ...Array(1).fill(allCards.Malletin),
  ...Array(2).fill(allCards.Brumaul),
  ...Array(1).fill(allCards.Tuskhammer),
  ...Array(2).fill(allCards.Torrent),
  ...Array(2).fill(allCards.Terra),
  ...Array(2).fill(allCards.Diamoria),
  // Runes (8)
  ...Array(2).fill(allCards.DraconicAdaptability),
  ...Array(2).fill(allCards.EssenceExchange),
  ...Array(2).fill(allCards.EssenceAmplifier),
  ...Array(2).fill(allCards.DirectAssault),
  // Counters (4)
  ...Array(2).fill(allCards.Unbreakable),
  ...Array(2).fill(allCards.PowerSurge),
];

// ============== LIGHTNING DECK (Air + Fire) ==============

export const lightningDeck: Card[] = [
  // Creatures (30)
  ...Array(3).fill(allCards.Glint),
  ...Array(2).fill(allCards.Swoop),
  ...Array(3).fill(allCards.Stawid),
  ...Array(2).fill(allCards.PyroMites),
  ...Array(2).fill(allCards.NightVox),
  ...Array(3).fill(allCards.EmberFlicker),
  ...Array(1).fill(allCards.FireBugs),
  ...Array(2).fill(allCards.Lavrok),
  ...Array(1).fill(allCards.Blazorn),
  ...Array(2).fill(allCards.Dumoles),
  ...Array(1).fill(allCards.Skerodact),
  ...Array(3).fill(allCards.Archen),
  ...Array(1).fill(allCards.Aeris),
  ...Array(2).fill(allCards.Nimbus),
  ...Array(2).fill(allCards.Veton),
  // Runes (6)
  ...Array(1).fill(allCards.DraconicAdaptability),
  ...Array(2).fill(allCards.EssenceGeneration),
  ...Array(3).fill(allCards.BindingCoils),
  // Counters (4)
  ...Array(2).fill(allCards.RevivalRain),
  ...Array(2).fill(allCards.PassiveAggressive),
];

export const starterDecks: { [key: string]: Card[] } = {
  crystal: crystalDeck,
  lightning: lightningDeck,
};

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get a starter deck by element
 */
export const getStarterDeck = (element: "crystal" | "lightning"): Card[] => {
  return shuffleDeck(starterDecks[element]);
};

/**
 * Draw N cards from deck
 */
export const drawCards = (
  deck: Card[],
  count: number
): { drawn: Card[]; remaining: Card[] } => {
  const drawn = deck.slice(0, count);
  const remaining = deck.slice(count);
  return { drawn, remaining };
};
