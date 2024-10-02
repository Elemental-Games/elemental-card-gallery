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