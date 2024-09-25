import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as XLSX from 'xlsx';

const s3Client = new S3Client({
  region: "YOUR_AWS_REGION",
  credentials: {
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  },
});

const getImageUrl = (cardName) => {
  // Replace spaces with hyphens and convert to lowercase
  const formattedName = cardName.toLowerCase().replace(/\s+/g, '-');
  return `https://your-s3-bucket-url.s3.amazonaws.com/cards/${formattedName}.png`;
};

export const fetchCardsFromS3 = async () => {
  try {
    const command = new GetObjectCommand({
      Bucket: "YOUR_BUCKET_NAME",
      Key: "path/to/your/excel/file.xlsx",
    });

    const response = await s3Client.send(command);
    const arrayBuffer = await response.Body.transformToByteArray();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData.map(card => ({
      id: card.id,
      name: card.name,
      image: getImageUrl(card.name),
      element: card.element,
      type: card.type,
      rarity: card.rarity,
      description: card.description,
      strength: card.strength,
      agility: card.agility,
      ability: card.ability,
      specialAbility: card.specialAbility,
      essenceCost: card.essenceCost,
      essenceGeneration: card.essenceGeneration,
      background: card.background,
      synergies: card.synergies ? JSON.parse(card.synergies) : [],
      counters: card.counters ? JSON.parse(card.counters) : [],
      news: card.news ? JSON.parse(card.news) : [],
    }));
  } catch (error) {
    console.error("Error fetching cards from S3:", error);
    return [];
  }
};

export const fetchCardByName = async (cardName) => {
  try {
    const allCards = await fetchCardsFromS3();
    const card = allCards.find(c => c.name.toLowerCase() === cardName.toLowerCase());
    return card || null;
  } catch (error) {
    console.error("Error fetching card by name:", error);
    return null;
  }
};
