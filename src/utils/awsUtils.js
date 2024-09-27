import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as XLSX from 'xlsx';

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const getImageUrl = (cardName) => {
  const formattedName = cardName.toLowerCase().replace(/\s+/g, '-');
  return `${import.meta.env.VITE_S3_BUCKET_URL}/cards/${formattedName}.png`;
};

export const fetchCardsFromS3 = async () => {
  try {
    const command = new GetObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: "data/elemental_masters_cards.xlsx",
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
      rune: card.rune,
      tier: card.tier,
      rarity: card.rarity,
      description: card.description,
      strength: card.strength,
      agility: card.agility,
      abilityName: card.abilityName,
      ability: card.ability,
      specialAbilityName: card.specialAbilityName,
      specialAbility: card.specialAbility,
      specialAbilityCost: card.specialAbilityCost,
      essenceCost: card.essenceCost,
      essenceGeneration: card.essenceGeneration,
      quote: card.quote,
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