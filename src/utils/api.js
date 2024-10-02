const fs = require('fs');
const path = require('path');

// Read the original JSON file
const filePath = path.join(__dirname, '..', 'data', 'ElementalMastersCards.json');
const rawData = fs.readFileSync(filePath);
const cards = JSON.parse(rawData).cards;

// Function to process each card
function processCard(card) {
  const processedCard = { ...card };

  for (const [key, value] of Object.entries(processedCard)) {
    if (value === 'NaN') {
      if (['synergies', 'counters', 'news'].includes(key)) {
        processedCard[key] = '[]';
      } else {
        processedCard[key] = null;
      }
    }
  }

  return processedCard;
}

// Process all cards
const processedCards = cards.map(processCard);

// Write the processed data back to a new JSON file
const outputPath = path.join(__dirname, '..', 'data', 'ProcessedElementalMastersCards.json');
fs.writeFileSync(outputPath, JSON.stringify({ cards: processedCards }, null, 2));

console.log('Cards have been processed and saved to ProcessedElementalMastersCards.json');

export const fetchRulesData = async () => {
  // In a real application, this would be an API call
  // For now, we'll return mock data
  return {
    quickStart: [
      "Build a deck of 40 cards.",
      "Place 3 shields (1 of each tier) face-down and draw 5 cards.",
      "Flip a coin to decide who goes first.",
      "On your turn, draw a card and generate essence from your creatures.",
      "Play creatures, runes, and counters using essence.",
      "Attack opponent's creatures or shields during the battle phase.",
      "Reduce opponent's health points to 0 or play \"Ancient Sigil\" to win!"
    ],
    fullRules: {
      setup: {
        title: "Game Setup",
        content: [
          "Each player starts with a deck of 40 cards.",
          "Place 3 shields (1 of each tier) face-down in front of you.",
          "Draw 5 cards to form your starting hand.",
          "Flip a coin to determine who goes first.",
          "The player going first cannot attack on their first turn."
        ]
      },
      // ... Add more sections as needed
    },
    // ... Add data for other sections (deckBuilding, cardTypes, gameplay, combat, faq)
  };
};
