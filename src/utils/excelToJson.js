const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

function convertExcelToJson() {
  const excelFilePath = path.join('C:', 'Users', 'Mark', 'Website', 'elemental-card-gallery', 'storage', 'ElementalMastersCards.xlsx');
  const jsonOutputPath = path.join('C:', 'Users', 'Mark', 'Website', 'elemental-card-gallery', 'storage', 'cards.json');

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

    // Ensure image path is correct
    card.image = `/images/cards/${card.image}`;

    return card;
  });

  // Write to JSON file
  fs.writeFileSync(jsonOutputPath, JSON.stringify(processedData, null, 2));
  console.log('Conversion complete. JSON file created:', jsonOutputPath);
}

// Run the conversion
convertExcelToJson();