import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the cards.json file
const cardsPath = join(__dirname, '../public/data/cards.json');
const cardsData = JSON.parse(readFileSync(cardsPath, 'utf8'));

// Function to convert id to proper name
function convertIdToName(id) {
    return id
        // Split by hyphens
        .split('-')
        // Handle special cases before general capitalization
        .map(word => {
            // Special cases for possessives
            if (word === 'oracles') return "Oracle's";
            if (word === 'dragons') return "Dragon's";
            if (word === 'warriors') return "Warrior's";
            
            // Special cases for specific words
            if (word === 'of' || word === 'the') return word;
            if (word === 'mek' || word === 'galea' || word === 'balon') {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            
            // General case: capitalize first letter
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        // Join with spaces
        .join(' ');
}

// Update all card names
cardsData.cards = cardsData.cards.map(card => ({
    ...card,
    name: convertIdToName(card.id)
}));

// Write the updated data back to cards.json
writeFileSync(
    cardsPath,
    JSON.stringify(cardsData, null, 2),
    'utf8'
);

console.log('Card names have been updated successfully!'); 