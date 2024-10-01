import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as XLSX from 'xlsx';

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

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
      ...card,
      image: `${import.meta.env.VITE_S3_BUCKET_URL}/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}.png`,
    }));
  } catch (error) {
    console.error("Error fetching cards from S3:", error);
    throw error;
  }
};

export const fetchCardByName = async (cardName) => {
  try {
    const allCards = await fetchCardsFromS3();
    return allCards.find(c => c.name.toLowerCase() === cardName.toLowerCase()) || null;
  } catch (error) {
    console.error("Error fetching card by name:", error);
    throw error;
  }
};