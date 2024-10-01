import express from 'express';
import cors from 'cors';
import { fetchCardsFromS3 } from './src/utils/awsUtils.js';

const app = express();
app.use(cors());

app.get('/api/cards', async (req, res) => {
  try {
    const cards = await fetchCardsFromS3();
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Error fetching cards" });
  }
});

const PORT = import.meta.env.VITE_PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));