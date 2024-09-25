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
  // For now, we'll return our fake Water Elemental card data
  if (cardName.toLowerCase() === 'water-elemental') {
    return {
      id: 'water-elemental',
      name: 'Water Elemental',
      image: '/images/water-elemental.jpg',
      element: 'Water',
      type: 'Creature',
      rarity: 'Rare',
      description: 'A creature made of the element of water.',
      strength: 7,
      agility: 5,
      ability: 'Tidal Wave: Deal 3 damage to all enemy creatures.',
      specialAbility: 'Hydro Pump: Once per game, deal 10 damage to a single target.',
      essenceCost: 4,
      essenceGeneration: 2,
      background: 'Water Elementals are ancient beings that embody the raw power of the seas. They are known for their fluid tactics and overwhelming force in battle.',
      synergies: [
        { card: { id: 'leaf-spirit', name: 'Leaf Spirit' }, rating: 'S', color: 'text-green-500' },
        { card: { id: 'flame-wisp', name: 'Flame Wisp' }, rating: 'A', color: 'text-red-500' }
      ],
      counters: [
        { card: { id: 'wind-rider', name: 'Wind Rider' }, rating: 'S', color: 'text-blue-300' }
      ],
      news: [
        { 
          title: 'Water Elemental Showcase', 
          date: '2023-05-01', 
          description: 'Check out our latest video showcasing the Water Elemental in action!', 
          link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      ]
    };
  }
  // For other cards, you can either return null or implement the S3 fetching logic
  return null;
};
