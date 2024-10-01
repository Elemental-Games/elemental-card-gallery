import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import XLSX from 'xlsx';

dotenv.config();

const app = express();
app.use(cors());

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

app.get('/api/cards', async (req, res) => {
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

    const cards = jsonData.map(card => ({
      ...card,
      image: `${import.meta.env.VITE_S3_BUCKET_URL}/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}.png`,
    }));

    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards from S3:", error);
    res.status(500).json({ error: "Error fetching cards" });
  }
});

const PORT = import.meta.env.VITE_PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));