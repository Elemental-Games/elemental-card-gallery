const fs = require('fs');
const path = require('path');

// Read the original JSON file from public directory
const filePath = path.join(__dirname, '..', '..', 'public', 'data', 'cards.json');
const rawData = fs.readFileSync(filePath);
const cards = JSON.parse(rawData).cards;

// Function to process each card
function processCard(card) {
  const processedCard = { ...card };

  // Handle required properties that might not have a value
  ['element', 'type', 'rune', 'tier', 'rarity', 'description'].forEach(prop => {
    if (!(prop in processedCard)) {
      processedCard[prop] = null;
    }
  });

  // Handle optional properties
  ['strength', 'agility', 'abilityName', 'ability', 'specialAbilityName', 'specialAbility', 'specialAbilityCost', 'essenceCost', 'essenceGeneration'].forEach(prop => {
    if (processedCard[prop] === undefined || processedCard[prop] === '') {
      delete processedCard[prop];
    }
  });

  // Ensure arrays are present
  ['synergies', 'counters', 'news'].forEach(prop => {
    if (!Array.isArray(processedCard[prop])) {
      processedCard[prop] = [];
    }
  });

  return processedCard;
}

// Process all cards
const processedCards = cards.map(processCard);

// Write the processed data back to a new JSON file in public directory
const outputPath = path.join(__dirname, '..', '..', 'public', 'data', 'processed-cards.json');
fs.writeFileSync(outputPath, JSON.stringify({ cards: processedCards }, null, 2));

console.log('Cards have been processed and saved to processed-cards.json');