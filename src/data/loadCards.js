import cardData from '../../public/data/new_cards.json';

/**
 * Convert card from new_cards.json format to TCG format
 */
export function convertCardToTCG(cardJson) {
  const card = {
    id: cardJson.id,
    name: cardJson.name,
    element: cardJson.element?.toLowerCase() || "none",
    cost: cardJson.essence?.cost?.amount || 0,
    rarity: cardJson.rarity || "common",
    imagePath: cardJson.imagePath || cardJson.webpPath,
  };

  // Add card type specific data
  if (cardJson.type === "Creature") {
    card.cardType = "creature";
    card.attack = cardJson.stats?.strength || 0;
    card.health = cardJson.stats?.agility || 0;
  } else if (cardJson.type === "Rune") {
    card.cardType = "rune";
    card.effect = cardJson.ability || "";
  } else if (cardJson.type === "Counter") {
    card.cardType = "counter";
    card.effect = cardJson.ability?.description || "";
  } else if (cardJson.type === "Shield") {
    card.cardType = "shield";
    card.tier = cardJson.tier || 1;
  }

  return card;
}

/**
 * Get all cards as TCG format
 */
export function getAllCards() {
  return cardData.cards.map(convertCardToTCG);
}

/**
 * Get cards by element
 */
export function getCardsByElement(element) {
  return getAllCards().filter(card => card.element === element.toLowerCase());
}

/**
 * Get cards by type
 */
export function getCardsByType(type) {
  return getAllCards().filter(card => card.cardType === type.toLowerCase());
}

/**
 * Get a specific card by ID
 */
export function getCardById(id) {
  return getAllCards().find(card => card.id === id);
}

/**
 * Build a deck with specific cards
 */
export function buildDeck(cardIds) {
  const allCards = getAllCards();
  return cardIds.map(id => allCards.find(card => card.id === id)).filter(Boolean);
}


