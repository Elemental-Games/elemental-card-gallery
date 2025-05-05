import { Card } from './GameState';

export async function loadCards(): Promise<Card[]> {
  try {
    const response = await fetch('/data/new_cards.json');
    if (!response.ok) {
      throw new Error('Failed to load cards');
    }
    const data = await response.json();
    return data.map((card: any) => ({
      id: card.id,
      cardNumber: card.cardNumber,
      name: card.name,
      type: card.type,
      element: card.element,
      rarity: card.rarity,
      strength: card.strength,
      agility: card.agility,
      essenceCost: card.essenceCost,
      essenceGeneration: card.essenceGeneration,
      ability: card.ability ? {
        name: card.ability.name,
        description: card.ability.description
      } : undefined,
      image: card.image || `/images/cards/new/${card.id.replace(/-/g, ' ')}.webp`
    }));
  } catch (error) {
    console.error('Error loading cards:', error);
    return [];
  }
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawStartingHand(deck: Card[]): { hand: Card[], remainingDeck: Card[] } {
  const hand = deck.slice(0, 5);
  const remainingDeck = deck.slice(5);
  return { hand, remainingDeck };
}

export function isCardPlayable(card: Card, playerEssence: { [key: string]: number }): boolean {
  if (!card.essenceCost || !card.element) return true;
  return playerEssence[card.element] >= card.essenceCost;
}

export function getValidTargets(card: Card, gameState: any): any[] {
  // TODO: Implement target validation based on card type and game rules
  return [];
} 