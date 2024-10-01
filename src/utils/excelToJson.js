const XLSX = require('xlsx');
const fs = require('fs');

function convertExcelToJson(filePath) {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);
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

    return card;
  });

  // Write to JSON file
  fs.writeFileSync('cards.json', JSON.stringify(processedData, null, 2));
  console.log('Conversion complete. JSON file created: cards.json');
}

// Usage
const excelFilePath = 'C:\\Users\\Mark\\Website\\ElementalMastersCards.xlsx';
convertExcelToJson(excelFilePath);