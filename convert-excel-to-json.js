import pkg from 'xlsx';
const { readFile, utils } = pkg;
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the Excel file
const excelPath = path.join(__dirname, 'ElekinMasterCards.xlsx');
// Output JSON file
const outputPath = path.join(__dirname, 'public', 'data', 'new_cards.json');

// Load the Excel file
console.log('Reading Excel file...');
const workbook = readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
console.log('Converting to JSON...');
const rawData = utils.sheet_to_json(worksheet);

// Process the data to match the structure of cards.json
const processedData = {
  cards: rawData.map(card => {
    // Get card ID
    const cardId = card.id || card['ID'] || null;
    
    // Replace hyphens with spaces for image paths
    const imageFileName = cardId ? cardId.replace(/-/g, ' ') : null;
    
    // Construct the card object with all required fields
    const processedCard = {
      cardNumber: card.cardNumber || card['Card Number'] || null,
      id: cardId,
      name: card.name || card['Name'] || null,
      type: card.type || card['Type'] || null,
      rarity: card.rarity || card['Rarity'] || null,
      // Use new .webp path with spaces instead of hyphens
      imagePath: `/images/cards/new/${imageFileName}.webp`,
      webpPath: `/images/cards/new/${imageFileName}.webp`,
      element: card.element || card['Element'] || null,
    };

    // Add stats if the card is a creature
    if (processedCard.type === 'Creature') {
      processedCard.stats = {
        strength: Number(card.strength || card['Strength'] || 0),
        agility: Number(card.agility || card['Agility'] || 0)
      };
    }

    // Add essence fields if present
    if (card.essenceCost !== undefined || card['Essence Cost'] !== undefined || 
        card.essenceGeneration !== undefined || card['Essence Generation'] !== undefined) {
      processedCard.essence = {
        cost: {
          amount: Number(card.essenceCost || card['Essence Cost'] || 0),
          element: card.element || card['Element'] || null
        },
        generation: {
          amount: Number(card.essenceGeneration || card['Essence Generation'] || 0),
          element: card.element || card['Element'] || null
        }
      };
    }

    // Add ability if present
    if (card.ability || card['Ability'] || card.abilityName || card['Ability Name']) {
      processedCard.ability = {
        name: card.abilityName || card['Ability Name'] || '',
        description: card.ability || card['Ability'] || ''
      };
    }

    // Add special ability if present
    if (card.specialAbility || card['Special Ability']) {
      processedCard.specialAbility = {
        name: card.specialAbilityName || card['Special Ability Name'] || 'Special Ability',
        description: card.specialAbility || card['Special Ability'] || '',
        cost: {
          amount: Number(card.specialAbilityCost || card['Special Ability Cost'] || 0),
          element: card.element || card['Element'] || null
        }
      };
    }

    // Add quote if present
    if (card.quote || card['Quote']) {
      processedCard.quote = card.quote || card['Quote'] || '';
    }

    // Add card fact using the 'fact' column from Excel
    if (card.fact || card['fact']) {
      processedCard.cardFact = card.fact || card['fact'] || '';
    }

    // Add lore description using the 'description' column from Excel
    if (card.description || card['description']) {
      processedCard.loreDescription = card.description || card['description'] || '';
    }

    // Add trigger and effect for counters
    if (processedCard.type === 'Counter') {
      processedCard.trigger = card.trigger || card['Trigger'] || '';
      processedCard.effect = card.ability || card['Ability'] || '';
    }

    // Add tier and effects for shields
    if (processedCard.type === 'Shield') {
      processedCard.tier = Number(card.tier || card['Tier'] || 1);
      processedCard.primaryEffect = card.ability || card['Ability'] || '';
      processedCard.secondaryEffect = card.specialAbility || card['Special Ability'] || '';
    }

    // Add rune type for runes
    if (processedCard.type === 'Rune') {
      processedCard.rune = card.rune || card['Rune Type'] || 'Normal';
      if (card.ability || card['Ability']) {
        processedCard.ability = card.ability || card['Ability'];
      }
    }

    // Add synergies, counters, and news as empty arrays for now
    processedCard.synergies = [];
    processedCard.counters = [];
    processedCard.news = [];

    return processedCard;
  })
};

// Ensure the output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the JSON file
console.log('Writing JSON file...');
fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));

console.log(`Conversion complete! JSON saved to ${outputPath}`); 