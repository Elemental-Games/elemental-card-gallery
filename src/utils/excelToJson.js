import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertExcelToJson() {
  const excelFilePath = path.join(__dirname, '..', '..', 'ElementalMastersCards.xlsx');
  const jsonOutputPath = path.join(__dirname, '..', '..', 'public', 'data', 'cards.json');

  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  // Process each card
  const processedData = jsonData.map(card => {
    // Parse JSON fields
    ['synergies', 'counters', 'news'].forEach(field => {
      if (card[field]) {
        try {
          card[field] = JSON.parse(card[field]);
        } catch (error) {
          console.error(`Error parsing ${field} for card ${card.name}:`, error);
          card[field] = [];
        }
      } else {
        card[field] = [];
      }
    });

    // Convert numeric values
    ['cardNumber', 'strength', 'agility', 'specialAbilityCost', 'essenceCost', 'essenceGeneration', 'tier'].forEach(field => {
      if (card[field] !== undefined) {
        card[field] = Number(card[field]);
      }
    });

    // Handle NaN values and empty cells
    Object.keys(card).forEach(key => {
      if (typeof card[key] === 'number' && isNaN(card[key])) {
        card[key] = null;
      }
      if (card[key] === undefined || card[key] === '') {
        card[key] = null;
      }
    });

    // Set image path using card id
    card.image = `/images/cards/${card.id}.png`;

    // Handle the trigger field
    if (card.type === 'Counter' && card.trigger) {
      card.trigger = card.trigger.trim();
    } else {
      card.trigger = null;
    }

    return card;
  });

  // Write to JSON file
  const jsonContent = JSON.stringify({ cards: processedData }, null, 2);
  fs.writeFileSync(jsonOutputPath, jsonContent);
  console.log('Conversion complete. JSON file created:', jsonOutputPath);

  // Log the number of cards processed
  console.log(`Processed ${processedData.length} cards.`);
}

// Run the conversion
convertExcelToJson();