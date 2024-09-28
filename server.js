require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const XLSX = require('xlsx');

const app = express();
app.use(cors());

const s3Client = new S3Client({
  region: process.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.get('/api/cards', async (req, res) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.VITE_S3_BUCKET_NAME,
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
      image: `${process.env.VITE_S3_BUCKET_URL}/cards/${card.name.toLowerCase().replace(/\s+/g, '-')}.png`,
    }));

    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards from S3:", error);
    res.status(500).json({ error: "Error fetching cards" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));